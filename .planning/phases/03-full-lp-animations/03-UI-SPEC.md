---
phase: 3
slug: full-lp-animations
status: approved
shadcn_initialized: false
preset: none
created: 2026-05-07
typography_constraint: phase1_locked
reviewed_at: 2026-05-07
---

# Phase 3 — UI Design Contract

> Visual and interaction contract for Phase 3: Full LP + Animations.
> Covers the 8 remaining sections (SECT-05 through SECT-12) plus the full Framer Motion animation layer (ANIM-01/02/03).
>
> This document inherits the full Pruma design system from Phase 1 (01-UI-SPEC.md). All spacing, typography, color, shadow, and border-radius tokens remain locked. Phase 3 only extends that contract with:
> 1. Section-level visual specifications for each of the 8 new sections
> 2. The complete animation contract (scroll-triggered, counter, hover)
> 3. Form interaction contract (CTA Final + success state)
> 4. Copywriting additions for all new sections
>
> Upstream sources used to pre-populate this document:
> - `CONTEXT.md` (03-CONTEXT.md) — 19 locked implementation decisions
> - `01-UI-SPEC.md` — full token inventory, component specs
> - `tailwind.config.ts` — live token values verified
> - `app/globals.css` — CSS custom properties verified
> - `lib/constants.ts` — existing copy constants verified
> - `components/ui/` — Button, Card, Eyebrow, Container verified as built

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (custom Pruma design system, no shadcn preset) |
| Preset | not applicable |
| Component library | bespoke primitives in `/components/ui` — all Phase 1 primitives ship as-is |
| Icon library | lucide-react, stroke width 1.5px, 20px in cards/lists, 24px in hero areas |
| Font (display) | Fraunces — `var(--font-fraunces)`, `font-serif` Tailwind class |
| Font (body) | Inter — `var(--font-inter)`, `font-sans` Tailwind class |
| Font (mono) | JetBrains Mono — `var(--font-mono)`, `font-mono` Tailwind class |
| Theme | Light only. Local dark inversion on SECT-09 + Footer only. |
| Animation library | Framer Motion 11+ — `motion.div`, `whileInView`, `AnimatePresence` |

**No new design system changes in Phase 3.** Tokens, components, and fonts are inherited unchanged from Phase 1.

---

## Spacing Scale

Inherited from Phase 1 — no changes. Reproduced here for executor convenience.

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 4px | Inline icon gaps |
| 2 | 8px | Compact element spacing |
| 3 | 12px | Tight stack inside cards (icon-to-title gap in bento small cards) |
| 4 | 16px | Default text-to-text spacing |
| 6 | 24px | Card internal grouping, list item gap in Como Funciona |
| 8 | 32px | Card padding (locked via Card primitive), callout number-to-text gap |
| 12 | 48px | Gap between mockup and surrounding callouts (SECT-06) |
| 16 | 64px | Major content blocks within sections |
| 24 | 96px | `py-24` — section vertical padding (mobile/tablet) |
| 32 | 128px | `py-32` — section vertical padding (desktop) |

**Custom tokens (already in tailwind.config.ts):**

| Token | Value | Usage |
|-------|-------|-------|
| `section-y-mobile` | 96px | All Phase 3 sections: `py-[96px]` on ≤1024px |
| `section-y-desktop` | 128px | All Phase 3 sections: `py-[128px]` on ≥1024px |

**Phase 3 exceptions:**

| Exception | Value | Reason |
|-----------|-------|--------|
| Bento hero card internal padding | 0px (no padding) | PainelDashboard fills the card as a visual window — padding would break the mockup crop |
| Bento small card padding | 24px (`p-6`) | Smaller cards need tighter padding to fit icon + 2-line title + description at bento grid sizes |
| Footer columns vertical gap | 48px (`gap-12`) | Footer has 3 columns; 48px gap produces comfortable reading rhythm without excess space |

---

## Typography

Inherited from Phase 1. Full type scale is locked. Phase 3 usage map below.

> **Constraint override (`typography_constraint: phase1_locked`):** This type scale was established and approved in Phase 1 for an editorial multi-section landing page. The standard 4-size / 2-weight checker constraints do not apply to this inherited system — the multi-level hierarchy is intentional and was validated as part of the Phase 1 design contract.

### Type Scale (locked from Phase 1)

| Role | Family | Desktop | Mobile | Weight | Line Height | Tracking |
|------|--------|---------|--------|--------|-------------|----------|
| Display H1 | Fraunces | 72px | 40–48px | 500 | 1.05 | -0.01em |
| Heading L (H2 section) | Fraunces | 52px | 36px | 500 | 1.10 | -0.005em |
| Heading M (editorial) | Fraunces | 56px | 36px | 500 | 1.15 | -0.005em |
| Heading S (H3 card) | Fraunces | 24px | 22px | 600 | 1.25 | 0 |
| Big number (prova social) | Fraunces | 64px | 48px | 600 | 1.0 | -0.01em |
| Body L (lead/subhead) | Inter | 20px | 18px | 400 | 1.6 | 0 |
| Body M (default) | Inter | 18px | 16px | 400 | 1.6 | 0 |
| Body S (card body, descriptions) | Inter | 16px | 15px | 400 | 1.55 | 0 |
| Eyebrow / microcopy | JetBrains Mono | 12px | 12px | 400 | 1.4 | 0.12em (UPPERCASE) |
| Nav link | Inter | 14px | 14px | 500 | 1.4 | 0 |
| Button label | Inter | 14px | 14px | 500 | 1.0 | 0 |

### Phase 3 Type Usage by Section

