#!/usr/bin/env node
//
// prumo commit-check — proxies mecânicos de commit atômico.
//
// Atomicidade plena é julgamento humano; o que máquina prova são dois proxies,
// e os dois têm incidente de origem:
//
//   1. FORMATO — conventional commit (feat|fix|refactor|docs|test|chore|perf|
//      ci|style|build|revert, com escopo opcional) ou merge. Mensagem sem tipo
//      é sintoma de commit sem recorte.
//   2. TAMANHO — commit não-merge com > MAX_LINES linhas mudadas ou > MAX_FILES
//      arquivos é grande demais para revisar como unidade (o PR #217 era UM
//      commit de 9k linhas — o review inteiro virou arqueologia). Válvula
//      auditável NA MENSAGEM do commit: a linha `prumo:bulk <motivo>` libera e
//      fica no histórico para sempre.
//
// Uso:
//   node scripts/prumo/commit-check.cjs --range <a..b> [--json]
//
// Exit: 0 limpo, 1 achado, 2 falha de execução (nunca é reprovação).

"use strict"

const { execFileSync } = require("node:child_process")

const MAX_LINES = 3000
const MAX_FILES = 60
const TYPE_RE = /^(feat|fix|refactor|docs|test|chore|perf|ci|style|build|revert)(\([^)]+\))?!?: .+/
const MERGE_RE = /^(Merge |merge[:( ])/i
const BULK_RE = /prumo:bulk\s+\S+/

function git(...argv) {
  return execFileSync("git", argv, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 })
}

function main() {
  const argv = process.argv.slice(2)
  const rIdx = argv.indexOf("--range")
  const range = rIdx !== -1 ? argv[rIdx + 1] : null
  const json = argv.includes("--json")
  if (!range) {
    console.error("[prumo] uso: commit-check.cjs --range <a..b>")
    process.exit(2)
  }

  let shas
  try {
    shas = git("rev-list", "--no-merges", range).split("\n").filter(Boolean)
    // Merges entram só para o check de formato (MERGE_RE cobre).
  } catch (err) {
    console.error(`[prumo] commit-check não conseguiu avaliar (${err.message.split("\n")[0]}) — NÃO é reprovação.`)
    process.exit(2)
  }

  const findings = []
  const allShas = git("rev-list", range).split("\n").filter(Boolean)

  for (const sha of allShas) {
    const subject = git("log", "-1", "--format=%s", sha).trim()
    const body = git("log", "-1", "--format=%B", sha)

    if (!TYPE_RE.test(subject) && !MERGE_RE.test(subject)) {
      findings.push({
        check: "formato",
        sha: sha.slice(0, 8),
        message: `"${subject.slice(0, 72)}" — sem tipo conventional (feat|fix|docs|test|chore|refactor|perf|ci|...). Mensagem sem recorte costuma ser commit sem recorte.`,
      })
    }

    if (!shas.includes(sha)) continue // merge: tamanho não conta

    const stat = git("show", "--shortstat", "--format=", sha).trim()
    const files = Number(/(\d+) files? changed/.exec(stat)?.[1] ?? 0)
    const ins = Number(/(\d+) insertions?/.exec(stat)?.[1] ?? 0)
    const del = Number(/(\d+) deletions?/.exec(stat)?.[1] ?? 0)
    const lines = ins + del

    if ((lines > MAX_LINES || files > MAX_FILES) && !BULK_RE.test(body)) {
      findings.push({
        check: "tamanho",
        sha: sha.slice(0, 8),
        message:
          `${files} arquivo(s), ${lines} linha(s) mudada(s) — acima de ${MAX_FILES} arquivos ou ${MAX_LINES} linhas ` +
          `não se revisa como unidade (o PR #217 era UM commit de 9k linhas). Divida em commits atômicos, ou — para ` +
          `lockfile/geração/vendoring legítimos — libere com a linha "prumo:bulk <motivo>" na mensagem do commit.`,
      })
    }
  }

  if (json) {
    console.log(JSON.stringify({ range, commits: allShas.length, findings }, null, 2))
    process.exit(findings.length ? 1 : 0)
  }

  if (findings.length === 0) {
    console.log(`[prumo] commit-check OK — ${allShas.length} commit(s) em ${range}.`)
    process.exit(0)
  }

  console.error("")
  console.error(`[prumo] BLOQUEADO: ${findings.length} problema(s) de commit em ${range}.`)
  console.error("")
  for (const f of findings) {
    console.error(`  ✗ [${f.check}] ${f.sha}`)
    console.error(`    ${f.message}`)
    console.error("")
  }
  process.exit(1)
}

main()
