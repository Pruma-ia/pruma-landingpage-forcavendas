# Phase 2: Hero Experience - Research

**Researched:** 2026-05-06
**Domain:** Next.js 14 App Router landing page — sticky navbar, hero with embedded dashboard mockup, diagnostic cards, editorial section, plus two HTML/CSS mockups (mobile sales app and desktop dashboard with map + ABC chart)
**Confidence:** HIGH

## Summary

Phase 2 entrega a experiência above-fold completa (Navbar + SECT-01–04) e os dois mockups visuais (MOCK-01 AppVendedor mobile, MOCK-02 PainelDashboard widescreen). O stack já está travado no Phase 1: Next.js 14 App Router + Tailwind 3.4 + Framer Motion 11 + lucide-react. Nenhuma biblioteca nova precisa entrar — `package.json` já é suficiente. Os mockups (mapa do Brasil, curva ABC, KPIs, tabela de risco) devem ser construídos com **SVG inline + flex/grid Tailwind**, sem `recharts`, `chart.js`, `react-simple-maps` ou qualquer dependência externa.

A Navbar usa um padrão Client Component com `useEffect` + listener de `scroll` (passivo) para alternar `backdrop-blur-md` ao ultrapassar 8px. O drawer mobile usa `framer-motion` com `AnimatePresence` para slide-in, respeitando `prefers-reduced-motion`. O Hero compõe `Eyebrow + h1 Fraunces 72px + subhead Inter + 2 Buttons + microcopy Mono` numa coluna esquerda e `<PainelDashboard />` flutuante na direita (desktop) / abaixo (mobile, < 768px). Diagnóstico reutiliza `<Card>` Phase 1 com ícone lucide top-left. Tese é puro layout editorial centralizado, sem cards.

**Primary recommendation:** Compor páginas como Server Components por padrão. Marcar `'use client'` apenas em `Navbar.tsx` (scroll listener + drawer state). Mockups são puramente declarativos (SVG + dados hardcoded em `lib/constants.ts`) → Server Components estáticos, ótimos para LCP e SEO.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Layout/typography/cores | Tailwind tokens (build-time) | — | Tokens já compilados em CSS — zero runtime |
| Navbar sticky + scroll-blur | Browser/Client (`'use client'`) | — | `window.scrollY` listener requer client-side |
| Drawer mobile | Browser/Client | Framer Motion | `AnimatePresence` exige client component |
| Hero, Diagnóstico, Tese (estáticos) | SSR (Server Components) | — | Conteúdo determinístico, cacheável, melhor LCP |
| Mockups (AppVendedor, PainelDashboard) | SSR (Server Components) | — | SVG + dados estáticos; sem interação por enquanto |
| Mapa do Brasil | SVG inline (build-time) | — | Path estático embutido; pontos calculados estaticamente |
| Curva ABC | SVG/CSS bars (build-time) | — | Bar chart simples, sem necessidade de lib |
| Copy/CTAs | `lib/constants.ts` (build-time) | — | Centralização exige import compartilhado SSR |

## Standard Stack

### Core (já em `package.json` — não adicionar nada)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | ^14.2.29 | App Router, fonts, `<Link>` | Locked Phase 1 [VERIFIED: package.json] |
| `react` / `react-dom` | ^18 | RSC + Client Components | Locked Phase 1 [VERIFIED: package.json] |
| `tailwindcss` | ^3.4 | Design tokens, JIT classes | Locked Phase 1 [VERIFIED: package.json] |
| `framer-motion` | ^11 | Drawer animation, `prefers-reduced-motion` automatic respect | Locked Phase 1 [VERIFIED: package.json] |
| `lucide-react` | ^0.511.0 | Ícones thin-stroke 1.5px | Locked Phase 1 [VERIFIED: package.json] |
| `clsx` + `tailwind-merge` | ^2 | `cn()` em `lib/utils.ts` | Locked Phase 1 [VERIFIED: package.json] |

### Supporting (built-in patterns, não dependências)

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| `next/link` | Navegação interna + âncoras | Todos os links da Navbar e CTAs com `href` |
| `useEffect` + `addEventListener('scroll', ..., { passive: true })` | Scroll detection | Apenas em Navbar |
| `useReducedMotion()` (framer-motion) | Hook que retorna `true` quando user pediu reduced-motion | Drawer animations [CITED: framer-motion docs] |
| SVG inline + `<path>` | Mapa Brasil + curva ABC | Mockups |
| CSS `aspect-ratio` | Manter proporção do mapa em qualquer largura | Mockup container |

### Alternatives Considered (REJEITADAS — não instalar)

| Instead of | Could Use | Tradeoff | Verdict |
|------------|-----------|----------|---------|
| SVG inline para mapa | `react-simple-maps` (~120KB) | TopoJSON Brasil completo, mas overkill para 7 pontos | REJEITAR — peso desproporcional |
| SVG/divs para curva ABC | `recharts` (~95KB gzip) | Eixos automáticos, tooltips | REJEITAR — barra simples não justifica lib |
| `react-icons` | `lucide-react` | lucide já no stack, tree-shakeable | MANTER lucide |
| `headlessui` para drawer | Framer Motion + state local | Drawer simples (overlay + close) não precisa de Listbox/Dialog headless | REJEITAR — uma dep a menos |