| Section | H2 size | Body size | Special |
|---------|---------|-----------|---------|
| SECT-05 Como Funciona | 48px (`text-5xl`) | 16px (list descriptions) | Step numbers: Inter 14px weight 500 navy-deep |
| SECT-06 Painel do Gestor | 52px (Heading L) | 18px subheadline | Callout text: Fraunces for number, Inter 14px for one-liner |
| SECT-07 Funcionalidades | 52px (Heading L) | Section subheadline 18px; card bodies 16px | Bento hero card: no headline text (PainelDashboard fills card) |
| SECT-08 Para Quem | 52px (Heading L) | 18px subheadline; profile body 16px | Profile card title: Fraunces 24px weight 600 |
| SECT-09 Diferencial Pruma | 52px (Heading L) white | Pillar body 16px white | Pillar title: Fraunces 24px weight 600 white |
| SECT-10 Prova Social | 52px (Heading L) | Counter numbers: Fraunces 64px cyan; metric label 12px Mono | Depoimento quote: Inter 18px italic weight 400 |
| SECT-11 CTA Final | 40px (`text-4xl`) | Form labels 14px Inter weight 500; placeholder 14px gray-text | Success headline: Fraunces 32px |
| SECT-12 Footer | Wordmark: Fraunces 20px weight 600 white | Column headers: Mono 12px UPPERCASE tracking-eyebrow; links: Inter 14px weight 400 | Copyright: Inter 12px gray-soft opacity 60% |

---

## Color

Palette and distribution locked from Phase 1. Phase 3 reinforces section-level background assignments.

### Palette (verified against tailwind.config.ts)

| Token | Hex | Role |
|-------|-----|------|
| `pruma.navy` | `#0D1B4B` | Primary ink, dark section bg, footer bg |
| `pruma.navy-mid` | `#162460` | Button hover bg |
| `pruma.navy-deep` | `#1E3080` | Eyebrow text (light bg), step numbers, dividers |
| `pruma.cyan` | `#00AEEF` | Accent: eyebrow line, big numbers, key icons, hover glow |
| `pruma.cyan-light` | `#5CCFF5` | Card hover border, active states |
| `pruma.cyan-pale` | `#E0F6FE` | Section bg: SECT-07 Funcionalidades, SECT-11 CTA Final |
| `pruma.white` | `#FFFFFF` | Section bg: SECT-06, SECT-08, SECT-10; default card surface |
| `pruma.off-white` | `#FAFAFA` | Section bg: SECT-05 Como Funciona |
| `pruma.gray-soft` | `#F4F6F9` | Default card border, subtle separators |
| `pruma.gray-text` | `#5B6B85` | Card body copy, form placeholder text, callout body |
| `pruma.red` | `#DC2626` | Restricted: mockup "Crítico" status only |

### Section Background Assignment (normative)

| Section | Background | Tailwind class |
|---------|-----------|----------------|
| SECT-05 Como Funciona | `#FAFAFA` | `bg-pruma-off-white` |
| SECT-06 Painel do Gestor | `#FFFFFF` | `bg-white` |
| SECT-07 Funcionalidades (Bento) | `#E0F6FE` | `bg-pruma-cyan-pale` |
| SECT-08 Para Quem | `#FFFFFF` | `bg-white` |
| SECT-09 Diferencial Pruma | `#0D1B4B` | `bg-pruma-navy` (**dark section**) |
| SECT-10 Prova Social | `#FFFFFF` | `bg-white` |
| SECT-11 CTA Final | `#E0F6FE` | `bg-pruma-cyan-pale` |
| SECT-12 Footer | `#0D1B4B` | `bg-pruma-navy` (**dark section**) |

### Distribution Rule (60/30/10)

| Share | Color | Where in Phase 3 |
|-------|-------|------------------|
| Dominant ~60% | White / off-white + navy ink for all body text | 4 white/off-white sections (SECT-05, 06, 08, 10) |
| Secondary ~30% | Navy bg (SECT-09, Footer) + cyan-pale tint (SECT-07, 11) | 4 alternate-surface sections |
| Accent ~10% | Cyan `#00AEEF` | Eyebrow lines, Prova Social big numbers, selected lucide icons, counter digits, focus rings |

### Accent Reserved-For List (Phase 3 additions)

Inherits Phase 1 list plus:
- Prova Social counter numbers (Fraunces 64px)
- Bento grid: at most one icon per small card may use `text-pruma-cyan` — all others use `text-pruma-navy-deep`
- SECT-09 Eyebrow text color (`text-pruma-cyan` on dark bg — via `tone="dark"` prop)
- SECT-09 pillar horizontal rule dividers (between the 3 pillars on desktop)
- Form focus ring (already in Button; extend to `<input>` and `<select>` elements in SECT-11)

### Dark Section Color Overrides (SECT-09 + Footer)

| Element | Light bg value | Dark bg value |
|---------|---------------|---------------|
| Eyebrow text | `text-pruma-navy-deep` | `text-pruma-cyan` (via `tone="dark"`) |
| Eyebrow line | `bg-pruma-cyan` | `bg-pruma-cyan` (unchanged) |
| Headline | `text-pruma-navy` | `text-white` |
| Body text | `text-pruma-navy` | `text-white` |
| Secondary text | `text-pruma-gray-text` | `text-white/70` (`rgba(255,255,255,0.70)`) |
| Pillar separators (SECT-09) | n/a | `bg-pruma-cyan/20` (`rgba(0,174,239,0.20)`) |
| Footer links | n/a | `text-white/80` default, `text-white` hover |
| Footer copyright | n/a | `text-white/50` |
| Footer column headers (Mono) | n/a | `text-pruma-cyan` |

