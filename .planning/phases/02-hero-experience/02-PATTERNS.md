# Phase 2: Hero Experience - Pattern Map

**Mapped:** 2026-05-06
**Files analyzed:** 11 (8 novos + 3 modificados)
**Analogs found:** 8 / 11 (3 sem analog direto — usar Phase 1 primitivos como base composicional)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `components/Navbar.tsx` | layout-shell (client) | event-driven (scroll + drawer state) | `components/ui/Button.tsx` (client-aware patterns) + `components/ui/Container.tsx` | partial (sem analog client) |
| `components/Hero.tsx` | section (server) | static-render | `components/ui/Eyebrow.tsx` + `components/ui/Container.tsx` (composição Phase 1) | role-match |
| `components/Diagnostico.tsx` | section (server) | static-render (list of cards) | `components/ui/Card.tsx` + `components/ui/Container.tsx` | exact (Card é base direta) |
| `components/Tese.tsx` | section (server) | static-render | `components/ui/Container.tsx` + `components/ui/Eyebrow.tsx` | role-match |
| `components/mockups/AppVendedor.tsx` | mockup (server) | static-render | nenhum — primeiro mockup do projeto | no-analog |
| `components/mockups/PainelDashboard.tsx` | mockup-composite (server) | static-render (composição) | nenhum — primeiro mockup composto | no-analog |
| `components/mockups/BrazilMap.tsx` | mockup-leaf (server) | static-render (SVG inline) | nenhum — primeiro SVG inline | no-analog |
| `components/mockups/AbcCurve.tsx` | mockup-leaf (server) | static-render (CSS bars) | `components/ui/Card.tsx` (uso de tokens Tailwind) | partial |
| `app/page.tsx` (modificado) | route-page (server) | composition | `app/page.tsx` (atual) | exact |
| `app/layout.tsx` (modificado) | root-layout (server) | composition + font injection | `app/layout.tsx` (atual) | exact |
| `lib/constants.ts` (modificado) | config (build-time) | static-export | `lib/constants.ts` (atual) | exact |

## Pattern Assignments

### `components/Navbar.tsx` (layout-shell client, event-driven)

**Analog:** `components/ui/Button.tsx` (variant pattern + cn composition) + `components/ui/Container.tsx` (wrapper structure)
**Note:** Não há Client Component anterior no codebase. Padrões `'use client'`, scroll listener e drawer vêm da RESEARCH.md (validados pela documentação oficial Next.js / framer-motion).

**Imports pattern** (extraído de `components/ui/Button.tsx` linhas 1-3 + RESEARCH.md L394-403):
```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { CTA_PRIMARY, NAV_LINKS } from '@/lib/constants';
```

**Class composition pattern** (de `components/ui/Button.tsx` linhas 35 + 41):
```typescript
const classes = cn(baseStyles, variantStyles[variant], className);
// Aplicar mesmo padrão para classes condicionais por scrolled/open
```

**Container wrapper pattern** (de `components/ui/Container.tsx` linha 15):
```typescript
<Container as="nav" className="flex items-center justify-between h-16 md:h-20">
  {/* logo + links + CTA */}
</Container>
```
Reusar `Container` polimórfico — já suporta `as="nav"` via prop `as`.

**Button reuse pattern** (de `components/ui/Button.tsx` linhas 37-52):
```typescript
// CTA da Navbar (desktop) — Button já é Link-aware via prop href
<Button href="#contato">{CTA_PRIMARY}</Button>
```

**Scroll listener + drawer body lock** (RESEARCH.md L410-420 — não há analog no codebase):
```typescript
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
```

**Reduced-motion drawer pattern** (RESEARCH.md L252-268):
```typescript
const reduce = useReducedMotion();
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
      {/* drawer content */}
    </motion.div>
  )}
</AnimatePresence>
```

