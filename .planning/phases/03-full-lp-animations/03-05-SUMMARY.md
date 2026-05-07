---
phase: 03-full-lp-animations
plan: 05
subsystem: ui
tags: [react, framer-motion, animation, counter, useInView, useReducedMotion, next.js, typescript]

# Dependency graph
requires:
  - phase: 03-full-lp-animations/03-01
    provides: PROVA_SOCIAL constant in lib/constants.ts with metrics, depoimento, logos data

provides:
  - components/ProvaSocial.tsx — SECT-10 section with AnimatedCounter (ANIM-02)
  - AnimatedCounter sub-component using Framer Motion animate() with 1.5s easeOut
  - useInView with once:true + margin:-60px triggering counter once on viewport entry
  - useReducedMotion() branch skipping animation for accessibility
  - 3 placeholder logo slots, 3 cyan Fraunces 64px numbers, 1 depoimento figure card

affects:
  - 03-07 (page.tsx wire-in — imports and renders ProvaSocial)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - AnimatedCounter private sub-component pattern — encapsulates single metric animation state
    - Framer Motion animate() imperative API for counter (not motion component)
    - useInView + useReducedMotion combo for accessible scroll-triggered animation
    - textContent-only DOM writes (never innerHTML) for XSS mitigation

key-files:
  created:
    - components/ProvaSocial.tsx
  modified: []

key-decisions:
  - "Used Framer Motion animate() imperative API (not useState interval or rAF) for smooth easeOut counter"
  - "AnimatedCounter is a private sub-component within same file, not exported — encapsulates ref/hook logic per metric"
  - "Reduced-motion path skips animate() entirely and writes final value directly via textContent"
  - "tabular-nums class keeps counter span width stable as digits change during animation"
  - "aria-live=polite on counter span announces final value to screen readers without spamming intermediate values"
  - "controls.stop() in useEffect cleanup prevents memory leak when component unmounts mid-animation"

patterns-established:
  - "Counter animation: useInView(ref, { once: true, margin: '-60px' }) + animate(0, value, { duration: 1.5, ease: 'easeOut' })"
  - "Reduced-motion check: if (!isInView || reducedMotion) — handles both not-yet-visible and motion-off cases"
  - "pt-BR number formatting: Math.round(v).toLocaleString('pt-BR') for thousands separator"

requirements-completed: [SECT-10, ANIM-02]

# Metrics
duration: 15min
completed: 2026-05-07
---

# Phase 3 Plan 05: ProvaSocial Summary

**SECT-10 proof block with Framer Motion animate() counter animation (1.5s easeOut, once on viewport entry, reduced-motion safe) rendering 3 placeholder logo slots, 3 cyan Fraunces 64px numbers, and 1 depoimento figure card**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-05-07T13:36:00Z
- **Completed:** 2026-05-07T13:51:14Z
- **Tasks:** 1 of 1
- **Files modified:** 1

## Accomplishments

- Created `components/ProvaSocial.tsx` — complete SECT-10 section with all spec requirements met
- Implemented `AnimatedCounter` private sub-component using Framer Motion `animate()` API (not useState interval, not rAF)
- Counter fires once via `useInView` with `once: true, margin: "-60px"` per D-07/D-09 spec
- Full reduced-motion support: `useReducedMotion()` short-circuits animation, renders final value immediately
- All 3 replaceable regions annotated with `TODO: substituir` comments (5 total in file)
- Build passes with zero warnings

## Task Commits

1. **Task 1: Create ProvaSocial.tsx with counter animation (SECT-10 + ANIM-02)** - `beb618d` (feat)

**Plan metadata:** (to be added after SUMMARY commit)

## Files Created/Modified

- `components/ProvaSocial.tsx` — SECT-10 section with AnimatedCounter sub-component and ANIM-02 counter animation

## Decisions Made

- **Counter implementation**: Used Framer Motion `animate()` imperative API per plan spec. This gives smooth frame-by-frame easing (not linear steps like setTimeout would produce) and integrates cleanly with the existing framer-motion dependency.
- **AnimatedCounter as private sub-component**: Encapsulates the per-metric `useRef`/`useInView`/`useEffect` logic. Each metric instance has its own ref so all 3 can enter viewport independently if the grid wraps on mobile.
- **Reduced-motion strategy**: `if (!isInView || reducedMotion)` combined condition — when reduced-motion is on, final value is rendered immediately on mount (before `isInView` fires); when not yet in view, shows `0` as pre-animation state.
- **pt-BR locale formatting**: `Math.round(v).toLocaleString("pt-BR")` produces proper thousands separators (e.g., "847" stays "847", future large values like "1.247" format correctly).
- **Security**: `textContent`-only DOM writes, no `innerHTML`, per T-03-10 mitigation.
- **Memory safety**: `controls.stop()` returned from `useEffect` cleanup per T-03-11 mitigation.

## Deviations from Plan

None — plan executed exactly as written.

The only minor adjustment: the `AnimatedCounter` pre-animation initial render shows `0` only when `!isInView && !reducedMotion` (correct SSR/pre-animation state). When `reducedMotion` is true, the `useEffect` fires immediately and sets the final value — this matches the spec requirement ("skips animation and renders final value immediately").

## Known Stubs

The following stubs are intentional placeholders, annotated for client to replace before launch. They do NOT prevent the plan goal (counter animation, section structure) from being achieved:

| Stub | File | Line | Reason |
|------|------|------|--------|
| 3 gray div logo placeholders | components/ProvaSocial.tsx | ~96-107 | Real client logos not yet provided |
| PROVA_SOCIAL.metrics values | lib/constants.ts | ~386-404 | Fictional plausible numbers, client must validate |
| PROVA_SOCIAL.depoimento | lib/constants.ts | ~406-411 | Fictional testimonial, client must authorize |

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. All data is static build-time constants. No new threat surface beyond what is documented in the plan's threat model (T-03-10, T-03-11, T-03-12 — all mitigated).

## Issues Encountered

None.

## Self-Check: PASSED

- `components/ProvaSocial.tsx` exists: FOUND
- Commit `beb618d` exists: FOUND
- `npm run build` exits 0: CONFIRMED
- All 21 acceptance criteria verified: PASSED
- No innerHTML in executable code: CONFIRMED (only in comment)

## Next Phase Readiness

- `ProvaSocial` component is ready for import and wire-in in `app/page.tsx` (Plan 03-07)
- Component export is `export function ProvaSocial()` — standard named export, no default
- No additional dependencies added (framer-motion already present)
- All placeholder content annotated for client replacement before launch

---
*Phase: 03-full-lp-animations*
*Completed: 2026-05-07*