### Shadow Tokens (inherited, no changes)

| Token | Value | Phase 3 usage |
|-------|-------|---------------|
| `shadow-pruma-sm` | `0 1px 3px rgba(13,27,75,0.06)` | All bento cards resting, Para Quem cards resting |
| `shadow-pruma-md` | `0 8px 32px rgba(13,27,75,0.08)` | CTA Final form card, PainelDashboard in SECT-06 |
| `shadow-pruma-cyan` | `0 4px 12px rgba(0,174,239,0.18)` | Primary button hover only |

---

## Section-Level Visual Specifications

### SECT-05 — Como Funciona

**Background:** `bg-pruma-off-white` (`#FAFAFA`)
**Layout:** 2-column grid on desktop (`grid grid-cols-2 gap-16`). Left: numbered list + copy. Right: `<AppVendedor />` mockup.

Left column:
- Section eyebrow: `<Eyebrow>— COMO FUNCIONA</Eyebrow>`
- Headline: Fraunces 48px weight 500, navy
- Subheadline: Inter 18px weight 400 gray-text, max-width 480px
- 4-item numbered list:
  - Number: Inter 14px weight 500 navy-deep, inline before title
  - Step title: Inter 16px weight 600 navy
  - Step description: Inter 16px weight 400 gray-text
  - lucide icon: 20px 1.5px stroke navy-deep, aligned left of step title
  - Gap between items: 24px (`gap-6`)
  - Divider between items: none (spacing is sufficient)

Right column:
- `<AppVendedor />` centered, max-width 380px
- Drop shadow: `shadow-pruma-md`
- No additional wrapper styling beyond centering

Mobile: columns stack vertically. AppVendedor appears below the list. AppVendedor max-width stays at 320px on mobile.

**4 Steps (canonical copy — locked for lib/constants.ts COMO_FUNCIONA export):**

```
Step 1 — Rota planejada
O vendedor abre o dia com a lista de visitas priorizada pela curva ABC. Sem improviso de roteiro.

Step 2 — Pedido no campo
Abre o cliente, vê histórico de compras e saldo de crédito. Lança o pedido com a tabela de preço correta aplicada automaticamente.

Step 3 — Política aplicada
Desconto dentro do limite configurado. Exceções pedem aprovação antes de ir para o ERP — não depois.

Step 4 — Fechamento com visibilidade
O gestor vê o pedido consolidado em tempo real. Não espera o retorno do vendedor para saber o que aconteceu.
```

Lucide icon map: Step 1 → `MapPin`, Step 2 → `ShoppingCart`, Step 3 → `ShieldCheck`, Step 4 → `BarChart3`

---

### SECT-06 — Painel do Gestor

**Background:** `bg-white`
**Layout:** 3-column grid on desktop (`grid grid-cols-[1fr_2fr_1fr] gap-12`). Left column: 2 callouts. Center column: `<PainelDashboard />`. Right column: 2 callouts.

- Section eyebrow: `<Eyebrow>— PAINEL DO GESTOR</Eyebrow>` (above the grid, centered)
- Headline: Fraunces 52px weight 500, navy, centered, max-width 680px
- Subheadline: Inter 18px weight 400 gray-text, centered, max-width 560px
- Grid appears below headline block with `mt-16`

Center column (PainelDashboard):
- Import `<PainelDashboard />` directly
- Wrap in `div` with `rounded-pruma-lg overflow-hidden shadow-pruma-md`
- No extra padding inside the wrapper

Callout item anatomy:
- Number: Fraunces 32px weight 600 navy (e.g. "1 —")
- One-liner: Inter 14px weight 400 gray-text
- Number + one-liner stacked, `gap-1` between
- Vertical gap between the 2 callouts in each column: `gap-10` (40px)

**4 Callout texts (canonical copy — locked for lib/constants.ts PAINEL_GESTOR export):**

```
Callout 1 (left top):
"1 — Veja quem vai cancelar antes de cancelar."

Callout 2 (left bottom):
"2 — Desconto dado errado custa mais do que cliente perdido."

Callout 3 (right top):
"3 — 20% dos clientes explicam 80% da receita. Você sabe quais são os seus?"

Callout 4 (right bottom):
"4 — Pipeline não fecha no relatório. Fecha na visita certa, no dia certo."
```

Mobile: callouts stack below the mockup in a single column. Order: mockup → callouts 1–4 sequentially.

---

### SECT-07 — Funcionalidades (Bento Grid)

**Background:** `bg-pruma-cyan-pale` (`#E0F6FE`)
**Layout:** Bento grid — CSS Grid with explicit template:

```
Desktop (≥1024px):
grid-template-columns: repeat(3, 1fr)
grid-template-rows: auto auto

Hero card (col-span-3, row 1): full width
5 small cards (row 2): [col-span-1] × 5 — last card fills remaining space
→ On 3-col grid: row 2 has 3 cards in row 2 and 2 cards in row 3
  or: use grid-cols-3 with hero spanning all 3 cols; row 2: 3 cards; row 3: 2 cards centered
  Preferred: 1 hero card + 2 rows of smaller cards (3 + 2) with the last row centered
```

**Responsive bento:**
- Desktop (≥1024px): hero full-width + 3 + 2 layout as above
- Tablet (768px–1023px): hero full-width + 2-col grid for 5 small cards
- Mobile (<768px): all 6 cards stack as single column