**Lucide icon pattern** (RESEARCH.md L378-382 — pitfall #9):
```typescript
<Menu strokeWidth={1.5} size={24} />
<X strokeWidth={1.5} size={24} />
```
SEMPRE `strokeWidth={1.5}` — projeto exige thin-stroke 1.5px (CLAUDE.md).

---

### `components/Hero.tsx` (section server, static-render)

**Analog:** Composição de Phase 1 primitives (`Eyebrow` + `Container` + `Button`).

**Imports pattern** (espelho de `components/ui/Button.tsx` linha 3 e `components/ui/Card.tsx` linha 1):
```typescript
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { PainelDashboard } from '@/components/mockups/PainelDashboard';
import { CTA_PRIMARY, CTA_SECONDARY, HERO_COPY } from '@/lib/constants';
```
Sem `'use client'` — é Server Component (RESEARCH.md Pattern 1).

**Section + Container layout pattern** (extraído de RESEARCH.md L487-517):
```typescript
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
```

**Token usage pattern** (extraído de `tailwind.config.ts` linhas 12-49):
- Cores: `bg-white`, `text-pruma-navy`, `text-pruma-gray-text`, `border-pruma-gray-soft`
- Radius: `rounded-pruma-lg` (16px)
- Shadow: `shadow-pruma-md` (mockup elevated container)
- Spacing/letter: `tracking-eyebrow` (eyebrow microcopy)
- Fonte: `font-serif` (h1 Fraunces) / `font-mono` (microcopy)

**Headline tipografia (do globals.css linhas 49-53):**
- h1 herda `font-family: var(--font-fraunces)` automaticamente. `font-medium` (500) é o default. Nunca usar Inter em headline.

**Mobile stack (D-06):** O grid `grid-cols-1 lg:grid-cols-12` garante stack mobile. PainelDashboard NÃO é hidden em < 768px.

---

### `components/Diagnostico.tsx` (section server, static-render list)

**Analog:** `components/ui/Card.tsx` (linha 17-27 — base direta) + `components/ui/Container.tsx` + `components/ui/Eyebrow.tsx`

**Imports pattern**:
```typescript
import { Eye, Layers, FileSpreadsheet } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { DIAG_COPY } from '@/lib/constants';

const ICONS = { eye: Eye, layers: Layers, sheet: FileSpreadsheet } as const;
```

**Card reuse pattern** (extraído de `components/ui/Card.tsx` linhas 17-27):
```typescript
// Card já aceita as="li" e className override — perfeito para grid item
<Card as="li" interactive={false} className="bg-white">
  <Icon strokeWidth={1.5} size={28} className={c.accent ? 'text-pruma-cyan' : 'text-pruma-navy'} />
  <h3 className="mt-6 font-serif text-2xl font-semibold text-pruma-navy">{c.title}</h3>
  <p className="mt-3 text-pruma-gray-text leading-relaxed">{c.body}</p>
</Card>
```
**Decisão crítica:** Diagnóstico cards NÃO devem ser interativos (D-10 → cards informativos, não navegáveis). Passar `interactive={false}` para suprimir hover transform.

**Section layout pattern** (RESEARCH.md L532-557):
```typescript
<section id="diagnostico" className="py-24 md:py-32 bg-pruma-cyan-pale">
  <Container>
    <Eyebrow>{DIAG_COPY.eyebrow}</Eyebrow>
    <h2 className="font-serif text-3xl md:text-[52px] leading-[1.1] font-medium text-pruma-navy max-w-3xl">
      {DIAG_COPY.headline}
    </h2>
    <p className="mt-4 text-lg text-pruma-gray-text max-w-2xl">{DIAG_COPY.subhead}</p>
    <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {DIAG_COPY.cards.map((c) => { /* ... */ })}
    </ul>
  </Container>
</section>
```

**Background token (D-11 → SECT-03):** `bg-pruma-cyan-pale` (#E0F6FE) — único token semântico para fundo de seção light-cyan. ZERO gradients (CLAUDE.md).

**Icon strokeWidth pattern** (D-12): Sempre `strokeWidth={1.5}`. Apenas 1 ícone ciano por grupo, resto navy — controlado por flag `accent: true` no objeto do card em `lib/constants.ts`.

**Lookup object para ícones (Pitfall #1 RESEARCH.md):** Tailwind JIT exige strings literais. Ícones lucide importados como named imports e indexados por string → mapping object const. Nunca `<Icon name={dynamic}>` se `name` for string concat.

---

### `components/Tese.tsx` (section server, static-render)

**Analog:** `components/ui/Container.tsx` (linha 15) + `components/ui/Eyebrow.tsx`. Sem cards, sem ícones.

**Imports pattern**:
```typescript
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TESE_COPY } from '@/lib/constants';
```

**Centered editorial layout pattern** (CONTEXT.md L119-120, RESEARCH.md L633):
```typescript
<section id="tese" className="py-24 md:py-32 bg-white">
  <Container>
    <div className="max-w-[720px] mx-auto text-center">
      <Eyebrow className="justify-center">{TESE_COPY.eyebrow}</Eyebrow>
      <h2 className="font-serif text-4xl md:text-[56px] leading-[1.1] font-medium text-pruma-navy">
        {TESE_COPY.headline}
      </h2>
      <p className="mt-8 text-[19px] leading-relaxed text-pruma-gray-text">
        {TESE_COPY.body}
      </p>
    </div>
  </Container>
</section>
```

**Eyebrow centering note:** `Eyebrow` em `components/ui/Eyebrow.tsx` linha 11 é `inline-flex` com `mb-4`. Para centralizar o bloco inteiro, envolver em wrapper com `text-center` ou usar `flex justify-center`. Aceita `className` override.

**Headline copy lock (D-13):** "Força de vendas não é um app." — string literal em `lib/constants.ts`. Não parametrizar.

**Body banidas:** "automatize", "plataforma all-in-one" (D-14, CLAUDE.md). Tom afirmativo Sábio+Mago.

---

### `components/mockups/AppVendedor.tsx` (mockup leaf server, static-render)

**Analog:** Nenhum — primeiro mockup do projeto. Padrão composicional vem do uso de tokens Tailwind via `Card.tsx`.

**Imports pattern (esperado):**
```typescript
import { MOCK_01_DATA } from '@/lib/constants';
// Sem framer-motion, sem useState — Server Component puro
```

**Container pattern (D-17 + RESEARCH.md):**
```typescript
<div className="max-w-[380px] mx-auto bg-white rounded-pruma-lg shadow-pruma-sm border border-pruma-gray-soft overflow-hidden">
  {/* status bar — emoji 🟢 PERMITIDO apenas aqui (Pitfall #10) */}
  <header className="px-5 py-4 border-b border-pruma-gray-soft flex items-center justify-between">
    <div>
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pruma-gray-text">{MOCK_01_DATA.label}</p>
      <h3 className="font-serif text-lg font-semibold text-pruma-navy mt-1">{MOCK_01_DATA.client}</h3>
    </div>
    <span className="font-mono text-xs text-pruma-gray-text">{MOCK_01_DATA.status}</span>
  </header>
  {/* 8 line items */}
  <ul>
    {MOCK_01_DATA.items.map((it) => (
      <li key={it.sku} className="px-5 py-3 border-b border-pruma-gray-soft flex justify-between items-center">
        <div>
          <p className="text-sm text-pruma-navy">{it.name}</p>
          <p className="font-mono text-[11px] text-pruma-gray-text">{it.qty} × R$ {it.unit}</p>
        </div>
        <p className="font-mono text-sm text-pruma-navy">R$ {it.total}</p>
      </li>
    ))}
  </ul>
  {/* footer */}
  <footer className="px-5 py-4 bg-pruma-gray-soft">
    <div className="flex justify-between text-sm">
      <span className="text-pruma-gray-text">Subtotal</span>
      <span className="font-mono text-pruma-navy">R$ {MOCK_01_DATA.subtotal}</span>
    </div>
    <div className="flex justify-between text-sm mt-1">
      <span className="text-pruma-gray-text">Desconto 3%</span>
      <span className="font-mono text-pruma-cyan">- R$ {MOCK_01_DATA.discount}</span>
    </div>
    <div className="flex justify-between mt-3 pt-3 border-t border-pruma-gray-soft">
      <span className="font-serif text-base text-pruma-navy">Total</span>
      <span className="font-mono text-base font-semibold text-pruma-navy">R$ 18.420,00</span>
    </div>
    <button className="mt-4 w-full bg-pruma-navy text-white py-3 rounded-pruma-sm font-medium text-sm">
      Fechar pedido
    </button>
  </footer>
</div>
```

**Tokens utilizados** (de `tailwind.config.ts`): `rounded-pruma-lg` (16px container), `rounded-pruma-sm` (8px button), `shadow-pruma-sm`, `bg-pruma-gray-soft` (footer accent), `tracking-eyebrow`, `font-mono` (preços), `font-serif` (cliente).

**Math check (D-15, D-16, A6 RESEARCH.md):** Subtotal pré-desconto ≈ R$18.989,69 → 3% desconto = R$569,69 → Total R$18.420,00. 8 itens devem somar exatamente R$18.989,69 no subtotal.

**Emoji exception (Pitfall #10):** Status `🟢 Online` é PERMITIDO apenas dentro deste mockup. Resto da LP banido. Comentário obrigatório em `lib/constants.ts` documentando exceção.

---

### `components/mockups/PainelDashboard.tsx` (mockup composite server)

**Analog:** Padrão de composição vem do próprio Hero/Diagnóstico. Sub-componentes (BrazilMap + AbcCurve) seguem padrão "mockup-leaf".

**Imports pattern:**
```typescript
import { BrazilMap } from './BrazilMap';
import { AbcCurve } from './AbcCurve';
import { MOCK_02_DATA } from '@/lib/constants';
```

**Composição (D-22, RESEARCH.md L88):**
```typescript
<div className="bg-white rounded-pruma-lg overflow-hidden border border-pruma-gray-soft">
  {/* Header Stripe-style com filtros (cosméticos — Open Question #3) */}
  <header className="px-6 py-4 border-b border-pruma-gray-soft flex items-center justify-between">
    <div>
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pruma-gray-text">Painel Comercial</p>
      <h3 className="font-serif text-lg font-semibold text-pruma-navy mt-0.5">Pruma · Visão consolidada</h3>
    </div>
    <div className="flex gap-2">
      {/* Pseudo-filters: divs com aparência de select (visual only) */}
      <div className="font-mono text-xs px-3 py-1.5 rounded-pruma-sm bg-pruma-gray-soft text-pruma-navy">Hoje</div>
      <div className="font-mono text-xs px-3 py-1.5 rounded-pruma-sm bg-pruma-gray-soft text-pruma-navy">Sudeste</div>
    </div>
  </header>

  {/* KPI row — 4 cards (D-18) */}
  <div className="grid grid-cols-2 md:grid-cols-4 border-b border-pruma-gray-soft">
    {MOCK_02_DATA.kpis.map((k) => (
      <div key={k.label} className="px-5 py-4 border-r border-pruma-gray-soft last:border-r-0">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pruma-gray-text">{k.label}</p>
        <p className="font-serif text-2xl font-semibold text-pruma-navy mt-2">{k.value}</p>
        <p className="font-mono text-[11px] text-pruma-cyan mt-1">{k.delta}</p>
      </div>
    ))}
  </div>

  {/* ABC + Map row */}
  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-pruma-gray-soft">
    <div className="p-5 border-r border-pruma-gray-soft">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pruma-gray-text mb-4">Curva ABC</p>
      <AbcCurve />
    </div>
    <div className="p-5">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pruma-gray-text mb-4">Distribuição geográfica</p>
      <BrazilMap />
    </div>
  </div>

  {/* Risk table (D-19) */}
  <div className="p-5">
    <p className="font-mono text-[10px] uppercase tracking-eyebrow text-pruma-gray-text mb-4">Clientes em risco</p>
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-pruma-gray-text font-mono text-[10px] uppercase tracking-eyebrow">
          <th className="pb-2 font-normal">Cliente</th>
          <th className="pb-2 font-normal">Status</th>
          <th className="pb-2 font-normal">Sem pedido</th>
          <th className="pb-2 font-normal text-right">Risco</th>
        </tr>
      </thead>
      <tbody>
        {MOCK_02_DATA.risk.map((r) => (
          <tr key={r.client} className="border-t border-pruma-gray-soft">
            <td className="py-2 text-pruma-navy">{r.client}</td>
            <td className="py-2">
              <span className={cn(
                'font-mono text-[11px] px-2 py-0.5 rounded-pruma-sm',
                r.status === 'Crítico' ? 'bg-pruma-cyan-pale text-pruma-red' : 'bg-pruma-gray-soft text-pruma-navy'
              )}>{r.status}</span>
            </td>
            <td className="py-2 font-mono text-pruma-gray-text">{r.daysWithout} dias</td>
            <td className="py-2 font-mono text-pruma-navy text-right">R$ {r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

**File size guard:** Manter abaixo de 800 linhas (rule global). PainelDashboard inclui orquestração; BrazilMap e AbcCurve são leafs separados → cumpre limite.

---

### `components/mockups/BrazilMap.tsx` (mockup leaf server, SVG inline)

**Analog:** Nenhum (primeiro SVG inline). Padrão validado pela RESEARCH.md Pattern 3 (L188-211).

**Imports pattern:**
```typescript
import { MOCK_02_DATA } from '@/lib/constants';
const BRAZIL_PATH = '...'; // path SVG simplificado, hardcoded
```

**SVG pattern (RESEARCH.md L188-211):**
```typescript
export function BrazilMap() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-auto"
      role="img"
      aria-label="Mapa do Brasil com pontos de presença comercial"
    >
      <path d={BRAZIL_PATH} fill="#F4F6F9" stroke="#E0F6FE" strokeWidth="1" />
      {MOCK_02_DATA.cities.map((c) => (
        <g key={c.name}>
          {/* halo (transparency) */}
          <circle cx={c.cx} cy={c.cy} r={c.r * 1.8} fill="#00AEEF" opacity="0.18" />
          {/* core dot */}
          <circle cx={c.cx} cy={c.cy} r={c.r} fill="#00AEEF" />
        </g>
      ))}
    </svg>
  );
}
```

**Color values (cumpre paleta exata do CLAUDE.md):** `#F4F6F9` (gray-soft fill), `#E0F6FE` (cyan-pale stroke), `#00AEEF` (cyan dot). HEX hardcoded em SVG porque atributos `fill`/`stroke` SVG inline não consomem classes Tailwind diretamente. Aceitável — corresponde 1:1 a tokens em `tailwind.config.ts` linhas 16-18.

**Cidades obrigatórias (D-20):** São Paulo, Belo Horizonte, Curitiba, Porto Alegre, Recife + 2-3 mais (sugestão Rio de Janeiro, Salvador). Tamanho `r` proporcional ao volume — não cartograficamente preciso (Assumption A1).

**Pitfall:** `cx`/`cy` são coordenadas SVG (0-500 viewBox), NÃO lat/lng. Calibrar manualmente sobre o path.

---

### `components/mockups/AbcCurve.tsx` (mockup leaf server, CSS bars)

**Analog:** Padrão Tailwind/inline-style do `Card.tsx` (uso de tokens) + RESEARCH.md Pattern 4.

**Imports pattern:**
```typescript
import { MOCK_02_DATA } from '@/lib/constants';
```

**Bar chart pattern (RESEARCH.md L220-246):**
```typescript
export function AbcCurve() {
  return (
    <div className="flex items-end gap-2 h-32" role="img" aria-label="Curva ABC: distribuição de receita por classe de cliente">
      {MOCK_02_DATA.abc.map((b, i) => (
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

**Por que `style={{ height }}` e não classe Tailwind:** Tailwind JIT não captura valores dinâmicos. Heights são percentuais variáveis (92, 78, 48, 32, 12) — único caso justificado de inline style (Pitfall #1 RESEARCH.md).

**Pareto realista (D-21):** Bars decrescentes com 18%/14%/22%/18%/28% clients = ~80%/~14%/~6% receita. Distribuição típica B2B distribuidor.

---

### `app/page.tsx` (modificado — composition)

**Analog:** O próprio `app/page.tsx` atual (linha 1-7) é o ponto de partida.

**Imports pattern:**
```typescript
import { Hero } from '@/components/Hero';
import { Diagnostico } from '@/components/Diagnostico';
import { Tese } from '@/components/Tese';
```

**Composição (RESEARCH.md L274-289):**
```typescript
export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Navbar mora no layout, fora do <main> */}
      <Hero />
      <Diagnostico />
      <Tese />
    </main>
  );
}
```

**Crítico:** `pt-20` (80px) compensa Navbar fixa. Sem isso, Eyebrow do Hero gruda na Navbar (Pitfall #4).

**Token check:** Atual usa `bg-pruma-white` (linha 3). Manter `bg-white` para alinhar com section components que usam `bg-white` direto.

---

### `app/layout.tsx` (modificado — adicionar Navbar)

**Analog:** O próprio `app/layout.tsx` atual (linhas 1-57).

**Imports pattern (adicionar em linha 4):**
```typescript
import { Navbar } from "@/components/Navbar";
```

**Body composition (modificar linha 54):**
```typescript
<body className="font-sans antialiased">
  <Navbar />
  {children}
