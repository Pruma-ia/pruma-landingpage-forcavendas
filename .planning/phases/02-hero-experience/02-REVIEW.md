---
phase: 02-hero-experience
reviewed: 2026-05-06T00:00:00Z
depth: standard
files_reviewed: 11
files_reviewed_list:
  - app/layout.tsx
  - app/page.tsx
  - components/Diagnostico.tsx
  - components/Hero.tsx
  - components/Navbar.tsx
  - components/Tese.tsx
  - components/mockups/AppVendedor.tsx
  - components/mockups/PainelDashboard.tsx
  - components/mockups/_AbcChart.tsx
  - components/mockups/_BrazilMap.tsx
  - lib/constants.ts
findings:
  critical: 2
  warning: 3
  info: 3
  total: 8
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-05-06
**Depth:** standard
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Reviewed the Hero Experience phase implementation: layout, page composition, Hero/Diagnostico/Tese sections, Navbar, three mockup components, and the constants library. The component architecture is clean, semantic HTML is used correctly, Framer Motion reduced-motion support is present, and design tokens are consistently applied via Tailwind.

Two blockers were found: a silent `onClick` drop in `Button` when `href` is provided (breaks mobile-drawer close behavior) and an inconsistent financial total in the mock data that domain-expert prospects would notice. Three warnings cover broken anchor targets across all nav links, an emoji in mock data that violates the project's explicit no-emoji rule, and a missing `role="group"` / label on the decorative-button inside a landmark `<figure role="img">`.

---

## Critical Issues

### CR-01: Button `onClick` silently dropped when `href` is provided — mobile drawer CTA never closes

**File:** `components/ui/Button.tsx:37-52` / `components/Navbar.tsx:140-147`

**Issue:** `Button` destructures `...props` (which includes `onClick` from `ButtonHTMLAttributes<HTMLButtonElement>`) but only spreads `...props` onto the `<button>` branch (line 56). When `href` is provided the component renders a Next.js `<Link>` and passes only `href`, `className`, and `aria-disabled` — `onClick` is silently discarded. In the Navbar mobile drawer (line 144 of `Navbar.tsx`) the CTA calls `<Button variant="primary" href="#contato" onClick={() => setOpen(false)}>`. That `onClick` is never called, so tapping the CTA in the open drawer navigates to `#contato` but leaves the full-screen overlay open on top of the page.

**Fix:**

```tsx
// components/ui/Button.tsx — add onClick to the Link path
export function Button({
  variant = "primary",
  href,
  iconLeft,
  iconRight,
  children,
  className,
  disabled,
  onClick,   // extract explicitly
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, disabled && "pointer-events-none opacity-50")}
        aria-disabled={disabled}
        onClick={onClick}   // forward it here
      >
        {iconLeft && <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>}
        {children}
        {iconRight && <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {iconLeft && <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>}
    </button>
  );
}
```

---

### CR-02: MOCK_APP financial totals are internally inconsistent — off by R$ 1,00

**File:** `lib/constants.ts:114-119`

**Issue:** The mock order figures do not add up, which will be noticed by the B2B industrial/distribution prospects this landing page targets. Tracing the chain:

- Item subtotals sum correctly to `19 020,28` (matches `subtotal`).
- Applying `adjustment.value` (-29,67) yields `18 990,61`.
- `discountValue` (569,61) is stated as 3 % — but 3 % of 18 990,61 = 569,72, and 3 % of 19 020,28 = 570,61. Neither matches.
- `total` is stated as `18 420,00`, but `19 020,28 − 29,67 − 569,61 = 18 421,00`. The final total is R$ 1,00 short.

A knowledgeable prospect who adds the columns will distrust the mockup.

**Fix:** Choose one consistent calculation path and align all values. The simplest self-consistent set with a clean total:

```ts
// Option A — discount applied to subtotal (pre-adjustment), adjustment separate
subtotal:        19_020.28,   // sum of items — unchanged
adjustment:      { label: "Ajuste política comercial", value: -29.67 },
discountPercent: 3,
discountValue:   570.61,      // round(19020.28 * 0.03) = 570.61
total:           18_420.00,   // 19020.28 - 29.67 - 570.61 = 18420.00  ✓
```

---

## Warnings

### WR-01: All four `NAV_LINKS` point to anchor IDs that do not exist in the current page

**File:** `lib/constants.ts:37-42`