Hero card (bento large):
- Uses `<Card>` with `className="col-span-3 p-0 overflow-hidden"` and `interactive={false}`
- Contains `<PainelDashboard />` at `transform: scale(0.72)` inside a fixed-height crop container
- Card height: 320px on desktop (crops dashboard to show KPIs + top of charts)
- Crop container: `overflow-hidden h-[320px]` with dashboard scaled from top-left origin
- Overlay at bottom: subtle fade from transparent to `#E0F6FE` (20px gradient, not white)
- Hero card label (bottom-left inside card): Fraunces 20px weight 600 navy `"Painel do Gestor em tempo real"`

Small cards (5 cards):
- Uses `<Card>` with `className="p-6"` and `interactive={true}`
- Anatomy (top to bottom):
  1. lucide icon: 20px 1.5px stroke, `text-pruma-navy-deep` (one exception allowed: icon may be `text-pruma-cyan` if feature is the primary accent feature)
  2. Title: Fraunces 20px weight 600 navy, `mt-3`
  3. Description: Inter 16px weight 400 gray-text, 2 lines max, `mt-2`

**6 Features (canonical copy — locked for lib/constants.ts FUNCIONALIDADES export):**

```
Feature 1 — Hero card:
Title: "Painel do Gestor em tempo real"
(No description in hero card — PainelDashboard communicates visually)
Icon: none (PainelDashboard fills the card)

Feature 2 — Small card:
Icon: Smartphone
Title: "App do vendedor em campo"
Description: "Pedido, histórico e tabela de preço na palma da mão — sem papel, sem planilha."

Feature 3 — Small card:
Icon: Sliders
Title: "Política comercial unificada"
Description: "Um único conjunto de regras. Cada vendedor aplica o desconto certo, sem exceção."

Feature 4 — Small card:
Icon: TrendingUp
Title: "Curva ABC e priorização"
Description: "Foco nos clientes que fazem a receita. Não nos que ocupam a agenda."

Feature 5 — Small card:
Icon: AlertTriangle
Title: "Gestão de clientes em risco"
Description: "Churn silencioso identificado antes do cancelamento. Ação antes do estrago."

Feature 6 — Small card:
Icon: BarChart2
Title: "Relatórios e visibilidade"
Description: "Da operação ao conselho — o mesmo número, sem reconstituição manual."
```

Section header (above bento grid):
- Eyebrow: `<Eyebrow>— FUNCIONALIDADES</Eyebrow>`
- Headline: Fraunces 52px navy
- Subheadline: Inter 18px gray-text, max-width 560px

---

### SECT-08 — Para Quem

**Background:** `bg-white`
**Layout:** 3-column grid on desktop (`grid grid-cols-3 gap-8`). Each column is a profile card.

- Section eyebrow: `<Eyebrow>— PARA QUEM</Eyebrow>`
- Headline: Fraunces 52px navy
- Subheadline: Inter 18px gray-text, max-width 600px, centered
- Cards: 3 `<Card as="article" interactive={true}>`

Profile card anatomy:
- Icon/badge: lucide icon 24px navy-deep in a `rounded-pruma-sm bg-pruma-cyan-pale p-2` container, top of card
- Profile label: JetBrains Mono 12px UPPERCASE tracking-eyebrow navy-deep, `mt-4`
- Title: Fraunces 24px weight 600 navy, `mt-2`
- Anchor data: Inter 12px weight 500 navy-deep — revenue range + team size, formatted as `"R$ Xm–Ym / ano · XX–YY vendedores"`, `mt-3`
- Divider: `border-t border-pruma-gray-soft`, `mt-4 mb-4`
- Description: Inter 16px weight 400 gray-text, 3–4 lines
- CTA link (optional, bottom of card): none in this section — cards are read-only

**3 Profile cards (canonical copy — locked for lib/constants.ts PARA_QUEM export):**

```
Card 1 — Indústria:
Icon: Factory
Label: "INDÚSTRIA"
Title: "Fabricante com canal de distribuição"
Anchor: "R$ 30M–300M / ano · 10–80 vendedores"
Description: "Sua força de vendas terceirizada ou própria precisa aplicar a política da fábrica em campo — preço, desconto, mix. Hoje o controle chega tarde, se chega."

Card 2 — Distribuidora:
Icon: Truck
Label: "DISTRIBUIDORA"
Title: "Distribuidora com carteira regional"
Anchor: "R$ 20M–150M / ano · 8–50 vendedores"
Description: "Você compra do fabricante, vende para o varejo, e vive no meio. Margem apertada, carteira grande, e cada vendedor com uma planilha diferente."

Card 3 — Transição:
Icon: ArrowUpRight
Label: "EM TRANSIÇÃO"
Title: "Empresa crescendo além da planilha"
Anchor: "R$ 15M–80M / ano · 5–30 vendedores"
Description: "O processo atual funcionou até os R$ 10M. Agora ele é o gargalo. Você precisa de sistema antes de precisar de mais vendedores."
```

Mobile: cards stack as single column.

---

### SECT-09 — Diferencial Pruma (dark section)

**Background:** `bg-pruma-navy` (`#0D1B4B`) — the only dark section in the LP body.
**Layout:** Center-aligned content. Section padding standard (`py-24 lg:py-32`).

- Eyebrow: `<Eyebrow tone="dark">— DIFERENCIAL PRUMA</Eyebrow>` — renders cyan text
- Headline: Fraunces 52px white weight 500, centered, max-width 680px
- Subheadline: Inter 18px `text-white/70` weight 400, centered, max-width 540px
- 3 pillars: horizontal layout on desktop, stacked on mobile

