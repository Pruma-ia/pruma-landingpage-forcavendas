---
phase: 04-quality-polish
plan: 02
subsystem: copy-centralization
tags: [constants, copy, cta, editability, qa]
dependency_graph:
  requires: []
  provides: [single-source-of-copy, editavel-annotations, cta-touchpoints-verified]
  affects: [lib/constants.ts]
tech_stack:
  added: []
  patterns: [single-source-of-truth, inline-editorial-comments]
key_files:
  created: []
  modified:
    - lib/constants.ts
decisions:
  - "Comentários /* EDITÁVEL: ... */ usados dentro do objeto/ao topo do bloco — não repetidos em cada campo individual para manter legibilidade"
  - "MOCK_APP e MOCK_PAINEL não recebem comentários EDITÁVEL — são dados técnicos de mockup, não copy substituível pelo cliente"
metrics:
  duration: ~8min
  completed: "2026-05-07"
  tasks_completed: 1
  tasks_total: 1
  files_modified: 1
---

# Phase 4 Plan 02: Copy Centralization & CTA Touchpoints Summary

**One-liner:** Auditoria de copy hardcoded e anotação de todos os campos substituíveis em `lib/constants.ts` com marcadores `/* EDITÁVEL: ... */`, garantindo 30 pontos de edição claramente identificados para o cliente e 3 touchpoints distintos do CTA principal.

## Objective

Tornar `lib/constants.ts` a fonte única de verdade para todo o copy da LP, com marcadores de edição que permitem ao cliente trocar qualquer string sem conhecimento de código, e confirmar que o CTA "Falar com um consultor" aparece em exatamente 3 locais distintos do funil.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Auditar copy hardcoded, adicionar EDITÁVEL, verificar CTA touchpoints | 499cc5c | lib/constants.ts |

## Verification Results

### Auditoria de Copy Hardcoded

Grep de diagnóstico executado em todos os 13 componentes listados no plano. Resultado: **zero strings de copy visível hardcoded** em qualquer componente. Todos os textos já eram consumidos via importação de `lib/constants.ts`.

```
grep -rn '"Falar com um consultor"' components/ --include="*.tsx"
→ 0 resultados (OK)

grep -rn '"Agendar conversa' components/ --include="*.tsx"
→ 0 resultados (OK)
```

### Comentários EDITÁVEL

`lib/constants.ts` agora contém **30 ocorrências** do marcador `/* EDITÁVEL: ... */`:

- SITE_TITLE, SITE_DESCRIPTION — meta SEO
- CTA_PRIMARY, CTA_SECONDARY, CTA_FORM — textos de botões
- FORM_EMPTY_STATE, FORM_SUCCESS — estados do formulário
- BRAND_NAME — wordmark
- HERO (por campo individual: eyebrow, headlineLine1, headlineLine2, subheadline, microcopy) + bloco
- DIAGNOSTICO (bloco + cards array)
- TESE, COMO_FUNCIONA, PAINEL_GESTOR, FUNCIONALIDADES, PARA_QUEM, DIFERENCIAL — cabeçalho de bloco
- PROVA_SOCIAL (bloco + metrics + depoimento + logos individualmente)
- CTA_FINAL — bloco
- FOOTER (bloco + copyright + contactEmail env var)

### Verificação dos 3 Touchpoints CTA_PRIMARY

```
grep -l "CTA_PRIMARY" components/Navbar.tsx components/Hero.tsx components/Footer.tsx
→ 3 arquivos (OK)
```

| Componente | Contexto | Variant |
|------------|----------|---------|
| Navbar.tsx | Botão desktop + mobile drawer | primary |
| Hero.tsx | Botão primário da seção hero | primary |
| Footer.tsx | Botão ghost na coluna de brand | ghost |

### Build

`npm run build` passou sem erros após as alterações. Apenas `lib/constants.ts` foi modificado (sem mudanças em componentes).

## Deviations from Plan

None — plano executado exatamente como especificado.

A auditoria de copy hardcoded confirmou o que o plano antecipava: todos os componentes já consumiam constantes corretamente. O trabalho real foi a adição sistemática dos 30 comentários EDITÁVEL.

## Known Stubs

`PROVA_SOCIAL.metrics`, `PROVA_SOCIAL.depoimento` e `PROVA_SOCIAL.logos` contêm dados placeholder. Estes são stubs intencionais documentados em projeto (`<!-- TODO: substituir -->` nos componentes, e agora marcados com `/* EDITÁVEL: substitua com ... */` em constants.ts). Os stubs não impedem o objetivo deste plano (centralização de copy), e estão rastreados como deferred para substituição pelo cliente antes do go-live.

## Threat Flags

None — nenhuma nova superfície de segurança introduzida. Apenas comentários adicionados a um arquivo de constantes de build-time.

## Self-Check: PASSED

- [x] `lib/constants.ts` modificado e presente: FOUND
- [x] Commit 499cc5c: FOUND
- [x] `grep -c "EDITÁVEL" lib/constants.ts` = 30 (>= 12 requerido): PASSED
- [x] 3 arquivos com CTA_PRIMARY: PASSED
- [x] Zero copy hardcoded em componentes: PASSED
- [x] `npm run build`: PASSED