**Issue:** `NAV_LINKS` declares four anchors: `#como-funciona`, `#funcionalidades`, `#para-quem`, `#contato`. None of these IDs exist anywhere in the codebase today. The current `page.tsx` renders only `Hero` (id="topo"), `Diagnostico` (id="diagnostico"), and `Tese` (id="tese"). Clicking any nav link scrolls nowhere; the URL gains a dead hash fragment instead. This is user-visible during the demo/review phase.

**Fix:** Either add placeholder `id` attributes to existing sections so each link resolves to something, or replace the hrefs with the real existing IDs until the missing sections are built:

```ts
// Interim alignment until remaining sections ship:
export const NAV_LINKS = [
  { label: "Como funciona", href: "#diagnostico" },
  { label: "Funcionalidades", href: "#tese" },
  { label: "Para quem",       href: "#topo" },
  { label: "Contato",         href: "#topo" },
] as const;
```

---

### WR-02: Emoji `🟢` in `MOCK_APP.status` violates the explicit no-emoji design rule

**File:** `lib/constants.ts:102` / `components/mockups/AppVendedor.tsx:23`

**Issue:** `CLAUDE.md` explicitly prohibits emojis: "NO gradients, emojis, generic SaaS visuals". The value `"🟢 ONLINE"` is rendered directly via `{MOCK_APP.status}` inside the status badge in `AppVendedor`. The badge already has a visual cyan dot indicator (`<span class="w-2 h-2 rounded-full bg-pruma-cyan" aria-hidden="true" />`), making the emoji both redundant and a rule violation.

**Fix:**

```ts
// lib/constants.ts
status: "ONLINE",   // remove emoji — visual indicator is the CSS dot in AppVendedor
```

The existing CSS dot in `AppVendedor.tsx` line 22 is the correct indicator; no other change needed.

---

### WR-03: `aria-controls` on hamburger button references a conditionally absent element

**File:** `components/Navbar.tsx:89`

**Issue:** The hamburger `<button>` has `aria-controls="mobile-menu"`. The `mobile-menu` element is only mounted when `open === true` (AnimatePresence unmounts it on close). When the drawer is closed, `aria-controls` references an ID that does not exist in the DOM. Per ARIA spec, `aria-controls` must point to an element that is currently present. Screen readers may surface an error or ignore the relationship.

**Fix:** Use `aria-expanded` alone to communicate state (which is already present and correct), and conditionally set `aria-controls` only when the drawer is open:

```tsx
<button
  type="button"
  onClick={() => setOpen(true)}
  aria-label="Abrir menu"
  aria-expanded={open}
  aria-controls={open ? "mobile-menu" : undefined}   // only when mounted
  ...
>
```

---

## Info

### IN-01: `MOCK_PAINEL.filters` contains a hardcoded future date `"MAIO 2026"`

**File:** `lib/constants.ts:126`

**Issue:** The filter chip reads `"MAIO 2026"`. As of the review date (May 2026) this is current, but the constant is static. Once the page ships and time passes the mockup date will look stale. This is decorative UI, but the mismatch undermines realism over time.

**Fix:** Document that this is intentionally frozen mock data, or use a relative label:

```ts
filters: ["MÊS ATUAL", "BRASIL", "TODOS VENDEDORES"],
```

---

### IN-02: `<header>` used as a child of `<figure>` is non-standard HTML

**File:** `components/mockups/AppVendedor.tsx:14`

**Issue:** The `<header>` element is a sectioning content element. Using it inside `<figure>` (which is not a sectioning element) is semantically unusual and can confuse landmark-based navigation in some assistive technologies. `<figure role="img">` suppresses descendants from screen readers anyway, so the landmark is inert — but it is still non-standard markup.

**Fix:** Replace `<header>` with `<div>` inside the figure:

```tsx
<div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-pruma-gray-soft">
  ...
</div>
```

---

### IN-03: `Button` type accepts full `ButtonHTMLAttributes` but silently ignores most of them when `href` is present

**File:** `components/ui/Button.tsx:13`

**Issue:** Beyond `onClick` (fixed in CR-01), the type intersection `& ButtonHTMLAttributes<HTMLButtonElement>` exposes attributes like `form`, `formAction`, `name`, `value`, `type` that are button-only and inapplicable to a link. This widens the public API beyond what is safe and can mislead callers into thinking `type="submit"` on a Button with `href` will work.

**Fix:** Narrow the type so button-specific attributes are only available when `href` is absent:

```ts
type ButtonBaseProps = {
  variant?: "primary" | "ghost";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
};

type ButtonAsButton = ButtonBaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;
type ButtonAsLink  = ButtonBaseProps & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;
```

---

_Reviewed: 2026-05-06_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
