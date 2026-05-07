---
phase: "01-foundation"
plan: "02"
subsystem: "ui-primitives"
tags: ["seo", "metadata", "constants", "eyebrow", "button", "card", "container", "tailwind-tokens"]
dependency_graph:
  requires:
    - "01-01 (Next.js scaffold, Tailwind pruma.* tokens, clsx, tailwind-merge)"
  provides:
    - "lib/constants.ts with 7 canonical LP strings"
    - "lib/utils.ts with cn() class merger"
    - "components/ui/Eyebrow — 32px cyan rule + JetBrains Mono UPPERCASE label"
    - "components/ui/Button — primary/ghost variants with hover transforms and glow"
    - "components/ui/Card — white surface with interactive border/translate hover"
    - "components/ui/Container — max-w-6xl layout boundary, no background"
    - "app/layout.tsx with full SEO metadata (title, openGraph pt_BR, twitter card)"
  affects:
    - "All downstream section components (Plans 02-* through 04-*)"
    - "Every section that consumes Eyebrow, Button, Card, or Container"
tech_stack:
  added: []
  patterns:
    - "cn() utility: clsx + tailwind-merge for conditional class composition"
    - "Polymorphic `as` prop pattern for semantic HTML flexibility (Card, Container)"
    - "Variant map pattern for Button: variantStyles Record<variant, string>"
    - "Threat mitigation T-02-05: pointer-events-none on disabled Link buttons"
key_files:
  created:
    - "lib/constants.ts"
    - "lib/utils.ts"
    - "components/ui/Eyebrow.tsx"
    - "components/ui/Button.tsx"
    - "components/ui/Card.tsx"
    - "components/ui/Container.tsx"
  modified:
    - "app/layout.tsx"
decisions:
  - "lib/utils.ts already required by all four primitives — created alongside them as part of Task 2 (single dependency, not a separate task)"
  - "Button with href gets pointer-events-none + aria-disabled when disabled (T-02-05 mitigation) instead of plain aria-disabled alone"
  - "Card hover uses -translate-y-0.5 (2px) matching UI-SPEC table value of translateY(-2px)"
metrics:
  duration: "~8 minutes"
  completed: "2026-05-06"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 01 Plan 02: SEO Metadata + lib/constants.ts + UI Primitives Summary

**One-liner:** Full SEO metadata in layout.tsx (openGraph pt_BR + twitter summary_large_image), canonical LP string constants, and four UI primitives (Eyebrow, Button, Card, Container) built against pruma.* Tailwind tokens.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | SEO metadata + lib/constants.ts | 40c10b4 | app/layout.tsx, lib/constants.ts |
| 2 | Four UI primitives (Eyebrow, Button, Card, Container) | a53d4fe | lib/utils.ts, components/ui/Eyebrow.tsx, components/ui/Button.tsx, components/ui/Card.tsx, components/ui/Container.tsx |

## What Was Built

### app/layout.tsx — SEO Metadata

```ts
export const metadata: Metadata = {
  title: SITE_TITLE,           // imported from lib/constants.ts
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: "Pruma",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};
```

### lib/constants.ts — 7 Canonical Exports

| Export | Value |
|--------|-------|
| `SITE_TITLE` | "Pruma \| App Web de Força de Vendas B2B para Indústrias e Distribuidoras" |
| `SITE_DESCRIPTION` | "Governe sua operação comercial B2B..." (~150 chars) |
| `CTA_PRIMARY` | "Falar com um consultor" |
| `CTA_SECONDARY` | "Conhecer o app" |
| `CTA_FORM` | "Agendar conversa com consultor" |
| `FORM_EMPTY_STATE` | "Preencha os campos abaixo para conversar com um consultor." |
| `FORM_SUCCESS` | "Recebemos. Em breve um consultor da Pruma entra em contato." |

### Component Primitive Props

