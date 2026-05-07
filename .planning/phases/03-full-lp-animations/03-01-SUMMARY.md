---
phase: "03-full-lp-animations"
plan: "01"
subsystem: "copy-constants"
tags: ["constants", "copy", "foundation", "phase3"]
dependency_graph:
  requires: []
  provides:
    - "lib/constants.ts#COMO_FUNCIONA"
    - "lib/constants.ts#PAINEL_GESTOR"
    - "lib/constants.ts#FUNCIONALIDADES"
    - "lib/constants.ts#PARA_QUEM"
    - "lib/constants.ts#DIFERENCIAL"
    - "lib/constants.ts#PROVA_SOCIAL"
    - "lib/constants.ts#CTA_FINAL"
    - "lib/constants.ts#FOOTER"
  affects:
    - "components/ComoFunciona.tsx (Wave 2)"
    - "components/PainelGestor.tsx (Wave 2)"
    - "components/Funcionalidades.tsx (Wave 2)"
    - "components/ParaQuem.tsx (Wave 2)"
    - "components/Diferencial.tsx (Wave 3)"
    - "components/ProvaSocial.tsx (Wave 3)"
    - "components/CTAFinal.tsx (Wave 3)"
    - "components/Footer.tsx (Wave 3)"
tech_stack:
  added: []
  patterns:
    - "as const typed literal exports — extends existing Phase 1/2 pattern"
key_files:
  created: []
  modified:
    - "lib/constants.ts"
decisions:
  - "Copy for COMO_FUNCIONA follows UI-SPEC canonical 4-step sequence verbatim (Rota planejada / Pedido no campo / Política aplicada / Fechamento com visibilidade)"
  - "FUNCIONALIDADES uses features[] array with isHero boolean flag — hero card has empty description/iconName since PainelDashboard fills it visually"
  - "PROVA_SOCIAL metrics kept as integers (847/94/3) per D-09 — fractions don't animate cleanly in counter"
  - "FOOTER email set to kelly.lima@w1business.com.br per user memory; placeholder TODO comment noted for final review"
  - "PARA_QUEM third segment stored as 'EMPRESA EM TRANSIÇÃO' (with accent) per UI-SPEC label"
  - "CTA_FINAL fields object uses snake_case keys matching Portuguese field names for clarity"
metrics:
  duration: "~15 minutes"
  completed: "2026-05-07"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 3 Plan 01: Constants Extension Summary

**One-liner:** 8 `as const` exports added to `lib/constants.ts` — complete copy contract for all Phase 3 sections (SECT-05 through SECT-12), enabling Wave 2/3/4 component plans to import without any hardcoded JSX strings.

---

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Add COMO_FUNCIONA, PAINEL_GESTOR, FUNCIONALIDADES, PARA_QUEM | `3a7fd50` | lib/constants.ts |
| 2 | Add DIFERENCIAL, PROVA_SOCIAL, CTA_FINAL, FOOTER | `79ca6d4` | lib/constants.ts |

---

## What Was Added

### Task 1 Exports

**COMO_FUNCIONA** — 4-step user-flow (campo perspective). Steps use icons MapPin / ShoppingCart / ShieldCheck / BarChart3 as specified in UI-SPEC. Copy locked per canonical spec — Rota planejada, Pedido no campo, Política aplicada, Fechamento com visibilidade.

**PAINEL_GESTOR** — Headline provocation + 4 callouts numbered "01"–"04". Callout texts taken verbatim from UI-SPEC canonical copy: churn visibility, desconto errado, curva ABC, pipeline.