</body>
```

**Não tocar:** font setup (linhas 6-25), metadata (linhas 27-42), html className com font variables (linhas 50-52). Tudo Phase 1 valida.

---

### `lib/constants.ts` (modificado — append patterns)

**Analog:** O próprio `lib/constants.ts` atual (linhas 1-30) — exact match.

**Pattern atual (linhas 1-29):**
- Header de comentário "Strings canônicas"
- JSDoc descritivo por export (`/** … */`)
- Sections demarcadas por `// ─── HEADER ──...`
- Naming: `UPPER_SNAKE_CASE` para constantes simples; `SITE_TITLE`, `CTA_PRIMARY`

**Append pattern (espelhar estilo):**
```typescript
// ─── Phase 2: Navbar ────────────────────────────────────────────────────────
/** Links da navegação principal (4 max, âncoras para Phase 3 sections) */
export const NAV_LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#funcionalidades', label: 'Funcionalidades' },
  { href: '#para-quem', label: 'Para quem' },
  { href: '#contato', label: 'Contato' },
] as const;

// ─── Phase 2: Hero ──────────────────────────────────────────────────────────
/** Copy do Hero (SECT-02) — derivado de "Operações comerciais B2B…" */
export const HERO_COPY = {
  eyebrow: 'GOVERNANÇA COMERCIAL B2B',
  headline: '...', // 2 linhas Fraunces, ≤ 100 chars total
  subhead: '...',  // ≤ 100 chars, target Diretor/CFO
  microcopy: 'SEM CONTRATO · IMPLANTAÇÃO EM 30 DIAS · DADO REAL DE OPERAÇÃO',
} as const;

// ─── Phase 2: Diagnóstico ──────────────────────────────────────────────────
/** Cards do Diagnóstico (SECT-03) — títulos LOCKED por D-11 */
export const DIAG_COPY = {
  eyebrow: 'O DIAGNÓSTICO',
  headline: '...',
  subhead: '...',
  cards: [
    { icon: 'eye',    title: 'Visibilidade tardia',           body: '...', accent: false },
    { icon: 'layers', title: 'Política comercial fragmentada', body: '...', accent: true  },
    { icon: 'sheet',  title: 'Fechamento na planilha',         body: '...', accent: false },
  ],
} as const;

// ─── Phase 2: Tese ─────────────────────────────────────────────────────────
/** Tese Pruma (SECT-04) — headline LOCKED por D-13 */
export const TESE_COPY = {
  eyebrow: 'A TESE',
  headline: 'Força de vendas não é um app.',
  body: '...', // Inter 19px, 720px max-w, banidas: "automatize", "plataforma all-in-one"
} as const;

// ─── Phase 2: MOCK-01 AppVendedor ──────────────────────────────────────────
/** NOTA: emoji 🟢 é PERMITIDO apenas neste mockup (Pitfall #10). Resto da LP banido. */
export const MOCK_01_DATA = {
  label: 'PEDIDO #00428',
  client: 'Auto Center São Paulo Ltda.',
  status: '🟢 Online',
  items: [
    // 8 itens auto-parts/distribuição; subtotal exato R$18.989,69
    { sku: 'BR-001', name: '...', qty: 4, unit: '...', total: '...' },
    // ...
  ],
  subtotal: '18.989,69',
  discount: '569,69',
  total: '18.420,00',
} as const;

// ─── Phase 2: MOCK-02 PainelDashboard ──────────────────────────────────────
export const MOCK_02_DATA = {
  kpis: [
    { label: 'PEDIDOS HOJE',   value: '...', delta: '...' },
    { label: 'TICKET MÉDIO',   value: '...', delta: '...' },
    { label: 'CLIENTES ATIVOS', value: '...', delta: '...' },
    { label: 'META DO MÊS',    value: '...', delta: '...' },
  ],
  cities: [
    { name: 'São Paulo',     cx: 285, cy: 360, r: 8 },
    { name: 'Belo Horizonte', cx: 305, cy: 330, r: 6 },
    { name: 'Curitiba',       cx: 270, cy: 395, r: 5 },
    { name: 'Porto Alegre',   cx: 240, cy: 440, r: 5 },
    { name: 'Recife',         cx: 415, cy: 220, r: 5 },
    { name: 'Rio de Janeiro', cx: 320, cy: 365, r: 6 },
    { name: 'Salvador',       cx: 385, cy: 270, r: 5 },
  ],
  abc: [
    { label: 'A', height: 92, value: '...' },
    { label: 'A', height: 78, value: '...' },
    { label: 'B', height: 48, value: '...' },
    { label: 'B', height: 32, value: '...' },
    { label: 'C', height: 12, value: '...' },
  ],
  risk: [
    { client: '...', status: 'Crítico',  daysWithout: 47, value: '...' },
    { client: '...', status: 'Atenção',  daysWithout: 28, value: '...' },
    { client: '...', status: 'Crítico',  daysWithout: 62, value: '...' },
  ],
} as const;
```