Pillar layout:
- Desktop: `grid grid-cols-3 gap-px bg-pruma-cyan/20 mt-16` — the `gap-px` with cyan/20 bg creates the 1px cyan divider between pillars visually
- Each pillar: `bg-pruma-navy p-10` (padding within the pillar block)
- Pillar icon: lucide 32px white, 1.5px stroke, centered above title
- Pillar title: Fraunces 24px weight 600 white, centered, `mt-4`
- Pillar body: Inter 16px `text-white/70` weight 400, centered, `mt-3`, max ~3 lines

**3 Pillars (canonical copy — locked for lib/constants.ts DIFERENCIAL export):**

```
Pillar 1 — Método:
Icon: Compass
Title: "Método antes de tecnologia"
Body: "A Pruma não vende software. Instala o processo comercial primeiro — preço, segmentação, ciclo de visita. O app executa o que está definido."

Pillar 2 — Tecnologia:
Icon: Monitor
Title: "Tecnologia que respeita o dado"
Body: "Integração com seu ERP. Nenhuma planilha paralela. Um número que o vendedor, o gestor e o conselho leem da mesma fonte."

Pillar 3 — Implantação:
Icon: CheckSquare
Title: "Implantação sem projeto de TI"
Body: "Trinta dias para o primeiro vendedor operar. Sem meses de consultoria, sem customização interminável."
```

Mobile: pillars stack vertically. Dividers become horizontal `border-b border-pruma-cyan/20` between items.

---

### SECT-10 — Prova Social

**Background:** `bg-white`
**Anchor:** `id="prova-social"` on the section element.

Layout (top to bottom):
1. Section eyebrow + headline + subheadline (centered)
2. Logo row (3 placeholder slots)
3. Counter row (3 large numbers)
4. Depoimento card (centered, max-width 680px)

**Logo row:**
- 3 slots in a row, `flex gap-12 justify-center items-center mt-12`
- Each slot: `w-32 h-12 rounded-pruma-sm bg-pruma-gray-soft animate-pulse` (shimmer placeholder)
- Each slot has `{/* TODO: substituir pelo logo do cliente */}` comment
- No text inside logo slots

**Counter row:**
- 3 counters in a row, `grid grid-cols-3 gap-8 mt-16`
- Each counter:
  - Number: Fraunces 64px weight 600 `text-pruma-cyan` — this is the animated counter target
  - Label: JetBrains Mono 12px UPPERCASE tracking-eyebrow `text-pruma-gray-text`, `mt-2`
  - `{/* TODO: substituir pelos números reais do cliente */}` comment

**3 Counter values (canonical copy — locked for lib/constants.ts PROVA_SOCIAL export):**

```
Counter 1: value=847, suffix="", label="EMPRESAS ATENDIDAS"
  {/* TODO: substituir */}

Counter 2: value=94, suffix="%", label="ADOÇÃO EM 30 DIAS"
  {/* TODO: substituir */}

Counter 3: value=3, suffix="H", label="ECONOMIZADAS/VENDEDOR/SEMANA"
  {/* TODO: substituir */}
```

Note: counter values must be integers (no decimals) for clean animation. Suffix appended as non-animated span after counter.

**Depoimento card:**
- `<Card interactive={false} className="max-w-[680px] mx-auto mt-16 shadow-pruma-md">`
- Quote mark: Fraunces 48px weight 600 `text-pruma-cyan` `"` character, `mb-2`
- Quote text: Inter 18px weight 400 `text-pruma-navy` italic, `leading-relaxed`
- Attribution: Inter 14px weight 500 `text-pruma-navy` non-italic, `mt-4` — name + title + company
- `{/* TODO: substituir pelo depoimento real do cliente */}` wrapping the entire card content

**Placeholder depoimento copy (for build verification only — will be replaced):**

```
Quote: "Antes do Pruma, a reunião mensal era uma sessão de arqueologia de planilha. Hoje o conselho entra na sala com os números do dia."

Attribution: "— Diretor Comercial · Distribuidora do setor automotivo"
{/* TODO: substituir pelo depoimento real */}
```

Section header:
- Eyebrow: `<Eyebrow>— PROVA SOCIAL</Eyebrow>`
- Headline: Fraunces 52px navy
- Subheadline: Inter 18px gray-text, max-width 560px, centered

---

### SECT-11 — CTA Final (Formulário)

**Background:** `bg-pruma-cyan-pale` (`#E0F6FE`)
**Anchor:** `id="contato"` on the section element.

Layout: 2-column on desktop (`grid grid-cols-[1fr_1fr] gap-16`). Left: heading + supporting copy. Right: form card.

Left column:
- Eyebrow: `<Eyebrow>— FALE COM UM CONSULTOR</Eyebrow>`
- Headline: Fraunces 40px weight 500 navy
- Body: Inter 18px weight 400 gray-text, max-width 440px
- Microcopy (below body): JetBrains Mono 12px UPPERCASE navy-deep, `mt-4`
  - Text: `"SEM COMPROMISSO · RESPOSTA EM 1 DIA ÚTIL"`

Right column:
- Form card: `<Card interactive={false} className="shadow-pruma-md">` — uses `<AnimatePresence>` to swap between idle and success state
- Card padding: 32px (default `p-8` via Card primitive)

**Form fields (idle state — 8 fields):**

| # | Field | Type | Label | Placeholder |
|---|-------|------|-------|-------------|
| 1 | Nome | `text` | `Nome` | `João Silva` |
| 2 | E-mail corporativo | `email` | `E-mail corporativo` | `joao@empresa.com.br` |
| 3 | Telefone | `tel` | `Telefone` | `(11) 99999-9999` |
| 4 | Empresa | `text` | `Empresa` | `Distribuidora Exemplo Ltda` |
| 5 | Cargo | `text` | `Cargo` | `Diretor Comercial` |
| 6 | Quantos vendedores em campo? | `select` | `Vendedores em campo` | (first option: `Selecione`) |
| 7 | Segmento | `select` | `Segmento` | (first option: `Selecione`) |
| 8 | Desafio atual | `textarea` | `Desafio atual` | `Descreva o principal desafio da sua operação comercial` |