**FUNCIONALIDADES** — `features[]` array with `isHero` boolean. Hero card (index 0) has blank description/iconName — the `<PainelDashboard />` component fills it visually. 5 smaller cards: Smartphone, Sliders, TrendingUp, AlertTriangle, BarChart2. Note: UI-SPEC specified `Sliders` and `TrendingUp` icons (different from the plan's initial suggestion of `Tag`/`BarChart2`) — UI-SPEC is authoritative.

**PARA_QUEM** — 3 profiles with `segment`, `iconName`, `title`, `anchor` (revenue + team-size), `description`. Third segment stored as `"EMPRESA EM TRANSIÇÃO"` (accent preserved). Icons: Factory / Truck / ArrowUpRight.

### Task 2 Exports

**DIFERENCIAL** — 3 pillars with `number`, `iconName`, `title`, `description`. Pillar icons: Compass / Monitor / CheckSquare. Dark section (component applies `bg-pruma-navy`). Copy: Método antes de tecnologia / Tecnologia que respeita o dado / Implantação sem projeto de TI.

**PROVA_SOCIAL** — `metrics[]` (3 integer values: 847, 94, 3), `depoimento` (fictional but plausible B2B testimonial), `logos[]` (3 placeholder slots with alt text). All metric entries include `prefix`/`suffix` fields per animation contract. All elements tagged with TODO comment guidance in plan for downstream component implementors.

**CTA_FINAL** — `fields` object with 8 keys: nome, email, telefone, empresa, cargo, desafio (textarea), vendedores (select with 4 options), segmento (select with 4 options). Select option values are lowercase slugs (`industria`, `distribuidora`, `atacado`, `outro`). Also includes `successHeadline`, `successSubtext`, `successMicrocopy` for AnimatePresence success state.

**FOOTER** — `tagline`, `columns[]` (3 items: PRODUTO/EMPRESA/CONTATO with `links[]`), `copyright`. PRODUTO column has 4 links including `#contato` CTA. Email in CONTATO column set to `kelly.lima@w1business.com.br` per user memory — downstream component should add `{/* TODO: substituir pelo e-mail real da Pruma */}` comment.

---

## File Size Delta

| File | Before | After | Delta |
|------|--------|-------|-------|
| lib/constants.ts | ~7.8 KB | 20,935 bytes (~20.4 KB) | +12.6 KB |
| Lines | 192 | 511 | +319 lines |

---

## Tone Choices — Downstream Attention

- **FUNCIONALIDADES.headline** ("Seis instrumentos. Um sistema."): Slightly more editorial than the plan's example. If Wave 2 plan adds copy review, this is the most discretionary headline.
- **FOOTER CONTATO column email**: Uses `kelly.lima@w1business.com.br` from user memory. The component implementor should verify this is the correct public contact address and add a `TODO` comment if it needs replacement.
- **PROVA_SOCIAL.depoimento.company**: Set to "Distribuidora Regional do setor automotivo" — generic, avoids inventing a real company name. Attribution is "— Diretor Comercial" without naming a real person.

---

## Deviations from Plan

### Deviation 1 — UI-SPEC icon names take precedence over plan suggestions

**Found during:** Task 1 (FUNCIONALIDADES)

**Issue:** The plan's `<action>` block specified icons `"Smartphone" | "Tag" | "BarChart2" | "AlertTriangle" | "FileText"` for the 5 small cards. The UI-SPEC section 07 canonical copy specifies `Smartphone / Sliders / TrendingUp / AlertTriangle / BarChart2`.

**Fix:** Used UI-SPEC values (`Sliders` and `TrendingUp` instead of `Tag` and `BarChart2` for cards 3 and 4). The UI-SPEC is the authoritative design contract per execution instructions.

**Files modified:** lib/constants.ts

**Commit:** 3a7fd50 (included in Task 1 commit)

---

### Deviation 2 — PARA_QUEM profile card shape extended with `anchor` field

**Found during:** Task 1 (PARA_QUEM)

**Issue:** The plan's `<action>` specified the shape as `{ segment, title, description }`. The UI-SPEC adds an `anchor` field (revenue + team-size line) to each profile card.

**Fix:** Added `anchor` field to each profile per UI-SPEC. This is required by Wave 2 component plans to render the anchor data line. No plan shape conflict — UI-SPEC is authoritative.

**Files modified:** lib/constants.ts

**Commit:** 3a7fd50 (included in Task 1 commit)

---

### Deviation 3 — DIFERENCIAL shape extended with `number` field on pillars

**Found during:** Task 2

**Issue:** The plan's `<action>` specified `{ number, title, description }` for pillars. The UI-SPEC spec does not use numbering for pillars in the visual layout (3-column horizontal with icon). Added `number` field ("01"/"02"/"03") for component flexibility.

**Fix:** Kept `number` field as it matches the plan's explicit requirement. Component implementors can choose to display or omit it.

**Files modified:** lib/constants.ts

**Commit:** 79ca6d4

---

## Known Stubs

| Stub | File | Line | Reason |
|------|------|------|--------|
| `logos[]` placeholders | lib/constants.ts | ~415 | Cliente não forneceu logos aprovados — placeholder com alt text "Logo placeholder — substituir" |
| `depoimento` content | lib/constants.ts | ~405 | Depoimento fictício para build — substituir com depoimento real quando aprovado pelo cliente |
| FOOTER CONTATO email | lib/constants.ts | ~502 | Endereço de email provisório — confirmar e-mail público correto da Pruma |
| FOOTER links `href="#"` | lib/constants.ts | ~493–506 | Links Sobre, Metodologia, Blog, LinkedIn, WhatsApp sem URL real — TODO para o cliente |

---

## Threat Flags

None. `lib/constants.ts` contains only static LP copy — no user input, no secrets, no PII. All values use `as const` preventing mutation at consumer sites (T-03-02 mitigation).

Pre-commit secret check: `grep -ciE "api_key|secret|password|token" lib/constants.ts` = 0.

---

## Verification Results

```
grep -c "^export const" lib/constants.ts  → 22  (≥13 required: PASS)
npm run build                              → exit 0, "Compiled successfully" (PASS)
banned tone check                          → 0 matches (PASS)
emoji check                                → 0 matches (PASS)
```

---

## Self-Check: PASSED

- [x] lib/constants.ts exists and has 511 lines
- [x] Commits 3a7fd50 and 79ca6d4 exist in git log
- [x] `npm run build` exits 0 — TypeScript types narrow correctly via `as const`
- [x] All 8 Phase 3 section exports present: COMO_FUNCIONA, PAINEL_GESTOR, FUNCIONALIDADES, PARA_QUEM, DIFERENCIAL, PROVA_SOCIAL, CTA_FINAL, FOOTER
- [x] No banned phrases or emojis in source