**TypeScript convention (extraído de `lib/constants.ts` atual):** Usar `as const` para travar literais. Permite inferência precisa downstream (`MOCK_02_DATA.cities[number]['name']` é union literal).

---

## Shared Patterns

### Phase 1 Primitivos — REUSE OBRIGATÓRIO

**Source:** `components/ui/{Button,Card,Container,Eyebrow}.tsx`
**Apply to:** Hero, Diagnóstico, Tese, Navbar
- `Button` → todos os CTAs (Navbar, Hero, drawer mobile). Phase 1 já cobre `primary` + `ghost` + `href`-aware.
- `Card` → Diagnóstico (com `interactive={false}`). Aceita `as="li"` para grid semântico.
- `Container` → Wrapper padrão de toda seção. `max-w-6xl mx-auto px-6 md:px-8`.
- `Eyebrow` → Marcação UPPERCASE Mono em todas as seções. Aceita `tone="dark"` (não usado em Phase 2 — todas seções são light).

**Anti-pattern:** Não reimplementar essas primitivas. Não criar variants paralelas em mockups.

### cn() class composition

**Source:** `lib/utils.ts` linhas 1-7
**Apply to:** Todos os componentes que precisem de `className` condicional ou override de classe externa
```typescript
import { cn } from '@/lib/utils';
// Compor: cn(baseClasses, conditionalClass && 'extra', className)
```
**Padrão:** Visto em `components/ui/Button.tsx:35` e `components/ui/Card.tsx:18-23`. Replicar.

