# Phase 2: Hero Experience - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the complete above-fold experience: Navbar (sticky, scroll-blur, mobile hamburger), Hero (headline + 2 CTAs + PainelDashboard mockup), Diagnóstico (3 cards on cyan-pale), and Tese Pruma (editorial centered). Plus both HTML/CSS mockup components (AppVendedor MOCK-01, PainelDashboard MOCK-02). A visitor landing cold must immediately see a credible, premium B2B product.

</domain>

<decisions>
## Implementation Decisions

### Navbar
- **D-01:** Mobile behavior — hamburger + drawer. `lucide-react` Menu icon opens overlay with full link list + CTA. Close with X icon.
- **D-02:** Nav links — Claude decides labels (e.g., "Como funciona · Funcionalidades · Para quem · Contato") as anchor links to Phase 3 sections. 4 links max.
- **D-03:** Scroll behavior — backdrop-blur-md activates at scroll > 8px (per SECT-01 requirement).

### Hero
- **D-04:** Mockup treatment — PainelDashboard **completo** (MOCK-02 full component) rendered inline on the right column. Not a stub or simplified version.
- **D-05:** Mockup container — painel flutuante: `rounded-pruma-lg` (16px), `shadow-pruma-md`, slight visual elevation. Style reference: Stripe/Linear. No browser chrome frame.
- **D-06:** Mobile layout (< 768px) — PainelDashboard stacks **below** headline + CTAs. Mockup is not hidden on mobile.
- **D-07:** Headline copy — Claude derives from brief. 2 lines, Fraunces 72px, navy. Core value: "Operações comerciais B2B que precisam parar de improvisar." Adapt to 2-line scan rhythm. Tone: Sábio 60% + Mago 40%.
- **D-08:** Subheadline — Claude writes. Inter, target C-level Diretor Comercial/CFO reader. Single sentence, max 100 chars.
- **D-09:** Microcopy below CTAs — JetBrains Mono, UPPERCASE, `·` separators. Claude derives. Example pattern: "SEM CONTRATO · IMPLANTAÇÃO EM 30 DIAS · DADO REAL DE OPERAÇÃO".

### Diagnóstico
- **D-10:** Cards include title + 1–2 line description. Not title-only. Claude writes descriptions with surgical consultant tone ("já viu esse problema antes"). No generic filler.
- **D-11:** 3 card titles (locked by REQUIREMENTS.md): Visibilidade tardia / Política comercial fragmentada / Fechamento planilha.
- **D-12:** Icons — lucide-react, thin stroke 1.5px. Claude selects appropriate icon per pain point (max one cyan icon per group, rest navy).

### Tese Pruma
- **D-13:** Headline (locked): "Força de vendas não é um app."
- **D-14:** Body paragraph — Claude writes. Inter 19px, max-width 720px, centered. Tone: affirmative provocation about governance vs. productivity. No "automatize", no "plataforma all-in-one". Distinguishes Pruma method from generic SaaS.

### Mockup Data

#### MOCK-01: AppVendedor
- **D-15:** Client: Auto Center São Paulo Ltda. Total: R$18.420,00. Discount: 3%. Status: 🟢 Online. Button: "Fechar pedido".
- **D-16:** 8 product items — Claude selects realistic auto-parts/distribution products with qty + unit price summing to R$18.420,00 before 3% discount (pre-discount total ~R$18.989,69).
- **D-17:** Component dimensions: max-width 380px, `rounded-pruma-lg` (16px), mobile-first.

#### MOCK-02: PainelDashboard
- **D-18:** 4 KPI cards — Claude selects metrics + values realistic for B2B distributor mid-market (R$50M–300M). Examples: Pedidos Hoje, Ticket Médio, Clientes Ativos, Meta do Mês %. Values must look operational, not aspirational.
- **D-19:** "Clientes em risco" table — 3 rows, Claude creates fictional Brazilian B2B company names with status (Crítico/Atenção), days without order, and value at risk. Realistic, not toy data.
- **D-20:** Brazil map — cyan points on main industrial capitals: São Paulo, Belo Horizonte, Curitiba, Porto Alegre, Recife + 2–3 more. Point size proportional to volume.
- **D-21:** ABC curve — bar chart. Claude picks axis labels + bar values consistent with a real ABC distribution (Pareto: ~20% clients = ~80% revenue).
- **D-22:** Dashboard widescreen style: Stripe-inspired header with filters, KPI row, ABC + map row, risk table. `rounded-pruma-lg` container.

