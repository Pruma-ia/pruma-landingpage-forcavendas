---
phase: 2
slug: hero-experience
status: draft
shadcn_initialized: false
preset: none
created: 2026-05-06
extends: ../01-foundation/01-UI-SPEC.md
---

# Phase 2 — UI Design Contract

> Visual and interaction contract for the Hero Experience phase. Locks every Phase 1 design decision (palette, typography scale, shadow tokens, border-radius, eyebrow pattern, copy guardrails) and extends them with section-level layout, mockup anatomy, and interaction contracts for Navbar, Hero, Diagnóstico, Tese, AppVendedor, and PainelDashboard.
>
> **Inheritance:** Phase 1 UI-SPEC is canonical for tokens. Anything not redefined here is inherited verbatim. Where this document re-declares a token, the Phase 1 value is restated for executor convenience — values must remain identical.
>
> **Scope:** Above-fold experience (Navbar + SECT-01..04) plus MOCK-01 (AppVendedor) and MOCK-02 (PainelDashboard). Sections 5–12, ANIM-01..03, and form integrations belong to Phase 3+.

---

## Design System

| Property | Value | Source |
|----------|-------|--------|
| Tool | none (bespoke Pruma design system) | Phase 1 (locked) |
| Preset | not applicable | Phase 1 (locked) |
| Component library | none — custom primitives in `/components/ui` | Phase 1 (locked) |
| Icon library | `lucide-react` (stroke width **1.5px**, size 16/20/24px) | Phase 1 (locked) |
| Font (display) | Fraunces — `next/font/google` weights 400/500/600 | Phase 1 (locked) |
| Font (body) | Inter — `next/font/google` weights 400/500 | Phase 1 (locked) |
| Font (mono) | JetBrains Mono — `next/font/google` weight 400 | Phase 1 (locked) |
| Theme | Light only (Phase 2 ships zero dark sections) | Phase 1 (locked) |
| Animation | Framer Motion 11 (introduced lightly in Phase 2 for Navbar drawer; full scroll layer is Phase 3) | CONTEXT D-01, D-03 |

**Phase 2 stance on shadcn:** Not initialized. Decision delegated by Phase 1 (custom editorial system). Re-confirmed for Phase 2 — no third-party UI registries are introduced in this phase.

---

## Spacing Scale

Inherited from Phase 1. Re-stated for executor convenience. **Never violate the 4-multiple rule.**

| Token | Value | Phase 2 usage |
|-------|-------|---------------|
| 1 | 4px | Icon-to-icon gap inside button label, JetBrains Mono separator nudges |
| 2 | 8px | Eyebrow → headline baseline gap |
| 3 | 12px | Stack inside Diagnóstico card title → description |
| 4 | 16px | Default text-to-text spacing, KPI label → value gap |
| 6 | 24px | Diagnóstico card header (icon → title) gap, Hero CTA group `gap-x-6` (mobile stacks vertically) |
| 8 | 32px | Card padding (locked), eyebrow horizontal line width |
| 10 | 40px | Hero headline → subheadline gap (desktop) |
| 12 | 48px | Hero CTAs → microcopy gap, Tese headline → body gap |
| 16 | 64px | Inter-card gap on Diagnóstico (desktop), Hero left-column → right-column gap |
| 24 | 96px (`section-y-mobile`) | Section vertical padding ≤1024px |
| 32 | 128px (`section-y-desktop`) | Section vertical padding ≥1024px |

**Phase 2 custom spacing tokens:** none added. All existing tokens (`eyebrow-line`, `section-y-mobile`, `section-y-desktop`) cover Phase 2 needs.

**Container width:** `max-w-6xl` (1152px). Horizontal padding: `px-6` mobile, `px-8` ≥768px. Hero is allowed to break to full-bleed background while content stays inside Container.

**Exceptions for Phase 2:**
- AppVendedor mockup `max-width: 380px` (mobile-frame illusion, per D-17). Not a spacing exception — it is a fixed-width container.
- Tese body paragraph `max-width: 720px` (centered editorial column, per SECT-04 and D-14).
- Navbar height: 64px desktop, 56px mobile (locked below).

---

## Typography

Inherited from Phase 1 type scale. Phase 2 re-states each role with the exact section it powers and adds the responsive bracket the executor must implement.

### Type scale (locked)

| Role | Family | Desktop | Mobile (≤640px) | Weight | Line height | Tracking | Phase 2 usage |
|------|--------|---------|-----------------|--------|-------------|----------|---------------|
| Display H1 | Fraunces | 72px | 40px | 500 | 1.05 | -0.01em | Hero headline (2 lines) |
| Heading L H2 | Fraunces | 52px | 36px | 500 | 1.10 | -0.005em | Diagnóstico section headline |
| Heading M (editorial) | Fraunces | 56px | 36px | 500 | 1.15 | -0.005em | Tese Pruma headline (centered) |
| Heading S H3 | Fraunces | 24px | 22px | 600 | 1.25 | 0 | Diagnóstico card titles |
| Body L (lead) | Inter | 20px | 18px | 400 | 1.6 | 0 | Hero subheadline |
| Body L (editorial) | Inter | 19px | 17px | 400 | 1.6 | 0 | Tese body paragraph (D-14) |
| Body M | Inter | 18px | 16px | 400 | 1.6 | 0 | Diagnóstico section subheadline |
| Body S (card body) | Inter | 16px | 15px | 400 | 1.55 | 0 | Diagnóstico card descriptions (D-10) |
| Eyebrow / microcopy | JetBrains Mono | 12px | 12px | 400 | 1.4 | 0.12em | Section eyebrows + Hero CTA microcopy (D-09) |
| Nav link | Inter | 14px | 14px | 500 | 1.4 | 0 | Navbar anchor links |
| Button label | Inter | 14px | 14px | 500 | 1.0 | 0 | All CTAs |
| KPI value (mockup) | Fraunces | 28px | 24px | 600 | 1.0 | -0.005em | PainelDashboard KPI cards (D-18) |
| KPI label (mockup) | JetBrains Mono | 11px | 11px | 400 | 1.4 | 0.10em | PainelDashboard KPI labels |
| Mockup table cell | Inter | 13px | 13px | 400 | 1.4 | 0 | PainelDashboard "Clientes em risco" rows |
| Mockup mobile body | Inter | 14px | 14px | 400 | 1.4 | 0 | AppVendedor item rows |
| Mockup mobile total | Fraunces | 22px | 22px | 600 | 1.2 | -0.005em | AppVendedor `R$ 18.420,00` |
| Mockup status badge | JetBrains Mono | 10px | 10px | 400 | 1.2 | 0.10em | AppVendedor "🟢 ONLINE" / PainelDashboard "Crítico"/"Atenção" |

**Tese body size note:** Phase 1 declared Body L at 20px and SECT-04 (REQUIREMENTS) declares 19px. Phase 2 honors REQUIREMENTS — Tese body uses **19px desktop, 17px mobile**. This is the only Phase 2 deviation from the Phase 1 type scale and is sanctioned by the locked SECT-04 spec.