### Lucide icons — strokeWidth=1.5

**Source:** Decisão CLAUDE.md (design rules) + RESEARCH.md Pitfall #9
**Apply to:** Navbar (Menu, X), Diagnóstico (Eye, Layers, FileSpreadsheet), e qualquer outro ícone
```typescript
<Menu strokeWidth={1.5} size={24} />
<Eye strokeWidth={1.5} size={28} />
```
**Sempre named import:** `import { Menu, X, Eye } from 'lucide-react'` — tree-shaking ativo.

### Tailwind tokens — paleta exata

**Source:** `tailwind.config.ts` linhas 11-25 + `app/globals.css` linhas 5-17
**Apply to:** Todos os componentes
- Cores: `pruma-navy`, `pruma-cyan`, `pruma-cyan-pale`, `pruma-gray-soft`, `pruma-gray-text`, `pruma-red`
- NUNCA hex hardcoded em JSX (exceção: `<svg fill="#0D1B4B">` quando atributo SVG não aceita class)
- NUNCA `bg-blue-500`, `text-gray-700` ou tokens default Tailwind

### Shadow & radius tokens

**Source:** `tailwind.config.ts` linhas 31-40
**Apply to:** Todos os containers de card/mockup
- `shadow-pruma-sm` → cards interativos default
- `shadow-pruma-md` → mockup elevated containers (Hero PainelDashboard)
- `shadow-pruma-cyan` → hover state em primary buttons (já no Button.tsx)
- `rounded-pruma-sm` (8px) → buttons, badges
- `rounded-pruma-md` (12px) → cards (Card.tsx default)
- `rounded-pruma-lg` (16px) → mockup containers, sections elevadas

