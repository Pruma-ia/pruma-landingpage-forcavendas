# Pruma LP — App de Força de Vendas B2B

## What This Is

Landing page para o **App Web de Força de Vendas B2B da Pruma Consultoria** — uma consultoria brasileira de gestão financeira e operacional para PMEs e empresas de médio porte.

Esta LP **não é um site de SaaS genérico**. É uma "LP de tese com bias enterprise":
- Capta leads de **mid-market** (R$50M–R$300M) via tráfego frio (LinkedIn, indicação)
- Funciona como **carta de credibilidade** para abrir conversas em contas enterprise (R$1Bi+)
- Posicionamento: **consultoria que tem tecnologia**, não startup de SaaS

## Why It Needs to Exist

O mercado brasileiro de força de vendas B2B (Mercos, Zydon, GeoSales etc.) comunica de forma genérica: "Venda mais com nosso app", visual azul saturado, mockup de celular óbvio. A Pruma preenche um gap comunicando diretamente com C-level com tom de conselheiro sênior, visual editorial premium (McKinsey/Stripe), e promessa de transformação operacional — não de produtividade.

## Who It's For

**Dois leitores em proporção 50/50:**

| Leitor | Perfil | Dor principal |
|--------|--------|--------------|
| **Decisor** (Leitor A) | Diretor Comercial / CFO / Sócio, empresa R$50M–R$1Bi+ | Sem visibilidade do pipeline, política comercial inconsistente, dados que não batem |
| **Usuário** (Leitor B) | Vendedor externo / Gestor de campo | Planilha que trava, WhatsApp bagunçado, demora pra fechar pedido |

## Core Value

> *"Operações comerciais B2B que precisam parar de improvisar."*

O app + método de implantação da Pruma entrega governança comercial: visibilidade total da operação do vendedor em campo ao conselho de administração.

## Brand Archetype

- **Sábio 60%** — conselheiro sênior, afirmações provocativas baseadas em insight
- **Mago 40%** — transformador, aspiracional, "antes/depois"

Referências: McKinsey, Bain, Stripe, Linear, Vercel

## Design System

**Paleta (regra 65/25/10):**
- Azul Marinho `#0D1B4B` — primária (65%)
- Ciano Elétrico `#00AEEF` — acento (25%)
- Branco/Off-White — fundo dominante (LP light)
- Cinza Texto `#5B6B85` — secundário

**Tipografia:**
- Headlines: Fraunces (Google Fonts), peso 500–600
- Body: Inter (Google Fonts)
- Microcopy/labels: JetBrains Mono, UPPERCASE

**Estética:** sombras sutis, border-radius 8–12px, espaçamento generoso, microanimações com Framer Motion. **Sem** gradientes coloridos, emojis, mockups de celular óbvios.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Estilização:** Tailwind CSS 3.4+ com CSS variables customizadas
- **Animações:** Framer Motion 11+
- **Ícones:** lucide-react (traço fino, peso 1.5px)
- **Fontes:** next/font/google (Fraunces, Inter, JetBrains Mono)
- **Performance:** Lighthouse desktop 90+, next/image, lazy loading

## Sections (12)

1. **Navbar** — sticky, CTA "Falar com um consultor"
2. **Hero** — Decisor, fundo branco, mockup dashboard gestor
3. **Diagnóstico** — Decisor, fundo ciano pálido, 3 pontos cegos estruturais
4. **Tese Pruma** — Decisor, editorial, "Força de vendas não é um app"
5. **Como Funciona** — Usuário, fundo off-white, 4 itens + mockup app vendedor
6. **Painel do Gestor** — Decisor, fundo branco, dashboard com 4 callouts
7. **Funcionalidades** — Misto, bento grid, 6 funcionalidades
8. **Para Quem** — Decisor, 3 perfis de empresa
9. **Diferencial Pruma** — Decisor, **ÚNICA seção dark** (fundo azul marinho)
10. **Prova Social** — Ambos, logos + números + depoimento (placeholders TODO)
11. **CTA Final** — Ambos, fundo ciano pálido, formulário com 8 campos
12. **Footer** — Fundo azul marinho

## Mockups (componentes HTML/CSS reais)

- **Mockup A (App vendedor):** tela mobile, pedido Auto Center São Paulo Ltda, 8 itens, R$17.867,40
- **Mockup B (Painel gestor):** dashboard KPIs, curva ABC, mapa Brasil, tabela "Clientes em risco", pipeline

## File Structure

```
/app
  layout.tsx · page.tsx · globals.css
/components
  Navbar.tsx · Hero.tsx · Diagnostico.tsx · Tese.tsx
  ComoFunciona.tsx · PainelGestor.tsx · Funcionalidades.tsx
  ParaQuem.tsx · Diferencial.tsx · ProvaSocial.tsx
  CTAFinal.tsx · Footer.tsx
  /mockups
    AppVendedor.tsx · PainelDashboard.tsx
  /ui
    Button.tsx · Card.tsx · Eyebrow.tsx · Container.tsx
/lib
  constants.ts
tailwind.config.ts
```

## What Done Looks Like

- LP roda com `npm run dev` sem warnings
- Lighthouse desktop: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
- Responsivo em 375px, 768px, 1024px, 1440px
- Todas as fontes carregadas via next/font
- Paleta exatamente como especificado
- Headlines em Fraunces (serifa), eyebrows com linha horizontal ciano + Mono UPPERCASE
- Mockups são componentes HTML/CSS reais com dados industriais plausíveis
- Apenas Seção 9 (Diferencial) e Footer com fundo dark
- CTA "Falar com um consultor" em pelo menos 3 pontos (Navbar, Hero, CTA Final)
- Microanimações com Framer Motion funcionando
- Formulário com estado de sucesso visual (sem backend)
- Comentários `<!-- TODO -->` nos placeholders de prova social
- Metadata SEO: title "Pruma | App Web de Força de Vendas B2B para Indústrias e Distribuidoras"

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router | Performance, SEO, next/font, Vercel-ready | Locked |
| Fraunces serif para headlines | Editorial premium, diferencia de concorrentes sans-serif | Locked |
| LP light (fundo branco) | Apenas seção 9 dark — posiciona como premium, não "dark SaaS" | Locked |
| Mockups como componentes HTML/CSS | Não PNG — permite hover states e dados reais | Locked |
| Prova social com placeholders | Cliente não tem dados aprovados — deixar TODO para substituição | Locked |
| Tom Sábio+Mago, sem "Venda mais" | Diferenciação vs. Mercos/Zydon/GeoSales | Locked |

## Requirements

### Validated

(App já em produção — LP captura leads para operação existente)

### Active

- [ ] 12 seções implementadas seguindo brief exato
- [ ] Design system Pruma (paleta, tipografia, componentes) implementado
- [ ] Mockup A (App vendedor) como componente HTML/CSS real
- [ ] Mockup B (Painel gestor) como componente HTML/CSS real
- [ ] Formulário CTA com estado de sucesso (sem backend)
- [ ] Responsividade completa (375px → 1440px)
- [ ] Microanimações com Framer Motion (scroll-triggered, hover, counters)
- [ ] Lighthouse desktop 90+ em todas as métricas
- [ ] SEO metadata completo
- [ ] Prova social com placeholders TODO documentados

### Out of Scope

- Backend real para formulário — apenas state local (cliente define integração depois)
- Analytics/tracking (cliente adiciona depois)
- CMS para editar copy (copy em constants.ts para facilitar edição manual)
- Versão em inglês (LP é exclusivamente em português)
- Dark mode (decisão intencional — LP light por design)

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-06 after initialization*