**Não rodar `npm install` em Phase 2 — `package.json` é suficiente.**

**Version verification (2026-05-06):**
- `framer-motion ^11`, `lucide-react ^0.511.0`, `next ^14.2.29` — todas instaladas via Phase 1 [VERIFIED: package.json:11-19]

## Architecture Patterns

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  app/layout.tsx  (Server)                                        │
│   ├─ <html className={font variables}>                           │
│   ├─ <body>                                                      │
│   │   ├─ <Navbar />            ←── 'use client' (scroll + drawer)│
│   │   └─ <main>{children}</main>                                 │
│   └─                                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  app/page.tsx  (Server, estático)                                │
│   ├─ <Hero />          ── SECT-02 + <PainelDashboard /> embeded │
│   ├─ <Diagnostico />   ── SECT-03 (3 cards bg cyan-pale)        │
│   └─ <Tese />          ── SECT-04 (editorial centralizado)      │
└─────────────────────────────────────────────────────────────────┘

Mockups (Server Components, puros):
   <PainelDashboard />  ─→  <KpiRow /> + <BrazilMap /> + <AbcCurve /> + <RiskTable />
   <AppVendedor />      ─→  <PhoneFrame /> + <CartItem />[8] + <CartFooter />

Data flow (build-time):
   lib/constants.ts ──────→ section components ──────→ rendered HTML
   (PHASE2_COPY)            (Hero, Diagnostico…)       (estático SSR)

Data flow (runtime, único cliente):
   window scroll ──→ Navbar useEffect ──→ setState(scrolled) ──→ re-render with backdrop-blur
   click hamburger ──→ setOpen(true) ──→ AnimatePresence ──→ drawer slide-in
```

### Recommended Project Structure

```
app/
├── layout.tsx                       # adiciona <Navbar /> antes de {children}
├── page.tsx                         # compõe Hero + Diagnostico + Tese
└── globals.css                      # já configurado (Phase 1)

components/
├── ui/
│   ├── Button.tsx                   # Phase 1 (reuso)
│   ├── Card.tsx                     # Phase 1 (reuso, com className override)
│   ├── Container.tsx                # Phase 1 (reuso)
│   └── Eyebrow.tsx                  # Phase 1 (reuso)
├── Navbar.tsx                       # NEW — 'use client'
├── Hero.tsx                         # NEW — Server Component
├── Diagnostico.tsx                  # NEW — Server Component
├── Tese.tsx                         # NEW — Server Component
└── mockups/
    ├── AppVendedor.tsx              # NEW — MOCK-01
    ├── PainelDashboard.tsx          # NEW — MOCK-02 (composto)
    ├── BrazilMap.tsx                # NEW — SVG inline + pontos
    └── AbcCurve.tsx                 # NEW — SVG bars

lib/
├── constants.ts                     # estender com PHASE2_COPY, MOCK_DATA
└── utils.ts                         # já existe
```

**Justificativa para sub-componentizar PainelDashboard:** A regra global ECC `<800 linhas` se aplica. Um único arquivo com KPIs + mapa + ABC + tabela passaria de 400 linhas. Quebrar em `BrazilMap.tsx` e `AbcCurve.tsx` mantém cada arquivo coeso e testável.

### Pattern 1: Server Component por padrão, Client apenas quando inevitável

**What:** Toda seção sem interatividade é Server Component (zero JS shipping). `'use client'` apenas em `Navbar.tsx`.
**When to use:** Sempre que possível — é o default do App Router.
**Example:**
```tsx
// components/Navbar.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CTA_PRIMARY } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // sync no mount (caso já carregue scrollado)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter] duration-200',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-pruma-gray-soft'
          : 'bg-transparent'
      )}
    >
      {/* … */}
    </header>
  );
}
```
[CITED: Next.js App Router docs — Client Components require `'use client'` directive at top of file]

### Pattern 2: Scroll detection com listener passivo

**What:** `addEventListener('scroll', handler, { passive: true })` evita bloquear thread principal.
**When to use:** Sempre que ler `scrollY`.
**Why:** Listener passivo permite ao browser pular preventDefault checks, melhorando jank de scroll.
[CITED: MDN — EventTarget.addEventListener passive option]

### Pattern 3: Mapa do Brasil em SVG inline (zero deps)

**What:** Embutir um path simplificado do contorno do Brasil dentro de um `<svg viewBox="0 0 500 500">` e desenhar `<circle>` para cada cidade com `cx`/`cy` em coordenadas SVG (não lat/lng — coordenadas relativas ao viewBox).
**When to use:** Para representar geograficamente capitais industriais — não precisa ser cartograficamente preciso (é mockup ilustrativo).
**Example:**
```tsx
// components/mockups/BrazilMap.tsx
const cities = [
  { name: 'São Paulo',     cx: 285, cy: 360, r: 8 },
  { name: 'Belo Horizonte', cx: 305, cy: 330, r: 6 },
  { name: 'Curitiba',       cx: 270, cy: 395, r: 5 },
  { name: 'Porto Alegre',   cx: 240, cy: 440, r: 5 },
  { name: 'Recife',         cx: 415, cy: 220, r: 5 },
  { name: 'Rio de Janeiro', cx: 320, cy: 365, r: 6 },
  { name: 'Salvador',       cx: 385, cy: 270, r: 5 },
];