### Font usage rules

**Source:** `app/globals.css` linhas 49-53 + CLAUDE.md
**Apply to:** Todos os componentes textuais
- `<h1>`–`<h4>` → automaticamente Fraunces via globals.css. Pode reforçar com `font-serif`.
- Body → herda Inter via `body { font-family: var(--font-inter) }`. Reforçar com `font-sans` se necessário.
- Microcopy / Eyebrow → SEMPRE `font-mono uppercase tracking-eyebrow`. JetBrains Mono.
- **Banido:** Inter em headlines. `font-bold` em `<h1>` (Fraunces 500 é o peso correto).

### Server vs Client component split

**Source:** RESEARCH.md Pattern 1 + Next.js 14 docs
**Apply to:** Todos os novos componentes
- DEFAULT: Server Component (sem diretiva). Hero, Diagnóstico, Tese, todos os mockups.
- EXCEÇÃO: `Navbar.tsx` recebe `'use client'` na linha 1 (scroll listener + drawer state).
- **Anti-pattern:** Não promover componentes a client sem necessidade — perde-se LCP.

### Reduced-motion respect

**Source:** `app/globals.css` linhas 55-62 (CSS) + framer-motion `useReducedMotion` (JS)
**Apply to:** Navbar drawer animation (única animação JS de Phase 2)
- CSS já cobre transitions/animations globalmente.
- Framer Motion: `const reduce = useReducedMotion(); ...initial={reduce ? {opacity:0} : {x:'100%'}}`
- **Anti-pattern:** Não criar `window.matchMedia` manual.

