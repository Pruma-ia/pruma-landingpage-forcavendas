---
phase: 01-foundation
reviewed: 2026-05-06T00:00:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - next.config.mjs
  - postcss.config.mjs
  - tailwind.config.ts
  - tsconfig.json
  - eslint.config.mjs
  - app/layout.tsx
  - app/globals.css
  - app/page.tsx
  - lib/constants.ts
  - lib/utils.ts
  - components/ui/Eyebrow.tsx
  - components/ui/Button.tsx
  - components/ui/Card.tsx
  - components/ui/Container.tsx
findings:
  critical: 0
  warning: 6
  info: 4
  total: 10
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-06
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Reviewed the Foundation phase setup: Next.js 14 App Router scaffold, design token layer (CSS variables + Tailwind config), and four UI primitive components (Button, Card, Container, Eyebrow). Configuration files are solid. The CSS token system is well-structured and consistent with the design spec.

Six warnings were found, all in the component and metadata layer. None are security vulnerabilities or data-loss risks. The most impactful issues are in `Button.tsx` (disabled-link keyboard bypass and dropped button attributes on the Link branch) and `Card.tsx` (interactive default on a non-interactive element creates misleading UX). No critical blockers.

---

## Warnings

### WR-01: Disabled Link allows keyboard navigation despite `pointer-events-none`

**File:** `components/ui/Button.tsx:37-52`
**Issue:** When `href` is provided alongside `disabled={true}`, the component renders a `<Link>` (which becomes an `<a>` tag) with `pointer-events-none opacity-50` and `aria-disabled="true"`. `pointer-events-none` only blocks mouse interaction — keyboard users can still focus the element and press Enter to navigate. The browser does not honour `aria-disabled` on native anchors as a navigation block. A disabled link is therefore not actually disabled for keyboard users, which is both an accessibility bug and a UX correctness bug.

**Fix:**
```tsx
if (href) {
  if (disabled) {
    // Render a <span> (not an <a>) so the element is not focusable/navigable
    return (
      <span
        className={cn(classes, "opacity-50 cursor-not-allowed")}
        aria-disabled="true"
        role="link"
      >
        {iconLeft && <span className="flex-shrink-0 w-4 h-4">{iconLeft}</span>}
        {children}
        {iconRight && <span className="flex-shrink-0 w-4 h-4">{iconRight}</span>}
      </span>
    );
  }
  return (
    <Link href={href} className={classes}>
      ...
    </Link>
  );
}
```

---

### WR-02: `ButtonHTMLAttributes` dropped entirely on the Link branch

**File:** `components/ui/Button.tsx:37-52`
**Issue:** The component type is `ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>`. When the component renders as `<Link>`, the `...props` spread (which contains `ButtonHTMLAttributes`) is not forwarded to the `<Link>`. Callers who pass `onClick`, `onFocus`, `onBlur`, `type`, `form`, or `data-*` attributes expecting them to reach the rendered element will have them silently dropped. This is a silent data loss at the API boundary.

**Fix:** Accept `AnchorHTMLAttributes` on the link branch via a discriminated union, or at minimum forward the common subset (`onClick`, `onFocus`, `onBlur`, `className`, `data-*`):
```tsx
type ButtonAsButton = {
  href?: undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  variant?: "primary" | "ghost";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & (ButtonAsButton | ButtonAsLink);
```

---

### WR-03: `Card` defaults `interactive={true}` without a click handler, misleading users

**File:** `components/ui/Card.tsx:10`
**Issue:** `interactive` defaults to `true`, which unconditionally applies `cursor-pointer` and a hover lift animation to every card rendered without explicit props. A card used as a static container (for a feature list entry, a testimonial block, etc.) will appear clickable when it is not. This breaks affordance consistency — users will try to click non-interactive cards expecting navigation or action.

**Fix:** Default to `false` and require callers to explicitly opt in to interactive styling:
```tsx
export function Card({
  interactive = false,  // change default
  ...
```
Callers that need hover behavior pass `interactive={true}` explicitly, making intent clear at the call site.

---

### WR-04: `Container` `as` prop excludes `header` and `footer`

**File:** `components/ui/Container.tsx:4`
**Issue:** The `as` prop only accepts `"div" | "section" | "article" | "main"`. The project layout (CLAUDE.md) specifies a `<header>` for the navbar and a `<footer>` for the Footer section. The Container component cannot be used with those semantic elements without a type override, causing either duplication or loss of semantic structure.