export function BrazilMap() {
  return (
    <svg viewBox="0 0 500 500" className="w-full h-auto" role="img" aria-label="Mapa do Brasil com pontos de presença">
      <path d={BRAZIL_PATH} fill="#F4F6F9" stroke="#E0F6FE" strokeWidth="1" />
      {cities.map((c) => (
        <g key={c.name}>
          <circle cx={c.cx} cy={c.cy} r={c.r * 1.8} fill="#00AEEF" opacity="0.18" />
          <circle cx={c.cx} cy={c.cy} r={c.r} fill="#00AEEF" />
        </g>
      ))}
    </svg>
  );
}
```
**Onde obter o path:** simplificar de uma fonte open data (IBGE GeoJSON convertido) ou usar uma silhueta estilizada que é suficiente para o mockup. Como é ILUSTRATIVO, um path silhueta de ~80 pontos basta — não precisamos do contorno preciso por estado.
**Pitfall:** `cx`/`cy` devem corresponder visualmente ao viewBox; calibrar manualmente sobre a imagem de referência. NÃO usar lat/lng diretamente.

### Pattern 4: Curva ABC como bar chart Tailwind/SVG

**What:** Conjunto de divs com `height` em % representando barras decrescentes (Pareto: 20% clientes = 80% receita). Sem lib.
**Example:**
```tsx
// components/mockups/AbcCurve.tsx
const bars = [
  { label: 'A', clients: '18%', height: 92, value: 'R$ 4.2M' },
  { label: 'A', clients: '14%', height: 78, value: 'R$ 3.6M' },
  { label: 'B', clients: '22%', height: 48, value: 'R$ 1.4M' },
  { label: 'B', clients: '18%', height: 32, value: 'R$ 0.9M' },
  { label: 'C', clients: '28%', height: 12, value: 'R$ 0.3M' },
];