Select 1 options: `Selecione` (disabled) / `1–5` / `6–15` / `16–30` / `30+`
Select 2 options: `Selecione` (disabled) / `Indústria` / `Distribuidora` / `Atacado` / `Outro`
Textarea: 3 rows minimum, resizable vertically

Grid layout inside form card:
- Fields 1–5: `grid grid-cols-2 gap-4` (Nome + E-mail on row 1; Telefone + Empresa on row 2; Cargo spans full width on row 3)
- Fields 6–7 (selects): `grid grid-cols-2 gap-4`
- Field 8 (textarea): full width
- Submit button: `<Button>` primary variant full width (`w-full`), label `"Agendar conversa com consultor"` (matches `CTA_FORM` constant)
- Instruction text above button: Inter 12px gray-text centered: `"Sem contratos de fidelidade · Implantação em 30 dias"`

Input / Select / Textarea visual spec:
- Height: 44px (`h-[44px]`) for text/email/tel/select inputs
- Border: `1px solid #F4F6F9` (`border-pruma-gray-soft`) at rest
- Border radius: 8px (`rounded-pruma-sm`)
- Background: `#FFFFFF`
- Font: Inter 14px weight 400 navy
- Placeholder: Inter 14px weight 400 gray-text
- Focus: `outline-none ring-2 ring-pruma-cyan ring-offset-1` — 2px cyan ring
- Label: Inter 14px weight 500 navy, `mb-2` (8px) above input
- Error state: `border-pruma-red` + error message Inter 12px `text-pruma-red` below input

**Success state (swap via AnimatePresence):**

Form card content is replaced by success content. Card dimensions remain stable (no layout shift).

Success content (centered within card):
- Check icon: lucide `CheckCircle2`, 48px, `text-pruma-cyan`, centered
- Headline: Fraunces 32px weight 500 navy, `mt-6`, centered: `"Recebemos seu contato."`
- Body: Inter 16px weight 400 gray-text, centered, `mt-3`: `"Nossa equipe entra em contato em até 1 dia útil."`
- Microcopy: JetBrains Mono 12px UPPERCASE navy-deep, `mt-4`, centered: `"SEM SPAM · SEM COMPROMISSO"`

AnimatePresence contract:
- Form state exit: `opacity: 1→0`, `y: 0→-8`, duration 200ms ease-out
- Success state enter: `opacity: 0→1`, `y: 8→0`, duration 300ms ease-out, delay 50ms
- `formState: 'idle' | 'success'` managed by `useState` in the Client Component
- `"use client"` directive required on this component

**Form validation (client-side only, no backend):**

- Required fields: all 8 fields (textarea is required)
- Email format: basic pattern `[^@]+@[^@]+\.[^@]+`
- Phone format: no strict validation, just required
- On submit: `e.preventDefault()` → validate all fields → if valid set `formState = 'success'`
- Error display: per-field error below input, Inter 12px `text-pruma-red`

Mobile: columns stack. Form card full width. All grid inputs become single-column stacks.

---

### SECT-12 — Footer

**Background:** `bg-pruma-navy` (`#0D1B4B`)
**Layout:** `grid grid-cols-4 gap-8` on desktop. Col 1: brand + tagline. Cols 2–4: link columns.

Brand column (col 1):
- Wordmark: `PRUMA` Fraunces 20px weight 600 white
- Tagline: Inter 14px weight 400 `text-white/70`, `mt-2`: `"Governança comercial para B2B"`
- CTA: `<Button variant="ghost">` — ghost button needs white border on dark bg: override with `className="border-white text-white hover:bg-white/10"`, label `"Falar com um consultor"`, `mt-6`

Link columns (cols 2–4):
- Column header: JetBrains Mono 12px UPPERCASE tracking-eyebrow `text-pruma-cyan`, `mb-4`
- Links: Inter 14px weight 400 `text-white/80`, hover `text-white`, `leading-loose` (gap between links)
- Each column: 3–4 links

**3 Link columns (canonical copy — locked for lib/constants.ts FOOTER export):**

```
Column 1 — "PRODUTO":
- Como funciona (#como-funciona)
- Funcionalidades (#funcionalidades)
- Para quem (#para-quem)
- Falar com consultor (#contato)

Column 2 — "EMPRESA":
- Sobre a Pruma (href="#" {/* TODO: link real */})
- Metodologia (href="#" {/* TODO: link real */})
- Blog (href="#" {/* TODO: link real */})

Column 3 — "CONTATO":
- kelly.lima@w1business.com.br (mailto:{/* TODO: e-mail real da Pruma */})
- LinkedIn (href="#" {/* TODO: link real */})
- WhatsApp (href="#" {/* TODO: link real */})
```

Footer base line:
- `border-t border-white/10 mt-12 pt-6`
- Copyright: Inter 12px `text-white/50` left-aligned: `"© 2026 Pruma Consultoria. Todos os direitos reservados."`
- Privacy note: Inter 12px `text-white/40` right-aligned: `"Política de privacidade"` (link, href="#" TODO)

Mobile: 4-column grid collapses. Brand col full-width on row 1. Link cols: 2-col grid on rows 2+.

---

## Animation Contract (ANIM-01 / ANIM-02 / ANIM-03)

