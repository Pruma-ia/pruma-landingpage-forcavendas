---
phase: 04-quality-polish
plan: "03"
subsystem: responsividade
tags: [overflow, mobile, responsive, playwright, css]

# Dependency graph
requires:
  - phase: 04-quality-polish
    plan: "01"
    provides: Build gate estabelecida (lint + tsc + build passando)
provides:
  - LP sem scroll horizontal em 375px, 768px, 1024px, 1440px
  - overflow-x: hidden no html em globals.css
  - overflow-hidden nas sections Hero e PainelGestor
  - overflow-hidden w-full no container bento de Funcionalidades
affects: [04-04, checkpoint-human-verify]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "section overflow-hidden para conter pan horizontal de mockup"
    - "wrapper min-w-0 dentro de overflow-x-auto para pan controlado sem vazar"
    - "html { overflow-x: hidden } como guard de segurança de layout global"

key-files:
  created: []
  modified:
    - app/globals.css
    - components/Hero.tsx
    - components/PainelGestor.tsx
    - components/Funcionalidades.tsx

key-decisions:
  - "Adicionado overflow-hidden nas sections Hero e PainelGestor (e nao no Container) para garantir que o overflow-x-auto do wrapper do mockup seja contido sem afetar o z-index do sticky Navbar"
  - "min-w-0 em div interno ao overflow-x-auto previne que flexbox/grid children ignorarem a restricao de largura"
  - "overflow-x: hidden no html e guard de seguranca APOS correcao das causas — PainelDashboard tem min-w-[760px] que e intencional (dashboard precisa de largura minima para ser legivel)"

patterns-established:
  - "PainelDashboard (min-w-[760px]) requer overflow-hidden no container pai para nao vazar em viewports menores que 760px"

requirements-completed:
  - QA-01

# Metrics
duration: 12min
completed: 2026-05-07
---

# Phase 04, Plan 03: Overflow Audit + Responsividade Summary

**Auditoria Playwright identificou overflow em 768px; 4 guards aplicados eliminaram scroll horizontal em todos os 4 viewports (375, 768, 1024, 1440)**

## Status

**CHECKPOINT ATINGIDO** — Task 1 completa, aguardando verificacao humana no browser.

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-07
- **Completed:** Checkpoint atingido apos Task 1
- **Tasks executadas:** 1 de 2 (Task 2 e checkpoint:human-verify)
- **Files modified:** 4

## Accomplishments

### Task 1: Auditoria de overflow com Playwright e correcao de problemas

**Metodo utilizado:** Playwright (disponivel via npx cache, modulo encontrado em `~/.npm/_npx/`)

**Resultado do audit inicial (antes das correcoes):**
- `mobile-375`: docWidth=375px — overflow=false (ja estava ok)
- `tablet-768`: docWidth=788px — **overflow=true** (20px de vazamento)
- `desktop-1024`: docWidth=1024px — overflow=false
- `desktop-1440`: docWidth=1440px — overflow=false

**Root cause identificado:** `PainelDashboard` tem `min-w-[760px]` (necessario para o dashboard ser legivel). Em 768px com padding do Container (`px-8` = 32px cada lado = 64px total), o espaco disponivel era 768-64=704px. Com margens negativas `-mx-6` (24px cada lado = +48px), o espaco aumentava para 752px — ainda menor que 760px do dashboard.

**Correcoes aplicadas:**

| Arquivo | Correcao | Motivo |
|---------|----------|--------|
| `app/globals.css` | `overflow-x: hidden` no `html` | Guard de seguranca global |
| `components/Hero.tsx` | `overflow-hidden` na `<section>` | Contem o pan horizontal do mockup |
| `components/Hero.tsx` | `max-w-full` + `min-w-0` no wrapper do mockup | Previne que wrapper flexbox vaze |
| `components/PainelGestor.tsx` | `overflow-hidden` na `<section>` | Contem o pan horizontal do mockup |
| `components/PainelGestor.tsx` | `max-w-full` + `min-w-0` no wrapper do mockup | Previne que wrapper flexbox vaze |
| `components/Funcionalidades.tsx` | `w-full` no container bento | Reforca contencao do PainelDashboard escalado |

**Resultado apos correcoes (Playwright):**
- `mobile-375`: docWidth=375px — overflow=false
- `tablet-768`: docWidth=768px — overflow=false
- `desktop-1024`: docWidth=1024px — overflow=false
- `desktop-1440`: docWidth=1440px — overflow=false

**Touch targets verificados:** Navbar hamburger (44x44px), nav links mobile (`min-h-[44px]`), form inputs ja conformes — nenhuma correcao necessaria.

