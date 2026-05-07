---
phase: "01-foundation"
plan: "01"
subsystem: "scaffold"
tags: ["next.js", "tailwind", "fonts", "design-tokens", "foundation"]
dependency_graph:
  requires: []
  provides:
    - "Next.js 14 App Router project structure"
    - "Tailwind 3.4 with pruma.* color namespace"
    - "next/font/google: Fraunces, Inter, JetBrains Mono via CSS variables"
    - "globals.css with full CSS custom property set"
    - "framer-motion, lucide-react, clsx, tailwind-merge installed"
  affects:
    - "All downstream components and sections (Plans 01-02 through 04-*)"
tech_stack:
  added:
    - "next@14.2.35 (App Router)"
    - "react@18.3.1"
    - "tailwindcss@3.4.19 (classic config, theme.extend)"
    - "framer-motion@11.18.2"
    - "lucide-react@0.511.0"
    - "clsx@2.1.1"
    - "tailwind-merge@2.6.1"
    - "typescript@5.9.3"
    - "autoprefixer@10.x"
  patterns:
    - "next/font/google with CSS variable injection"
    - "Tailwind extend-only tokens (no base override)"
    - "CSS custom properties mirroring Tailwind tokens for Framer Motion use"
key_files:
  created:
    - "package.json"
    - "package-lock.json"
    - "next.config.mjs"
    - "postcss.config.mjs"
    - "tailwind.config.ts"
    - "tsconfig.json"
    - "eslint.config.mjs"
    - "app/layout.tsx"
    - "app/globals.css"
    - "app/page.tsx"
    - "app/favicon.ico"
    - "public/"
  modified: []
decisions:
  - "next.config.ts → next.config.mjs: Next.js 14 does not support .ts config files; used .mjs instead"
  - "Tailwind 3.4 over Tailwind 4: plan requires tailwind.config.ts with theme.extend — Tailwind 4 uses CSS-based config only, incompatible with this design system approach"
  - "Scaffold in /tmp then rsync: create-next-app refuses non-empty directories; scaffolded separately then merged"
  - "Task 1 and 2 files written together: layout.tsx and globals.css must be correct for build to succeed — staged and committed in task order"
  - "@eslint/eslintrc added: needed for ESLint 8 flat-config compat layer with eslint-config-next@14"
metrics:
  duration: "~12 minutes"
  completed: "2026-05-06"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 01 Plan 01: Next.js 14 Scaffold + Tailwind Tokens + Font Loading Summary

**One-liner:** Next.js 14 App Router with Tailwind 3.4 pruma.* design tokens, Fraunces/Inter/JetBrains Mono via next/font CSS variables, and globals.css with complete CSS custom property set.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Inicializar scaffold Next.js 14 e instalar dependências Pruma | a1b2264 | package.json, next.config.mjs, postcss.config.mjs, tsconfig.json, app/page.tsx |
| 2 | Configurar Tailwind com tokens Pruma + globals.css + font loading | d397049 | tailwind.config.ts, app/globals.css, app/layout.tsx |

## What Was Built

### Package Stack

| Package | Version | Role |
|---------|---------|------|
| next | 14.2.35 | Framework (App Router) |
| react | 18.3.1 | UI runtime |
| tailwindcss | 3.4.19 | Styling (classic config) |
| framer-motion | 11.18.2 | Animations (Phase 3) |
| lucide-react | 0.511.0 | Icons |
| clsx | 2.1.1 | Class conditionals |
| tailwind-merge | 2.6.1 | Class deduplication |
| typescript | 5.9.3 | Type safety |

### Tailwind Token Namespace (`pruma.*`)

- **Colors (11):** navy, navy-mid, navy-deep, cyan, cyan-light, cyan-pale, white, off-white, gray-soft, gray-text, red
- **Shadows (3):** pruma-sm, pruma-md, pruma-cyan
- **Border radius (3):** pruma-sm (8px), pruma-md (12px), pruma-lg (16px)
- **Letter spacing (1):** eyebrow (0.12em)
- **Spacing (3):** eyebrow-line (32px), section-y-mobile (96px), section-y-desktop (128px)
- **Easing (1):** pruma-out (cubic-bezier(0.16, 1, 0.3, 1))
- **Font families:** sans → Inter, serif → Fraunces, mono → JetBrains Mono

### CSS Custom Properties (globals.css)

