---
phase: 1
slug: foundation
status: approved
reviewed_at: 2026-05-06
shadcn_initialized: false
preset: none
created: 2026-05-06
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the Foundation phase. Locks the Pruma design system tokens and the four UI primitives (Eyebrow, Button, Card, Container) consumed by every downstream phase.
>
> Source of truth: `PROMPT_LP_PRUMA_FORCA_VENDAS.md` (sections 4 and 8). This document re-states those decisions as a contract — all values below are mandatory and must match the brief exactly.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (custom Pruma design system, no shadcn preset) |
| Preset | not applicable |
| Component library | none — bespoke primitives in `/components/ui` |
| Icon library | lucide-react (stroke width 1.5px, thin) |
| Font (display) | Fraunces — Google Fonts via `next/font/google` |
| Font (body) | Inter — Google Fonts via `next/font/google` |
| Font (mono) | JetBrains Mono — Google Fonts via `next/font/google` |
| Theme | Light only (LP is intentionally light; Section 9 + Footer are local dark inversions) |

**Rationale for no shadcn:** the brief mandates a bespoke editorial system (Fraunces serif, Pruma palette, sober radii, custom Eyebrow). shadcn defaults would dilute the McKinsey/Stripe positioning. Components are written by hand against Tailwind tokens.

---

## Spacing Scale

Tailwind default scale (multiples of 4) is preserved. Pruma adds two semantic section tokens for editorial rhythm.

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 4px | Inline icon gaps |
| 2 | 8px | Compact element spacing, eyebrow → headline gap baseline |
| 3 | 12px | Tight stack inside cards |
| 4 | 16px | Default text-to-text spacing |
| 6 | 24px | Card internal grouping, list item gap |
| 8 | 32px | Card padding (locked), eyebrow horizontal line width |
| 12 | 48px | Inter-card gaps, hero CTA-to-microcopy gap |
| 16 | 64px | Major content blocks |
| 24 | 96px | `py-24` — section vertical padding (mobile/tablet) |
| 32 | 128px | `py-32` — section vertical padding (desktop, generous) |

**Custom spacing tokens (Tailwind extend):**

| Token | Value | Usage |
|-------|-------|-------|
| `eyebrow-line` | 32px | Horizontal cyan line in Eyebrow component |
| `section-y-mobile` | 96px | Section vertical padding (≤1024px) |
| `section-y-desktop` | 128px | Section vertical padding (≥1024px) |

**Container width:** `max-w-6xl` = 1152px (locked). Horizontal padding: `px-6` (24px) mobile, `px-8` (32px) tablet, `px-0` desktop (container handles centering inside max-width).

Exceptions: none.

---

## Typography

Fraunces is the editorial signal. Inter is the workhorse. JetBrains Mono is reserved for labels only — never body, never headings.

### Type scale

| Role | Family | Size (desktop) | Size (mobile) | Weight | Line height | Tracking |
|------|--------|----------------|---------------|--------|-------------|----------|
| Display (H1 hero) | Fraunces | 72px | 40–48px | 500 | 1.05 | -0.01em |
| Heading L (H2 section) | Fraunces | 52px | 36px | 500 | 1.10 | -0.005em |
| Heading M (editorial centered) | Fraunces | 56px | 36px | 500 | 1.15 | -0.005em |
| Heading S (H3 card title) | Fraunces | 24px | 22px | 600 | 1.25 | 0 |
| Big number (prova social) | Fraunces | 64px | 48px | 600 | 1.0 | -0.01em |
| Body L (lead/subhead) | Inter | 20px | 18px | 400 | 1.6 | 0 |
| Body M (default) | Inter | 18px | 16px | 400 | 1.6 | 0 |
| Body S (card body) | Inter | 16px | 15px | 400 | 1.55 | 0 |
| Eyebrow / microcopy | JetBrains Mono | 12px | 12px | 400 | 1.4 | 0.12em (UPPERCASE) |
| Nav link | Inter | 14px | 14px | 500 | 1.4 | 0 |
| Button label | Inter | 14px | 14px | 500 | 1.0 | 0 |

