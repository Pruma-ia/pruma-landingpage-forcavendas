# Phase 3: Full LP + Animations - Context

**Gathered:** 2026-05-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the complete 12-section landing page: implement the remaining 8 sections (Como Funciona, Painel do Gestor, Funcionalidades, Para Quem, Diferencial Pruma, Prova Social, CTA Final, Footer) and apply the full Framer Motion animation layer (scroll-triggered fade-up across all sections, counter animation on Prova Social numbers, hover states on cards and buttons). At the end of this phase, a visitor can scroll the complete LP from top to Footer.

</domain>

<decisions>
## Implementation Decisions

### Bento Grid — Funcionalidades (SECT-07)

- **D-01:** Layout structure: **1 hero card (col-span completo) + 5 cards menores**. Hero card full-width top row, 5 smaller cards in 2 rows below. Pattern: Linear/Stripe bento.
- **D-02:** Hero card feature: **Painel do Gestor em tempo real** — the `<PainelDashboard />` component (already built in Phase 2) renders inline inside the hero card. No new mockup needed.
- **D-03:** 5 smaller cards: **ícone lucide (top-left, 20px, 1.5px stroke) + título bold + descrição 2 linhas**. Same visual pattern as Diagnóstico cards.
- **D-04:** 6 features — **Claude defines all titles and descriptions** with Sábio+Mago tone. Themes: Painel em tempo real (hero), App do Vendedor em campo, Política comercial unificada, Curva ABC e priorização, Gestão de clientes em risco, Relatórios e visibilidade. Claude chooses final wording — no "Venda mais", no "plataforma all-in-one".

### Animation Layer (ANIM-01 / ANIM-02 / ANIM-03)

- **D-05:** Scope: **all sections** receive scroll-triggered fade-up (ANIM-01). Hero, Diagnóstico, Tese (Phase 2 sections) — add animation wrapper retroactively. Como Funciona → Footer — apply during this phase.
- **D-06:** Feel: **sutil e rápido** — `y: 24, opacity: 0 → 1`, duration 400ms, ease-out. Stagger 80ms between sibling items (list items, grid cards). Stripe/Linear aesthetic.
- **D-07:** Trigger: `whileInView` with `once: true` and `viewport={{ margin: "-60px" }}`. Respects `prefers-reduced-motion` via the existing globals.css rule.
- **D-08:** SECT-09 (dark Diferencial): **same fade-up animation**, only color scheme differs (white text on navy bg). No special treatment.
- **D-09:** ANIM-02 (counter): fires when Prova Social section enters viewport. Runs 0 → final value in 1.5s, easing out. Framer Motion `useInView` + `animate` controls.
- **D-10:** ANIM-03 (hover): cards `hover:translate-y-[-2px] hover:border-[#5CCFF5]` (already in Card component from Phase 1), buttons `hover:translate-y-[-1px]` + ciano glow shadow (already in Button). Verify both are wired.

### CTA Final — Formulário (SECT-11)

- **D-11:** Total inputs: **8 (6 text/email/tel/textarea fields + 2 selects)**. Not 10.
- **D-12:** 6 text fields — **Claude defines** following B2B standard: Nome, E-mail corporativo, Telefone, Empresa, Cargo, Desafio atual (textarea). Labels in Portuguese with Pruma tone.
- **D-13:** Select 1: **"Quantos vendedores em campo?"** — options: `1–5 / 6–15 / 16–30 / 30+`.
- **D-14:** Select 2: **"Segmento"** — options: `Indústria / Distribuidora / Atacado / Outro`.
- **D-15:** Success state: **card content swap inline**. On submit, form card fades out, success content fades in (✓ icon, headline "Recebemos seu contato.", subtext "Nossa equipe entra em contato em até 1 dia útil."). No redirect. Framer Motion `AnimatePresence` for the swap.
- **D-16:** No backend. `useState` managing `formState: 'idle' | 'success'`. On submit, `e.preventDefault()`, set state to `'success'`.

### Painel do Gestor — Callouts (SECT-06)

- **D-17:** Content: **4 insight provocativos** apontando para features específicas do PainelDashboard. Tom: conselheiro sênior que já viu esse problema. Not feature descriptions — provocation + insight.
- **D-18:** Layout: **2 callouts à esquerda + 2 à direita**, PainelDashboard no centro. 3-column grid on desktop. On mobile, callouts stack below mockup.
- **D-19:** Claude defines the 4 callout texts. Theme map:
  - Callout 1 (left top): risco de churn / clientes silenciosos
  - Callout 2 (left bottom): política comercial / desconto sem critério
  - Callout 3 (right top): curva ABC / priorização
  - Callout 4 (right bottom): pipeline / fechamento
  - Example style: "1 — Veja quem vai cancelar antes de cancelar." — numbered, 1 provocative line.

### Sections — Claude's Discretion

The following sections have no open gray areas. Claude implements per spec with Sábio+Mago tone:

