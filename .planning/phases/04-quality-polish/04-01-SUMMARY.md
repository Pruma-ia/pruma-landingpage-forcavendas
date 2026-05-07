---
phase: 04-quality-polish
plan: "01"
subsystem: infra
tags: [eslint, typescript, nextjs, build, lint]

# Dependency graph
requires:
  - phase: 03-full-lp-animations
    provides: All LP components built in TypeScript
provides:
  - .eslintrc.json with next/core-web-vitals config for ESLint 8 compatibility
  - next lint passes with exit code 0
  - next build passes with exit code 0
  - npx tsc --noEmit passes with exit code 0
affects: [04-02, 04-03, 04-04, wave-2]

# Tech tracking
tech-stack:
  added: []
  patterns: [ESLint 8 legacy config .eslintrc.json alongside flat config eslint.config.mjs]

key-files:
  created: [.eslintrc.json]
  modified: []

key-decisions:
  - "Added .eslintrc.json because Next.js 14 + ESLint 8 do not support eslint.config.mjs (flat config) — next lint was falling back to interactive setup prompt"
  - "Used next/core-web-vitals preset (same as eslint.config.mjs intent) to maintain parity"

patterns-established:
  - "ESLint 8 + Next.js 14 requires .eslintrc.json, not flat config eslint.config.mjs"

requirements-completed:
  - QA-03

# Metrics
duration: 3min
completed: 2026-05-07
---

# Phase 04, Plan 01: TypeScript + ESLint Build Gate Summary

**Gate de qualidade estabelecida: .eslintrc.json corrige deteccao de config pelo Next.js 14 + ESLint 8, fazendo next lint, tsc --noEmit e next build passarem todos com exit code 0**

## Performance

- **Duration:** 3 min
- **Started:** 2026-05-07T16:07:08Z
- **Completed:** 2026-05-07T16:09:32Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Diagnosticado o root cause dos 4870 erros de lint: o `eslint.config.mjs` (flat config) nao e reconhecido pelo ESLint 8 nem pelo `next lint` do Next.js 14 — o comando caiu em prompt interativo com exit code 1
- Criado `.eslintrc.json` com `next/core-web-vitals` para restaurar deteccao de configuracao
- Verificado que os arquivos TypeScript de source ja estavam sem erros; o build em si ja passava
- Todos os tres checks agora passam: `npx tsc --noEmit` (zero erros), `next lint` (zero warnings/errors), `next build` (exit code 0, "Compiled successfully")

## Task Commits

Cada task foi commitada atomicamente:

1. **Task 1: Executar build e capturar todos os erros TypeScript e ESLint** - `6fed9c3` (fix)

**Plan metadata:** (a ser criado neste commit de docs)

## Files Created/Modified

- `.eslintrc.json` — Configuracao ESLint compativel com ESLint 8 e Next.js 14 (`next/core-web-vitals`)

## Decisions Made

- Adicionado `.eslintrc.json` ao inves de converter `eslint.config.mjs` para formato legado, pois manter ambos e seguro (ESLint 8 prioriza `.eslintrc.*` quando presente) e evita perda da flat config que pode ser util no futuro
- Preset `next/core-web-vitals` escolhido (equivalente ao que `eslint.config.mjs` tentava configurar via `FlatCompat`)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Root cause diferente do esperado: eslint.config.mjs (flat config) incompativel com ESLint 8**

- **Found during:** Task 1 (diagnostico de erros ESLint)
- **Issue:** O plano antecipava erros em arquivos TypeScript especificos (Funcionalidades.tsx, ProvaSocial.tsx, mockups). O diagnostico real revelou que: (a) os arquivos TypeScript ja estavam sem erros; (b) o `npm run lint` retornava 4870 erros porque o ESLint estava lintando arquivos `.js` do `.next/` — isso era um sintoma do RTK proxy intercept, nao o output real. O output real do `next lint` era um prompt interativo (exit 1) porque `eslint.config.mjs` (flat config, ESLint 9+) nao e suportado pelo ESLint 8 instalado
- **Fix:** Criado `.eslintrc.json` com `next/core-web-vitals` — formato legado reconhecido pelo ESLint 8 + Next.js 14
- **Files modified:** `.eslintrc.json` (criado)
- **Verification:** `next lint` retorna "No ESLint warnings or errors" com exit 0
- **Committed in:** `6fed9c3` (fix commit da task 1)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug — root cause diferente, mas fix dentro do escopo da task)
**Impact on plan:** Fix necessario para o criterio de aceitacao da task. Sem scope creep.

## Issues Encountered

- O output do RTK proxy para `npm run lint` mostrava 4870 erros em arquivos `.js` do diretorio `.next/` (output JSON intercept de outro processo/worktree). Rodando `next lint` diretamente revelou o problema real: prompt interativo por falta de configuracao ESLint compativel com Next.js 14 + ESLint 8.

## User Setup Required

Nenhum — nenhuma configuracao de servico externo necessaria.

## Next Phase Readiness

- Build gate estabelecida: todos os tres checks passam com exit code 0
- Ponto de partida limpo para os planos da Wave 2 (04-02, 04-03, 04-04)
- Nenhum bloqueio identificado

---
*Phase: 04-quality-polish*
*Completed: 2026-05-07*