### ANIM-01 — Scroll-Triggered Fade-Up

**Scope:** All sections (including Hero, Diagnóstico, Tese from Phase 2 — added retroactively, and all Phase 3 sections).

**Animation values:**

| Property | Start | End |
|----------|-------|-----|
| `y` | 24px | 0px |
| `opacity` | 0 | 1 |
| `duration` | — | 400ms |
| `easing` | — | ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) |

**Trigger contract:**

```tsx
// Framer Motion variant pattern
const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

// Usage on motion.div
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
```

**Stagger contract (sibling items in lists/grids):**

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }, // 80ms stagger
};

// Parent wraps container variant; children wrap fadeUp variant
```

**What gets animated (per section):**

| Section | Animated units |
|---------|---------------|
| SECT-05 Como Funciona | Left column as a unit (1 fade-up); AppVendedor as a second unit (slight delay) |
| SECT-06 Painel do Gestor | Headline block; then callouts left + mockup + callouts right simultaneously |
| SECT-07 Funcionalidades | Hero card; then 5 small cards with 80ms stagger |
| SECT-08 Para Quem | Headline block; then 3 profile cards with 80ms stagger |
| SECT-09 Diferencial Pruma | Headline block; then 3 pillars with 80ms stagger |
| SECT-10 Prova Social | Headline block; logo row; counter row (counters trigger separately via ANIM-02); depoimento card |
| SECT-11 CTA Final | Left column; form card |
| SECT-12 Footer | Brand column; then 3 link columns with 80ms stagger |
| Phase 2 retro (Hero, Diagnóstico, Tese) | Wrap section inner content — headline + subheadline + content blocks |

**Reduced motion:**
`prefers-reduced-motion: reduce` is already handled in `globals.css` (collapses to 0.01ms). Framer Motion's `useReducedMotion()` hook must also be checked where `whileInView` is used and transforms dropped to `{ y: 0, opacity: 1 }` instantly when reduced motion is active.

**Server vs Client boundary:**
All sections using `whileInView` require `"use client"` directive. Section components that contain no animations remain Server Components. If a section has both static and animated regions, extract the animated subcomponent as a Client Component and keep the section wrapper as a Server Component.

---

### ANIM-02 — Counter Animation (Prova Social)

**Trigger:** `useInView` from Framer Motion detects when the Prova Social section enters the viewport. Counter fires once (`once: true`). Margin: `-80px` (fires slightly before section fully visible).

**Animation spec:**

```
Value: 0 → target integer (no decimals)
Duration: 1500ms (1.5s)
Easing: ease-out (decelerating)
Suffix: appended as static span, not animated (e.g. "%", "H")
Frame rate: use Framer Motion `animate` with `MotionValue` + `useTransform` to integers
```

**Implementation pattern:**

```tsx
// Preferred: Framer Motion animate() on a MotionValue, transform to integer display
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);

useEffect(() => {
  if (inView) {
    animate(count, targetValue, { duration: 1.5, ease: "easeOut" });
  }
}, [inView]);
```

Counter component must be `"use client"`.

**Reduced motion:** When `useReducedMotion()` returns `true`, display final value immediately without animation. No 0→N transition.

---

### ANIM-03 — Hover States

Inherited from Phase 1 (already implemented in Card and Button). Phase 3 verifies all instances are wired.

| Element | Property | Duration | Value |
|---------|----------|----------|-------|
| `<Card interactive>` | `transform` | 250ms ease-out | `translateY(-2px)` |
| `<Card interactive>` | `border-color` | 250ms ease-out | `#F4F6F9` → `#5CCFF5` |
| `<Button variant="primary">` | `transform` | 200ms ease-out | `translateY(-1px)` |
| `<Button variant="primary">` | `box-shadow` | 200ms ease-out | `shadow-pruma-sm` → `shadow-pruma-cyan` |
| Form inputs | `border-color` | 150ms ease-out | `#F4F6F9` → `#00AEEF` on focus (ring-based) |
| Nav links | `color` | 150ms ease-out | `text-pruma-navy` → `text-pruma-cyan` |
| Footer links | `color` | 150ms ease-out | `text-white/80` → `text-white` |

**No JS/Framer Motion needed for ANIM-03** — all hover states use Tailwind `hover:` and `transition` classes. ANIM-03 verification is a CSS audit, not a Framer Motion task.

---

## Copywriting Contract

### Canonical CTAs (inherited + Phase 3 uses)

| Element | Copy | Source |
|---------|------|--------|
| Primary CTA | `Falar com um consultor` | `CTA_PRIMARY` in constants.ts |
| Secondary CTA | `Conhecer o app` | `CTA_SECONDARY` in constants.ts |
| Form submit CTA | `Agendar conversa com consultor` | `CTA_FORM` in constants.ts |
| Form instruction | `Preencha os campos abaixo para conversar com um consultor.` | `FORM_EMPTY_STATE` in constants.ts |

### Phase 3 Success + Error States

| Element | Copy |
|---------|------|
| Form success heading | `Recebemos seu contato.` |
| Form success body | `Nossa equipe entra em contato em até 1 dia útil.` |
| Form success microcopy | `SEM SPAM · SEM COMPROMISSO` |
| Form field error (required) | `Campo obrigatório.` |
| Form field error (email invalid) | `Informe um e-mail corporativo válido.` |
| Form field error (phone invalid) | not validated — required only |

### Destructive Actions

None in Phase 3. The LP has no destructive actions. No confirmation dialogs needed.

### Tone Guardrails (inherited from Phase 1, enforced in all 8 sections)

