---
phase: "03-full-lp-animations"
plan: "07"
subsystem: "animation-layer"
tags: ["animations", "scroll-reveal", "framer-motion", "composition", "anim-01", "anim-03"]
dependency_graph:
  requires:
    - "03-02 — ComoFunciona, ParaQuem components"
    - "03-03 — PainelGestor, Diferencial components"
    - "03-04 — Funcionalidades, Footer components"
    - "03-05 — ProvaSocial component"
    - "03-06 — CTAFinal component"
  provides:
    - "hooks/useFadeUpVariants.ts — shared Framer Motion container+item variants"
    - "components/SectionReveal.tsx — client wrapper applying whileInView"
    - "app/page.tsx — composed LP with all 11 sections in order"
  affects:
    - "components/Hero.tsx"
    - "components/Diagnostico.tsx"
    - "components/Tese.tsx"
    - "components/ComoFunciona.tsx"
    - "components/PainelGestor.tsx"
    - "components/Funcionalidades.tsx"
    - "components/ParaQuem.tsx"
    - "components/Diferencial.tsx"
tech_stack:
  added: []
  patterns:
    - "useFadeUpVariants hook — typed Framer Motion variants honoring useReducedMotion"
    - "SectionReveal compound wrapper — whileInView + once:true + margin:-60px"
    - "motion.li around Card as='div' — semantic ul/li preserved without nesting"
key_files:
  created:
    - "hooks/useFadeUpVariants.ts"
    - "components/SectionReveal.tsx"
  modified:
    - "app/page.tsx"
    - "components/Hero.tsx"
    - "components/Diagnostico.tsx"
    - "components/Tese.tsx"
    - "components/ComoFunciona.tsx"
    - "components/PainelGestor.tsx"
    - "components/Funcionalidades.tsx"
    - "components/ParaQuem.tsx"
    - "components/Diferencial.tsx"
decisions:
  - "grep -cF 'variants={item}' counts are lower than plan acceptance criteria because .map() produces 1 static occurrence per list but renders N animated elements at runtime — this is correct Framer Motion pattern per plan reference example"
  - "ANIM-03 hover states verified present in Card.tsx and Button.tsx — no primitive changes required"
  - "Worktree merged main before task execution to bring Wave 2+3 component files into scope (plans 03-02 through 03-06 were in parallel worktrees, already merged to main)"
metrics:
  duration: "~4 minutes"
  completed: "2026-05-07"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 10
---

# Phase 3 Plan 07: Animation Layer + LP Composition Summary

**One-liner:** Scroll-triggered fade-up (ANIM-01) applied retroactively to all 8 server-component sections via `useFadeUpVariants` hook + `SectionReveal` wrapper; full LP composed in `app/page.tsx` with all 11 sections in locked order; ANIM-03 hover states confirmed active in Phase 1 primitives.

---

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create animation primitives | `ef6190b` | hooks/useFadeUpVariants.ts, components/SectionReveal.tsx |
| 2 | Apply SectionReveal + item variants to 8 sections | `06f5ffe` | Hero, Diagnostico, Tese, ComoFunciona, PainelGestor, Funcionalidades, ParaQuem, Diferencial |
| 3 | Compose final LP in app/page.tsx + verify ANIM-03 | `dc6bd87` | app/page.tsx |

---

## (a) Animation Primitives Created

### hooks/useFadeUpVariants.ts

- `"use client"` directive — hook uses `useReducedMotion`
- Interface `FadeUpVariants { container: Variants; item: Variants; }`
- Default stagger: 80ms (0.08s) per D-06
- Item variant: `{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }`
- Reduced-motion: `y` collapses to 0, `staggerChildren` collapses to 0 — content renders in final state instantly

### components/SectionReveal.tsx

- `"use client"` directive
- Props: `children`, `stagger = 0.08`, `className`
- Renders `<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>`
- Observer disposes after first fire (`once: true`) per T-03-17 threat mitigation

---

## (b) All 8 Sections Retroactively Wrapped

All files converted: `"use client"` added, `motion` + `SectionReveal` + `useFadeUpVariants` imported.

| Section | motion.* animated elements | Notes |
|---------|---------------------------|-------|
| Hero | eyebrow div, h1, p subheadline, div CTA row, p microcopy, div mockup col | 2 separate SectionReveal columns |
| Diagnostico | eyebrow div, h2, p subheadline, motion.li per card (3) | Card as="div" inside motion.li |
| Tese | motion.div eyebrow, h2, p body | 3 items — centered layout preserved |
| ComoFunciona | eyebrow div, h2, p subheadline, motion.li per step (4), div mockup | Card-free — steps in ol |
| PainelGestor | motion.div heading group, motion.div per left callout (2), motion.div mockup, motion.div per right callout (2) | 1 SectionReveal wrapping full 3-col grid |
| Funcionalidades | eyebrow div, h2, p subheadline, motion.li hero card, motion.li per small card (5) | Card as="div" inside motion.li |
| ParaQuem | eyebrow div, h2, p subheadline, motion.li per profile (3) | Card as="div" inside motion.li |
| Diferencial | motion.div heading group, motion.div per pillar (3) | Dark section — white text, tone="dark" eyebrow unchanged |

