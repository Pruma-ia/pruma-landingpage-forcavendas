# Roadmap: Pruma LP — App de Força de Vendas B2B

## Overview

Four coarse phases deliver a complete, production-ready landing page for Pruma's B2B sales force app. The project goes from an empty Next.js scaffold to a Lighthouse-verified LP that captures leads from mid-market C-level decision-makers. Phase 1 builds the design system foundation. Phase 2 delivers the above-fold hero experience with interactive mockups. Phase 3 completes all remaining sections with the full animation layer. Phase 4 verifies quality, performance, and SEO compliance.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Next.js scaffold, Pruma design tokens, and UI component primitives
- [ ] **Phase 2: Hero Experience** - Above-fold sections (Navbar, Hero, Diagnóstico, Tese) plus both HTML/CSS mockup components
- [ ] **Phase 3: Full LP + Animations** - Remaining 8 sections (Como Funciona → Footer) with Framer Motion animation layer
- [ ] **Phase 4: Quality & Polish** - Responsiveness audit, Lighthouse validation, copy centralization, and CTA placement verification

## Phase Details

### Phase 1: Foundation
**Goal**: Developers can run the project and the Pruma design system is fully available for component consumption
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, UI-01, UI-02, UI-03, UI-04
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without warnings and renders a blank Next.js page with Pruma fonts loaded
  2. Tailwind config exposes Pruma palette (`#0D1B4B`, `#00AEEF`), custom spacing, and animation tokens
  3. Fraunces, Inter, and JetBrains Mono are served via `next/font` with CSS variables accessible in layout
  4. Eyebrow, Button (primary + ghost), Card, and Container components render correctly in isolation
  5. SEO metadata is set with the exact title and Open Graph tags defined in SETUP-05
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Next.js scaffold + Tailwind tokens + font loading + globals.css
- [ ] 01-02-PLAN.md — SEO metadata + lib/constants.ts + quatro primitivos UI (Eyebrow, Button, Card, Container)

**UI hint**: yes

### Phase 2: Hero Experience
**Goal**: A visitor lands on the page and immediately sees a credible, premium above-fold experience with working interactive mockups
**Depends on**: Phase 1
**Requirements**: SECT-01, SECT-02, SECT-03, SECT-04, MOCK-01, MOCK-02
**Success Criteria** (what must be TRUE):
  1. Sticky Navbar is visible with backdrop blur on scroll and a working "Falar com um consultor" CTA
  2. Hero section renders with Fraunces 72px headline, two side-by-side CTAs, and the dashboard mockup on the right
  3. Diagnóstico section shows 3 cards on `#E0F6FE` background with the correct structural pain points
  4. Tese Pruma section displays the editorial centered headline at 56px with body copy at max-width 720px
  5. AppVendedor and PainelDashboard render as HTML/CSS components with the specified data (Auto Center São Paulo, KPI cards, ABC curve, risk table)
**Plans**: TBD
**UI hint**: yes

### Phase 3: Full LP + Animations
**Goal**: The complete 12-section landing page is visible end-to-end with all scroll animations, hover states, and interactive form behavior
**Depends on**: Phase 2
**Requirements**: SECT-05, SECT-06, SECT-07, SECT-08, SECT-09, SECT-10, SECT-11, SECT-12, ANIM-01, ANIM-02, ANIM-03
**Success Criteria** (what must be TRUE):
  1. All sections from Como Funciona through Footer render with correct backgrounds — only Diferencial Pruma (SECT-09) and Footer use dark `#0D1B4B` background
  2. Bento grid Funcionalidades (SECT-07) displays 6 features in asymmetric layout without overflow
  3. Prova Social (SECT-10) shows placeholder logos, three large Fraunces 64px cyan numbers, and a depoimento card — all annotated with `<!-- TODO: substituir -->` comments
  4. CTA Final form (SECT-11) shows 8 fields + 2 selects and transitions to a success state on submission without any backend call
  5. Scroll-triggered fade-up animations fire correctly on list items and grid cards; counter animation runs 0 → final value over 1.5s when Prova Social enters the viewport; card and button hover states respond as specified
**Plans**: TBD
**UI hint**: yes

### Phase 4: Quality & Polish
**Goal**: The LP meets all measurable production standards for performance, accessibility, responsiveness, and copy maintainability
**Depends on**: Phase 3
**Requirements**: QA-01, QA-02, QA-03, QA-04, QA-05
**Success Criteria** (what must be TRUE):
  1. No horizontal overflow at 375px, 768px, 1024px, or 1440px — touch interactions work on mobile
  2. Lighthouse desktop scores: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
  3. `npm run build` completes with zero TypeScript errors and zero warnings
  4. All LP copy lives in `/lib/constants.ts` with inline comments marking editable fields
  5. "Falar com um consultor" CTA appears in Navbar, Hero section, and CTA Final (minimum 3 distinct touchpoints)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/2 | Ready to execute | - |
| 2. Hero Experience | 0/TBD | Not started | - |
| 3. Full LP + Animations | 0/TBD | Not started | - |
| 4. Quality & Polish | 0/TBD | Not started | - |