**Build de producao:** `npm run build` passou sem erros apos as correcoes.

## Task Commits

1. **Task 1: Auditoria de overflow e correcoes** — `29efa70` (fix)

## Files Created/Modified

- `app/globals.css` — Adicionado `overflow-x: hidden` no bloco `html`
- `components/Hero.tsx` — `overflow-hidden` na section + melhora no wrapper do mockup
- `components/PainelGestor.tsx` — `overflow-hidden` na section + melhora no wrapper do mockup
- `components/Funcionalidades.tsx` — `w-full` no container bento hero

## Decisions Made

- `overflow-hidden` aplicado na `section` ao inves do `Container` para nao criar problemas de stacking context com o sticky Navbar (z-index:40)
- `min-w-[760px]` do PainelDashboard mantido intencional — dashboard precisa da largura minima para ser legivel; o pan horizontal controlado e a UX correta em mobile
- Guard `overflow-x: hidden` no `html` adicionado como ultima linha de defesa apos todas as causas especificas terem sido corrigidas

## Checkpoint: Aguardando Verificacao Humana

**O que foi construido:** Correcoes de responsividade aplicadas — overflow-x: hidden no html, overflow-hidden nas sections Hero e PainelGestor, w-full no bento de Funcionalidades. Build de producao passa.

**Como verificar:**
1. Execute `npm run dev` no diretório do projeto
2. Abra http://localhost:3000 no Chrome DevTools
3. No DevTools, abra o Device Toolbar (Ctrl+Shift+M / Cmd+Shift+M)
4. Teste cada viewport nesta ordem:
   - 375px: Scroll VERTICAL pela pagina inteira — confirme que nao ha scroll HORIZONTAL em nenhum ponto
   - 768px: Repita o processo
   - 1024px: Repita o processo
   - 1440px: Repita o processo
5. Em 375px, verifique especificamente:
   - Hero: o mockup PainelDashboard rola horizontalmente DENTRO do seu container (pan local), mas a PAGE em si nao rola horizontalmente
   - Funcionalidades: o bento hero card esta contido sem vazamento lateral
   - Footer: as 4 colunas empilham verticalmente sem overflow
6. Teste a interacao do menu mobile: clique no hamburguer, confirme que abre, fecha com X e com Esc

**Sinal para retomar:** Digite "aprovado" se nenhum viewport exibir scroll horizontal. Ou descreva qual secao ainda transborda em qual viewport para continuar as correcoes.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Playwright disponivel via cache npx, nao como modulo Node.js padrao**

- **Found during:** Task 1 (PASSO 1 — verificar Playwright)
- **Issue:** `npx playwright --version` retornava 1.59.1 mas `require('playwright')` falhava com MODULE_NOT_FOUND porque playwright nao esta nas dependencias do projeto nem no npm global
- **Fix:** Localizado modulo em `~/.npm/_npx/e41f203b7505f1fb/node_modules/playwright` e usado `require()` com caminho absoluto
- **Files modified:** Nenhum (solucao em runtime, nao em codigo)
- **Verificacao:** Playwright executou auditoria completa com sucesso

**2. [Rule 1 - Bug] text-pruma-gray-text em Funcionalidades subheadline alterado para text-pruma-navy por hook de lint**

- **Found during:** Task 1 — diff pos-edicao
- **Issue:** Hook PostToolUse alterou `text-pruma-gray-text` para `text-pruma-navy` na linha do subheadline de Funcionalidades
- **Fix:** Mantido — `text-pruma-navy` e mais consistente com o design system (texto secundario nao precisa ser cinza quando o fundo e ciano palido)
- **Files modified:** `components/Funcionalidades.tsx` (linha 53)
- **Impacto:** Cosmético, melhora a hierarquia visual

## Known Stubs

Nenhum — nao ha stubs novos introduzidos neste plano.

## Threat Flags

Nenhuma nova superficie de seguranca introduzida.

---

## Self-Check

- [x] `overflow-x: hidden` presente em `app/globals.css` no bloco html (linha 38)
- [x] `overflow-hidden` presente no container bento hero em `Funcionalidades.tsx` (linha 62)
- [x] `overflow-hidden` + `overflow-x-auto` presentes em `Hero.tsx`
- [x] Commit `29efa70` existe em `git log`
- [x] `npm run build` passou sem erros
- [x] Playwright audit: todos os 4 viewports `overflow=false`

## Self-Check: PASSED

*Phase: 04-quality-polish*
*Plan: 03 — Checkpoint atingido*
*Completed (Task 1): 2026-05-07*
