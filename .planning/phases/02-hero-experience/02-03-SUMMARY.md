---
phase: 02-hero-experience
plan: "03"
subsystem: mockups
tags: [mockup, AppVendedor, PainelDashboard, AbcChart, BrazilMap, server-component]
dependency_graph:
  requires: ["02-01"]
  provides: ["components/mockups/AppVendedor.tsx", "components/mockups/PainelDashboard.tsx", "components/mockups/_AbcChart.tsx", "components/mockups/_BrazilMap.tsx"]
  affects: ["02-02"]
tech_stack:
  added: []
  patterns: ["server-component", "figure-role-img", "inline-svg", "css-flex-bar-chart", "tailwind-tokens"]
key_files:
  created:
    - components/mockups/AppVendedor.tsx
    - components/mockups/_AbcChart.tsx
    - components/mockups/_BrazilMap.tsx
    - components/mockups/PainelDashboard.tsx
  modified: []
decisions:
  - "AppVendedor verificado via tsc + grep nesta fase; composição visual em fase posterior"
  - "Brazil map usa inline SVG path low-poly sem dependência d3/topojson"
  - "PainelDashboard usa min-w-[760px] para preservar legibilidade; Hero wraps em overflow-x-auto"
metrics:
  duration: "~12 min"
  completed: "2026-05-07"
  tasks_completed: 3
  files_created: 4
---

# Phase 02 Plan 03: Mockup Components (AppVendedor + PainelDashboard) Summary

**One-liner:** 4 mockup components como Server Components puros — AppVendedor (pedido fechado R$ 18.420,00) e PainelDashboard (4 bandas com KPIs, curva ABC, mapa Brasil, tabela de risco) — todos consumindo tokens Pruma da palette e dados de `lib/constants.ts`.

---

## Tasks Executadas

| Task | Nome | Commit | Arquivos |
|------|------|--------|---------|
| 1 | AppVendedor mockup (MOCK-01) | `f39911c` | `components/mockups/AppVendedor.tsx` (85 linhas) |
| 2 | _BrazilMap e _AbcChart helpers | `696cd19` | `components/mockups/_AbcChart.tsx` (43 linhas), `components/mockups/_BrazilMap.tsx` (39 linhas) |
| 3 | PainelDashboard 4 bandas (MOCK-02) | `06540ac` | `components/mockups/PainelDashboard.tsx` (110 linhas) |

---

## Estrutura Final dos Arquivos

| Arquivo | Linhas | Export Nomeado | Consome |
|---------|--------|----------------|---------|
| `components/mockups/AppVendedor.tsx` | 85 | `AppVendedor` | `MOCK_APP` |
| `components/mockups/_AbcChart.tsx` | 43 | `AbcChart` | `MOCK_PAINEL.abc` |
| `components/mockups/_BrazilMap.tsx` | 39 | `BrazilMap` | `MOCK_PAINEL.map` |
| `components/mockups/PainelDashboard.tsx` | 110 | `PainelDashboard` | `MOCK_PAINEL`, `AbcChart`, `BrazilMap` |

Total: 277 linhas. Todos dentro do orçamento máximo de 400 linhas por arquivo.

---

## Confirmações Normativas

### AppVendedor — total R$ 18.420,00

Verificado via grep em `components/mockups/AppVendedor.tsx`:
- `MOCK_APP.client` → `"Auto Center São Paulo Ltda"` (fonte: `lib/constants.ts`)
- `MOCK_APP.total` → `18420.0` — formatado via `fmtBRL` → `R$ 18.420,00`
- `MOCK_APP.discountPercent` → `3`
- `MOCK_APP.status` → `"🟢 ONLINE"` (emoji permitido dentro de mockup per UI-SPEC)
- `MOCK_APP.cta` → `"Fechar pedido"`
- 8 itens em `MOCK_APP.items` + linha de ajuste (`MOCK_APP.adjustment`)
- Botão CTA decorativo: `tabIndex={-1}`, `aria-hidden="true"`, `pointer-events-none`
- Arquivo não contém `"use client"` — Server Component confirmado

### PainelDashboard — 4 bandas com dados bloqueados