### Centralized copy

**Source:** `lib/constants.ts` linhas 1-30 (existing pattern)
**Apply to:** TODOS os componentes de seção e mockup
- Nenhum string visível (exceto labels técnicos como `aria-label`) hardcoded em JSX
- Imports nomeados: `import { HERO_COPY, CTA_PRIMARY } from '@/lib/constants'`
- `as const` em todos os objetos novos para inferência literal
- Comentários JSDoc explicando origem (DECISION ID quando aplicável)

### Banned copy guard (CLAUDE.md)

**Apply to:** Todos os textos em `lib/constants.ts`
- Banidos: "Venda mais", "Plataforma all-in-one", "Substitua o WhatsApp", "Automatize", "Simples assim", "Fácil", "Uau", `!` fora de mockup status
- Banidos visuais: gradientes, emojis (exceto 🟢 em MOCK_01_DATA.status), generic SaaS visuals
- Tom: Sábio 60% + Mago 40% — afirmativo, insight-led

---

## No Analog Found

Os arquivos abaixo não têm precedente direto no codebase. Planner deve usar RESEARCH.md como fonte primária de pattern, complementado pelos primitivos Phase 1.

| File | Role | Data Flow | Reason | Source de pattern |
|------|------|-----------|--------|-------------------|
| `components/Navbar.tsx` | layout-shell client | event-driven | Primeiro Client Component do projeto | RESEARCH.md Patterns 1, 2, 5 + código exemplo L394-475 |
| `components/mockups/AppVendedor.tsx` | mockup leaf | static-render | Primeiro mockup mobile | CONTEXT.md D-15..D-17 + tokens `tailwind.config.ts` |
| `components/mockups/PainelDashboard.tsx` | mockup composite | static-render | Primeiro dashboard | CONTEXT.md D-18..D-22 + composição derivada de Hero/Diagnóstico |
| `components/mockups/BrazilMap.tsx` | mockup leaf | static-render | Primeiro SVG inline | RESEARCH.md Pattern 3 (L188-211) |
| `components/mockups/AbcCurve.tsx` | mockup leaf | static-render | Primeiro chart | RESEARCH.md Pattern 4 (L220-246) |

