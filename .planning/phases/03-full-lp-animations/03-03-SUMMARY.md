---
phase: 03-full-lp-animations
plan: "03"
subsystem: ui
tags: [next.js, tailwind, typescript, server-component, painel-gestor, diferencial]

# Dependency graph
requires:
  - phase: 03-full-lp-animations/03-01
    provides: PAINEL_GESTOR and DIFERENCIAL constants in lib/constants.ts
  - phase: 02-sections
    provides: PainelDashboard mockup component (centered in SECT-06)

provides:
  - SECT-06 PainelGestor section component with 3-column grid and 4 callouts
  - SECT-09 Diferencial section component — only dark (bg-pruma-navy) non-Footer section

affects:
  - 03-07-PLAN (wire-in to app/page.tsx)
  - any plan verifying dark-section invariant (only Diferencial + Footer use bg-pruma-navy)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 3-column asymmetric grid (1fr 2fr 1fr) for mockup-with-flanking-callouts layout
    - Dark section pattern with tone="dark" Eyebrow and text-white/70 body copy
    - Mobile-first mockup ordering via CSS order utilities (order-1 on desktop = order-2 on mobile)

key-files:
  created:
    - components/PainelGestor.tsx
    - components/Diferencial.tsx
  modified: []

key-decisions:
  - "PainelGestor uses lg:grid-cols-[1fr_2fr_1fr] with CSS order to flip mockup-first on mobile"
  - "Diferencial is the only section outside Footer to use bg-pruma-navy — enforced as invariant"
  - "Callout numbers rendered from PAINEL_GESTOR.callouts[].number — no hardcoded 01/02/03/04"
  - "Pillar body copy uses text-white/70 (70% opacity) for visual hierarchy on dark background"
  - "Both components are pure Server Components — no use client, no dangerouslySetInnerHTML"

patterns-established:
  - "Dark section: bg-pruma-navy + Eyebrow tone=dark + text-white headline + text-white/70 body"
  - "Callout pattern: font-serif number large + font-sans small text, no connecting SVG lines"

requirements-completed: [SECT-06, SECT-09]

# Metrics
duration: 8min
completed: 2026-05-07
---

# Phase 3 Plan 03: PainelGestor + Diferencial Sections Summary

**SECT-06 3-column mockup-callout grid and SECT-09 dark navy pillar section — both as pure Server Components consuming typed constants**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-07T00:00:00Z
- **Completed:** 2026-05-07T00:08:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- SECT-06 PainelGestor: desktop 3-column asymmetric grid places PainelDashboard mockup at center (2fr), flanked by 2 callouts left and 2 right (1fr each); on mobile, mockup renders first via CSS `order` utilities, then callouts stack below
- SECT-09 Diferencial: only non-Footer section with `bg-pruma-navy`; uses `Eyebrow tone="dark"` for cyan label, white headline, 3 horizontal pillars with `text-white/70` body copy — no gradients, no emojis
- Both sections are pure Server Components with all visible strings sourced from `lib/constants.ts`

## Task Commits

Each task was committed atomically:

1. **Task 1: Create components/PainelGestor.tsx (SECT-06)** - `72c06e1` (feat)
2. **Task 2: Create components/Diferencial.tsx (SECT-09)** - `6cfdf6b` (feat)

## Files Created/Modified

- `components/PainelGestor.tsx` — SECT-06: Decisor section with centered PainelDashboard mockup and 4 numbered callouts from PAINEL_GESTOR constant
- `components/Diferencial.tsx` — SECT-09: Dark tonal break with bg-pruma-navy, 3 horizontal method/tech/implantação pillars from DIFERENCIAL constant

## Decisions Made

- CSS `order` utilities (`order-1 lg:order-2` on mockup div) invert the DOM order visually on mobile without reordering markup — mockup renders first in mobile viewport
- No connecting SVG lines between callouts and mockup (too complex per CONTEXT.md specifics); spatial proximity alone communicates the relationship
- `text-white/70` for pillar descriptions provides readable hierarchy on dark background without introducing a new color token
- `lg:text-right` + `lg:ml-auto` on left callouts creates visual alignment toward the center mockup on desktop

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Both components ready for import and wire-in into `app/page.tsx` in Plan 03-07
- Dark-section invariant verified: only `components/Diferencial.tsx` (and future Footer) uses `bg-pruma-navy` in `components/*.tsx`
- `npm run build` passes with both components present

## Known Stubs

None — both sections render complete content from typed `as const` constants. No placeholder text or empty data flows.

## Threat Flags

No new security-relevant surface introduced. Both components are static Server Components with no user input, no network requests, and no `dangerouslySetInnerHTML`. All copy is sourced from `as const` typed constants (T-03-05 mitigated as planned).

## Self-Check: PASSED

- `components/PainelGestor.tsx` — EXISTS
- `components/Diferencial.tsx` — EXISTS
- Commit `72c06e1` — EXISTS (feat(03-03): implement SECT-06 PainelGestor section component)
- Commit `6cfdf6b` — EXISTS (feat(03-03): implement SECT-09 Diferencial dark section component)
- `npm run build` — PASSED (static page, 96.1 kB first load)

---
*Phase: 03-full-lp-animations*
*Completed: 2026-05-07*