export function AbcCurve() {
  return (
    <div className="flex items-end gap-2 h-32" role="img" aria-label="Curva ABC: distribuição de receita por classe de cliente">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-pruma-sm bg-pruma-cyan"
            style={{ height: `${b.height}%` }}
            aria-hidden
          />
          <span className="font-mono text-[10px] text-pruma-gray-text uppercase">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
```
**Por que SVG/CSS basta:** Sem tooltips interativos, sem responsividade complexa de eixos. Um `<div>` com `height: X%` resolve.

### Pattern 5: Drawer mobile com Framer Motion + reduced-motion

**Example:**
```tsx
const reduce = useReducedMotion();

<AnimatePresence>
  {open && (
    <motion.div
      initial={reduce ? { opacity: 0 } : { x: '100%' }}
      animate={reduce ? { opacity: 1 } : { x: 0 }}
      exit={reduce ? { opacity: 0 } : { x: '100%' }}
      transition={{ duration: reduce ? 0.15 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-white"
    >
      {/* drawer content */}
    </motion.div>
  )}
</AnimatePresence>
```
[CITED: framer-motion useReducedMotion hook returns true when prefers-reduced-motion: reduce]

### Pattern 6: Composição do `app/page.tsx`

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { Diagnostico } from '@/components/Diagnostico';
import { Tese } from '@/components/Tese';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar mora no layout, fora do <main> */}
      <Hero />
      <Diagnostico />
      <Tese />
    </main>
  );
}
```

E `app/layout.tsx` recebe `<Navbar />` antes de `{children}`. Importante: `<main>` precisa de `pt-{altura-da-navbar}` (ex: `pt-20`) porque a Navbar é `fixed` e sai do fluxo.

### Anti-Patterns to Avoid

- **Hand-rolled scroll throttle:** Não escrever debounce manual — listener passivo + `setState` é suficiente para um boolean.
- **Importar todo lucide:** Usar named imports (`import { Menu } from 'lucide-react'`) — tree-shaking ok.
- **`<Image>` para SVGs inline:** Mockups devem ser JSX puro, não `next/image` apontando para arquivo `.svg`. Inline permite usar tokens Tailwind para cores.
- **Animar `width`/`height`:** Drawer só anima `transform` (x) e opacity. Nunca `width`.
- **Esquecer `position: fixed` offset no main:** Navbar fixa precisa de padding-top no `<main>` para não sobrepor Hero.
- **Renderizar mockup em Client Component:** Mockups não interagem — são puramente declarativos. Manter em Server Component preserva LCP.

## Don't Hand-Roll

| Problema | Don't Build | Use Instead | Why |
|----------|-------------|-------------|-----|
| Class name composition | Função custom de merge | `cn()` em `lib/utils.ts` (já existe) | clsx + tailwind-merge resolvem conflitos |
| Throttle/debounce de scroll | RAF próprio | `{ passive: true }` listener simples + boolean state | LCP impact mínimo; sem necessidade |
| Reduced-motion check | `window.matchMedia` manual | `useReducedMotion()` framer-motion | Hook nativo do framer, já no stack |
| Sticky header | `IntersectionObserver` | `position: fixed` + scroll listener | Mais simples, mais performático |
| Botão CTA | Custom anchor styling | `<Button href="…">` Phase 1 | Já tem variant primary/ghost |
| Mapa Brasil | TopoJSON + d3 | SVG path estático estilizado | Mockup ilustrativo, não cartografia real |
| Bar chart ABC | recharts/chart.js | Divs com `height%` | 5 barras estáticas; lib é desperdício |
| Card de diagnóstico | Re-implementar | `<Card>` Phase 1 + className override | Reuso obrigatório |
| Container de seção | `<div>` + max-width manual | `<Container>` Phase 1 | Já configurado |
| Eyebrow | `<span>` manual | `<Eyebrow>` Phase 1 | Já configurado |

**Key insight:** O Phase 1 já entregou TODOS os primitivos visuais. Phase 2 deve ser primariamente composição, não construção. A única "construção real" é Navbar + os dois mockups.

## Common Pitfalls

### Pitfall 1: Tailwind JIT não captura classes dinâmicas
**What goes wrong:** Escrever `className={\`bg-pruma-\${color}\`}` faz o JIT não gerar a classe no build → estilo some em produção.
**Why it happens:** Purge do Tailwind 3 só vê strings completas no source.
**How to avoid:** Sempre escrever classes completas literais. Para variantes, usar lookup object:
```tsx
const variants = {
  primary: 'bg-pruma-navy text-white',
  ghost: 'bg-transparent text-pruma-navy',
};
const cls = variants[variant];
```
**Warning signs:** Classe aparece em dev mas some em `npm run build`.

### Pitfall 2: SSR hydration mismatch com scroll listener
**What goes wrong:** Server renderiza Navbar com `scrolled = false`. Client monta com `scrolled = true` (se usuário deu reload já scrolled) → React reclama de mismatch.
**Why it happens:** `scrollY` é zero no SSR; mount inicial pode já estar > 8.
**How to avoid:** Sempre iniciar com `scrolled = false` e permitir o `useEffect` corrigir após mount. Como o estado inicial é determinístico (false), não há mismatch — o listener apenas atualiza pós-hydration. O efeito visual: por 1 frame a Navbar pode aparecer transparente quando deveria estar com blur. Aceitável; alternativa é usar `useLayoutEffect` mas ele não roda no SSR.
**Warning signs:** `Warning: Text content did not match. Server: "X" Client: "Y"` no console.

### Pitfall 3: Font CSS variable não chega ao componente
**What goes wrong:** Headline aparece com Times New Roman (fallback Georgia) em vez de Fraunces.
**Why it happens:** `font-serif` só funciona se `--font-fraunces` estiver definido no `<html>`. Se um componente é renderizado fora do tree do layout (raro, mas possível em portal), perde a variável.
**How to avoid:** Confirmar que `app/layout.tsx` aplica `${fraunces.variable}` ao `<html>` (já confirmado: layout.tsx:50–53). Não criar portals/divs montados em `document.body` que escapem.
**Warning signs:** DevTools mostra `font-family: Georgia, serif` na headline.

### Pitfall 4: `position: fixed` esconde início do Hero
**What goes wrong:** Navbar fixa fica por cima do título do Hero.
**How to avoid:** `<main>` (ou Hero) recebe `pt-20` (80px) ou `pt-24` para compensar a altura da Navbar.
**Warning signs:** Eyebrow do Hero aparece colada na Navbar.

### Pitfall 5: Drawer não fecha ao navegar para âncora
**What goes wrong:** Usuário clica "Funcionalidades" no drawer → âncora rola, mas drawer permanece aberto.
**How to avoid:** No click handler de cada link do drawer, chamar `setOpen(false)` antes/junto com a navegação.
**Warning signs:** Mobile UX confusa; usuário precisa fechar manualmente após cada navegação.

### Pitfall 6: Body scroll por trás do drawer aberto
**What goes wrong:** Drawer aberto, usuário rola — página atrás rola junto.
**How to avoid:** Quando `open === true`, aplicar `document.body.style.overflow = 'hidden'` em `useEffect`. Limpar no unmount.
```tsx
useEffect(() => {
  document.body.style.overflow = open ? 'hidden' : '';
  return () => { document.body.style.overflow = ''; };
}, [open]);
```

### Pitfall 7: Mockup quebra em viewport estreita do Hero
**What goes wrong:** PainelDashboard widescreen empurra layout horizontal em < 1024px.
**How to avoid:** Container do mockup com `max-w-full overflow-hidden` + escala interna; OU stack abaixo do conteúdo em mobile (`md:grid-cols-2` com `grid-cols-1` default), conforme D-06.
**Warning signs:** Scroll horizontal em mobile; `body { overflow-x: hidden }` é band-aid, não solução.

### Pitfall 8: Reduced-motion ignorado em Framer
**What goes wrong:** Drawer animação roda mesmo com reduced-motion ativo.
**How to avoid:** `useReducedMotion()` retorna boolean — usar para shortcurcuitar `transform` para `opacity`-only.
[CITED: framer-motion docs — useReducedMotion hook]

### Pitfall 9: lucide-react com `strokeWidth` errado
**What goes wrong:** Ícones aparecem mais grossos que o brief manda (1.5px).
**How to avoid:** Passar `strokeWidth={1.5}` em cada ícone OU criar wrapper:
```tsx
import { Menu, X, Eye, FileText, Layers } from 'lucide-react';
<Menu strokeWidth={1.5} size={24} />
```
**Recommended:** Definir prop padrão ou usar wrapper em `components/ui/Icon.tsx` para garantir consistência.

### Pitfall 10: Status emoji 🟢 dentro do mockup
**What goes wrong:** Brief proíbe emojis na LP, mas D-15 EXPLICITAMENTE permite 🟢 dentro de MOCK-01 status.
**How to avoid:** Permitir emoji apenas na string de status do mockup (`status: '🟢 Online'`); manter ban em todo o resto. Documentar no comentário do constants.

## Code Examples

### Navbar com scroll-blur

```tsx
// components/Navbar.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { CTA_PRIMARY, NAV_LINKS } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-200',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-pruma-gray-soft'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <Container as="nav" className="flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="font-serif font-semibold text-xl text-pruma-navy tracking-tight">
          PRUMA
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-medium text-pruma-navy hover:text-pruma-navy-deep transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <Button href="#contato">{CTA_PRIMARY}</Button>
        </div>
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          className="md:hidden p-2 text-pruma-navy"
          onClick={() => setOpen(true)}
        >
          <Menu strokeWidth={1.5} size={24} />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white"
            role="dialog"
            aria-modal="true"
          >
            {/* drawer content with close button + links + CTA */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

### Hero composition

```tsx
// components/Hero.tsx
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { PainelDashboard } from '@/components/mockups/PainelDashboard';
import { CTA_PRIMARY, CTA_SECONDARY, HERO_COPY } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Eyebrow>{HERO_COPY.eyebrow}</Eyebrow>
            <h1 className="font-serif text-[40px] leading-[1.05] md:text-[56px] lg:text-[72px] font-medium text-pruma-navy tracking-[-0.01em]">
              {HERO_COPY.headline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-pruma-gray-text leading-relaxed max-w-xl">
              {HERO_COPY.subhead}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="#contato">{CTA_PRIMARY}</Button>
              <Button variant="ghost" href="#como-funciona">{CTA_SECONDARY}</Button>
            </div>
            <p className="mt-12 font-mono text-xs uppercase tracking-eyebrow text-pruma-gray-text">
              {HERO_COPY.microcopy}
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-pruma-lg shadow-pruma-md overflow-hidden border border-pruma-gray-soft">
              <PainelDashboard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

### Diagnóstico cards

```tsx
// components/Diagnostico.tsx
import { Eye, Layers, FileSpreadsheet } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { DIAG_COPY } from '@/lib/constants';

const ICONS = { eye: Eye, layers: Layers, sheet: FileSpreadsheet };

export function Diagnostico() {
  return (
    <section id="diagnostico" className="py-24 md:py-32 bg-pruma-cyan-pale">
      <Container>
        <Eyebrow>{DIAG_COPY.eyebrow}</Eyebrow>
        <h2 className="font-serif text-3xl md:text-[52px] leading-[1.1] font-medium text-pruma-navy max-w-3xl">
          {DIAG_COPY.headline}
        </h2>
        <p className="mt-4 text-lg text-pruma-gray-text max-w-2xl">{DIAG_COPY.subhead}</p>
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIAG_COPY.cards.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <Card as="li" key={c.title} interactive={false} className="bg-white">
                <Icon strokeWidth={1.5} size={28} className={c.accent ? 'text-pruma-cyan' : 'text-pruma-navy'} />
                <h3 className="mt-6 font-serif text-2xl font-semibold text-pruma-navy">{c.title}</h3>
                <p className="mt-3 text-pruma-gray-text leading-relaxed">{c.body}</p>
              </Card>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router + `_app.tsx` | App Router + RSC | Next.js 13+ | Server Components default; menos JS shipping |
| `getServerSideProps` para hero estático | Server Components puros | Next.js 13+ | Sem boilerplate; cache nativo |
| `react-spring` | `framer-motion` | 2023+ | API mais simples; `useReducedMotion` integrado |
| `<style jsx>` ou CSS-in-JS | Tailwind + CSS variables | 2024+ | Zero runtime; tree-shake automático |
| `react-icons` | `lucide-react` | 2023+ | Tree-shakeable, stroke-width consistente, design coerente |

**Deprecated/outdated:**
- `next/head` em App Router → usar `metadata` export (já feito Phase 1).
- `useRouter` from `next/router` → usar `next/navigation` no App Router.

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Navbar**
- D-01: Mobile = hamburger + drawer (lucide Menu/X icons), full overlay com links + CTA.
- D-02: Nav links = "Como funciona · Funcionalidades · Para quem · Contato" (4 links max, âncoras para Phase 3 sections).
- D-03: backdrop-blur-md ativa quando `scrollY > 8`.

**Hero**
- D-04: PainelDashboard COMPLETO (MOCK-02 full) renderizado inline na coluna direita. Não simplified.
- D-05: Container do painel = `rounded-pruma-lg` (16px) + `shadow-pruma-md` + slight elevation. Style ref Stripe/Linear. Sem browser chrome.
- D-06: Mobile (< 768px) = PainelDashboard stacks abaixo de headline+CTAs. Não esconder.
- D-07: Headline = derivar de "Operações comerciais B2B que precisam parar de improvisar." em 2 linhas, Fraunces 72px navy. Tone Sábio 60% + Mago 40%.
- D-08: Subhead = Inter, target Diretor Comercial/CFO C-level, single sentence ≤ 100 chars.
- D-09: Microcopy = Mono UPPERCASE, separadores `·`. Pattern exemplo: "SEM CONTRATO · IMPLANTAÇÃO EM 30 DIAS · DADO REAL DE OPERAÇÃO".

**Diagnóstico**
- D-10: Cards = title + 1–2 line description; tom consultor cirúrgico.
- D-11: 3 títulos LOCKED: Visibilidade tardia / Política comercial fragmentada / Fechamento planilha.
- D-12: Ícones lucide thin-stroke 1.5px; max 1 ícone ciano por grupo, resto navy.

**Tese Pruma**
- D-13: Headline LOCKED: "Força de vendas não é um app."
- D-14: Body Inter 19px, max-w 720px, centered. Tom afirmativo distinguindo governança de produtividade. Banidos: "automatize", "plataforma all-in-one".

**MOCK-01: AppVendedor**
- D-15: Cliente = Auto Center São Paulo Ltda. Total R$18.420,00. Desconto 3%. Status 🟢 Online. Botão "Fechar pedido".
- D-16: 8 itens auto-parts/distribuição com qty + unit price somando R$18.420,00 pós 3% desconto (pré ~R$18.989,69).
- D-17: max-w 380px, `rounded-pruma-lg`, mobile-first.

**MOCK-02: PainelDashboard**
- D-18: 4 KPI cards realistas para B2B distributor mid-market (R$50M–300M). Ex: Pedidos Hoje, Ticket Médio, Clientes Ativos, Meta do Mês %.
- D-19: Tabela "Clientes em risco" = 3 linhas, nomes B2B fictícios brasileiros, status (Crítico/Atenção), dias sem pedido, valor em risco.
- D-20: Mapa Brasil com pontos ciano em SP, BH, Curitiba, POA, Recife + 2–3 outros. Tamanho proporcional ao volume.
- D-21: Curva ABC bar chart, distribuição Pareto realista.
- D-22: Style Stripe-inspired widescreen — header com filtros, linha KPIs, ABC + mapa, tabela risco. `rounded-pruma-lg` container.

### Claude's Discretion

- Texto exato dos nav links (default sugerido: "Como funciona · Funcionalidades · Para quem · Contato").
- Hero headline wording exato (2-line rhythm).
- Hero subhead e microcopy text.
- Diagnóstico card descriptions.
- Tese body paragraph.
- MOCK-01 nomes de produto e preços individuais.
- MOCK-02 valores exatos KPIs, nomes empresas em risco, coordenadas das cidades no mapa.
- Seleção de ícones lucide por card/seção.

### Deferred Ideas (OUT OF SCOPE)

Nenhum — discussão ficou dentro do scope.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SECT-01 | Navbar sticky, backdrop-blur quando scrollY > 8, logo PRUMA Fraunces 600, nav links âncora, CTA "Falar com um consultor" | Pattern 1 (Server/Client split), Pattern 2 (passive scroll listener), código exemplo Navbar acima |
| SECT-02 | Hero — fundo branco, eyebrow + h1 Fraunces 72px (2 linhas) + subhead + 2 CTAs + PainelDashboard direita + microcopy Mono | Código exemplo Hero acima; reuso de Eyebrow/Button Phase 1 |
| SECT-03 | Diagnóstico — fundo `#E0F6FE`, eyebrow + h2 + subhead + 3 cards (titles locked) | Código exemplo Diagnostico; reuso `<Card>` Phase 1 |
| SECT-04 | Tese — fundo branco, editorial centralizado, h2 Fraunces 56px + parágrafo Inter 19px max-w 720px | Layout simples; Container + max-w + text-center |
| MOCK-01 | AppVendedor mobile (max 380px, radius 16px, dados Auto Center, 8 itens, total R$18.420, desc 3%, status 🟢, botão "Fechar pedido") | SVG-free, puro JSX + Tailwind; pitfall #10 (emoji permitido em status) |
| MOCK-02 | PainelDashboard widescreen Stripe-style (header filtros, 4 KPIs, ABC + mapa, tabela risco) | Patterns 3 (BrazilMap SVG inline) + 4 (AbcCurve divs) + componentização em sub-arquivos |

## Runtime State Inventory

Não aplicável — Phase 2 é greenfield (cria componentes novos, sem rename/migration).

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Nenhum framework de teste instalado em `package.json` [VERIFIED: package.json:11-31] |
| Config file | none |
| Quick run command | `npm run dev` (manual visual) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

Como nenhum framework de teste está configurado e o projeto privilegia visual-first, validação é manual em Phase 2 (Phase 4 cobre Lighthouse/QA via QA-01..QA-05). Validação automática mínima:

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SECT-01 | Build compila Navbar sem erros TS | smoke | `npm run build` | yes |
| SECT-02 | Build compila Hero sem erros TS | smoke | `npm run build` | yes |
| SECT-03 | Build compila Diagnostico sem erros TS | smoke | `npm run build` | yes |
| SECT-04 | Build compila Tese sem erros TS | smoke | `npm run build` | yes |
| MOCK-01 | Build compila AppVendedor sem erros TS | smoke | `npm run build` | yes |
| MOCK-02 | Build compila PainelDashboard sem erros TS | smoke | `npm run build` | yes |
| Visual SECT-01 | Navbar muda blur ao scrollar | manual | `npm run dev` + scroll manual | n/a |
| Visual SECT-02 | Hero renderiza com headline 72px | manual | DevTools inspect computed font-size | n/a |
| Visual MOCK-02 | Mapa + ABC + tabela visíveis | manual | navegação visual | n/a |

### Sampling Rate
- **Per task commit:** `npm run lint` + `npx tsc --noEmit`
- **Per wave merge:** `npm run build`
- **Phase gate:** `npm run build` verde + checklist visual manual antes de `/gsd-verify-work`

### Wave 0 Gaps

Phase 2 não introduz framework de teste — alinhado com decisão Phase 1 de adiar testes para Phase 4 (QA-02 Lighthouse cobre verificação automatizada). Se o usuário quiser introduzir Playwright para regressão visual, isso seria uma DECISION nova fora do scope atual de Phase 2.

- [ ] Nenhum gap a corrigir nesta fase. Validação automatizada estabelecida = `tsc --noEmit` + `next build` + `next lint`.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | LP não tem login |
| V3 Session Management | no | sem sessões |
| V4 Access Control | no | conteúdo público |
| V5 Input Validation | partial | nav links são âncoras estáticas; nenhum input em Phase 2 (forms vêm em Phase 3) |
| V6 Cryptography | no | sem dados sensíveis |
| V14 Configuration | yes | CSP, headers de segurança Next.js (Phase 4) |

### Known Threat Patterns for Next.js LP

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via copy injetada | Tampering | Constantes em `lib/constants.ts` são strings TS literais — impossível injection sem editar o arquivo |
| External script tag | Tampering | Nenhum third-party script em Phase 2 |
| Click-jacking | Spoofing | `X-Frame-Options: DENY` em Phase 4 (next.config) |
| Open redirect | Tampering | CTAs apontam para âncoras `#contato` — sem redirect dinâmico |

**Phase 2 não introduz superfície de ataque nova além do já mapeado em Phase 1.**

## Project Constraints (from CLAUDE.md)

Diretivas extraídas de `./CLAUDE.md` que restringem implementação:

- **Stack travado:** Next.js 14 App Router + TypeScript + Tailwind 3.4+ + Framer Motion 11+. Nenhuma adição.
- **Paleta exata (HEX deve bater):** `#0D1B4B` (navy 65%), `#00AEEF` (cyan 25%), `#FFFFFF`, `#FAFAFA`, `#E0F6FE`, `#5B6B85`. Sem aproximações.
- **Tipografia:** Headlines = Fraunces (serif). Body = Inter. Microcopy/labels = JetBrains Mono UPPERCASE. Phase 2 NÃO PODE usar Inter em headlines.
- **LP é LIGHT:** Apenas SECT-09 e Footer são dark — Phase 2 não tem nenhuma seção dark.
- **Banido:** gradientes, emojis (exceto 🟢 dentro do mockup status, conforme D-15), generic SaaS visuals (gradient blobs centralizados, hero stock).
- **Shadow obrigatoriamente sutil:** `0 1px 3px rgba(13,27,75,0.06)` (`shadow-pruma-sm`); `shadow-pruma-md` apenas para mockups elevados.
- **Copy banido:** "Venda mais", "Plataforma all-in-one", "Substitua o WhatsApp", "Automatize", "Simples assim", "Fácil", "Uau", exclamation marks fora de mockup status.
- **Tone:** Sábio 60% + Mago 40%, afirmativo, insight-led.
- **Centralização de copy:** TUDO em `lib/constants.ts` (estender com `HERO_COPY`, `DIAG_COPY`, `TESE_COPY`, `MOCK_DATA`, `NAV_LINKS`).
- **Ícones:** lucide-react com `strokeWidth={1.5}` SEMPRE.
- **Organização de pastas:** `/components` com um arquivo por seção + `/components/mockups` + `/components/ui`.

## File List (deliverables — exact filenames)

Novos arquivos a criar:

| Path | Type | Notes |
|------|------|-------|
| `components/Navbar.tsx` | Client Component | `'use client'`; scroll detection + drawer |
| `components/Hero.tsx` | Server Component | composição Eyebrow + h1 + Buttons + PainelDashboard |
| `components/Diagnostico.tsx` | Server Component | 3 Cards on bg-pruma-cyan-pale |
| `components/Tese.tsx` | Server Component | layout editorial centralizado |
| `components/mockups/AppVendedor.tsx` | Server Component | mobile mockup (MOCK-01) |
| `components/mockups/PainelDashboard.tsx` | Server Component | dashboard composto (MOCK-02) |
| `components/mockups/BrazilMap.tsx` | Server Component | SVG inline com cidades |
| `components/mockups/AbcCurve.tsx` | Server Component | bar chart CSS |

Arquivos a editar:

| Path | Change |
|------|--------|
| `app/layout.tsx` | inserir `<Navbar />` antes de `{children}` |
| `app/page.tsx` | substituir placeholder pela composição `<Hero/> <Diagnostico/> <Tese/>` + `pt-20` para offset da Navbar fixa |
| `lib/constants.ts` | adicionar `NAV_LINKS`, `HERO_COPY`, `DIAG_COPY`, `TESE_COPY`, `MOCK_01_DATA`, `MOCK_02_DATA` |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Path SVG simplificado da silhueta do Brasil é aceitável (não precisa contorno preciso por estado) | Pattern 3 (BrazilMap) | Se o usuário quiser mapa cartograficamente preciso, precisaria GeoJSON real → revisar para react-simple-maps OU path mais detalhado |
| A2 | `pt-20` (80px) é offset adequado para a Navbar fixa em desktop, `pt-16` (64px) em mobile | Hero | Se altura da Navbar mudar, ajustar. Verificar visual no `npm run dev`. |
| A3 | `useReducedMotion` do framer-motion é suficiente — não precisamos `window.matchMedia` manual | Pattern 5 | Falso só se versão de framer for < 6, mas estamos em ^11 [VERIFIED: package.json] |
| A4 | Nenhum framework de teste será introduzido em Phase 2 | Validation Architecture | Se usuário pedir Playwright/Vitest, é decisão nova fora de scope |
| A5 | Z-index `z-40` para Navbar e `z-50` para drawer evitam conflito com sections | Navbar code | Sem outros fixed/sticky elements no LP, conflitos improváveis |
| A6 | `pre-discount total ~R$18.989,69` (D-16) é pista correta para 18420 / 0.97 | MOCK-01 | Verificar matemática: 18420 / 0.97 = 18989.69 ✓ [VERIFIED: cálculo manual] |

## Open Questions (RESOLVED)

1. **Texto exato dos nav links — confirmado pela DECISION D-02 (default sugerido)**
   - O usuário travou "Como funciona · Funcionalidades · Para quem · Contato" como default. Plano deve usá-lo verbatim a menos que o copywriting sub-step justifique alteração.

2. **Mapa Brasil — qual nível de fidelidade?**
   - Resposta de pesquisa: silhueta estilizada via path SVG simplificado é suficiente (mockup ilustrativo). Não justifica importar TopoJSON.
   - Se a discussão futura indicar "precisa de mapa por estado", revisar.

3. **Filtros do header do PainelDashboard — interativos ou cosméticos?**
   - D-22 menciona "header com filtros" mas não diz se são interativos.
   - Recomendação: cosméticos (selects desabilitados ou divs visuais com chevron). Phase 2 é estática; interatividade real seria escopo Phase 3+.

4. **Logo PRUMA — texto Fraunces ou SVG?**
   - SECT-01 diz "logo 'PRUMA' Fraunces 600". Recomendação: texto Fraunces font-weight 600 (sem SVG separado). Permite gerenciamento via CSS variable.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js dev/build | ✓ | inherited from Phase 1 | — |
| npm | install/run | ✓ | inherited from Phase 1 | — |
| `framer-motion` | Navbar drawer | ✓ | ^11 | — |
| `lucide-react` | ícones | ✓ | ^0.511.0 | — |

**Missing dependencies with no fallback:** Nenhuma — todas dependências fechadas em Phase 1.
**Missing dependencies with fallback:** Nenhuma.

## Sources

### Primary (HIGH confidence)
- `package.json` — versões exatas das libs [VERIFIED]
- `tailwind.config.ts` — todos os tokens `pruma.*`, `shadow-pruma-*`, `rounded-pruma-*`, `eyebrow-line` [VERIFIED]
- `app/globals.css` — CSS custom properties, regra `prefers-reduced-motion`, herança Fraunces para h1–h4 [VERIFIED]
- `components/ui/Button.tsx`, `Card.tsx`, `Eyebrow.tsx`, `Container.tsx` — primitivos Phase 1 prontos para reuso [VERIFIED]
- `lib/constants.ts` — `CTA_PRIMARY`, `CTA_SECONDARY`, `CTA_FORM`, `SITE_TITLE` [VERIFIED]
- `app/layout.tsx` — variáveis de fonte aplicadas no `<html>` [VERIFIED]
- `.planning/phases/01-foundation/01-UI-SPEC.md` — contrato visual completo herdado [VERIFIED]
- `.planning/phases/02-hero-experience/02-CONTEXT.md` — decisões D-01..D-22 [VERIFIED]
- `.planning/phases/02-hero-experience/02-UI-SPEC.md` — Phase 2 UI contract aprovado [VERIFIED]
- `.planning/REQUIREMENTS.md` — SECT-01..04, MOCK-01, MOCK-02 specs [VERIFIED]

### Secondary (MEDIUM confidence)
- Next.js 14 App Router docs (Server vs. Client Components) [CITED: official docs general knowledge]
- framer-motion `useReducedMotion` hook [CITED: framer-motion docs]
- MDN — passive event listeners para scroll performance [CITED]

### Tertiary (LOW confidence)
- Path SVG simplificado do Brasil — A1 marcado para validação visual (assumption)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — todas libs já travadas Phase 1, versões verificadas
- Architecture: HIGH — patterns Server/Client default Next.js 14 são canônicos
- Pitfalls: HIGH — coletados de experiência conhecida + verificados contra docs

**Research date:** 2026-05-06
**Valid until:** 2026-06-05 (30 dias — stack estável; reverificar se passar)