### Claude's Discretion
- Nav link labels (exact text) — use "Como funciona · Funcionalidades · Para quem · Contato" unless context suggests otherwise
- Hero headline exact wording — derive from brief core value with 2-line rhythm
- Hero subheadline and microcopy — derive from brief tone + target reader
- Diagnóstico card descriptions — 1–2 lines each, surgical pain point framing
- Tese body paragraph — affirmative, insight-led, distinguishes governance from productivity
- MOCK-01 product names and individual prices
- MOCK-02 exact KPI values, company names in risk table, map city coordinates
- Lucide icon selection per card/section

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `.planning/phases/01-foundation/01-UI-SPEC.md` — Complete visual contract: palette, typography scale, shadow tokens, border-radius, eyebrow pattern, copywriting contract, banned words, tone guardrails. MANDATORY read.
- `tailwind.config.ts` — All Pruma tokens (`pruma.*`, `shadow-pruma-*`, `rounded-pruma-*`, spacing, animation). Source of truth for class names.
- `app/globals.css` — CSS custom properties, `prefers-reduced-motion` rule, h1–h4 font family override.

### Existing Primitives (Phase 1 output)
- `components/ui/Button.tsx` — primary + ghost variants, icon slots, Link-aware. Reuse as-is.
- `components/ui/Card.tsx` — base card with shadow/radius. Reuse for Diagnóstico cards.
- `components/ui/Eyebrow.tsx` — em-dash + UPPERCASE + cyan line. Reuse in all sections.
- `components/ui/Container.tsx` — max-width wrapper. Reuse in all sections.

### Copy & Constants
- `lib/constants.ts` — CTA_PRIMARY ("Falar com um consultor"), CTA_SECONDARY ("Conhecer o app"), CTA_FORM. Section copy added in this phase must be appended here following the existing pattern.

### Requirements
- `.planning/REQUIREMENTS.md` — SECT-01, SECT-02, SECT-03, SECT-04, MOCK-01, MOCK-02 definitions with exact specs (scroll threshold, font sizes, backgrounds, data fields).
- `.planning/ROADMAP.md` — Phase 2 success criteria (5 must-haves).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Button` (primary + ghost): ready. Use for Navbar CTA and Hero CTAs.
- `Eyebrow`: ready. Use in Navbar (brand label), Hero, Diagnóstico, Tese.
- `Card`: ready. Use as base for Diagnóstico cards. May need `variant="diagnostic"` prop or className override for icon slot.
- `Container`: ready. Wrap all section content.
- `lib/utils.ts` + `cn()`: available for className composition.

### Established Patterns
- Design tokens accessed via Tailwind classes (`bg-pruma-cyan-pale`, `text-pruma-navy`, etc.) — no inline styles.
- Fraunces served via `var(--font-fraunces)` CSS variable → `font-serif` Tailwind class.
- Reduced-motion media query already in globals.css — Framer Motion animations must respect it.
- Shadow pattern: `shadow-pruma-sm` for cards, `shadow-pruma-md` for elevated/mockup containers.

### Integration Points
- `app/page.tsx` — currently blank or minimal; Phase 2 sections compose here.
- `app/layout.tsx` — Navbar will likely be placed here (renders on all routes, outside `<main>`).
- New files needed: `components/Navbar.tsx`, `components/Hero.tsx`, `components/Diagnostico.tsx`, `components/Tese.tsx`, `components/mockups/AppVendedor.tsx`, `components/mockups/PainelDashboard.tsx`.

</code_context>

<specifics>
## Specific Ideas

- PainelDashboard in Hero: painel flutuante com slight rotation/tilt (Stripe/Linear style) — `shadow-pruma-md`, `rounded-pruma-lg`, rendered as the real MOCK-02 component at a scaled viewport.
- AppVendedor: mobile tela framing, status badge com `🟢 Online` inside mockup only (emojis banned in LP copy, allowed inside mockup status).
- Navbar hamburger: lucide `Menu` icon (1.5px stroke), opens full-width drawer overlay with links + CTA. `X` to close.
- Diagnóstico cards: icon top-left (lucide, navy), title bold, description muted `pruma.gray-text`. Background section: `bg-pruma-cyan-pale`.
- Tese Pruma: no cards, no icons — pure editorial. Headline centered Fraunces 56px, body Inter 19px centered max-w-[720px]. White background.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-Hero Experience*
*Context gathered: 2026-05-06*