- **SECT-05 Como Funciona**: fundo `#FAFAFA`, 2 colunas. Left: numbered list 4 itens com ícones lucide. Right: `<AppVendedor />` (already built). Claude defines the 4 step titles + 1-line descriptions. Usuário/campo perspective.
- **SECT-08 Para Quem**: fundo branco, 3 perfil cards. Indústria / Distribuidora / Empresa em transição. Claude writes headline, subheadline, short description per profile with specific revenue/team-size anchors.
- **SECT-09 Diferencial Pruma**: fundo `#0D1B4B` (only dark section), texto branco, eyebrow ciano, 3 pilares horizontais. Claude defines 3 pillars (método + tecnologia + implantação or similar). No gradients, no emoji.
- **SECT-10 Prova Social**: fundo branco. 3 placeholder logo slots + 3 Fraunces 64px ciano numbers (Claude picks plausible B2B metrics: e.g., "R$ 2,3M / mês", "94% adoção em 30 dias", "3h economizadas/vendedor/semana") + 1 depoimento card. ALL elements get `{/* TODO: substituir */}` comments + `id="prova-social"` anchor. Numbers should look credible, not aspirational.
- **SECT-12 Footer**: fundo `#0D1B4B`, logo branco "PRUMA" Fraunces, 3 colunas de links, linha base copyright. Claude defines link labels (Produto, Empresa, Contato columns or similar).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `.planning/phases/01-foundation/01-UI-SPEC.md` — Complete visual contract: palette, typography scale, shadow tokens, border-radius, eyebrow pattern, copywriting contract, banned words, tone guardrails. MANDATORY read.
- `tailwind.config.ts` — All Pruma tokens (`pruma.*`, `shadow-pruma-*`, `rounded-pruma-*`, spacing, animation). Source of truth for class names.
- `app/globals.css` — CSS custom properties, `prefers-reduced-motion` rule. Animation must respect it.

### Existing Primitives (Phase 1 + 2 output)
- `components/ui/Button.tsx` — primary + ghost variants, onClick forwarded to Link branch. Reuse as-is.
- `components/ui/Card.tsx` — base card with shadow/radius, hover translate + border-cyan. Reuse for all grid/bento cards.
- `components/ui/Eyebrow.tsx` — em-dash + UPPERCASE + cyan line. Reuse in all new sections.
- `components/ui/Container.tsx` — max-width wrapper. Reuse in all sections.
- `components/mockups/AppVendedor.tsx` — mobile-frame mockup. Import in SECT-05 right column.
- `components/mockups/PainelDashboard.tsx` — widescreen dashboard. Import in SECT-06 center and SECT-07 hero card. Already rendered in Hero — reuse same component.

### Copy & Constants
- `lib/constants.ts` — CTA_PRIMARY, CTA_SECONDARY, CTA_FORM already defined. All Phase 3 section copy MUST be added here following the existing export pattern. No hardcoded strings in JSX.

### Requirements
- `.planning/REQUIREMENTS.md` — SECT-05 through SECT-12, ANIM-01/02/03 definitions with exact specs (backgrounds, font sizes, data fields). Read before planning each section.
- `.planning/ROADMAP.md` — Phase 3 success criteria (5 must-haves).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `PainelDashboard` (built Phase 2): renders in Hero right column today. SECT-06 (Painel do Gestor) places it as the center mockup with callouts around it. SECT-07 (bento hero card) embeds it inline. Both sections can `import { PainelDashboard }` directly.
- `AppVendedor` (built Phase 2): SECT-05 (Como Funciona) right column. Import directly.
- `Button` primary: CTA in SECT-11 form, Diferencial CTA, Footer CTAs.
- `Card`: base for Funcionalidades bento cards, Para Quem profile cards. Override `className` for sizing.
- `Eyebrow`: use in all 8 new sections for section eyebrows.
- `Container`: use in all 8 new sections.

### Established Patterns
- Design tokens via Tailwind classes — no inline styles. `bg-pruma-cyan-pale`, `text-pruma-navy`, `shadow-pruma-md`, `rounded-pruma-lg` etc.
- Fraunces via `font-serif` Tailwind class (maps to `var(--font-fraunces)`).
- All copy via `lib/constants.ts` — no hardcoded visible strings in JSX.
- Server Components by default — only `"use client"` when using hooks or browser events (form state, animations with `useInView`).
- `lucide-react` icons: `strokeWidth={1.5}`, 20px for cards, 24px for hero areas.

### Integration Points
- `app/page.tsx`: append 8 new section imports and JSX after `<Tese />`. Order: Hero, Diagnostico, Tese, ComoFunciona, PainelGestor, Funcionalidades, ParaQuem, Diferencial, ProvaSocial, CTAFinal, Footer.
- `lib/constants.ts`: add exports for each new section (COMO_FUNCIONA, PAINEL_GESTOR, FUNCIONALIDADES, PARA_QUEM, DIFERENCIAL, PROVA_SOCIAL, CTA_FINAL, FOOTER).
- Animation: wrap section inner content with Framer Motion `motion.div` where needed. Use `whileInView` + `variants` pattern. No `useEffect` for simple scroll animations.

</code_context>

<specifics>
## Specific Ideas

- **Bento hero card**: PainelDashboard renders at reduced scale inside the hero card. Use `transform: scale(0.7)` or `zoom: 0.7` with overflow hidden on the card. Should feel like a "window" into the product.
- **SECT-06 callout style**: numbered callout = `span` with number (Fraunces, navy, large) + 1-line provocative text (Inter, gray-text, small). Connected to mockup visually with a subtle line or just spatial proximity. No arrows/SVG lines (complex to implement well).
- **Success state swap**: `AnimatePresence` wraps two states — form content and success content. `exit` animation on form, `initial→animate` on success message. Keeps card dimensions stable (no layout shift).
- **Dark section (SECT-09)**: all text white. Eyebrow component needs to render with `text-white` override on the label text and white horizontal line — pass `light` variant prop or override via className.
- **Prova Social numbers**: use integer values for counter animation (fractions don't animate cleanly). Example candidates: "847 empresas", "R$ 1.2bi gerenciados", "94% adoção".

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 3-Full LP + Animations*
*Context gathered: 2026-05-07*