- **Banned:** "Venda mais", "Plataforma all-in-one", "Automatize", "Simples assim", "Fácil", "Uau", emojis (except mockup status indicators), exclamation marks
- **Tone:** Sábio (60%) + Mago (40%) — affirmative, insight-led, never hyped
- **Punctuation:** em-dash (`—`) preferred; middle dot (`·`) for inline microcopy separators
- **Numerals:** digits always ("30 dias", "94%", "R$ 1.2bi")
- **Prova Social numbers:** must appear credible, not aspirational; use conservative estimates

### lib/constants.ts Extension Contract

Phase 3 must add the following exports to `lib/constants.ts` following the existing pattern:

```
COMO_FUNCIONA   — eyebrow, headline, subheadline, steps[] (4 items with title, description, iconName)
PAINEL_GESTOR   — eyebrow, headline, subheadline, callouts[] (4 items with number, text)
FUNCIONALIDADES — eyebrow, headline, subheadline, features[] (6 items with title, description, iconName; hero card has isHero: true)
PARA_QUEM       — eyebrow, headline, subheadline, profiles[] (3 items with label, title, anchor, description, iconName)
DIFERENCIAL     — eyebrow, headline, subheadline, pillars[] (3 items with title, body, iconName)
PROVA_SOCIAL    — eyebrow, headline, subheadline, counters[] (3 items with value, suffix, label), testimonial (quote, attribution)
CTA_FINAL       — eyebrow, headline, body, microcopy (already has CTA_FORM, FORM_EMPTY_STATE, FORM_SUCCESS)
FOOTER          — tagline, columns[] (3 items with header, links[])
```

No visible string is allowed in JSX. All copy must come from the constants file.

---

## Component Architecture Notes

### "use client" Boundaries

| Component | Directive | Reason |
|-----------|-----------|--------|
| `Navbar.tsx` | `"use client"` | scroll state, mobile drawer |
| `Hero.tsx` | `"use client"` | Framer Motion whileInView |
| `Diagnostico.tsx` | `"use client"` | Framer Motion whileInView |
| `Tese.tsx` | `"use client"` | Framer Motion whileInView |
| `ComoFunciona.tsx` | `"use client"` | Framer Motion whileInView |
| `PainelGestor.tsx` | `"use client"` | Framer Motion whileInView |
| `Funcionalidades.tsx` | `"use client"` | Framer Motion whileInView + bento hero scale |
| `ParaQuem.tsx` | `"use client"` | Framer Motion whileInView |
| `Diferencial.tsx` | `"use client"` | Framer Motion whileInView |
| `ProvaSocial.tsx` | `"use client"` | ANIM-02 counter + useInView |
| `CTAFinal.tsx` | `"use client"` | form state, AnimatePresence |
| `Footer.tsx` | Server Component | no hooks, no animations |
| `AppVendedor.tsx` | Server Component | static mockup |
| `PainelDashboard.tsx` | Server Component | static mockup |

### Framer Motion Import Pattern

Dynamic import to keep initial bundle lean:

```tsx
// At the top of each "use client" section component:
import { motion, AnimatePresence } from "framer-motion";
// No dynamic() wrapper needed — framer-motion is already a dependency
// and sections are not code-split individually in this LP
```

---

## Accessibility Contract (Phase 3 additions)

| Concern | Requirement |
|---------|-------------|
| Section landmarks | Each section uses `<section>` element with `aria-labelledby` pointing to its `<h2>` id |
| Form labeling | Every `<input>`, `<select>`, `<textarea>` has an associated `<label>` via `htmlFor`/`id` pair |
| Form error announcements | Error messages use `role="alert"` or are associated via `aria-describedby` |
| Counter animation | Counter elements have `aria-live="polite"` to announce final value when animation completes |
| Prova Social anchors | `id="prova-social"` on `<section>` and `id="contato"` on CTA Final `<section>` |
| Dark section contrast | White on `#0D1B4B` = 14.6:1 (AAA). `#5CCFF5` on `#0D1B4B` = 8.9:1 (AAA). |
| Footer links | All footer links must have accessible text (no icon-only links without sr-only labels) |
| Reduced motion | `useReducedMotion()` checked in all "use client" section components; transitions skipped when active |
| Focus order | Tab order follows visual left-to-right, top-to-bottom reading order |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not applicable |
| third-party | none | not applicable |

Phase 3 introduces no third-party UI blocks. All new sections use the Phase 1 primitives (`Button`, `Card`, `Eyebrow`, `Container`) plus Framer Motion (already installed).

---

## Phase 3 Acceptance Criteria (visual)

The phase is visually correct when:

1. All 8 sections render in correct background sequence: off-white → white → cyan-pale → white → navy → white → cyan-pale → navy (no section uses wrong background)
2. SECT-09 Diferencial is the only section using `bg-pruma-navy` among the body sections (Footer is layout, not a body section)
3. Bento grid in SECT-07 has a full-width hero card containing PainelDashboard at reduced scale, with no overflow and the bottom gradient fade to cyan-pale visible
4. SECT-10 counter numbers animate from 0 to final value on first scroll into view and do not replay on scroll back
5. CTA Final form shows 8 fields with correct labels and swaps to success state on submit without page reload or console errors
6. SECT-09 Eyebrow renders with cyan text (tone="dark") and all copy in SECT-09 + Footer is white, not navy
7. Scroll-triggered animations fire on all sections with no jump (elements start below their final position, not above)
8. All hover states on cards and buttons respond within 200–250ms with no layout shift
9. At 375px mobile, no horizontal overflow on any section; bento grid is single-column, form inputs are single-column
10. `npm run build` completes with zero TypeScript errors

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