**Fix:**
```tsx
type ContainerProps = {
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav";
  children: React.ReactNode;
  className?: string;
};
```

---

### WR-05: Reduced-motion override sets `animation-iteration-count: 1 !important`

**File:** `app/globals.css:57`
**Issue:** The reduced-motion block includes:
```css
animation-iteration-count: 1 !important;
```
This has an unintended effect: any element that legitimately has `animation-iteration-count: 0` (used to suppress an animation) or `animation-iteration-count: infinite` will be forced to iterate exactly once, playing through the full duration (however short) instead of being fully suppressed. The `animation-duration: 0.01ms` on line 56 already eliminates perceptible motion for users who request reduced motion. The `iteration-count` override is redundant and introduces edge-case breakage.

**Fix:** Remove the `animation-iteration-count` override:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

### WR-06: OpenGraph metadata missing `url` field

**File:** `app/layout.tsx:30-37`
**Issue:** The `openGraph` metadata block omits `url`. Without `og:url`, sharing platforms (LinkedIn, Facebook, WhatsApp, Slack) cannot deduplicate multiple shares of the same page — each share is treated as a separate URL, splitting social engagement counts and potentially breaking canonical link disambiguation. The OG protocol marks `og:url` as a required basic metadata property.

**Fix:**
```tsx
openGraph: {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: "https://pruma.com.br",   // or process.env.NEXT_PUBLIC_SITE_URL
  type: "website",
  locale: "pt_BR",
  siteName: "Pruma",
},
```
If the production URL is not yet finalised, use `process.env.NEXT_PUBLIC_SITE_URL` and document it as a required deploy-time variable.

---

## Info

### IN-01: `tailwind.config.ts` includes `pages/` directory in content paths

**File:** `tailwind.config.ts:5`
**Issue:** Content paths include `"./pages/**/*.{js,ts,jsx,tsx,mdx}"`. This project uses Next.js 14 App Router exclusively — there is no `pages/` directory. The glob is harmless at runtime (it matches nothing) but signals that the config was copied from a Pages Router template without being adapted. Remove to keep the config intentional.

**Fix:**
```ts
content: [
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
],
```

---

### IN-02: `Eyebrow` tone prop semantics are inverted from what the name implies

**File:** `components/ui/Eyebrow.tsx:5-6`
**Issue:** `tone="light"` renders the text in `text-pruma-navy-deep` (dark navy), and `tone="dark"` renders it in `text-pruma-cyan` (light cyan). The naming convention implies `tone` describes the _component's own tone_, but it actually describes the _background tone_ — `tone="dark"` means "placed on a dark background, therefore use light text." This is a documentation/naming issue that will consistently confuse future contributors adding new tones or reading call sites.

**Fix:** Rename the prop to make the intent explicit:
```tsx
type EyebrowProps = {
  children: React.ReactNode;
  onDark?: boolean;  // true when placed on a dark background
  className?: string;
};
```
Or add a JSDoc comment at minimum:
```tsx
/**
 * @param tone - describes the BACKGROUND tone, not the component's own.
 * "light" = on white/off-white background → dark navy text.
 * "dark" = on navy background → cyan text.
 */
```

---

### IN-03: Dead exports in `lib/constants.ts`

**File:** `lib/constants.ts:23-30`
**Issue:** `FORM_EMPTY_STATE` and `FORM_SUCCESS` are exported but no form component exists in this phase. Dead exports are low risk now but accumulate confusion as the codebase grows — it is unclear whether they are intentionally reserved or accidentally orphaned.

**Fix:** Move form-related constants to a `lib/form-constants.ts` (or co-locate with the form component when it is built) rather than placing them in the root constants file now.

---

### IN-04: `layout.tsx` missing `robots` metadata

**File:** `app/layout.tsx:27-42`
**Issue:** No `robots` metadata is configured. Without it, Next.js outputs no `<meta name="robots">` tag, which leaves indexing behaviour entirely up to each crawler's default. For a public landing page this is usually acceptable (crawlers default to index/follow), but there is no explicit opt-in, which could cause issues during pre-launch staging deployments if the same build is deployed to multiple environments without environment-level controls.

**Fix:**
```tsx
export const metadata: Metadata = {
  ...
  robots: {
    index: true,
    follow: true,
  },
};
```
If staging/preview environments share the same build, consider making this conditional on `process.env.NEXT_PUBLIC_ROBOTS_NOINDEX`.

---

_Reviewed: 2026-05-06_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