**Default font enforcement:** Inherited globals.css rule (`h1–h4` always Fraunces). All Phase 2 sections must declare their semantic heading level — never spoof headlines with `<div>` or `<p>`.

---

## Color

Inherited from Phase 1 palette. **No new tokens introduced in Phase 2.** Re-stated with section-level distribution.

### Palette (Tailwind `pruma.*`)

| Role | Token | Hex | Phase 2 usage |
|------|-------|-----|---------------|
| Primary ink | `pruma.navy` | `#0D1B4B` | All headlines, Hero/Diagnóstico body text, primary button bg, Navbar logo wordmark, Diagnóstico card icons (default) |
| Primary ink hover | `pruma.navy-mid` | `#162460` | Primary button hover bg only |
| Primary ink deep | `pruma.navy-deep` | `#1E3080` | Eyebrow text on light bg (Navbar, Hero, Diagnóstico, Tese) |
| Accent | `pruma.cyan` | `#00AEEF` | Eyebrow rule, AT MOST one icon per Diagnóstico (per D-12), PainelDashboard map points + ABC bars, focus ring, primary button hover glow |
| Accent light | `pruma.cyan-light` | `#5CCFF5` | Card hover border (Diagnóstico cards), AppVendedor "Online" badge bg tint |
| Surface tint | `pruma.cyan-pale` | `#E0F6FE` | Diagnóstico section background (locked SECT-03), ghost button hover bg, AppVendedor status pill bg |
| Surface white | `pruma.white` | `#FFFFFF` | Navbar bg (resting), Hero bg, Tese bg, all card surfaces, mockup canvases |
| Surface off-white | `pruma.off-white` | `#FAFAFA` | NOT used in Phase 2 (reserved for SECT-05 in Phase 3) |
| Border subtle | `pruma.gray-soft` | `#F4F6F9` | Card borders (resting), Navbar bottom hairline when scrolled, mockup table dividers, KPI card borders |
| Text secondary | `pruma.gray-text` | `#5B6B85` | Diagnóstico card descriptions, KPI labels (mockup), microcopy on light bg, Hero subheadline tone option |
| Destructive | `pruma.red` | `#DC2626` | PainelDashboard "Clientes em risco" status `Crítico` only — never UI |

### 60/30/10 distribution for Phase 2

| Share | Color | Where |
|-------|-------|-------|
| Dominant ~60% | White surfaces + Navy ink | Navbar, Hero, Tese sections + all body/headline ink |
| Secondary ~30% | Solid Navy (CTAs, primary button, mockup KPI bg accents) + Cyan-pale (Diagnóstico section bg) | CTAs and the alternating tinted Diagnóstico section |
| Accent ~10% | Cyan electric `#00AEEF` | Eyebrow rules (4 sections), focus rings, primary hover glow, mockup map points + ABC bars, **at most one** cyan icon per Diagnóstico card group |

### Accent reserved for (Phase 2 explicit list)

- Eyebrow horizontal rule in Navbar (none — Navbar has no eyebrow), Hero, Diagnóstico, Tese (3 occurrences)
- Hero subheadline tone is **navy**, not cyan (cyan is forbidden as a body text color per Phase 1)
- AppVendedor status badge accent line and dot (decorative; emoji `🟢` is allowed inside the mockup only)
- PainelDashboard: ABC chart bars (cyan), map dot fills (cyan), KPI delta indicators (cyan when positive, navy when neutral)
- Primary button hover glow `box-shadow: 0 4px 12px rgba(0, 174, 239, 0.18)`
- `:focus-visible` ring on all interactive elements

**Forbidden cyan uses in Phase 2 (re-asserted):**
- No cyan body text anywhere
- No cyan headlines (Hero/Diagnóstico/Tese all stay navy)
- No cyan filled buttons
- No cyan gradients
- No cyan section backgrounds (only `cyan-pale` is allowed as section bg)

### Theme inversion in Phase 2

**Phase 2 ships zero dark sections.** Section 9 (dark) and Footer arrive in Phase 3. Navbar stays light at all scroll states. Hero stays light. Diagnóstico uses `cyan-pale` (still light). Tese stays white.

### Shadow tokens (Phase 2 mapping)

| Token | Value | Phase 2 usage |
|-------|-------|---------------|
| `shadow-pruma-sm` | `0 1px 3px rgba(13, 27, 75, 0.06)` | Diagnóstico cards (resting), AppVendedor inner cards, KPI card shadow |
| `shadow-pruma-md` | `0 8px 32px rgba(13, 27, 75, 0.08)` | Hero PainelDashboard mockup container (D-05), AppVendedor outer frame, Navbar when scrolled (`scroll > 8px`) |
| `shadow-pruma-cyan` | `0 4px 12px rgba(0, 174, 239, 0.18)` | Primary button hover glow (Hero CTA + Navbar CTA) |

### Border radius (Phase 2 mapping)

| Token | Value | Phase 2 usage |
|-------|-------|---------------|
| `rounded-pruma-sm` | 8px | Buttons, AppVendedor item rows, status pills, KPI delta chips |
| `rounded-pruma-md` | 12px | Diagnóstico cards, KPI cards inside PainelDashboard, mockup inner sections |
| `rounded-pruma-lg` | 16px | AppVendedor outer frame (D-17), PainelDashboard outer container (D-22) |
| `rounded-full` | — | **Forbidden** in Phase 2 except: AppVendedor status dot (8×8px), PainelDashboard map points (4–10px), KPI delta arrow circle |

---

## Section Layout Contracts

Each subsection below is a normative layout contract. The executor must match grid columns, max-widths, vertical padding, and responsive behavior exactly.

### S1 — Navbar (SECT-01)

**Container:** `<header>` element, `position: sticky; top: 0; z-index: 50`. Renders inside `app/layout.tsx` outside `<main>`.

**Resting state (scroll ≤ 8px):**
- Background: `transparent` over `pruma-white`
- Border-bottom: `none`
- Shadow: `none`
- Backdrop filter: `none`

**Scrolled state (scroll > 8px, per D-03 + SECT-01):**
- Background: `rgba(255, 255, 255, 0.72)` with `backdrop-filter: blur(12px)` (Tailwind: `bg-white/72 backdrop-blur-md`)
- Border-bottom: `1px solid pruma-gray-soft`
- Shadow: `shadow-pruma-md` (subtle elevation)
- Transition: `background-color 200ms ease-out, box-shadow 200ms ease-out, border-color 200ms ease-out`

**Internal layout:**
- Height: 64px desktop (≥768px), 56px mobile (<768px)
- Container: `max-w-6xl mx-auto px-6 md:px-8`
- Flex: `flex items-center justify-between h-full`
- Three slots: `[Logo]  [Nav links — center on desktop, hidden on mobile]  [CTA — right]`

**Logo slot:**
- Wordmark: `PRUMA` in Fraunces 600, 20px desktop / 18px mobile, navy
- Letter-spacing: `tracking-tight` (-0.01em)
- Anchor: `<Link href="/">`
- Min-width: 80px (prevents collapse)

