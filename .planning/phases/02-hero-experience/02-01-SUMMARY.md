---
phase: "02-hero-experience"
plan: "01"
subsystem: "constants + navbar"
tags: ["constants", "navbar", "navigation", "framer-motion", "accessibility"]
dependency_graph:
  requires:
    - "01-02: Button, Container, Eyebrow UI primitives"
    - "01-01: tailwind.config.ts (pruma.* tokens), globals.css, next/font wiring"
  provides:
    - "lib/constants.ts: BRAND_NAME, NAV_LINKS, HERO, DIAGNOSTICO, TESE, MOCK_APP, MOCK_PAINEL"
    - "components/Navbar.tsx: sticky Navbar with scroll-blur, anchor links, mobile drawer"
    - "app/layout.tsx: skip link + Navbar mounted outside main"
  affects:
    - "02-02: Hero and Diagnóstico consume HERO, DIAGNOSTICO, MOCK_PAINEL from constants"
    - "02-03: Tese and AppVendedor consume TESE, MOCK_APP from constants"
tech_stack:
  added:
    - "Framer Motion AnimatePresence/motion/useReducedMotion (drawer enter/exit)"
  patterns:
    - "as const literal type assertions for all section copy and mockup data"
    - "sticky top-0 z-40 positioning (not fixed) — preserves document flow for Hero"
    - "passive scroll listener pattern for Navbar scroll observer"
    - "focus trap via autoFocus on close button + Escape key handler"
key_files:
  created:
    - "components/Navbar.tsx (154 lines)"
  modified:
    - "lib/constants.ts (191 lines, +162 lines appended)"
    - "app/layout.tsx (67 lines, +11 lines)"
decisions:
  - "sticky top-0 z-40 used for Navbar (not fixed) — preserves document flow so Hero needs no padding-top compensation"
  - "Drawer uses fixed inset-0 z-50 (above Navbar) — correct z-index layering"
  - "autoFocus on close button provides focus trap entry point for accessible drawer"
  - "useReducedMotion collapses drawer animation to 0.01s — respects prefers-reduced-motion"
metrics:
  duration: "~3 minutes"
  completed: "2026-05-07"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 2
---

# Phase 2 Plan 01: Constants + Navbar Summary

**One-liner:** Centralized all Phase 2 LP copy as `as const` typed exports in `lib/constants.ts`, and shipped a sticky Navbar with scroll-activated blur/shadow, 4 anchor links, always-visible CTA, and a Framer Motion mobile drawer with full ARIA compliance and reduced-motion support.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Append Phase 2 normative constants to lib/constants.ts | ce36940 | lib/constants.ts |
| 2 | Build sticky Navbar with scroll-blur and mobile drawer | 422eb63 | components/Navbar.tsx |
| 3 | Mount Navbar in app/layout.tsx | 0914812 | app/layout.tsx |

## lib/constants.ts — Final Structure

Constants added in this plan (appended after existing CTA block):

| Export | Description |
|--------|-------------|
| `BRAND_NAME` | Wordmark `"PRUMA"` |
| `NAV_LINKS` | 4 anchor links: Como funciona, Funcionalidades, Para quem, Contato |
| `HERO` | Eyebrow, headlineLine1, headlineLine2, subheadline, microcopy |
| `DIAGNOSTICO` | Eyebrow, headline, subheadline, 3 cards (title, body, icon, tone) |
| `TESE` | Eyebrow, headline (locked), body paragraph |
| `MOCK_APP` | Client, meta, status, cta, 8 product items, adjustment, totals |
| `MOCK_PAINEL` | Brand, 3 filters, 4 KPIs, ABC bars (12), map points (8), risk rows (3) |

Existing exports (`SITE_TITLE`, `SITE_DESCRIPTION`, `CTA_PRIMARY`, `CTA_SECONDARY`, `CTA_FORM`, `FORM_EMPTY_STATE`, `FORM_SUCCESS`) preserved verbatim.

## Navbar Implementation Notes

- Positioning: `sticky top-0 z-40` on `<header>` — drawer uses `fixed inset-0 z-50`.
- Scroll threshold: `window.scrollY > 8` flips `scrolled` boolean.
- Scrolled state classes: `bg-white/72 backdrop-blur-md shadow-pruma-md border-b border-pruma-gray-soft`.
- Resting state: `bg-transparent border-b border-transparent`.
- Transition: `transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200 ease-out`.
- Icons: `Menu` and `X` from lucide-react with `strokeWidth={1.5}` per CLAUDE.md.
- Framer Motion: `framer-motion` version ^11 confirmed in package.json (Phase 1 dep).
- `lucide-react` version ^0.511.0 confirmed in package.json (Phase 1 dep).

## app/layout.tsx Changes

- Skip link `<a href="#topo">Pular para conteúdo</a>` added as first child of `<body>` — sr-only by default, visible on `:focus`.
- `<Navbar />` rendered before `{children}` — outside any `<main>` tag (Plan 02-02 adds `<main>`).
- No padding-top added to body or children — sticky Navbar stays in document flow.
- All font variables and metadata preserved unchanged.

## Deviations from Plan

None — plan executed exactly as written. All class names, copy, and structural decisions followed the normative spec in the plan and UI-SPEC.

## Threat Surface Scan

No new threat surface introduced beyond what is described in the plan's `<threat_model>`. All NAV_LINKS hrefs are anchor-only (`#...`) declared as `as const` — no user input populates hrefs. Scroll listener registered with `{ passive: true }`. Body scroll lock is reverted on unmount.

## Known Stubs

None in this plan. lib/constants.ts exports all Phase 2 copy as normative values. Components Navbar.tsx, layout.tsx contain no placeholder text or stub data.

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| `lib/constants.ts` exists | FOUND |
| `components/Navbar.tsx` exists | FOUND |
| `app/layout.tsx` exists | FOUND |
| `02-01-SUMMARY.md` exists | FOUND |
| commit ce36940 (constants) | FOUND |
| commit 422eb63 (Navbar) | FOUND |
| commit 0914812 (layout) | FOUND |