---

## Metadata

**Analog search scope:**
- `components/ui/*.tsx` (4 primitivos Phase 1)
- `app/{layout,page}.tsx`
- `lib/{constants,utils}.ts`
- `tailwind.config.ts`, `app/globals.css`
- `.planning/phases/01-foundation/01-UI-SPEC.md` (referenciado, não recarregado neste passo)

**Files scanned:** 11
**Pattern extraction date:** 2026-05-06
**Pattern coverage:**
- Files with exact analog: 3 (`Diagnostico.tsx`, `app/page.tsx`, `lib/constants.ts`)
- Files with role-match analog: 3 (`Hero.tsx`, `Tese.tsx`, `app/layout.tsx`)
- Files with partial analog: 2 (`Navbar.tsx`, `AbcCurve.tsx`)
- Files with no analog: 3 (mockups novos)

**Risk callouts para o planner:**
1. **PainelDashboard width vs Hero column** — Mockup widescreen (Stripe-style) embutido em coluna lg:col-span-6 pode ficar apertado. Considerar escala interna (`transform: scale(0.85)` em wrapper) ou full-bleed em mobile (D-06).
2. **BrazilMap PATH** — silhueta SVG simplificada precisa ser obtida (Open Question #2). Plano deve reservar task para isso (pode ser hardcoded a partir de IBGE GeoJSON simplificado).
3. **Filtros do PainelDashboard são cosméticos** (Open Question #3) — não interativos. Planner deve garantir que não viram `<select>` reais.
4. **Navbar height offset** — `pt-20` no `<main>` precisa bater com `h-16 md:h-20` da Navbar. Validar visualmente em dev.
5. **8 itens MOCK-01 com subtotal exato R$18.989,69** — math obrigatória. Planner deve incluir verificação como acceptance criteria.
