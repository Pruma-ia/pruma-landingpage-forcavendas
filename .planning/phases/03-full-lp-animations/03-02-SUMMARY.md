---
phase: "03-full-lp-animations"
plan: "02"
subsystem: "section-components"
tags: ["components", "como-funciona", "para-quem", "server-component", "phase3", "wave2"]
dependency_graph:
  requires:
    - "lib/constants.ts#COMO_FUNCIONA (03-01)"
    - "lib/constants.ts#PARA_QUEM (03-01)"
    - "components/mockups/AppVendedor (phase-2)"
    - "components/ui/Card (phase-1)"
    - "components/ui/Eyebrow (phase-1)"
    - "components/ui/Container (phase-1)"
  provides:
    - "components/ComoFunciona.tsx — SECT-05 section component"
    - "components/ParaQuem.tsx — SECT-08 section component"
  affects:
    - "app/page.tsx (Wave 4 — Plan 03-07 imports both)"
tech_stack:
  added: []
  patterns:
    - "Server Component section shell — no 'use client'"
    - "iconMap pattern — typed Record<string, LucideIcon> for static icon resolution"
    - "Diagnostico analog — section shell + Container + Eyebrow + Card grid"
    - "Hero analog — 2-column lg:grid-cols-12 with mockup in right column"
    - "UI-SPEC full card anatomy — icon badge + label + title + anchor + divider + description"
key_files:
  created:
    - "components/ComoFunciona.tsx"
    - "components/ParaQuem.tsx"
  modified: []
decisions:
  - "Icon map for ComoFunciona uses actual constants.ts icons (MapPin/ShoppingCart/ShieldCheck/BarChart3) not plan's initial suggestions (ClipboardList/CheckCircle) — UI-SPEC is authoritative"
  - "ParaQuem card implements full UI-SPEC anatomy (icon badge, label, title, anchor, divider, description) not the plan's simplified (segment, title, description) — UI-SPEC takes precedence"
  - "ParaQuem imports Factory/Truck/ArrowUpRight from lucide-react per iconName values in PARA_QUEM constant"
  - "Both components remain pure Server Components (no 'use client') — animation wrapper (ANIM-01) added retroactively by Plan 03-07"
metrics:
  duration: "~18 minutes"
  completed: "2026-05-07"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 3 Plan 02: ComoFunciona + ParaQuem Summary

**One-liner:** Two pure Server Component sections (SECT-05 and SECT-08) implementing Como Funciona 4-step numbered list with AppVendedor mockup, and Para Quem 3-profile interactive card grid with full UI-SPEC anatomy (icon badge, anchor, divider).

---

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create components/ComoFunciona.tsx (SECT-05) | `b51cfde` | components/ComoFunciona.tsx |
| 2 | Create components/ParaQuem.tsx (SECT-08) | `8926434` | components/ParaQuem.tsx |

---

## What Was Built

### ComoFunciona.tsx (SECT-05)

Section shell: `bg-pruma-off-white`, `id="como-funciona"`, `aria-labelledby="como-funciona-heading"`.

Layout: `grid grid-cols-1 lg:grid-cols-12`. Left column (7 cols): Eyebrow → H2 → subheadline → ordered list of 4 steps. Right column (5 cols): `<AppVendedor />`.

Each list item: step number (JetBrains Mono 12px cyan, zero-padded) + lucide icon (20px 1.5px stroke navy) + title (Fraunces) + description (Inter).

iconMap resolves `"MapPin" | "ShoppingCart" | "ShieldCheck" | "BarChart3"` from COMO_FUNCIONA.steps[n].icon — matches actual constant values.

### ParaQuem.tsx (SECT-08)

Section shell: `bg-pruma-white`, `id="para-quem"`, `aria-labelledby="para-quem-heading"`.

Layout: `grid grid-cols-1 lg:grid-cols-3`. Three `<Card as="li" interactive>` components.

Full UI-SPEC card anatomy per profile:
1. Icon badge: `rounded-pruma-sm bg-pruma-cyan-pale p-2` container with 24px lucide icon
2. Profile label: JetBrains Mono 12px UPPERCASE navy-deep
3. Title: Fraunces 24px semibold navy
4. Anchor: Inter 12px weight-medium navy-deep (revenue + team size)
5. Divider: `border-t border-pruma-gray-soft`
6. Description: Inter 16px gray-text

iconMap resolves `"Factory" | "Truck" | "ArrowUpRight"` from PARA_QUEM.profiles[n].iconName.