Verificado via grep + build:
- **Band 1** — header com `MOCK_PAINEL.brand` (`Pruma · Painel do Gestor`) + 3 filter pills de `MOCK_PAINEL.filters` com `ChevronDown` (lucide-react 1.5 stroke)
- **Band 2** — 4 KPI cards de `MOCK_PAINEL.kpis`: `184` / `R$ 14.820` / `1.247` / `73%`; delta colorido por `deltaToneClass` (cyan/navy/red)
- **Band 3** — `grid-cols-12`: `col-span-7 <AbcChart />` + `col-span-5 <BrazilMap />`
- **Band 4** — tabela de risco de `MOCK_PAINEL.risk.rows`: 3 linhas com pills `Crítico`/`Atenção`

### _AbcChart — 12 barras Pareto descentes

- Tier A (A1-A3): `bg-pruma-cyan` — alturas 96%, 88%, 78%
- Tier B (B1-B3): `bg-pruma-navy-deep` — alturas 68%, 54%, 42%
- Tier C (B4-C5): `bg-pruma-gray-soft` — alturas 32%, 22%, 14%, 9%, 6%, 4%
- Linha pontilhada na metade vertical via `border-dashed`
- Total: 12 barras (3 cyan A-tier + 3 navy-deep B-tier + 6 gray-soft C-tier)

### _BrazilMap — silhueta SVG + 8 pontos ciano

- `viewBox="0 0 240 280"` — espaço de coordenadas correto para os `cx/cy` de `MOCK_PAINEL.map.points`
- Path low-poly da silhueta do Brasil (hardcoded, sem interpolação de dados externos)
- 8 círculos cyan (`fill="#00AEEF"`) com halo translúcido (`rgba(0,174,239,0.18)`) nas coordenadas bloqueadas pela UI-SPEC:
  - São Paulo (172,174) r=9, BH (185,158) r=7, RJ (195,175) r=7, Curitiba (158,195) r=6
  - Porto Alegre (148,230) r=6, Recife (220,110) r=5, Salvador (212,130) r=5, Goiânia (165,142) r=4

---

## Nomes de Arquivo — Confirmação

Os helpers foram criados com os nomes exatos especificados pelo plano:
- `_AbcChart.tsx` com underscore prefix, export `AbcChart` (NÃO `AbcCurve`)
- `_BrazilMap.tsx` com underscore prefix, export `BrazilMap`
- `AbcCurve.tsx` NÃO existe
- `AbcChart.tsx` (sem underscore) NÃO existe
- `BrazilMap.tsx` (sem underscore) NÃO existe

---

## Deviations from Plan

None — plano executado exatamente como escrito. Brazil SVG path é o mesmo path low-poly especificado no plano, sem refinamentos adicionais.

---

## Known Stubs

None — todos os dados são wired a partir de `MOCK_APP` e `MOCK_PAINEL` de `lib/constants.ts`. Nenhum valor hardcoded na JSX, nenhum placeholder.

---

## Threat Flags

Nenhuma surface nova de segurança introduzida. Todos os riscos desta plan já catalogados no threat model:
- T-02-06 mitigado: valores SVG hardcoded sem interpolação de input externo
- T-02-07 aceito: dados de mockup são fiction intencional (marketing collateral)
- T-02-08 mitigado: lucide-react pinado via package.json, sem CDN runtime
- T-02-09 aceito: DOM de tamanho fixo O(1) por mockup

---

## Self-Check: PASSED

Arquivos criados confirmados:

- `components/mockups/AppVendedor.tsx` — FOUND
- `components/mockups/_AbcChart.tsx` — FOUND
- `components/mockups/_BrazilMap.tsx` — FOUND
- `components/mockups/PainelDashboard.tsx` — FOUND

Commits verificados:
- `f39911c` feat(02-03): build AppVendedor — FOUND
- `696cd19` feat(02-03): build _AbcChart and _BrazilMap — FOUND
- `06540ac` feat(02-03): build PainelDashboard — FOUND

Build: `npx next build` — 0 errors, 0 warnings.
TypeScript: `npx tsc --noEmit` — 0 errors.