**Eyebrow**
```ts
type EyebrowProps = {
  children: React.ReactNode;
  tone?: "light" | "dark";   // light → text-pruma-navy-deep; dark → text-pruma-cyan
  className?: string;
};
```
Visual: `inline-flex items-center gap-3 mb-4` — 32px cyan rule (`w-eyebrow-line h-px bg-pruma-cyan`) + JetBrains Mono 12px UPPERCASE `tracking-eyebrow` (0.12em).

**Button**
```ts
type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
```
Primary: `bg-pruma-navy` → hover `bg-pruma-navy-mid` + `-translate-y-1` + `shadow-pruma-cyan`.
Ghost: `border border-pruma-navy` → hover `bg-pruma-cyan-pale` + `-translate-y-1`.
Common: `rounded-pruma-sm`, `min-h-[44px]`, `focus-visible:ring-pruma-cyan`, `disabled:opacity-50 disabled:cursor-not-allowed`.
Link mode: renders Next.js `<Link>` with `pointer-events-none` when `disabled` (T-02-05).

**Card**
```ts
type CardProps = {
  interactive?: boolean;   // default: true — enables hover transform
  as?: "div" | "article" | "li";
  children: React.ReactNode;
  className?: string;
};
```
Resting: `bg-white border border-pruma-gray-soft rounded-pruma-md p-8 shadow-pruma-sm`.
Hover: `hover:-translate-y-0.5 hover:border-pruma-cyan-light` (250ms ease-out).

**Container**
```ts
type ContainerProps = {
  as?: "div" | "section" | "article" | "main";
  children: React.ReactNode;
  className?: string;
};
```
Layout: `max-w-6xl mx-auto px-6 md:px-8`. No background, no vertical padding.

## Verification Results

```
app/layout.tsx → SITE_TITLE imported (4 references)
app/layout.tsx → locale: "pt_BR"
app/layout.tsx → card: "summary_large_image"
lib/constants.ts → 7 exports, zero banned words
components/ui/Eyebrow.tsx → w-eyebrow-line h-px bg-pruma-cyan, tracking-eyebrow
components/ui/Button.tsx → rounded-pruma-sm, shadow-pruma-cyan, hover:bg-pruma-cyan-pale, focus-visible:ring-pruma-cyan
components/ui/Card.tsx → rounded-pruma-md, border-pruma-gray-soft, hover:border-pruma-cyan-light
components/ui/Container.tsx → max-w-6xl mx-auto px-6 md:px-8
npm run build → Compiled successfully (Next.js 14.2.35)
```

## Deviations from Plan

None — plan executed exactly as written.

The only noteworthy implementation detail is the `pointer-events-none` addition on the disabled `<Link>` variant in Button, which is mandated by threat model entry T-02-05 (not a deviation — it's a mitigate disposition in the plan's threat register).

## Known Stubs

None — this plan delivers primitives only. No LP copy is rendered yet; `app/page.tsx` retains the `<p>Pruma LP</p>` placeholder from Plan 01, which is intentional. Actual sections ship in Phase 2+.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or schema changes. Button's `href` prop uses Next.js `<Link>` (not raw `<a>`) per T-02-01 mitigation. All files are static — no runtime user input.

## Self-Check: PASSED

- [x] `lib/constants.ts` exists and exports SITE_TITLE, SITE_DESCRIPTION, CTA_PRIMARY, CTA_SECONDARY, CTA_FORM, FORM_EMPTY_STATE, FORM_SUCCESS
- [x] `lib/utils.ts` exists and exports `cn()`
- [x] `components/ui/Eyebrow.tsx` exists and exports `Eyebrow`
- [x] `components/ui/Button.tsx` exists and exports `Button`
- [x] `components/ui/Card.tsx` exists and exports `Card`
- [x] `components/ui/Container.tsx` exists and exports `Container`
- [x] `app/layout.tsx` updated with openGraph, twitter, and imports from constants.ts
- [x] Commit 40c10b4 exists (Task 1)
- [x] Commit a53d4fe exists (Task 2)
- [x] `npm run build` completes without errors
