# Requirements — Pruma LP

## v1 Requirements

### Setup & Infrastructure

- [ ] **SETUP-01**: Project initialized with Next.js 14 (App Router) + TypeScript + Tailwind CSS 3.4+, framer-motion 11+, lucide-react, clsx, tailwind-merge
- [ ] **SETUP-02**: Tailwind config includes Pruma design tokens (full palette + spacing/animation custom values)
- [ ] **SETUP-03**: Google Fonts loaded via next/font (Fraunces, Inter, JetBrains Mono) with CSS variables in layout.tsx
- [ ] **SETUP-04**: globals.css defines CSS custom properties for palette, typography scale, and animation tokens
- [ ] **SETUP-05**: SEO metadata complete — title "Pruma | App Web de Força de Vendas B2B para Indústrias e Distribuidoras", description ~150 chars, Open Graph tags

### UI Components

- [ ] **UI-01**: Eyebrow component — linha horizontal 32px `#00AEEF` + JetBrains Mono 12px UPPERCASE, tracking 0.12em
- [ ] **UI-02**: Button primary (fundo `#0D1B4B`, texto branco, hover translate-y -1px + shadow ciano) and ghost variant (borda `#0D1B4B`, hover fundo `#E0F6FE`)
- [ ] **UI-03**: Card component — fundo branco, borda `#F4F6F9`, border-radius 12px, hover borda `#5CCFF5` + translate-y -2px
- [ ] **UI-04**: Container component — max-w-6xl (1152px), centered

### Sections

- [ ] **SECT-01**: Navbar — sticky, backdrop-blur-md when scroll > 8px, logo "PRUMA" Fraunces 600, nav links âncora, CTA "Falar com um consultor"
- [ ] **SECT-02**: Hero — Decisor, fundo branco, eyebrow + headline 2 linhas Fraunces 72px + subheadline + 2 CTAs lado a lado + mockup dashboard (direita) + microcopy Mono abaixo dos CTAs
- [ ] **SECT-03**: Diagnóstico — Decisor, fundo `#E0F6FE`, eyebrow + headline + subheadline + 3 cards (Visibilidade tardia / Política comercial fragmentada / Fechamento planilha)
- [ ] **SECT-04**: Tese Pruma — Decisor, fundo branco, layout editorial, headline centralizada Fraunces 56px + parágrafo Inter 19px max-width 720px
- [ ] **SECT-05**: Como Funciona — Usuário, fundo `#FAFAFA`, 2 colunas: lista 4 itens com ícones lucide + mockup app vendedor
- [ ] **SECT-06**: Painel do Gestor — Decisor, fundo branco, headline + subheadline + mockup dashboard centralizado + 4 callouts numerados ao redor
- [ ] **SECT-07**: Funcionalidades — Misto, fundo `#E0F6FE`, bento grid 6 funcionalidades (layout assimétrico)
- [ ] **SECT-08**: Para Quem — Decisor, fundo branco, 3 cards de perfil de empresa (Indústria / Distribuidora / Empresa em transição)
- [ ] **SECT-09**: Diferencial Pruma — Decisor, fundo `#0D1B4B` (ÚNICA seção dark), texto branco, eyebrow ciano, 3 pilares horizontais
- [ ] **SECT-10**: Prova Social — Ambos, fundo branco, logos placeholder + 3 números grandes Fraunces 64px ciano + depoimento em destaque — todos com comentários `<!-- TODO: substituir -->` e id âncora
- [ ] **SECT-11**: CTA Final — Ambos, fundo `#E0F6FE`, formulário card branco (8 campos + 2 selects) + botão "Agendar conversa com consultor" + estado de sucesso visual (sem backend)
- [ ] **SECT-12**: Footer — fundo `#0D1B4B`, logo branco, 3 colunas links, linha base copyright

### Mockups (HTML/CSS Components)

- [ ] **MOCK-01**: AppVendedor.tsx — mockup mobile (max 380px, border-radius 16px), dados: Auto Center São Paulo Ltda, 8 itens carrinho, total R$18.420,00, desconto 3%, status 🟢 Online, botão "Fechar pedido"
- [ ] **MOCK-02**: PainelDashboard.tsx — dashboard widescreen estilo Stripe: cabeçalho com filtros, linha KPIs 4 cards, curva ABC + mapa Brasil com pontos ciano, tabela "Clientes em risco" (3 linhas), pipeline barra segmentada

### Animations & Interactions

- [ ] **ANIM-01**: Scroll-triggered fade-up (24px) com Framer Motion + delay escalonado em listas/grids
- [ ] **ANIM-02**: Counter animado (0 → valor final em 1.5s) nos números de prova social via IntersectionObserver
- [ ] **ANIM-03**: Hover de cards (translate-y -2px, border `#5CCFF5`), hover de botões (translate-y -1px, glow ciano sutil)

### Quality

- [ ] **QA-01**: Responsivo sem overflow em 375px, 768px, 1024px, 1440px — touch interactions funcionando em mobile
- [ ] **QA-02**: Lighthouse desktop — Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
- [ ] **QA-03**: `npm run dev` sem warnings, `npm run build` sem erros TypeScript
- [ ] **QA-04**: Copy centralizado em `/lib/constants.ts` com comentários indicando campos editáveis
- [ ] **QA-05**: CTA "Falar com um consultor" aparece em Navbar + Hero + CTA Final (mínimo 3 pontos)

## v2 Requirements (Deferred)

- Backend real para formulário (integração com CRM/email)
- Analytics e tracking (GTM, Hotjar, Meta Pixel)
- CMS para edição de copy sem código
- Página de política de privacidade e termos de uso
- Versão em inglês
- Dark mode
- Blog / recursos Pruma
- A/B testing de copy

## Out of Scope

- **Backend formulário** — cliente define integração depois; LP usa apenas state local
- **Dark mode** — decisão de design intencional; LP é light por posicionamento
- **Autenticação** — não há área logada nesta LP
- **Dashboard real** — mockups são HTML/CSS estático com dados hardcoded plausíveis

## Traceability

| REQ-ID | Phase |
|--------|-------|
| SETUP-01 → SETUP-05 | Phase 1 |
| UI-01 → UI-04 | Phase 1 |
| SECT-01 → SECT-04 | Phase 2 |
| MOCK-01, MOCK-02 | Phase 2 |
| SECT-05 → SECT-09 | Phase 3 |
| ANIM-01 → ANIM-03 | Phase 3 |
| SECT-10 → SECT-12 | Phase 3 |
| QA-01 → QA-05 | Phase 4 |