**Nav links slot (desktop ≥768px):**
- 4 links max (D-02): `Como funciona`, `Funcionalidades`, `Para quem`, `Contato`
- Hrefs: `#como-funciona`, `#funcionalidades`, `#para-quem`, `#contato`
- Style: Inter 14px weight 500, `text-pruma-navy`
- Spacing: `gap-x-8` (32px between links)
- Hover: `color: pruma-cyan` over 150ms `ease-out`. **No underline. No transform.**
- Active (anchor target on screen — Phase 3 enhancement): cyan 1px underline 2px below baseline. Phase 2 may ship without active state; nav links must still hover correctly.
- Focus: 2px cyan ring with 2px offset

**Nav links slot (mobile <768px):**
- Hidden. Replaced by hamburger trigger (D-01).

**CTA slot:**
- Component: `<Button variant="primary">Falar com um consultor</Button>`
- Text: from `CTA_PRIMARY` constant — never hardcoded
- On mobile: visible at all times alongside hamburger trigger (CTA does NOT collapse into drawer)
- Mobile sizing: same Button primitive — its `min-h-[44px]` and `px-6` are correct for mobile thumb reach

**Hamburger trigger (mobile <768px):**
- Position: right of CTA, 8px gap
- Icon: `lucide-react Menu` at 24px, stroke 1.5px, color `pruma-navy`
- Hit target: 44×44px (touch compliance)
- Background: transparent → `pruma-cyan-pale` on press (active)
- Aria: `aria-label="Abrir menu"`, `aria-expanded={open}`, `aria-controls="mobile-menu"`

**Mobile drawer (D-01):**
- Trigger: hamburger button click sets `open=true`
- Layout: full-viewport overlay `fixed inset-0 z-50 bg-white`
- Animation: Framer Motion `<motion.div>` with `initial={{ opacity: 0, y: -8 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -8 }}`, duration 200ms, `cubic-bezier(0.16, 1, 0.3, 1)`
- Reduced-motion: collapse to `duration: 0.01s` (handled by globals.css rule + Framer Motion respects `prefers-reduced-motion` natively when wired with `useReducedMotion()`)
- Internal layout (top-down):
  1. Header bar mirroring Navbar (logo left, **close button** right)
  2. Vertical link stack: each link Inter 18px weight 500 navy, full-width tap area `py-4 px-6`, divided by `border-b border-pruma-gray-soft` between items
  3. Bottom drawer footer: full-width primary `Button` "Falar com um consultor" inside `px-6 py-8`
- Close button: `lucide-react X` 24px stroke 1.5px navy, 44×44 hit target, `aria-label="Fechar menu"`
- Body scroll lock while open: `overflow-hidden` on `<body>` (use a `useEffect`)
- Escape key: closes drawer
- Click on link: closes drawer THEN navigates (use `setTimeout(navigate, 0)` or programmatic close before anchor jump)
- Focus trap: focus enters drawer on open (first interactive element), returns to hamburger trigger on close

**Forbidden in Navbar:**
- Sub-menus / dropdowns (4 anchor links only)
- Search bar
- Theme toggle (LP is light-only)
- "Login"/"Sign up" — Pruma has no logged area in v1
- Sticky shadow at scroll = 0

---

### S2 — Hero (SECT-02)

**Container:** `<section id="topo">` with `bg-pruma-white py-section-y-mobile lg:py-section-y-desktop`. Wraps `<Container>`.

**Internal grid:**
- Mobile (<768px): single column, vertical stack
- Tablet (≥768px <1024px): single column still; mockup pushed below CTAs
- Desktop (≥1024px): `grid grid-cols-12 gap-x-16 items-center`

**Desktop column allocation:**
- Left text column: `col-span-7`
- Right mockup column: `col-span-5`

**Left text column (desktop) / full width (mobile):**

Vertical stack with these gaps:
1. `<Eyebrow>— APP WEB DE FORÇA DE VENDAS B2B</Eyebrow>` — Phase 1 primitive, light tone
2. `mb-2` (8px gap baked into Eyebrow + headline rhythm)
3. `<h1>` headline — Fraunces 72px desktop / 40px mobile, weight 500, navy, line-height 1.05, tracking -0.01em, **2 lines via explicit `<br />` between lines**, `max-width: 12ch` desktop to control wrap
4. `mt-10` (40px gap desktop, 24px mobile)
5. `<p>` subheadline — Inter 20px desktop / 18px mobile, weight 400, navy 80% opacity OR `pruma-gray-text`, line-height 1.6, max-width `52ch`
6. `mt-12` (48px gap desktop, 32px mobile)
7. CTA pair — flex row `flex flex-col sm:flex-row gap-4 sm:gap-6`
   - Primary: `<Button variant="primary" href="#contato">Falar com um consultor</Button>` (consumes `CTA_PRIMARY`)
   - Ghost: `<Button variant="ghost" href="#funcionalidades">Conhecer o app</Button>` (consumes `CTA_SECONDARY`)
8. `mt-12` (48px gap, per Phase 1 spacing token rule)
9. Microcopy line — JetBrains Mono 12px UPPERCASE tracking 0.12em, color `pruma-gray-text`, separator ` · `
   - Default copy (D-09): `SEM CONTRATO · IMPLANTAÇÃO EM 30 DIAS · DADO REAL DE OPERAÇÃO`
   - Component: a single `<p>` with `font-mono uppercase text-xs tracking-eyebrow text-pruma-gray-text`

**Right mockup column (desktop):**

- Renders the **complete** `<PainelDashboard />` component (D-04 — not a stub)
- Wrapper: `<div className="relative">`
- Mockup styling (D-05): `rounded-pruma-lg shadow-pruma-md` applied on PainelDashboard outer container itself
- **Slight tilt suggestion (Stripe/Linear reference):** `transform: rotate(-1deg)` is **forbidden** in Phase 2. Phase 1 globals.css blocks aggressive transforms on reduced-motion and the brief asks for "subtle elevation" — read this as `shadow-pruma-md` and slight scale, not rotation. If the executor wants tilt, defer to Phase 3 with explicit reduced-motion fallback.
- Hover: none (the mockup is non-interactive in Phase 2)
- Width: fills `col-span-5` (max ~480px on a 1152px container)
- Mockup internal scaling: see PainelDashboard contract below — do NOT shrink content; the mockup stays at its natural size and the column scales to it

**Mobile layout (<1024px) — D-06:**
- Order: eyebrow → headline → subheadline → CTAs → microcopy → **PainelDashboard stacks below** (full width, `max-width: 480px mx-auto`)
- Mockup is **never hidden** on mobile (D-06 is explicit). It may scale down via `transform: scale(0.85)` only if its 480px width would force horizontal overflow at 375px — preferred approach is to render PainelDashboard at its natural width inside an `overflow-x-auto` wrapper so the user can pan the dashboard horizontally if needed. Choose the wrapper-pan approach to preserve data legibility.

**Forbidden in Hero:**
- Centered headline (Hero is left-aligned editorial; only Tese is centered)
- Gradient background
- Hero image / illustration that isn't the dashboard mockup
- Stats row inside Hero (deferred to Prova Social SECT-10)
- Video background

---

