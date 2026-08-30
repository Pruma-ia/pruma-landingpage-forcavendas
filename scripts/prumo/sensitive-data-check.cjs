#!/usr/bin/env node
//
// prumo sensitive-data-check — dado real e segredo não entram no git.
//
// O incidente que motiva: 1.238 linhas de contas a receber reais (id de cliente,
// valores, vencimentos, operador) commitadas no satélite da Universal em CSVs de
// backup. Repo privado segurou o vazamento, mas "privado é configuração, não
// propriedade do dado" — e blob commitado nunca mais sai do histórico.
//
// Detalhe que define o desenho: aqueles CSVs NÃO têm CPF/CNPJ — são ids, dinheiro
// e datas. Detector de padrão de documento não os pega. O sinal confiável é a
// FORMA: arquivo tabular novo com muitas linhas de dado. Por isso o gate tem três
// detectores independentes:
//
//   1. segredo:   chave privada, token de provedor, atribuição suspeita de senha
//   2. dump:      arquivo .csv/.tsv/.jsonl/.xlsx/.sql/.parquet adicionado com
//                 ≥ DUMP_MIN_ROWS linhas de dado, ou qualquer tamanho sob path
//                 com backup/dump/export no nome
//   3. densidade: ≥ PII_MIN_HITS ocorrências de CPF/CNPJ/e-mail num arquivo novo
//
// Falso positivo tem saída: scripts/prumo/sensitive-allowlist — um glob por
// linha, versionado, então liberar um fixture fica no diff e no blame.
//
// Uso:
//   node scripts/prumo/sensitive-data-check.cjs [--base <ref>] [--json]
//
// Compara `<base>..HEAD` (diff de árvore, não precisa de merge-base — funciona em
// checkout shallow do CI). Sem --base tenta origin/master, depois master.
// Exit: 0 limpo, 1 achado, 2 falha de execução (nunca é reprovação).

"use strict"

const { execFileSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

const DUMP_EXTENSIONS = new Set([".csv", ".tsv", ".jsonl", ".ndjson", ".xlsx", ".xls", ".parquet", ".sql", ".dump"])
const DUMP_MIN_ROWS = 50
const DUMP_PATH_HINT = /(^|\/)(backups?|dumps?|exports?)(\/|$)|_ANTES\b|_backup\b/i
const PII_MIN_HITS = 10

const SECRET_PATTERNS = [
  { re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY(?: BLOCK)?-----/, what: "chave privada" },
  { re: /\bAKIA[0-9A-Z]{16}\b/, what: "AWS access key" },
  { re: /\bghp_[A-Za-z0-9]{36,}\b|\bgithub_pat_[A-Za-z0-9_]{22,}\b/, what: "GitHub token" },
  { re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, what: "Slack token" },
  { re: /\bsk-[A-Za-z0-9_-]{20,}\b/, what: "API key (sk-…)" },
  { re: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/, what: "JWT" },
  {
    re: /\b(?:api[_-]?key|secret|senha|password|token)\b\s*[:=]\s*["'][A-Za-z0-9+/_-]{24,}["']/i,
    what: "atribuição de credencial",
  },
  { re: /postgres(?:ql)?:\/\/[^\s"'/]+:[^\s"'@]+@(?!localhost|127\.0\.0\.1|pruma_db|db:)/, what: "connection string com senha para host não-local" },
]

// Valores obviamente de exemplo não bloqueiam — placeholder em teste e runbook é
// rotina. `user:pass@host` e interpolação `${VAR}` entraram após falso positivo
// real no primeiro run de ponta a ponta (infra/stack/EVO.md, doc de config).
const PLACEHOLDER =
  /placeholder|example|exemplo|dummy|changeme|xxxx|your[_-]?key|<[^>]+>|\bfake\b|\buser:pass\w*@|@host\b|\$\{[A-Za-z_]+\}/i

const PII_PATTERNS = [
  { re: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, what: "CPF" },
  { re: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g, what: "CNPJ" },
  { re: /\b[A-Za-z0-9._%+-]+@(?!pruma\.io|example|exemplo|test)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, what: "e-mail" },
]

function parseArgs(argv) {
  const args = { base: null, json: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--base") args.base = argv[++i]
    else if (a === "--json") args.json = true
    else if (a === "--help" || a === "-h") args.help = true
    else return { error: `argumento desconhecido: ${a}` }
  }
  return args
}

function git(...argv) {
  return execFileSync("git", argv, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
}

function resolveBase(explicit) {
  // master = monorepo da plataforma; main = satélites (lá main É produção).
  const candidates = explicit ? [explicit] : ["origin/master", "origin/main", "master", "main"]
  for (const ref of candidates) {
    try {
      // ^{tree} em vez de ^{commit}: aceita também a EMPTY TREE
      // (4b825dc642cb…), que o pre-push de repo novo passa como base para
      // varrer o repo inteiro no primeiro push.
      git("rev-parse", "--verify", `${ref}^{tree}`)
      return ref
    } catch {
      /* próxima */
    }
  }
  return null
}

/** Arquivos adicionados/modificados entre base e HEAD (diff de árvore, dois pontos). */
function changedFiles(base) {
  return git("diff", "--name-only", "--diff-filter=AM", base, "HEAD")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
}

function loadAllowlist(repoRoot) {
  const p = path.join(repoRoot, "scripts", "prumo", "sensitive-allowlist")
  if (!fs.existsSync(p)) return []
  return fs
    .readFileSync(p, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
}

function globToRe(glob) {
  // `**` atravessa diretórios, `*` para na barra. Construção caractere a caractere
  // para não depender de regex de escape (que já quebrou duas vezes nesta linha).
  const special = new Set([".", "+", "^", "$", "{", "}", "(", ")", "|", "[", "]", "\\"])
  let out = "^"
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i]
    if (c === "*") {
      if (glob[i + 1] === "*") {
        out += ".*"
        i++
      } else {
        out += "[^/]*"
      }
    } else if (special.has(c)) {
      out += "\\" + c
    } else {
      out += c
    }
  }
  return new RegExp(out + "$")
}

function isAllowed(file, allowRes) {
  return allowRes.some((re) => re.test(file))
}

function checkSecrets(file, content) {
  const found = []
  for (const p of SECRET_PATTERNS) {
    const m = p.re.exec(content)
    if (!m) continue
    // A LINHA do match decide se é placeholder — não o arquivo inteiro, senão um
    // "example" qualquer no topo liberaria um segredo real lá embaixo.
    const lineStart = content.lastIndexOf("\n", m.index) + 1
    const lineEnd = content.indexOf("\n", m.index)
    const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
    if (PLACEHOLDER.test(line)) continue
    found.push({ check: "segredo", file, message: `${p.what} detectada — segredo não entra no git (use .env.local / secret do CI)` })
  }
  return found
}

function checkDump(file, content) {
  const ext = path.extname(file).toLowerCase()
  if (!DUMP_EXTENSIONS.has(ext)) return []
  const rows = content.split("\n").filter((l) => l.trim()).length
  const hinted = DUMP_PATH_HINT.test(file)
  if (rows >= DUMP_MIN_ROWS || hinted) {
    return [
      {
        check: "dump",
        file,
        message:
          `arquivo tabular com ${rows} linha(s)${hinted ? " sob path de backup/dump/export" : ""} — ` +
          `parece dado real (o incidente da Universal eram CSVs assim, sem nenhum CPF para um regex achar). ` +
          `Dado real vive fora do git; fixture legítimo entra em scripts/prumo/sensitive-allowlist (versionado, fica no diff)`,
      },
    ]
  }
  return []
}

function checkPiiDensity(file, content) {
  const found = []
  for (const p of PII_PATTERNS) {
    const hits = content.match(p.re)
    if (hits && hits.length >= PII_MIN_HITS) {
      found.push({
        check: "pii",
        file,
        message: `${hits.length} ocorrências de ${p.what} — densidade de dado pessoal alta para arquivo versionado`,
      })
    }
  }
  return found
}

function run(args) {
  let repoRoot
  try {
    repoRoot = git("rev-parse", "--show-toplevel").trim()
  } catch (err) {
    return { status: 2, reason: `fora de um repo git: ${err.message}`, findings: [] }
  }

  const base = resolveBase(args.base)
  if (!base) {
    return { status: 2, reason: `base inalcançável (${args.base ?? "origin/master, master"})`, findings: [] }
  }

  let files
  try {
    files = changedFiles(base)
  } catch (err) {
    return { status: 2, reason: `git diff falhou: ${err.message}`, findings: [] }
  }

  const allowRes = loadAllowlist(repoRoot).map(globToRe)
  const findings = []
  const skipped = []

  for (const file of files) {
    if (isAllowed(file, allowRes)) {
      skipped.push(file)
      continue
    }
    const abs = path.join(repoRoot, file)
    if (!fs.existsSync(abs)) continue
    const buf = fs.readFileSync(abs)
    // Binário: só o detector de dump interessa (xlsx/parquet são binários).
    const isBinary = buf.includes(0)
    const content = isBinary ? "" : buf.toString("utf8")

    if (isBinary) {
      const ext = path.extname(file).toLowerCase()
      if (DUMP_EXTENSIONS.has(ext)) {
        findings.push({
          check: "dump",
          file,
          message: `arquivo de dados binário (${ext}, ${(buf.length / 1024).toFixed(0)} KB) adicionado — mesmo tratamento do CSV: fora do git ou na allowlist`,
        })
      }
      continue
    }

    findings.push(...checkSecrets(file, content))
    findings.push(...checkDump(file, content))
    findings.push(...checkPiiDensity(file, content))
  }

  return { status: findings.length ? 1 : 0, base, scanned: files.length, allowlisted: skipped, findings }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.error) {
    console.error(`[prumo] ${args.error}`)
    process.exit(2)
  }
  if (args.help) {
    console.log("uso: node scripts/prumo/sensitive-data-check.cjs [--base <ref>] [--json]")
    process.exit(0)
  }

  const result = run(args)

  if (args.json) {
    console.log(JSON.stringify(result, null, 2))
    process.exit(result.status)
  }

  if (result.status === 2) {
    console.error(`[prumo] sensitive-data-check não conseguiu avaliar: ${result.reason}`)
    console.error("[prumo] NÃO é reprovação — investigue a causa acima.")
    process.exit(2)
  }

  if (result.findings.length === 0) {
    console.log(`[prumo] sensitive-data-check OK — ${result.scanned} arquivo(s) contra ${result.base}.`)
    process.exit(0)
  }

  console.error("")
  console.error(`[prumo] BLOQUEADO: ${result.findings.length} achado(s) de dado sensível.`)
  console.error("")
  for (const f of result.findings) {
    console.error(`  ✗ [${f.check}] ${f.file}`)
    console.error(`    ${f.message}`)
    console.error("")
  }
  process.exit(1)
}

if (require.main === module) main()

module.exports = { run, checkSecrets, checkDump, checkPiiDensity }