### Font loading (locked)

`app/layout.tsx`:

```tsx
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

// applied on <html className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
```

`tailwind.config.ts` `fontFamily` extension:

```ts
fontFamily: {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"],
  serif: ["var(--font-fraunces)", "Georgia", "serif"],
  mono: ["var(--font-mono)", "ui-monospace", "monospace"],
}
```

**Default body font:** Inter (set via Tailwind `font-sans` on `<body>`). Headlines must explicitly declare `font-serif`. This prevents accidental sans-serif headlines.

---

## Color

The Pruma palette is locked. No additions, no "close enough" hexes. Use the 65/25/10 distribution.

### Palette (Tailwind `colors.pruma` namespace)

| Role | Token | Hex | Distribution | Usage |
|------|-------|-----|--------------|-------|
| Primary ink (60–65%) | `pruma.navy` | `#0D1B4B` | dominant | Body text, headlines, primary button bg, dark section bg, footer bg |
| Primary ink hover | `pruma.navy-mid` | `#162460` | — | Primary button hover bg, occasional secondary surface |
| Primary ink deep | `pruma.navy-deep` | `#1E3080` | — | Sub-headers, links, dividers when on light bg, eyebrow text color |
| Accent (25%) | `pruma.cyan` | `#00AEEF` | accent | Eyebrow horizontal line, big numbers, key icons, hover glow |
| Accent light | `pruma.cyan-light` | `#5CCFF5` | accent | Card hover border, badges, active states |
| Surface tint | `pruma.cyan-pale` | `#E0F6FE` | secondary | Section backgrounds (Diagnóstico, Funcionalidades, CTA Final), ghost button hover |
| Surface white | `pruma.white` | `#FFFFFF` | dominant | Default LP background, card surface |
| Surface off-white | `pruma.off-white` | `#FAFAFA` | dominant | Como Funciona section bg |
| Border subtle | `pruma.gray-soft` | `#F4F6F9` | — | Default card border, subtle separators |
| Text secondary | `pruma.gray-text` | `#5B6B85` | — | Captions, axis labels, microcopy when on light bg |
| Destructive | `pruma.red` | `#DC2626` | restricted | Mockup status "Crítico" only — never UI buttons (no destructive actions in this LP) |

### Distribution rule (60/30/10)

| Share | Color | Where |
|-------|-------|-------|
| Dominant ~60% | White / off-white surfaces + navy ink for text | Section backgrounds and all body copy |
| Secondary ~30% | Navy ink solid (CTAs, headlines, footer, Section 9) + cyan-pale tint sections | Strong UI elements + alternating tinted sections |
| Accent ~10% | Cyan electric `#00AEEF` | Eyebrow lines, big numbers, key icons, focus ring, hover glow on primary button |

### Accent reserved for (explicit list)

- Eyebrow horizontal line (32px × 1px)
- Big numbers in Prova Social (Fraunces 64px)
- Selected lucide icons (max one cyan icon per Eyebrow/headline group)
- Focus ring (2px outer ring `#00AEEF`)
- Primary button hover glow (`box-shadow: 0 4px 12px rgba(0, 174, 239, 0.18)`)
- Card hover border transition target (`#5CCFF5`)
- Map points and ABC chart bars in PainelDashboard mockup

**Forbidden cyan uses:** body text, headlines (except big numbers), full button fills, large surfaces, gradients.

### Theme inversion rule

Section 9 (Diferencial) and Footer use `bg-pruma-navy` with white ink. On dark background:
- Eyebrow text becomes `#00AEEF` (was `#1E3080`); horizontal line stays cyan
- Body text: `#FFFFFF`
- Secondary text: `#5CCFF5` or `rgba(255,255,255,0.72)`
- No card surfaces required in Section 9 (3 horizontal pillars on dark bg)

### Shadow tokens

