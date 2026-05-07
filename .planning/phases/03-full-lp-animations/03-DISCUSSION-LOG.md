# Phase 3: Full LP + Animations - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-07
**Phase:** 03-full-lp-animations
**Areas discussed:** Bento grid layout (SECT-07), Animation scope + feel, CTA Final form fields (SECT-11), Painel do Gestor callouts (SECT-06)

---

## Bento Grid Layout (SECT-07)

### Q1: Estrutura visual do bento grid

| Option | Description | Selected |
|--------|-------------|----------|
| 1 hero card + 5 menores | Full-width hero card top, 5 smaller cards below. Stripe/Linear pattern. | ✓ |
| 2 grandes + 4 menores | Two hero-weight cards, four smaller. More balanced. | |
| Grade assimétrica livre (3 tamanhos) | Mix small/medium/large, no rigid hierarchy. More editorial, harder. | |

**User's choice:** 1 hero card + 5 menores

---

### Q2: Qual funcionalidade vai no hero card

| Option | Description | Selected |
|--------|-------------|----------|
| Painel do Gestor em tempo real | PainelDashboard mockup inline. Strongest Pruma differentiator. | ✓ |
| App do Vendedor em campo | AppVendedor mockup inline. | |
| Inteligência comercial / Curva ABC | Conceptual, no mockup. | |

**User's choice:** Painel do Gestor em tempo real

---

### Q3: Cards menores — conteúdo

| Option | Description | Selected |
|--------|-------------|----------|
| Título + descrição + ícone lucide | Icon top-left (navy/cyan, 20px, 1.5px), bold title, 2-line description. | ✓ |
| Título + descrição (sem ícone) | Editorial typography-first, no icons. | |

**User's choice:** Título + descrição + ícone lucide

---

### Q4: Quais são as 6 funcionalidades

| Option | Description | Selected |
|--------|-------------|----------|
| Claude decide baseado no brief | Painel (hero) + App mobile, Política comercial, Curva ABC, Clientes em risco, Relatórios. | ✓ |
| Preciso rever os temas antes | User wants to review/adjust themes first. | |

**User's choice:** Claude decide

---

## Animation Scope + Feel

### Q1: Escopo do fade-up (ANIM-01)

| Option | Description | Selected |
|--------|-------------|----------|
| Todas as seções | Hero → Footer, all sections animate. Full coherence. | ✓ |
| Apenas seções com listas/grids | Only content-dense sections. Hero and Tese enter without animation. | |

**User's choice:** Todas as seções

---

### Q2: Feeling das animações

| Option | Description | Selected |
|--------|-------------|----------|
| Sutil e rápido | fade-up 24px, 400ms ease-out, stagger 80ms. Stripe/Linear aesthetic. | ✓ |
| Generoso e expressivo | fade-up 40px, 600ms spring, stagger 120ms. More dramatic. | |

**User's choice:** Sutil e rápido

---

### Q3: SECT-09 (dark section) — tratamento de animação

| Option | Description | Selected |
|--------|-------------|----------|
| Mesma fade-up, texto branco sobre dark | Same animation, only color scheme changes. | ✓ |
| Slide lateral nos 3 pilares | Pillars enter from left/right alternating. More dramatic for the only dark section. | |

**User's choice:** Mesma fade-up, mas texto branco sobre dark

---

## CTA Final Form Fields (SECT-11)

### Q1: Quantidade de inputs

| Option | Description | Selected |
|--------|-------------|----------|
| 8 total (6 text + 2 selects) | Leaner form, less friction, more conversions. | ✓ |
| 10 total (8 text + 2 selects) | More complete lead qualification, higher friction. | |

**User's choice:** 8 total (6 text fields + 2 selects)

---

### Q2: Os 6 campos de texto

| Option | Description | Selected |
|--------|-------------|----------|
| Claude decide (padrão B2B) | Nome, E-mail corporativo, Telefone, Empresa, Cargo, Desafio atual. | ✓ |
| Quero definir os campos | User specifies each field name before locking. | |

**User's choice:** Claude decide — padrão B2B

---

### Q3: Os 2 selects

| Option | Description | Selected |
|--------|-------------|----------|
| Porte da equipe + Segmento | Select 1: vendedores em campo (1-5/6-15/16-30/30+). Select 2: Segmento (Indústria/Distribuidora/Atacado/Outro). | ✓ |
| Cargo + Tamanho da empresa | Select 1: Cargo. Select 2: Faturamento range. | |

**User's choice:** Porte da equipe + Segmento

---

### Q4: Estado de sucesso

| Option | Description | Selected |
|--------|-------------|----------|
| Card troca de conteúdo inline | Form fades out, success message fades in (✓, headline, subtext). No redirect. Stripe style. | ✓ |
| Toast/banner no topo | Floating message for 4s. Card stays static. | |

**User's choice:** Card troca de conteúdo inline

---

## Painel do Gestor Callouts (SECT-06)

### Q1: O que os callouts comunicam

| Option | Description | Selected |
|--------|-------------|----------|
| Insight provocativo por feature | 1 provocative line per callout pointing to dashboard area. McKinsey annotation style. | ✓ |
| Descrição funcional da feature | Descriptive what-it-does text. More informative, less provocative. | |

**User's choice:** Insight provocativo por feature

---

### Q2: Posição dos callouts

| Option | Description | Selected |
|--------|-------------|----------|
| 2 à esquerda + 2 à direita | 3-column grid: callouts col-1, dashboard col-2 (center), callouts col-3. Classic. | ✓ |
| 2 em cima + 2 embaixo | Vertical layout above/below mockup. More unusual. | |

**User's choice:** 2 à esquerda + 2 à direita

---

### Q3: Textos dos callouts

| Option | Description | Selected |
|--------|-------------|----------|
| Claude decide (Recommended) | 4 provocative insights: churn risk, política comercial, ABC, pipeline. | ✓ |
| Quero aprovar os textos antes | User reviews 4 texts before locking. | |

**User's choice:** Claude decide

---

## Claude's Discretion

- Bento grid: 6 feature titles and descriptions (Sábio+Mago tone)
- SECT-05 Como Funciona: 4 step titles + 1-line descriptions (Usuário perspective)
- SECT-06: 4 callout texts (provocative insights, churn/política/ABC/pipeline themes)
- SECT-08 Para Quem: profile card copy for 3 company types
- SECT-09 Diferencial: 3 pilar titles and descriptions
- SECT-10 Prova Social: 3 credible placeholder numbers + depoimento placeholder
- SECT-12 Footer: link column labels and link text
- Form field labels (Portuguese, Pruma tone)

## Deferred Ideas

None — discussion stayed within phase scope.