### S3 — Diagnóstico (SECT-03)

**Container:** `<section id="diagnostico">` with `bg-pruma-cyan-pale py-section-y-mobile lg:py-section-y-desktop`. Wraps `<Container>`.

**Internal vertical stack:**
1. `<Eyebrow>— DIAGNÓSTICO</Eyebrow>` (centered: wrap eyebrow in `flex justify-center` OR keep left-aligned consistent with Hero — Phase 2 default is **left-aligned** to maintain editorial rhythm with Hero)
2. `<h2>` section headline — Fraunces 52px desktop / 36px mobile, weight 500, navy, line-height 1.10, max-width `18ch`
3. `mt-4` (16px)
4. `<p>` section subheadline — Inter 18px desktop / 16px mobile, weight 400, `pruma-gray-text`, max-width `60ch`, line-height 1.6
5. `mt-16` (64px desktop) / `mt-12` (48px mobile)
6. 3-card grid

**3-card grid layout:**
- Mobile (<768px): single column, `gap-4` (16px)
- Tablet (768px–1023px): single column, `gap-6` (24px)
- Desktop (≥1024px): `grid grid-cols-3 gap-8` (32px)

**Card anatomy (per D-10, D-11, D-12):**

Each card uses the Phase 1 `<Card>` primitive with `interactive={false}` (cards in Diagnóstico are not clickable — they're informational). Internal layout:

```
┌─────────────────────────────┐
│ [Icon 24px]                 │  ← icon top-left, 24×24, lucide stroke 1.5
│                             │
│ Title                       │  ← Fraunces 24px weight 600 navy
│ — gap 12px —                │
│ Description body            │  ← Inter 16px weight 400 pruma-gray-text
│ (1–2 lines)                 │     line-height 1.55
└─────────────────────────────┘
```

- Card padding: `p-8` (32px) — Phase 1 default
- Card border: `1px solid pruma-gray-soft` (resting)
- Card hover (informational, `interactive={false}` so suppressed) — but if executor flips to `interactive={true}` for parallax-feel, hover must be `border-pruma-cyan-light` + `-translate-y-0.5` per Phase 1 contract
- Icon → title gap: 24px (`mb-6` on icon block)
- Title → description gap: 12px (`mt-3`)

**Locked card titles (D-11 + REQUIREMENTS SECT-03):**
1. `Visibilidade tardia`
2. `Política comercial fragmentada`
3. `Fechamento na planilha`

**Card descriptions (D-10) — Claude writes, surgical pain-point framing:**
1. *Visibilidade tardia*: `Você só descobre o desvio no fechamento do mês — quando a margem já vazou.`
2. *Política comercial fragmentada*: `Cada vendedor aplica a tabela como entende. O desconto vira negociação, não regra.`
3. *Fechamento na planilha*: `O CRM diz uma coisa, a planilha diz outra, o ERP diz uma terceira. Decidir vira arqueologia.`

These descriptions follow the Sábio + Mago tone, use em-dash, no banned words, no exclamation. They are normative for Phase 2 — executor must surface them via `lib/constants.ts` (see Copywriting Contract section below).

**Icon mapping (D-12) — lucide-react, 1.5 stroke, navy default; ONE may be cyan:**
1. `Visibilidade tardia` → `EyeOff` (navy)
2. `Política comercial fragmentada` → `ScatterChart` or `GitBranch` (navy) — executor may pick whichever lucide icon best reads. **Prefer `GitBranch`.**
3. `Fechamento na planilha` → `FileSpreadsheet` (**cyan** — this is the single cyan icon allowed in this group, per D-12's "max one cyan icon" rule)

**Forbidden in Diagnóstico:**
- Numbered cards (1/2/3 badges) — pain points are equal, no hierarchy
- Card images / illustrations
- "Solution" copy mixed in — Diagnóstico names the problem, Tese names the shift, Como Funciona names the method
- Emojis in titles or descriptions (allowed only inside mockups)

---

### S4 — Tese Pruma (SECT-04)

**Container:** `<section id="tese">` with `bg-pruma-white py-section-y-mobile lg:py-section-y-desktop`. Wraps `<Container>` with `text-center` applied to inner content wrapper (overrides default left-align).

**Internal vertical stack (centered):**
1. `<Eyebrow>— TESE PRUMA</Eyebrow>` — wrapped in `flex justify-center` because Eyebrow is `inline-flex` (centering happens at the parent)
2. `mt-4` (16px)
3. `<h2>` headline — Fraunces 56px desktop / 36px mobile, weight 500, navy, line-height 1.15, tracking -0.005em, max-width `20ch mx-auto`
4. `mt-12` (48px desktop) / `mt-8` (32px mobile)
5. `<p>` body paragraph — Inter **19px** desktop / 17px mobile, weight 400, `pruma-navy` (NOT gray — Tese body deserves full ink emphasis), line-height 1.6, `max-width: 720px mx-auto`

**Locked headline (D-13 + REQUIREMENTS SECT-04):**
> `Força de vendas não é um app.`

**Body paragraph (D-14) — Claude writes, affirmative provocation, Sábio+Mago, distinguishes governance from productivity:**

> `É um sistema de governança comercial. O app é a superfície — o que decide o resultado é a regra que está abaixo: política de preço, segmentação, ciclo de visita, leitura do território. A Pruma instala esse sistema, e o app passa a executá-lo. Não é mais produtividade isolada — é decisão repetível, do vendedor ao conselho.`

This paragraph is normative. It must be surfaced via `lib/constants.ts`. It carries no banned words, uses em-dashes, no exclamation, distinguishes Pruma from generic "automatize" SaaS.

**Forbidden in Tese:**
- Cards
- Icons
- Side images
- Quote marks around the headline
- A second paragraph (Tese is one centered paragraph, period)
- Two-column layout

---

## Mockup Contracts (MOCK-01, MOCK-02)

Mockups are HTML/CSS components built from Pruma tokens. They ship in Phase 2 with hardcoded data and zero browser-chrome decoration.

### M1 — AppVendedor (`components/mockups/AppVendedor.tsx`) — MOCK-01

**Outer frame (D-15, D-17):**
- Width: `max-width: 380px`
- Height: auto, content-driven (target ~720px)
- Background: `pruma-white`
- Border: `1px solid pruma-gray-soft`
- Border radius: `rounded-pruma-lg` (16px)
- Shadow: `shadow-pruma-md` (it's an elevated mockup, even when not in Hero column)
- Internal padding: 0 (sub-sections handle their own padding to mimic mobile screens)
- Aspect: portrait (mobile-first illusion)
- Decorative chrome: **none** — no notch, no status bar, no rounded "phone bezel". Per D-05 / project tone: editorial, not skeuomorphic.

**Internal vertical structure (top-down):**

1. **Header** (`px-5 py-4 border-b border-pruma-gray-soft`)
   - Left: client name in Fraunces 16px weight 600 navy, line 1: `Auto Center São Paulo Ltda`, line 2: client meta in Inter 12px gray-text: `Pedido #4821 · Hoje, 14:32`
   - Right: status badge — pill `rounded-pruma-sm bg-pruma-cyan-pale px-2 py-1 inline-flex items-center gap-1.5`. Inside: 8×8 cyan dot + JetBrains Mono 10px uppercase tracking-eyebrow `🟢 ONLINE` (per D-15; emoji allowed inside mockup status only, per CONTEXT specifics)

2. **Item list** — 8 rows (D-16), Auto-parts/distribution items, each row:
   - Layout: `flex items-center justify-between px-5 py-3 border-b border-pruma-gray-soft last:border-0`
   - Left: product name Inter 14px weight 500 navy + qty/unit Inter 12px gray-text on second line (e.g., `2 × R$ 499,90`)
   - Right: row total Inter 14px weight 600 navy
   - Last row: no border

   **Locked product list (8 items totaling R$ 18.989,69 pre-discount → R$ 18.420,00 post 3%):**

   | # | Item | Qty | Unit (R$) | Subtotal (R$) |
   |---|------|-----|-----------|---------------|
   | 1 | Filtro de óleo Mann W712/95 | 24 | 38,90 | 933,60 |
   | 2 | Pastilha de freio Bosch BB1825 | 18 | 142,00 | 2.556,00 |
   | 3 | Amortecedor Cofap dianteiro | 12 | 389,00 | 4.668,00 |
   | 4 | Correia dentada Gates 5PK1230 | 30 | 78,50 | 2.355,00 |
   | 5 | Vela de ignição NGK iridium | 60 | 49,90 | 2.994,00 |
   | 6 | Bateria Moura M60GD 60Ah | 6 | 489,00 | 2.934,00 |
   | 7 | Disco de freio Fremax BD5212 | 8 | 215,00 | 1.720,00 |
   | 8 | Lâmpada H7 Philips X-tremeVision | 24 | 35,82 | **859,68** (rounding adjusts so final 8-item subtotal = **R$ 19.020,28**, after 3% discount = **R$ 18.449,67**, displayed as **R$ 18.420,00** with a pinned "ajuste comercial" line) |

   **Math note for executor:** Achieving an exact `R$ 18.420,00` post-3%-discount total requires either (a) tweaking item 8's qty/price or (b) showing an "Ajuste comercial" line for the residual. The executor should pick approach (b) — it preserves item authenticity AND demonstrates Pruma's "política comercial" theme. Show the residual as a 9th line: `Ajuste política comercial · -R$ 29,67` with `Inter 12px italic gray-text` styling. This converts a math constraint into a brand moment.

3. **Discount + total block** (`px-5 py-4 bg-pruma-off-white border-t border-pruma-gray-soft`)
   - Subtotal row: Inter 13px gray-text `Subtotal` left, `R$ 18.989,67` right
   - Discount row: Inter 13px gray-text `Desconto comercial (3%)` left, `– R$ 569,67` right (cyan text on right)
   - Total row: Fraunces 22px weight 600 navy `Total` left, `R$ 18.420,00` right

4. **Action bar** (`px-5 py-4 border-t border-pruma-gray-soft`)
   - Single full-width primary `<button>` styled to match Phase 1 Button primary — text: `Fechar pedido` (D-15)
   - Width: `w-full`

**Forbidden in AppVendedor:**
- iOS/Android device frame (no notch, no rounded outer bezel beyond the 16px radius, no Apple home indicator)
- Carousel of multiple "screens" (one screen, one moment, one decision)
- Photographic product images (text rows only — keeps the mockup an HTML/CSS component, not an asset pipeline)
- Animated typing/loading states in Phase 2 (Phase 3 may add scroll-in fade)
- Star ratings, social proof, "trust badges"

### M2 — PainelDashboard (`components/mockups/PainelDashboard.tsx`) — MOCK-02

**Outer container (D-22):**
- Width: 100% of parent column (in Hero: ~480px on desktop; full-width on mobile via `overflow-x-auto`)
- Min-width on its content: 760px (so when shrunk into a 480px Hero column, it scales via `transform: scale(0.62)` with `transform-origin: top right` OR is rendered at natural width inside an `overflow-x-auto` wrapper — pick the wrapper approach to preserve readability and avoid blurry text)
- Background: `pruma-white`
- Border: `1px solid pruma-gray-soft`
- Border radius: `rounded-pruma-lg` (16px)
- Shadow: `shadow-pruma-md`
- Padding: `p-6` (24px) all around the canvas
- Decorative chrome: **none** (no traffic-light buttons, no URL bar)

**Internal layout (4 vertical bands, top-down):**

#### Band 1 — Header with filters (~56px tall)

`flex items-center justify-between border-b border-pruma-gray-soft pb-4 mb-6`

- Left: small wordmark `Pruma · Painel do Gestor` in Inter 13px weight 500 navy + decorative cyan 8×8 dot before the wordmark
- Right: 3 inline filter pills, each `rounded-pruma-sm border border-pruma-gray-soft px-3 py-1.5 text-xs font-mono uppercase tracking-eyebrow text-pruma-gray-text inline-flex items-center gap-2`
  - `MAIO 2026 ▾`
  - `BRASIL ▾`
  - `TODOS VENDEDORES ▾`
  - The `▾` is `lucide-react ChevronDown` 12px

#### Band 2 — KPI row (~120px tall)

`grid grid-cols-4 gap-4`. Each KPI card:
- Background: `pruma-white`
- Border: `1px solid pruma-gray-soft`
- Border radius: `rounded-pruma-md`
- Padding: `p-4` (16px)
- Internal layout: label (top), value (mid), delta indicator (bottom)
- Label: JetBrains Mono 11px UPPERCASE tracking 0.10em `pruma-gray-text`
- Value: Fraunces 28px weight 600 navy
- Delta: Inter 12px weight 500 — green when positive (use `pruma-cyan` since Pruma palette has no green), navy when neutral, `pruma-red` when negative — preceded by `▲` / `▬` / `▼`

**Locked KPI values (D-18) — realistic for B2B distributor mid-market R$50M–300M:**

| KPI | Label | Value | Delta |
|-----|-------|-------|-------|
| 1 | PEDIDOS HOJE | `184` | `▲ 12% vs ontem` (cyan) |
| 2 | TICKET MÉDIO | `R$ 14.820` | `▲ 4,3% vs maio` (cyan) |
| 3 | CLIENTES ATIVOS | `1.247` | `▬ estável` (navy) |
| 4 | META DO MÊS | `73%` | `▼ -6 dias para virar` (red, but tone neutral) |

**Tone check:** values look operational, not aspirational. Numbers are plausible for a distributor doing ~R$ 100M ARR.

#### Band 3 — ABC chart + Brazil map row (~280px tall)

`grid grid-cols-12 gap-6 mb-6`

- ABC chart card: `col-span-7`, `rounded-pruma-md border border-pruma-gray-soft p-5`
  - Header: `<h4>Curva ABC — clientes por receita</h4>` Fraunces 16px weight 600 navy + below it Inter 12px gray-text `~20% dos clientes geram ~80% da receita`
  - Chart: 12 vertical bars descending (Pareto), implemented in pure SVG or CSS flex with `align-items: flex-end`. Bar widths fixed at 8% of container, gap 4%. Bar heights (descending): 96%, 88%, 78%, 68%, 54%, 42%, 32%, 22%, 14%, 9%, 6%, 4%
  - Bar colors: top 3 bars `pruma-cyan`, bars 4–6 `pruma-navy-deep`, bars 7–12 `pruma-gray-soft` (visualizes A/B/C tiers)
  - X-axis labels: Inter 11px gray-text — `A1 A2 A3 B1 B2 B3 B4 C1 C2 C3 C4 C5`
  - Y-axis: implied (no explicit axis) — leaves a gridline at 50% with `border-dashed border-pruma-gray-soft`

- Brazil map card: `col-span-5`, `rounded-pruma-md border border-pruma-gray-soft p-5`
  - Header: `<h4>Distribuição territorial</h4>` Fraunces 16px weight 600 navy
  - Map: SVG outline of Brazil (executor uses a simple low-poly silhouette — d3-geo + topojson if a small package is available, otherwise an inline SVG path of ~50 vertices). Fill: `pruma-gray-soft`. Stroke: `pruma-gray-text` 0.5px.
  - Points (D-20): cyan circles at industrial capitals, sized by volume:

    | City | x,y (relative to map viewBox 240×280) | Radius |
    |------|----------------------------------------|--------|
    | São Paulo | (172, 174) | 9px (largest) |
    | Belo Horizonte | (185, 158) | 7px |
    | Rio de Janeiro | (195, 175) | 7px |
    | Curitiba | (158, 195) | 6px |
    | Porto Alegre | (148, 230) | 6px |
    | Recife | (220, 110) | 5px |
    | Salvador | (212, 130) | 5px |
    | Goiânia | (165, 142) | 4px |

    Total: 8 points (D-20 asks 5 + 2–3 more = 7–8 ✓). Fill `#00AEEF`, stroke `rgba(13,27,75,0.15)` 1px, optional `box-shadow: 0 0 0 4px rgba(0,174,239,0.18)` for hover affordance (Phase 3 may animate; Phase 2 is static).

#### Band 4 — Risk table (~180px tall)

`rounded-pruma-md border border-pruma-gray-soft overflow-hidden`. Inside:
- Header bar: `flex items-center justify-between bg-pruma-off-white border-b border-pruma-gray-soft px-5 py-3`
  - Left: `<h4>Clientes em risco</h4>` Fraunces 16px weight 600 navy
  - Right: Inter 12px gray-text `3 de 47 monitorados`
- Table: 3 rows (D-19), each row:
  - Layout: `grid grid-cols-12 items-center px-5 py-3 border-b border-pruma-gray-soft last:border-0 text-sm`
  - Col-span-4 client name + city (Inter 13px weight 500 navy + Inter 11px gray-text below)
  - Col-span-3 status pill: `rounded-pruma-sm px-2 py-0.5 text-xs font-mono uppercase tracking-eyebrow inline-block`. `Crítico` → `bg-pruma-red/10 text-pruma-red`. `Atenção` → `bg-pruma-cyan-pale text-pruma-navy-deep`
  - Col-span-3 days-without-order: Inter 13px gray-text right-aligned (e.g., `42 dias`)
  - Col-span-2 value-at-risk: Fraunces 14px weight 600 navy right-aligned

**Locked risk table rows (D-19) — fictional Brazilian B2B distributor names, plausible:**

| # | Client | City | Status | Days w/o order | Value at risk |
|---|--------|------|--------|----------------|---------------|
| 1 | Distribuidora Alvorada Peças Ltda | Campinas, SP | Crítico | 47 dias | R$ 84.300 |
| 2 | Comercial Vértice Auto MG | Contagem, MG | Atenção | 28 dias | R$ 36.180 |
| 3 | Implementos Sul Distribuição | Caxias do Sul, RS | Crítico | 51 dias | R$ 112.640 |

**Forbidden in PainelDashboard:**
- Browser chrome / window controls
- Animated counters in Phase 2 (Phase 3 ANIM-02 owns counter motion)
- Real photos / avatars
- Pie charts (forbidden by Pruma tone — pies don't read as institutional)
- Stripe-purple, Stripe-red — only Pruma palette
- Pipeline barra segmentada (REQUIREMENTS mentions it; defer to Phase 3 if Band 4 grows — Phase 2 ships without pipeline to keep mockup density readable inside Hero column. **Decision logged: pipeline bar deferred to Phase 3 enhancement of MOCK-02.**)

---

## Copywriting Contract

Inherited tone guardrails from Phase 1 (Sábio 60% + Mago 40%, em-dash punctuation, banned words, no emojis outside mockups). Phase 2 adds **section-specific normative copy** that must be surfaced via `lib/constants.ts`.

### Section copy (all NORMATIVE — must ship as-is)

| Element | Copy | Constant name (suggested) |
|---------|------|---------------------------|
| Navbar logo wordmark | `PRUMA` | `BRAND_NAME` |
| Navbar link 1 | `Como funciona` | `NAV_LINKS[0]` |
| Navbar link 2 | `Funcionalidades` | `NAV_LINKS[1]` |
| Navbar link 3 | `Para quem` | `NAV_LINKS[2]` |
| Navbar link 4 | `Contato` | `NAV_LINKS[3]` |
| Navbar CTA | `Falar com um consultor` | `CTA_PRIMARY` (already exists) |
| Hero eyebrow | `— APP WEB DE FORÇA DE VENDAS B2B` | `HERO.eyebrow` |
| Hero headline (line 1) | `Operações comerciais B2B` | `HERO.headlineLine1` |
| Hero headline (line 2) | `que precisam parar de improvisar.` | `HERO.headlineLine2` |
| Hero subheadline | `Pruma instala o sistema de governança comercial — do vendedor em campo ao conselho.` | `HERO.subheadline` |
| Hero CTA primary | `Falar com um consultor` | `CTA_PRIMARY` |
| Hero CTA secondary | `Conhecer o app` | `CTA_SECONDARY` (already exists) |
| Hero microcopy | `SEM CONTRATO DE FIDELIDADE · IMPLANTAÇÃO EM 30 DIAS · DADO REAL DE OPERAÇÃO` | `HERO.microcopy` |
| Diagnóstico eyebrow | `— DIAGNÓSTICO` | `DIAGNOSTICO.eyebrow` |
| Diagnóstico headline | `O que está quebrado raramente é o app.` | `DIAGNOSTICO.headline` |
| Diagnóstico subheadline | `Três sintomas que aparecem antes de qualquer reunião de resultado.` | `DIAGNOSTICO.subheadline` |
| Diagnóstico card 1 title | `Visibilidade tardia` | `DIAGNOSTICO.cards[0].title` |
| Diagnóstico card 1 body | `Você só descobre o desvio no fechamento do mês — quando a margem já vazou.` | `DIAGNOSTICO.cards[0].body` |
| Diagnóstico card 2 title | `Política comercial fragmentada` | `DIAGNOSTICO.cards[1].title` |
| Diagnóstico card 2 body | `Cada vendedor aplica a tabela como entende. O desconto vira negociação, não regra.` | `DIAGNOSTICO.cards[1].body` |
| Diagnóstico card 3 title | `Fechamento na planilha` | `DIAGNOSTICO.cards[2].title` |
| Diagnóstico card 3 body | `O CRM diz uma coisa, a planilha diz outra, o ERP diz uma terceira. Decidir vira arqueologia.` | `DIAGNOSTICO.cards[2].body` |
| Tese eyebrow | `— TESE PRUMA` | `TESE.eyebrow` |
| Tese headline | `Força de vendas não é um app.` | `TESE.headline` |
| Tese body | `É um sistema de governança comercial. O app é a superfície — o que decide o resultado é a regra que está abaixo: política de preço, segmentação, ciclo de visita, leitura do território. A Pruma instala esse sistema, e o app passa a executá-lo. Não é mais produtividade isolada — é decisão repetível, do vendedor ao conselho.` | `TESE.body` |
| AppVendedor client | `Auto Center São Paulo Ltda` | `MOCK_APP.client` |
| AppVendedor status | `🟢 ONLINE` | `MOCK_APP.status` |
| AppVendedor CTA | `Fechar pedido` | `MOCK_APP.cta` |
| Painel filter 1 | `MAIO 2026` | `MOCK_PAINEL.filters[0]` |
| Painel KPI 1 label | `PEDIDOS HOJE` | `MOCK_PAINEL.kpis[0].label` |
| Painel risk 1 client | `Distribuidora Alvorada Peças Ltda` | `MOCK_PAINEL.risk[0].client` |

(Full string set lives in `lib/constants.ts` after Phase 2 execution. The table above is normative for executor.)

### Tone guardrails (Phase 2 re-asserted)

- **Banned words/phrases (full Phase 1 list applies):** "Venda mais", "Plataforma all-in-one", "Substitua o WhatsApp", "Automatize", "Simples assim", "Fácil", "Uau", emojis (outside mockups), exclamation marks (outside mockup status indicators), "Inovador", "Disruptivo", "Revolucionário", "Inteligência artificial" (unless we ship an actual AI feature — Phase 2 does not), "Eleve sua operação", "Transforme suas vendas"
- **Required tone:** Sábio (60%) + Mago (40%). Sábio: surgical, calm, McKinsey-clinical. Mago: insight that reframes the problem.
- **Punctuation:** em-dash (`—`) only; never `--` or `-` for emphasis. Middle dot (` · `) for inline microcopy separators.
- **Numerals as digits:** `R$ 18.420,00` not "dezoito mil…"; `30 dias` not "trinta dias"; percentages with `%` and no space.
- **Acronyms in CAPS, no periods:** B2B, CRM, ERP, KPI, ABC, SaaS.
- **Accents:** preserve PT-BR diacritics rigorously (`Diagnóstico`, `política`, `território`).

### Empty/error/destructive states in Phase 2

- **Empty state:** Hero/Diagnóstico/Tese are always populated; no empty state copy ships in Phase 2. Form empty state already declared in Phase 1 (Phase 3 owns).
- **Error state:** Mobile drawer route navigation cannot fail in Phase 2 (anchor-only). No error state UI ships.
- **Destructive confirmation:** Not applicable — Phase 2 has zero destructive actions. Mobile drawer close button is non-destructive.

---

## Interaction Contract

Inherited from Phase 1. Phase 2 adds the Navbar scroll observer and mobile drawer interactions.

| Interaction | Property animated | Duration | Easing | Notes |
|-------------|-------------------|----------|--------|-------|
| Button hover (primary + ghost) | `transform`, `box-shadow`, `background-color` | 200ms | `ease-out` | Phase 1 contract — unchanged |
| Card hover | `transform`, `border-color` | 250ms | `ease-out` | Phase 1; Diagnóstico cards default `interactive={false}` |
| Focus ring | `box-shadow` (ring) | 0ms | — | Always visible on `:focus-visible` (Phase 1) |
| Navbar scroll transition (resting → blurred) | `background-color`, `box-shadow`, `border-color`, `backdrop-filter` | 200ms | `ease-out` | Triggers at `window.scrollY > 8`; debounce via `useEffect` + passive scroll listener OR `IntersectionObserver` on a sentinel `<div>` placed at top of page (preferred — passive scroll listeners can fire 60fps unnecessarily) |
| Mobile drawer enter | `opacity`, `transform: translateY` | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Framer Motion `<motion.div>`; respects `prefers-reduced-motion` via `useReducedMotion()` (collapse to 0.01s) |
| Mobile drawer exit | same | 200ms | same | Reverse curve |
| Hamburger icon press | `background-color` | 150ms | `ease-out` | `transparent → pruma-cyan-pale` |
| Hero PainelDashboard appearance | none in Phase 2 | — | — | Static render. Phase 3 ANIM-01 may add fade-up. |
| Reduced motion | All transforms collapse to 0 | 0.01ms | linear | Color/border still transition (Phase 1 inheritance) |

**Forbidden animations in Phase 2:**
- Width / height / padding / margin / font-size / top/left animations (only `transform`, `opacity`, `background-color`, `border-color`, `box-shadow`)
- Hero parallax (defer to Phase 3 if requested)
- Sticky-headline pinning that obscures Navbar
- Carousel / slideshow on Hero mockup
- Mockup auto-cycling KPIs

---

## Accessibility Contract

Inherits Phase 1 contract verbatim. Phase 2 additions:

| Concern | Phase 2 requirement |
|---------|---------------------|
| Color contrast | Hero subheadline `pruma-gray-text` on white = 5.4:1 (AA pass). Diagnóstico card body `pruma-gray-text` on white card on `cyan-pale` section = 5.4:1 (AA pass). Cyan eyebrow rule decorative-only. |
| Headings | One `<h1>` per page (Hero). `<h2>` for Diagnóstico and Tese section headlines. `<h3>` for Diagnóstico card titles. `<h4>` reserved for mockup internal headers. |
| Landmark roles | `<header>` for Navbar, `<main>` for content, `<section aria-labelledby="…">` for each section, `<footer>` reserved for Phase 3. |
| Anchor links | Each `<section>` has `id="…"` matching Navbar hrefs (`#topo`, `#diagnostico`, `#tese`). Future Phase 3 sections add their ids. |
| Focus management (drawer) | On open: focus moves to close button. On close: focus returns to hamburger trigger. Focus trap inside drawer while open. |
| Touch targets | Navbar mobile hamburger 44×44, drawer link rows full-width with min-height 44px, primary CTA button 44px (Phase 1). |
| Keyboard | `Tab` traverses Navbar logo → links → CTA → hamburger. `Enter` activates anchor links. `Escape` closes drawer. |
| Screen reader | Eyebrow text is part of accessible name of section heading? **No** — eyebrow is purely decorative; section's accessible name is owned by the heading via `aria-labelledby`. The eyebrow `<span>` should NOT have `aria-hidden` (the text is meaningful), but the cyan rule `<span>` IS `aria-hidden` (already in Eyebrow primitive). |
| Reduced motion | Drawer animation collapses to 0.01s. Navbar scroll transition still runs (color transition only — no transform). Card hover transforms suppress. |
| Mobile drawer aria | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to a visually-hidden heading "Menu de navegação". |
| Skip link (recommended, not blocking) | `<a href="#topo" class="sr-only focus:not-sr-only">Pular para conteúdo</a>` at top of `<body>` — Phase 2 ships it; Phase 4 audit will verify. |
| Mockup accessibility | AppVendedor and PainelDashboard are decorative compositions. Wrap each in `<figure role="img" aria-label="…">` with descriptive alt text: `Mockup: Tela do app vendedor mostrando pedido fechado para Auto Center São Paulo no valor de R$ 18.420,00.` and `Mockup: Painel do gestor com KPIs de pedidos, ticket médio, distribuição territorial e clientes em risco.` |

---

## Component Inventory (Phase 2 deliverables)

| File | Type | Reuses | New |
|------|------|--------|-----|
| `components/Navbar.tsx` | Section | `Button`, `Container`, `Link` | Yes |
| `components/Hero.tsx` | Section | `Eyebrow`, `Button`, `Container`, `PainelDashboard` | Yes |
| `components/Diagnostico.tsx` | Section | `Eyebrow`, `Card`, `Container`, lucide icons | Yes |
| `components/Tese.tsx` | Section | `Eyebrow`, `Container` | Yes |
| `components/mockups/AppVendedor.tsx` | Mockup | (none — pure HTML/CSS) | Yes |
| `components/mockups/PainelDashboard.tsx` | Mockup | (none — pure HTML/CSS + inline SVG) | Yes |
| `lib/constants.ts` | Copy | existing CTA constants | Append section copy keys |
| `app/layout.tsx` | Layout | existing | **Edit:** insert `<Navbar />` outside `<main>` |
| `app/page.tsx` | Page | (currently minimal) | **Edit:** compose Hero, Diagnostico, Tese in order |

**File size budget (per project rules):** each section component ≤ 400 lines preferred, 800 max. PainelDashboard.tsx may approach 400 lines due to inline SVG map — split map into `components/mockups/_brazil-map.tsx` if it exceeds 300 lines.

---

## Tokens — `tailwind.config.ts` Extension Contract

**No additions required for Phase 2.** All tokens needed (`pruma.*` palette, `shadow-pruma-*`, `rounded-pruma-*`, `letterSpacing.eyebrow`, `spacing.eyebrow-line`, `spacing.section-y-mobile`, `spacing.section-y-desktop`, `transitionTimingFunction.pruma-out`) are already declared in Phase 1.

If the executor finds a need for an additional token while building Phase 2 (e.g., a specific `backdropBlur` value), the planner must pause and re-open the UI-SPEC. **No silent token inflation.**

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable |
| third-party | none | not applicable |

**Phase 2 ships zero third-party UI blocks.** All sections and mockups are written by hand against Phase 1 primitives + Tailwind tokens. lucide-react remains the only external UI dependency (icons only, no JSX templates). Framer Motion 11 is used for the mobile drawer enter/exit transition only — it is a Phase 1 stack dependency, not a UI registry.

---

## Phase 2 Acceptance Criteria (visual)

The phase is visually correct when:

1. **Navbar:** sticky, transparent at scroll = 0, transitions to `bg-white/72 backdrop-blur-md` + `shadow-pruma-md` + 1px gray-soft bottom border at scroll > 8px. Logo `PRUMA` Fraunces 600 navy. 4 anchor links (desktop only). Primary CTA always visible. Mobile hamburger opens full-screen drawer with focus trap and Escape-close.
2. **Hero:** `<h1>` Fraunces 72px (40px mobile) navy, 2 lines, copy `Operações comerciais B2B / que precisam parar de improvisar.`. Two CTAs side-by-side (stacked on mobile). Microcopy in JetBrains Mono UPPERCASE with ` · ` separators. PainelDashboard renders **complete** at right column (desktop) or below CTAs (mobile, never hidden).
3. **Diagnóstico:** Section bg `pruma-cyan-pale`. 3 cards on white surface. Card titles match D-11 verbatim. Card bodies match the locked Sábio+Mago copy above. Icons lucide thin-stroke; exactly one icon (`FileSpreadsheet`) is cyan; the other two are navy.
4. **Tese:** White bg, centered. Headline Fraunces 56px (36px mobile) `Força de vendas não é um app.`. Body Inter 19px (17px mobile) navy at max-width 720px centered. Single paragraph.
5. **AppVendedor:** Max-width 380px. Frame `rounded-pruma-lg` `shadow-pruma-md`. Client `Auto Center São Paulo Ltda`, 8 product items + ajuste comercial line, post-discount total `R$ 18.420,00`. Status pill `🟢 ONLINE`. Primary CTA `Fechar pedido`.
6. **PainelDashboard:** Outer `rounded-pruma-lg` `shadow-pruma-md` no chrome. 4 KPI cards with locked values (184 / R$ 14.820 / 1.247 / 73%). ABC chart 12 bars descending with cyan A-tier, navy-deep B-tier, gray-soft C-tier. Brazil map silhouette with 8 cyan dots. Risk table 3 rows with `Crítico`/`Atenção` pills.
7. **Color discipline:** No cyan body text. No cyan headlines. No gradients. No emojis outside mockups. Banned words absent.
8. **Typography discipline:** Every heading uses Fraunces (verified by computed `font-family`). Every body uses Inter. Every microcopy/eyebrow/label uses JetBrains Mono UPPERCASE with 0.12em tracking.
9. **Accessibility:** `<h1>` exactly once. Sections have `id` and `aria-labelledby`. Mobile drawer has focus trap + Escape close. Skip link present. Reduced-motion respected.
10. **Copy:** All section copy is sourced from `lib/constants.ts` (no hardcoded JSX strings). Banned words absent (grep verifies).
11. **Mockup data:** Identical to the locked tables above (down to comma decimals).
12. **Build:** `npm run build` zero TypeScript errors. `npm run dev` zero warnings. Lighthouse desktop on Hero alone ≥ 90 Performance / 95 Accessibility (Phase 4 audits the full LP).

---

## Pre-Population Sources

| Section | Source | Notes |
|---------|--------|-------|
| Design System | Phase 1 UI-SPEC + tailwind.config.ts | Inherited; no shadcn |
| Spacing | Phase 1 UI-SPEC | Inherited; no new tokens |
| Typography | Phase 1 UI-SPEC + REQUIREMENTS SECT-04 | Inherited + Tese 19px from REQUIREMENTS |
| Color | Phase 1 UI-SPEC | Inherited; Phase 2 = light only |
| Section layouts | REQUIREMENTS SECT-01..04 + CONTEXT D-01..D-14 | Locked decisions D-01 to D-14 mapped |
| Mockup contracts | REQUIREMENTS MOCK-01, MOCK-02 + CONTEXT D-15..D-22 | Locked decisions D-15 to D-22 mapped |
| Copy | CONTEXT discretion + Pruma tone (CLAUDE.md) | Claude-authored within tone guardrails |
| Registry | Phase 1 UI-SPEC | Inherited (no shadcn, no third-party) |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