Subtle only. Never dramatic.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-pruma-sm` | `0 1px 3px rgba(13, 27, 75, 0.06)` | Default card resting state |
| `shadow-pruma-md` | `0 8px 32px rgba(13, 27, 75, 0.08)` | Elevated cards (form, mockups), modals |
| `shadow-pruma-cyan` | `0 4px 12px rgba(0, 174, 239, 0.18)` | Primary button hover glow only |

### Border radius tokens

Sober, not friendly. No fully rounded pills except where explicitly noted.

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-pruma-sm` | 8px | Buttons, inputs, badges, eyebrow chips |
| `rounded-pruma-md` | 12px | Cards (default) |
| `rounded-pruma-lg` | 16px | Mockup containers (App vendedor, Painel) |

---

## Copywriting Contract

Phase 1 ships primitives only — no LP copy is rendered yet. However, the primitives must support the locked copy patterns the brief defines. The contract below names the labels and tones executors must respect when consuming these primitives.

| Element | Copy / Pattern |
|---------|----------------|
| Primary CTA label (canonical) | `Falar com um consultor` (used in Navbar, Hero, CTA Final — minimum 3 occurrences) |
| Secondary CTA label (canonical) | `Conhecer o app` (Hero ghost button) |
| Form CTA label (canonical) | `Agendar conversa com consultor` (CTA Final form submit) |
| Eyebrow tone | UPPERCASE, prefixed by em-dash + space (e.g. `— APP WEB DE FORÇA DE VENDAS B2B`) |
| Microcopy tone | UPPERCASE Mono, separated by ` · ` (middle dot with spaces) |
| Empty state (forms) | `Preencha os campos abaixo para conversar com um consultor.` (only used in Phase 3 form; declared here so primitives don't ship contradicting placeholder text) |
| Form success state | `Recebemos. Em breve um consultor da Pruma entra em contato.` |
| Error state pattern | `{Problema específico}. {Próximo passo claro.}` — no "Oops", no "Algo deu errado", no exclamation marks |
| Destructive confirmation | None in this LP (no destructive actions ship in v1) |

### Tone guardrails (enforced by primitives via prop typing where possible)

- **Banned words/phrases in any consumer copy:** "Venda mais", "Plataforma all-in-one", "Substitua o WhatsApp", "Automatize", "Simples assim", "Fácil", "Uau", emojis, exclamation marks (except inside mockup status indicators)
- **Required tone:** Sábio (60%) + Mago (40%) — affirmative, insight-led, never hyped
- **Punctuation:** em-dash (`—`) preferred over double hyphen; middle dot (`·`) for inline separators in microcopy
- **Numerals:** keep as digits ("R$ 50M", "30 dias", "1Bi+") — never spelled out

Phase 1 deliverable: primitives must accept these strings without truncation at any breakpoint between 320px and 1920px.

---

## Component Primitives — Visual Contract

This section is normative for the four primitives Phase 1 ships. The executor must match every value.

### 1. Eyebrow (`/components/ui/Eyebrow.tsx`)

Editorial label that precedes most headlines. Composed of a horizontal cyan rule + Mono UPPERCASE label.

| Property | Value |
|----------|-------|
| Markup | Inline-flex container, horizontal rule + `<span>` text |
| Horizontal rule | `width: 32px; height: 1px; background: #00AEEF;` (Tailwind: `w-8 h-px bg-pruma-cyan`) |
| Gap (rule → text) | 12px (`gap-3`) |
| Text style | JetBrains Mono 12px, weight 400, UPPERCASE, tracking 0.12em |
| Text color (light bg) | `#1E3080` (`text-pruma-navy-deep`) |
| Text color (dark bg) | `#00AEEF` (`text-pruma-cyan`) — variant prop `tone="dark"` |
| Margin-bottom (default) | 16px (`mb-4`) before its sibling headline |
| Vertical alignment | Rule centered to text x-height (use `items-center`) |
| Props (TS) | `{ children: ReactNode; tone?: "light" \| "dark"; className?: string }` |
| Forbidden | Background fill, border, icons, mixed-case text, sans-serif font |

### 2. Button (`/components/ui/Button.tsx`)

Two variants: `primary` (solid navy) and `ghost` (outline). No third variant in v1.

#### Common

| Property | Value |
|----------|-------|
| Font | Inter 14px weight 500 (`font-sans text-sm font-medium`) |
| Padding | 14px vertical, 24px horizontal (`px-6 py-3.5`) |
| Border radius | 8px (`rounded-pruma-sm`) |
| Letter-spacing | 0 (default) |
| Transition | `transition: transform 200ms ease-out, box-shadow 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out;` |
| Focus | 2px outer ring `#00AEEF` with 2px offset (`focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2 focus-visible:outline-none`) |
| Disabled | `opacity-50 cursor-not-allowed`; ignore hover transforms |
| Min-height | 44px (touch target) |
| Icon support | Optional `iconLeft`/`iconRight` lucide ReactNode at 16px, 1.5 stroke; `gap-2` (8px) from label |

#### Primary

| Property | Default | Hover | Active |
|----------|---------|-------|--------|
| Background | `#0D1B4B` | `#162460` | `#0D1B4B` |
| Text | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Border | none | none | none |
| Transform | `translateY(0)` | `translateY(-1px)` | `translateY(0)` |
| Shadow | `shadow-pruma-sm` | `shadow-pruma-cyan` (cyan glow) | `shadow-pruma-sm` |

#### Ghost

| Property | Default | Hover | Active |
|----------|---------|-------|--------|
| Background | `transparent` | `#E0F6FE` | `#E0F6FE` |
| Text | `#0D1B4B` | `#0D1B4B` | `#0D1B4B` |
| Border | `1px solid #0D1B4B` | `1px solid #0D1B4B` | `1px solid #0D1B4B` |
| Transform | `translateY(0)` | `translateY(-1px)` | `translateY(0)` |
| Shadow | none | none | none |

#### Props (TS)

```ts
type ButtonProps = {
  variant?: "primary" | "ghost"; // default: "primary"
  href?: string;        // when set, renders as <a>
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
```

When `href` is provided, the component renders a Next.js `<Link>` styled identically. Anchor links (`#contato`) are valid hrefs.

#### Forbidden
- Gradients
- Pill (`rounded-full`)
- Uppercase label
- Drop shadows beyond the cyan-glow on primary hover
- Disabled style that hides text contrast (must remain WCAG AA at 50% opacity background)

### 3. Card (`/components/ui/Card.tsx`)

Default content container. Used by Diagnóstico, Para Quem, Funcionalidades (bento), Prova Social depoimento, CTA Final form wrapper.

| Property | Default | Hover |
|----------|---------|-------|
| Background | `#FFFFFF` | `#FFFFFF` |
| Border | `1px solid #F4F6F9` | `1px solid #5CCFF5` |
| Border radius | 12px (`rounded-pruma-md`) | 12px |
| Padding | 32px (`p-8`) | 32px |
| Shadow | `shadow-pruma-sm` | `shadow-pruma-sm` |
| Transform | `translateY(0)` | `translateY(-2px)` |
| Transition | `transition: transform 250ms ease-out, border-color 250ms ease-out;` | — |
| Cursor | `default` (`cursor-pointer` only when `interactive` prop is true) | — |

#### Props (TS)

```ts
type CardProps = {
  interactive?: boolean; // enables hover transform; default: true
  as?: "div" | "article" | "li"; // semantic flexibility
  children: ReactNode;
  className?: string;
};
```

#### Variants supported via composition (no extra prop)
- Bento large card: consumer passes `className="md:col-span-2 md:row-span-2"`
- Form card (CTA Final): consumer passes `className="shadow-pruma-md"` to override resting shadow
- Dark inversion (Section 9): NOT a Card variant — Section 9 uses bare blocks on `bg-pruma-navy`, no card chrome

#### Forbidden
- Background tints (cards never use `#E0F6FE` — that color is a section background)
- Decorative borders (no dashed, no double, no colored borders other than the hover state)
- Internal shadows or insets
- Fixed heights (cards must size to content; bento layout uses grid, not equal-height hacks)

### 4. Container (`/components/ui/Container.tsx`)

Horizontal layout boundary used by every section.

| Property | Value |
|----------|-------|
| `max-width` | 1152px (`max-w-6xl`) |
| Margin | `mx-auto` (centered) |
| Padding (mobile <768px) | `px-6` (24px) |
| Padding (tablet ≥768px) | `px-8` (32px) |
| Padding (desktop ≥1024px) | `px-8` (32px) — keeps gutter on ultrawide |
| Vertical padding | none — sections own their `py-*` |
| Block element | `<div>` by default; `as` prop allows `section`/`article`/`main` |

#### Props (TS)

```ts
type ContainerProps = {
  as?: "div" | "section" | "article" | "main";
  children: ReactNode;
  className?: string;
};
```

#### Forbidden
- Setting any background color (Container is layout-only; sections set their own bg)
- Setting `py-*` defaults (sections decide vertical rhythm)
- Nesting containers (one Container per section, never recursive)

---

## Tokens — `tailwind.config.ts` Extension Contract

The executor MUST extend Tailwind with the following theme additions. Names are normative.

```ts
// theme.extend
colors: {
  pruma: {
    navy:        "#0D1B4B",
    "navy-mid":  "#162460",
    "navy-deep": "#1E3080",
    cyan:        "#00AEEF",
    "cyan-light":"#5CCFF5",
    "cyan-pale": "#E0F6FE",
    white:       "#FFFFFF",
    "off-white": "#FAFAFA",
    "gray-soft": "#F4F6F9",
    "gray-text": "#5B6B85",
    red:         "#DC2626",
  },
},
fontFamily: {
  sans:  ["var(--font-inter)",    "system-ui", "sans-serif"],
  serif: ["var(--font-fraunces)", "Georgia",   "serif"],
  mono:  ["var(--font-mono)",     "ui-monospace", "monospace"],
},
boxShadow: {
  "pruma-sm":   "0 1px 3px rgba(13, 27, 75, 0.06)",
  "pruma-md":   "0 8px 32px rgba(13, 27, 75, 0.08)",
  "pruma-cyan": "0 4px 12px rgba(0, 174, 239, 0.18)",
},
borderRadius: {
  "pruma-sm": "8px",
  "pruma-md": "12px",
  "pruma-lg": "16px",
},
letterSpacing: {
  eyebrow: "0.12em",
},
spacing: {
  "eyebrow-line":     "32px",
  "section-y-mobile": "96px",
  "section-y-desktop":"128px",
},
transitionTimingFunction: {
  "pruma-out": "cubic-bezier(0.16, 1, 0.3, 1)",
},
```

---

## CSS Custom Properties — `app/globals.css` Contract

`globals.css` mirrors the palette and core scale as CSS variables for non-Tailwind use (raw CSS in mockups, dynamic style props for Framer Motion).

```css
:root {
  /* Palette */
  --color-navy:        #0D1B4B;
  --color-navy-mid:    #162460;
  --color-navy-deep:   #1E3080;
  --color-cyan:        #00AEEF;
  --color-cyan-light:  #5CCFF5;
  --color-cyan-pale:   #E0F6FE;
  --color-white:       #FFFFFF;
  --color-off-white:   #FAFAFA;
  --color-gray-soft:   #F4F6F9;
  --color-gray-text:   #5B6B85;
  --color-red:         #DC2626;

  /* Shadows */
  --shadow-sm:   0 1px 3px rgba(13, 27, 75, 0.06);
  --shadow-md:   0 8px 32px rgba(13, 27, 75, 0.08);
  --shadow-cyan: 0 4px 12px rgba(0, 174, 239, 0.18);

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Motion */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   500ms;
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
}

html { color-scheme: light; }

body {
  background: var(--color-white);
  color: var(--color-navy);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Headlines default to Fraunces, never sans-serif */
h1, h2, h3, h4 {
  font-family: var(--font-fraunces), Georgia, serif;
  font-weight: 500;
  letter-spacing: -0.005em;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The `prefers-reduced-motion` block is mandatory in Phase 1 even though Framer Motion arrives in Phase 3 — the primitives' hover transforms must respect it.

---

## Interaction Contract

| Interaction | Property animated | Duration | Easing | Notes |
|-------------|-------------------|----------|--------|-------|
| Button hover | `transform`, `box-shadow`, `background-color` | 200ms | `ease-out` | Compositor-only |
| Card hover | `transform`, `border-color` | 250ms | `ease-out` | `translateY(-2px)` |
| Focus ring | `box-shadow` (ring) | 0ms (instant) | — | Always visible on `:focus-visible` |
| Reduced motion | All transforms collapse to 0 | 0.01ms | linear | Color/border still transition |

**Forbidden animations on primitives:** width, height, padding, margin, font-size, top/left/right/bottom. Only `transform`, `opacity`, `background-color`, `border-color`, `box-shadow`.

---

## Accessibility Contract

| Concern | Requirement |
|---------|-------------|
| Color contrast | Navy `#0D1B4B` on white = 14.6:1 (AAA). Gray text `#5B6B85` on white = 5.4:1 (AA large + AA normal). Cyan `#00AEEF` is decorative-only — never a text color on white (fails AA). On navy bg, white text = 14.6:1, cyan-light `#5CCFF5` on navy = 8.9:1 (AAA). |
| Focus visible | All interactive primitives (Button, future Links inside Card) ship `:focus-visible` ring `#00AEEF` 2px + 2px offset. Never remove outline without replacement. |
| Touch target | Minimum 44×44px on Button (enforced via `min-h-[44px]`). |
| Semantic markup | Container supports `as="section"`, Card supports `as="article"`/`"li"`. Eyebrow is a span (decorative); the headline that follows owns the heading semantics. |
| Reduced motion | `prefers-reduced-motion: reduce` collapses transforms (per globals.css block above). |
| Keyboard | Buttons reachable via Tab; Enter and Space activate. Anchor-href Buttons follow link semantics (Enter only). |

---

## Copywriting Contract (template-required summary)

| Element | Copy |
|---------|------|
| Primary CTA | `Falar com um consultor` |
| Empty state heading | `Preencha os campos abaixo para conversar com um consultor.` (declared for Phase 3 form; Phase 1 primitives must not ship hardcoded placeholder text) |
| Empty state body | n/a in Phase 1 (primitives are content-agnostic) |
| Error state | Pattern: `{Problema específico}. {Próximo passo claro.}` |
| Destructive confirmation | Not applicable — no destructive actions in v1 |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable |
| third-party | none | not applicable |

**Phase 1 ships no third-party UI blocks.** All primitives are written by hand against Tailwind tokens. lucide-react is the only external UI dependency and supplies icons only (no JSX templates).

---

## Phase 1 Acceptance Criteria (visual)

The phase is visually correct when:

1. `npm run dev` renders a blank page with body using Inter and `<h1>` (when added) using Fraunces — verified by inspecting computed `font-family` in DevTools.
2. Tailwind class `bg-pruma-navy` resolves to `#0D1B4B` exactly. `text-pruma-cyan` resolves to `#00AEEF` exactly.
3. `<Eyebrow>— TESTE</Eyebrow>` renders a 32px cyan rule + Mono UPPERCASE text with 0.12em tracking.
4. `<Button>Falar com um consultor</Button>` renders navy bg, white text, 8px radius, lifts -1px on hover with cyan glow.
5. `<Button variant="ghost">Conhecer o app</Button>` renders transparent bg with navy 1px border, cyan-pale fill on hover.
6. `<Card>` renders white bg, soft gray border, lifts -2px on hover with cyan-light border.
7. `<Container>` constrains content to 1152px and centers it; renders no background of its own.
8. All four primitives respect `prefers-reduced-motion: reduce`.
9. SEO metadata in `app/layout.tsx` declares title `Pruma | App Web de Força de Vendas B2B para Indústrias e Distribuidoras` and Open Graph tags.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