---

## Verification Results

```
grep -c '"use client"' components/ComoFunciona.tsx  → 0  (Server Component: PASS)
grep -c '"use client"' components/ParaQuem.tsx       → 0  (Server Component: PASS)
grep -c 'bg-pruma-off-white' components/ComoFunciona.tsx → 1  (PASS)
grep -c 'bg-pruma-white' components/ParaQuem.tsx     → 1  (PASS)
grep -c 'id="como-funciona"' components/ComoFunciona.tsx → 1  (PASS)
grep -c 'id="para-quem"' components/ParaQuem.tsx     → 1  (PASS)
grep -c 'import { AppVendedor }' components/ComoFunciona.tsx → 1  (PASS)
grep -c 'import { COMO_FUNCIONA }' components/ComoFunciona.tsx → 1  (PASS)
grep -c 'import { Card }' components/ParaQuem.tsx    → 1  (PASS)
grep -c 'import { PARA_QUEM }' components/ParaQuem.tsx → 1  (PASS)
grep -c 'PARA_QUEM.profiles.map' components/ParaQuem.tsx → 1  (PASS)
grep -c 'lg:grid-cols-3' components/ParaQuem.tsx     → 1  (PASS)
grep -c 'dangerouslySetInnerHTML' (both files)       → 0  (T-03-03: PASS)
npm run build                                        → exit 0, "Compiled successfully" (PASS)
```

---

## Deviations from Plan

### Deviation 1 — Icon map updated to match actual COMO_FUNCIONA constant values

**Rule:** Rule 1 (auto-fix — would cause TypeScript error / runtime mismatch)

**Found during:** Task 1

**Issue:** Plan's `<action>` block specified the iconMap as `MapPin | ClipboardList | BarChart2 | CheckCircle`. The `COMO_FUNCIONA.steps` in `lib/constants.ts` (set in Plan 03-01 per UI-SPEC) use `"MapPin" | "ShoppingCart" | "ShieldCheck" | "BarChart3"`. Using the plan's icons would produce TypeScript type errors and wrong visual icons.

**Fix:** iconMap uses `MapPin, ShoppingCart, ShieldCheck, BarChart3` to match the actual constant values. UI-SPEC is the authoritative source — it specified `ShoppingCart` for step 2 (not `ClipboardList`) and `BarChart3` for step 4 (not `CheckCircle`).

**Files modified:** components/ComoFunciona.tsx

**Commit:** b51cfde

---

### Deviation 2 — ParaQuem card implements full UI-SPEC anatomy (not plan's simplified shape)

**Rule:** Rule 2 (auto-add missing critical functionality — plan's simplified shape would omit icon badges and anchor data required by UI-SPEC)

**Found during:** Task 2

**Issue:** The plan's `<action>` block and interface described only `segment, title, description`. The `PARA_QUEM.profiles` constant (set in Plan 03-01 per UI-SPEC) includes `iconName` and `anchor` fields. The UI-SPEC (SECT-08 spec) mandates: icon badge + label + title + anchor + divider + description. Omitting anchor/icon would produce visually incomplete cards and waste data already in constants.

**Fix:** ParaQuem.tsx implements the complete UI-SPEC card anatomy. Added iconMap for `"Factory" | "Truck" | "ArrowUpRight"`. Anchor line rendered as Inter 12px weight-medium navy-deep.

**Files modified:** components/ParaQuem.tsx

**Commit:** 8926434

---

## Known Stubs

None — both components render all content from constants without placeholders. No TODO comments in JSX.

---

## Threat Flags

None. Both components are static Server Components. All content interpolated from typed `as const` constants — no `dangerouslySetInnerHTML`, no user input, no new network endpoints or trust boundaries.

T-03-03 mitigation verified: `grep -c "dangerouslySetInnerHTML" components/ComoFunciona.tsx components/ParaQuem.tsx` = 0.

---

## Self-Check: PASSED

- [x] components/ComoFunciona.tsx exists (71 lines)
- [x] components/ParaQuem.tsx exists (77 lines)
- [x] Commit b51cfde exists in git log
- [x] Commit 8926434 exists in git log
- [x] `npm run build` exits 0 — TypeScript types narrow correctly
- [x] Both are Server Components (no "use client")
- [x] Background colors correct: ComoFunciona = off-white, ParaQuem = white
- [x] Section ids match NAV_LINKS exactly
- [x] No dangerouslySetInnerHTML in either file
- [x] No hardcoded copy in JSX — all strings via constants imports