---

## (c) ANIM-03 Hover States — No Changes Required

Verification confirmed all 4 hover classes active in Phase 1 primitives:

```
grep -cF 'hover:-translate-y-0.5' components/ui/Card.tsx     → 1 ✓
grep -cF 'hover:border-pruma-cyan-light' components/ui/Card.tsx → 1 ✓
grep -cF 'hover:-translate-y-1' components/ui/Button.tsx     → 2 ✓ (primary + ghost)
grep -cF 'hover:shadow-pruma-cyan' components/ui/Button.tsx  → 1 ✓
```

No changes to Card.tsx or Button.tsx. ANIM-03 satisfied by Phase 1 implementation.

---

## (d) Final app/page.tsx Composition + Build Status

```
app/page.tsx — 11 sections in locked order:
1. Hero          (bg-pruma-white)
2. Diagnostico   (bg-pruma-cyan-pale)
3. Tese          (bg-pruma-white)
4. ComoFunciona  (bg-pruma-off-white)
5. PainelGestor  (bg-pruma-white)
6. Funcionalidades (bg-pruma-cyan-pale)
7. ParaQuem      (bg-pruma-white)
8. Diferencial   (bg-pruma-navy — ÚNICO dark)
9. ProvaSocial   (bg-pruma-white)
10. CTAFinal     (bg-pruma-cyan-pale)
11. Footer       (bg-pruma-navy)
```

Build result:
```
✓ Compiled successfully
✓ Type-checked
Route (app) /  →  10.8 kB  (First Load JS: 159 kB)
○ (Static) prerendered as static content
Exit code: 0
```

---

## Deviations from Plan

### Deviation 1 — Merge main before execution (Rule 3 — Blocking Issue)

**Found during:** Pre-execution setup

**Issue:** The worktree branch was based on commit `887e79a` (after plan 01). Plans 02-06 ran in parallel worktrees and were merged to main (`d57639c`). The worktree lacked all 8 Phase 3 section components (ComoFunciona, PainelGestor, Funcionalidades, ParaQuem, Diferencial, ProvaSocial, CTAFinal, Footer).

**Fix:** `git merge main --no-edit` — fast-forward brought in all 14 files from plans 02-06.

**Files modified:** 14 files from main (components + summaries)

**Commit:** fast-forward merge (no separate commit)

---

### Deviation 2 — Plan acceptance criteria `grep -cF 'variants={item}'` counts exceed what .map() produces (Rule 1 — Bug in test criteria)

**Found during:** Task 2 verification

**Issue:** Plan acceptance criteria expects `>= 6` for Diagnostico, `>= 9` for Funcionalidades etc., counting each list item as a separate static occurrence of `variants={item}`. However, the plan's own reference code uses `.map()`, which produces exactly 1 static occurrence of `variants={item}` per list — yet renders N animated elements at runtime (each card/step gets the item variant applied individually by Framer Motion's staggerChildren).

**Example:** Diagnostico has 3 heading items (3 grep hits) + 1 `<motion.li ... variants={item}>` inside `.map()` (1 grep hit) = 4 total. The plan expected 6 (counting 3 cards individually), but the reference code itself shows `.map()` pattern.

**Fix:** Implemented per the plan's own reference example (`.map()` with `motion.li`). The animation behavior is correct — Framer Motion staggers all 3 cards individually at runtime. The grep criterion is inconsistent with the reference code pattern.

**Files modified:** None — implementation is correct per reference.

---

## Threat Flags

None. This plan applies purely client-side animation wrappers. No new network endpoints, auth paths, file access, or schema changes. T-03-17 (IntersectionObserver overhead) mitigated via `once: true` on all SectionReveal instances.

---

## Self-Check: PASSED

- [x] `hooks/useFadeUpVariants.ts` exists
- [x] `components/SectionReveal.tsx` exists
- [x] `app/page.tsx` has all 11 sections in locked order
- [x] All 8 section components start with `"use client"`
- [x] Commits `ef6190b`, `06f5ffe`, `dc6bd87` exist in git log
- [x] `npm run build` exits 0 — Compiled successfully, zero TypeScript errors
- [x] ANIM-03: Card hover + Button hover classes confirmed in Phase 1 primitives
- [x] No unexpected file deletions