- 11 palette variables (`--color-navy` through `--color-red`)
- 3 shadow variables (`--shadow-sm`, `--shadow-md`, `--shadow-cyan`)
- 3 radius variables (`--radius-sm`, `--radius-md`, `--radius-lg`)
- 4 motion variables (`--duration-fast`, `--duration-base`, `--duration-slow`, `--ease-out-expo`)
- Body reset: Inter as default, navy ink, antialiased
- h1–h4 default to Fraunces serif
- `prefers-reduced-motion` block included

### Font Loading (app/layout.tsx)

- Fraunces: weights 400/500/600, variable `--font-fraunces`, display swap
- Inter: weights 400/500, variable `--font-inter`, display swap
- JetBrains Mono: weight 400, variable `--font-mono`, display swap
- All applied to `<html>` element; lang="pt-BR"

## Verification Results

```
npm run build → ✓ Compiled successfully (Next.js 14.2.35)
tailwind.config.ts contains #0D1B4B → 1 match
tailwind.config.ts contains #00AEEF → 1 match
tailwind.config.ts contains pruma-sm: 8px → 1 match
app/layout.tsx contains variable: "--font-fraunces" → 1 match
app/layout.tsx contains variable: "--font-inter" → 1 match
app/layout.tsx contains variable: "--font-mono" → 1 match
app/globals.css contains --color-navy → 4 matches
app/globals.css contains --ease-out-expo → 1 match
app/globals.css contains prefers-reduced-motion → 1 match
```

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] `create-next-app` refused non-empty directory**
- **Found during:** Task 1
- **Issue:** `create-next-app` does not support `--force` and refuses to scaffold into a non-empty directory (`.planning/`, `CLAUDE.md`, etc. already existed)
- **Fix:** Scaffolded in `/tmp/pruma-scaffold`, then `rsync`'d all generated files to the project root, excluding already-existing files (`README.md`, `CLAUDE.md`, `.git`)
- **Files modified:** All scaffold files

**2. [Rule 3 - Blocking] `create-next-app` installed Next.js 16 with Tailwind 4**
- **Found during:** Task 1
- **Issue:** The latest `create-next-app` (16.2.5) generates a Next.js 16 + Tailwind 4 project. Tailwind 4 uses CSS-based config (`@import "tailwindcss"`, no `tailwind.config.ts`), incompatible with the plan's `theme.extend` approach. Next.js 16 also supports `next.config.ts` but Next.js 14 does not.
- **Fix:** Replaced `package.json` with exact versions (next@^14.2.29, tailwindcss@^3.4), reinstalled, updated `postcss.config.mjs` to Tailwind 3 format, rewrote `globals.css` with `@tailwind` directives, created `tailwind.config.ts` with `theme.extend`
- **Files modified:** package.json, postcss.config.mjs, tailwind.config.ts (created), app/globals.css, app/layout.tsx

**3. [Rule 3 - Blocking] `next.config.ts` not supported in Next.js 14**
- **Found during:** Task 1 (build failure)
- **Issue:** Next.js 14 only supports `next.config.js` or `next.config.mjs`, not `.ts`
- **Fix:** Renamed `next.config.ts` → `next.config.mjs` with JSDoc type annotation
- **Files modified:** next.config.mjs (created), next.config.ts (removed)

**4. [Rule 3 - Blocking] ESLint flat config incompatible with eslint-config-next@14**
- **Found during:** Task 1
- **Issue:** The scaffold generated ESLint 9 flat config using `defineConfig` and direct import of `eslint-config-next/core-web-vitals` as array spread — unavailable in eslint-config-next@14
- **Fix:** Replaced with `FlatCompat`-based config using `compat.extends("next/core-web-vitals", "next/typescript")` and installed `@eslint/eslintrc`
- **Files modified:** eslint.config.mjs

## Known Stubs

None — this plan delivers infrastructure only. `app/page.tsx` has a minimal placeholder (`<p>Pruma LP</p>`) which is intentional; actual LP sections ship in Phase 2+.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or schema changes introduced. Font loading uses next/font proxy (no direct Google CDN exposure). Lock file (`package-lock.json`) committed per T-01-01 mitigation.

## Self-Check: PASSED

- [x] `app/layout.tsx` exists and contains `--font-fraunces`, `--font-inter`, `--font-mono`
- [x] `app/globals.css` exists and contains `--color-navy`, `--ease-out-expo`, `prefers-reduced-motion`
- [x] `tailwind.config.ts` exists and contains `#0D1B4B`, `#00AEEF`, `pruma-sm`
- [x] `package.json` contains `next@^14.2.29`, `framer-motion@^11`, `lucide-react`, `clsx`, `tailwind-merge`
- [x] Commits a1b2264 and d397049 exist in git log
- [x] `npm run build` completes without errors
