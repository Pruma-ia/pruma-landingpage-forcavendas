# Pruma LP — Claude Code Instructions

## Project

Landing page for Pruma Consultoria's B2B Sales Force App. Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion.

## GSD Workflow

This project uses GSD (Get Shit Done) for planning and execution.

### Current State

- **Milestone**: v1.0 — Full Landing Page
- **Active Phase**: Phase 1 — Foundation
- **Config**: Interactive mode, Quality models, plan_check=on, verifier=on

### Phase Flow

```
/gsd-discuss-phase 1 → /gsd-plan-phase 1 → /gsd-execute-phase 1 → repeat
```

### Planning Artifacts

- `.planning/PROJECT.md` — project context and requirements
- `.planning/ROADMAP.md` — 4-phase roadmap
- `.planning/REQUIREMENTS.md` — 31 v1 requirements with REQ-IDs
- `.planning/STATE.md` — project memory

## Design Rules (MANDATORY)

### Palette (must match exactly)

```css
--azul-marinho: #0D1B4B;    /* Primary — 65% */
--ciano-eletrico: #00AEEF;  /* Accent — 25% */
--branco: #FFFFFF;
--off-white: #FAFAFA;
--ciano-palido: #E0F6FE;
--cinza-texto: #5B6B85;
```

### Typography

- Headlines: **Fraunces** (serif) — NOT Inter, NOT sans-serif
- Body: Inter
- Microcopy/labels: JetBrains Mono, UPPERCASE

### Critical Design Constraints

- LP is LIGHT — white/off-white dominant backgrounds
- ONLY Seção 9 (Diferencial Pruma) and Footer have dark (`#0D1B4B`) background
- NO gradients, emojis, generic SaaS visuals
- Shadows must be subtle: `box-shadow: 0 1px 3px rgba(13,27,75,0.06)`
- Copy must be Sábio+Mago tone — never "Venda mais", "Plataforma all-in-one"

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS 3.4+ with CSS variables
- Framer Motion 11+
- lucide-react (thin stroke, 1.5px weight)
- next/font/google (Fraunces, Inter, JetBrains Mono)

## File Organization

```
/app              → layout.tsx, page.tsx, globals.css
/components       → one file per section + /mockups + /ui
/lib/constants.ts → all LP copy centralized here
tailwind.config.ts
```
