---
phase: "02-hero-experience"
plan: "02"
subsystem: "sections"
tags: ["hero", "diagnostico", "tese", "sections", "page-composition"]
dependency_graph:
  requires: ["02-01", "02-03"]
  provides: ["components/Hero.tsx", "components/Diagnostico.tsx", "components/Tese.tsx", "app/page.tsx"]
  affects: ["app/page.tsx"]
tech_stack:
  added: []
  patterns: ["Server Component", "2-column grid", "overflow-x-auto pan", "lucide icon map"]
key_files:
  created:
    - components/Hero.tsx
    - components/Diagnostico.tsx
    - components/Tese.tsx
  modified:
    - app/page.tsx
decisions:
  - "Used overflow-x-auto wrapper for PainelDashboard on mobile (not transform: scale) — preserves text legibility per UI-SPEC preferred approach"
  - "lg: breakpoint (1024px) used for all responsive transitions per grid contract in UI-SPEC S2"
  - "Hero subheadline uses text-pruma-gray-text tone (accepted alternative per plan notes)"
metrics:
  duration: "2m 16s"
  completed_date: "2026-05-07"
  tasks_completed: 3
  files_created: 3
  files_modified: 1
---

# Phase 02 Plan 02: Section Components (Hero, Diagnóstico, Tese) Summary

**One-liner:** Three above-fold editorial sections composing Hero (2-column with PainelDashboard), Diagnóstico (3 pain-point cards on cyan-pale), and Tese (centered editorial) into app/page.tsx.

## What Was Built

### Task 1 — Hero.tsx (SECT-02) — commit d0fbc21

`components/Hero.tsx` — 58 lines, Server Component.

- Two-column layout: `lg:grid-cols-12` with text `col-span-7` and mockup `col-span-5`
- Single column with vertical stack on mobile (eyebrow → H1 → subheadline → CTAs → microcopy → mockup)
- H1 Fraunces `text-[40px] lg:text-[72px]` with explicit `<br />` between two headline lines
- Primary (`#contato`) + ghost (`#funcionalidades`) CTAs side-by-side on `sm:flex-row`
- JetBrains Mono microcopy with `tracking-eyebrow uppercase` below CTAs
- Complete `PainelDashboard` embedded in `overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0` wrapper for horizontal pan on narrow viewports (never hidden — per D-06)
- All copy from `HERO`, `CTA_PRIMARY`, `CTA_SECONDARY` constants — zero hardcoded visible strings

### Task 2 — Diagnostico.tsx (SECT-03) — commit 44f60f3

`components/Diagnostico.tsx` — 62 lines, Server Component.

- `bg-pruma-cyan-pale` section background (locked SECT-03)
- H2 Fraunces `lg:text-[52px]`, eyebrow, subheadline
- 3-card grid: `grid-cols-1 lg:grid-cols-3` with `gap-4 lg:gap-8`
- Typed `iconMap` lookup: `EyeOff` → navy, `GitBranch` → navy, `FileSpreadsheet` → cyan (exactly one cyan icon per D-12)
- `Card as="li"` with `interactive={false}` — informational, not clickable
- `strokeWidth={1.5}` on all lucide icons per CLAUDE.md
- H3 Fraunces for card titles, Inter for card bodies in `pruma-gray-text`
- All copy from `DIAGNOSTICO.cards`, `DIAGNOSTICO.headline`, etc.

### Task 3 — Tese.tsx + app/page.tsx (SECT-04) — commit eed8ce0

`components/Tese.tsx` — 30 lines, Server Component.

- `bg-pruma-white` centered editorial layout
- Eyebrow wrapped in `flex justify-center` (Eyebrow is `inline-flex`)
- H2 Fraunces `lg:text-[56px]` with locked headline: "Força de vendas não é um app."
- Single body paragraph: Inter `text-[17px] lg:text-[19px]` in `text-pruma-navy` at `max-w-[720px] mx-auto`
- No second paragraph, no cards, no icons (per UI-SPEC forbiddens)

`app/page.tsx` — 13 lines.

- Composes `<Hero />` + `<Diagnostico />` + `<Tese />` in order
- Placeholder `Pruma LP` paragraph removed
- `<main>` with `min-h-screen bg-pruma-white`

## PainelDashboard Integration

PainelDashboard is rendered complete (not a stub) inside Hero's right column:

- Desktop: fills `col-span-5` (~480px on 1152px container)
- Mobile: stacks below CTAs, wrapped in `overflow-x-auto` — user can pan dashboard horizontally to see full 760px width without viewport overflow
- No `transform: scale()` applied — text legibility preserved at native size

Confirmation: `PainelDashboard` imported directly from `@/components/mockups/PainelDashboard` and appears unconditionally in Hero markup.

## Phase 2 Requirements End-to-End

All 6 phase requirements are now visible end-to-end at `/`:

| Req | Plan | Status |
|-----|------|--------|
| SECT-01 Navbar | 02-01 | Done |
| SECT-02 Hero | 02-02 (this plan) | Done |
| SECT-03 Diagnóstico | 02-02 (this plan) | Done |
| SECT-04 Tese | 02-02 (this plan) | Done |
| MOCK-01 AppVendedor | 02-03 | Done |
| MOCK-02 PainelDashboard | 02-03 | Done |

## Responsive Breakpoints

All sections use `lg:` (1024px) as the single responsive threshold for layout changes:
- Below 1024px: single column layouts, reduced type sizes
- At 1024px+: 2-column Hero grid, 3-column Diagnostico grid, desktop type sizes

This is consistent with the UI-SPEC S2 contract which defines `≥1024px` as the desktop breakpoint for Hero grid.

## Deviations from Plan

None — plan executed exactly as written.

- Mobile Hero mockup: chose `overflow-x-auto` wrapper (plan's preferred approach) over `transform: scale(0.85)`
- Hero subheadline: uses `text-pruma-gray-text` (accepted alternative mentioned in plan notes)
- All three components are Server Components (no `"use client"`) as specified
- `lg:` breakpoint used consistently as per UI-SPEC S2 grid contract

## Known Stubs

None. All components consume real data from `lib/constants.ts`. PainelDashboard renders complete with full data.

## Threat Surface Scan

No new threat surface introduced. All components are server-rendered static HTML with:
- Hardcoded section ids matching NAV_LINKS hrefs (no dynamic derivation — T-02-10 mitigated)
- No user input handling
- No external data fetching
- lucide-react imported via static import (not CDN — T-02-12 mitigated)

## Build Verification

- `npx tsc --noEmit`: 0 errors
- `npx next build`: 0 errors, 0 warnings, 1 static route

## Self-Check: PASSED

Files exist:
- components/Hero.tsx: FOUND
- components/Diagnostico.tsx: FOUND
- components/Tese.tsx: FOUND
- app/page.tsx: FOUND (modified)

Commits exist:
- d0fbc21 (Task 1 — Hero.tsx)
- 44f60f3 (Task 2 — Diagnostico.tsx)
- eed8ce0 (Task 3 — Tese.tsx + page.tsx)
