---
phase: 03-full-lp-animations
plan: "06"
subsystem: ui
tags: [nextjs, react, framer-motion, tailwind, lucide-react, form, animate-presence]

# Dependency graph
requires:
  - phase: 03-full-lp-animations
    plan: "01"
    provides: "lib/constants.ts CTA_FINAL export with 8-field shape and success copy"
provides:
  - "components/CTAFinal.tsx — SECT-11 lead capture form with AnimatePresence success swap"
affects:
  - "03-07 (page.tsx wire-in — imports CTAFinal and places it in section order)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "AnimatePresence mode=wait for form-to-success content swap inside a fixed card"
    - "Uncontrolled selects with defaultValue='' and disabled placeholder option"
    - "FormState union type (idle | success) driving conditional AnimatePresence children"

key-files:
  created:
    - components/CTAFinal.tsx
  modified: []

key-decisions:
  - "No backend integration per D-16 — submit handler only calls e.preventDefault() + setFormState('success'). Backend (CRM/email) deferred to v2."
  - "Field layout: 6 fields in 2-column grid (nome, email, telefone, empresa, cargo, vendedores), segmento select full-width row, desafio textarea full-width row."
  - "AnimatePresence initial={false} prevents opening fade on mount; mode=wait ensures form fully exits before success enters."
  - "Success state uses lucide CheckCircle (strokeWidth=1.5) — no emoji — with role=status and aria-live=polite for screen reader announcement."

patterns-established:
  - "CTAFinal pattern: white card on bg-pruma-cyan-pale, AnimatePresence wraps formState switch, success state centered with CheckCircle icon."

requirements-completed: [SECT-11]

# Metrics
duration: 8min
completed: 2026-05-07
---

# Phase 03 Plan 06: CTAFinal Summary

**SECT-11 lead capture form in white card on cyan-pale section — 8 inputs (5 text/email/tel/text/text + 2 selects + 1 textarea) with AnimatePresence mode=wait swapping form to CheckCircle success state on submit, no backend**

## Performance

- **Duration:** 8 min
- **Started:** 2026-05-07T13:43:00Z
- **Completed:** 2026-05-07T13:51:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- `components/CTAFinal.tsx` created as `"use client"` component — only file created in this plan
- 8 form inputs rendered exactly as specified in D-11 through D-14: nome (`<input type="text">`), email (`<input type="email">`), telefone (`<input type="tel">`), empresa (`<input type="text">`), cargo (`<input type="text">`), vendedores (`<select>`), segmento (`<select>`), desafio (`<textarea>`)
- Submit handler calls `e.preventDefault()` then `setFormState("success")` — zero fetch/axios/XHR references per D-16
- `AnimatePresence` with `mode="wait"` and `initial={false}` drives form-to-success swap; success state uses lucide `CheckCircle` with `aria-live="polite"`
- Section `id="contato"` matches the anchor targets in Navbar and Hero CTA buttons
- `npm run build` exits 0 with no type errors

## Task Commits

1. **Task 1: Create components/CTAFinal.tsx with 8-field form + AnimatePresence success swap (SECT-11)** — `2efd9da` (feat)

## Files Created/Modified

- `components/CTAFinal.tsx` — SECT-11 CTA Final section: lead capture form inside white card on cyan-pale background, with AnimatePresence-mediated form-to-success swap on submit

## Form Structure Details

### 2-Column Grid (top section of form)
| Field | Input Type | Grid Position |
|-------|-----------|---------------|
| Nome | `<input type="text">` | Col 1, Row 1 |
| E-mail corporativo | `<input type="email">` | Col 2, Row 1 |
| Telefone | `<input type="tel">` | Col 1, Row 2 |
| Empresa | `<input type="text">` | Col 2, Row 2 |
| Cargo | `<input type="text">` | Col 1, Row 3 |
| Quantos vendedores em campo? | `<select>` | Col 2, Row 3 |

### Full-Width Rows (below grid)
| Field | Input Type |
|-------|-----------|
| Segmento | `<select>` |
| Desafio atual | `<textarea rows={4}>` |

### AnimatePresence Config
- `mode="wait"` — form fully exits before success enters (no overlap)
- `initial={false}` — no opening fade animation on page mount
- Form exit: `opacity: 0`, duration 200ms
- Success enter: `opacity: 0, y: 8` → `opacity: 1, y: 0`, duration 300ms
- Both use `ease: [0.16, 1, 0.3, 1]` (expo-out matching project animation standard)

## Decisions Made

- No backend integration per D-16 — CRM/email integration deferred to v2. Comment in code documents the deferral.
- Selects use uncontrolled pattern (`defaultValue=""`) with a disabled placeholder `<option value="">Selecione...</option>` so native HTML required validation works without controlled state.
- `inputClass` extracted as a `const` (not a Tailwind utility or component) to keep the component self-contained with a single source of truth for input styling.

## Deviations from Plan

None — plan executed exactly as written.

## Threat Surface Scan

No new network endpoints, auth paths, file access, or schema changes introduced. Form values never leave the browser (no fetch/axios/XHR). The `dangerouslySetInnerHTML` anti-pattern is absent (verified by grep returning 0). Threat register items T-03-13 through T-03-16 are fully mitigated as specified.

## Known Stubs

None — form inputs and success copy are fully wired from `CTA_FINAL` constant. No hardcoded placeholders or TODO labels remain. The absence of a real backend submit is intentional per D-16 and documented in both the plan and code comments; it does not prevent the plan's goal (demonstrating the lead capture UX).

## Issues Encountered

None.

## Next Phase Readiness

- `CTAFinal` is ready for import and placement in `app/page.tsx` (Plan 03-07)
- Section anchor `id="contato"` is live — Navbar and Hero CTA links will scroll to this section once the page is wired
- No blockers

---
*Phase: 03-full-lp-animations*
*Completed: 2026-05-07*
