# Phase 3: Full LP + Animations — Pattern Map

**Mapped:** 2026-05-07
**Files analyzed:** 12 (8 new section components + lib/constants.ts update + app/page.tsx update + 1 animation hook + 1 form component)
**Analogs found:** 12 / 12

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `components/ComoFunciona.tsx` | component (section) | request-response | `components/Diagnostico.tsx` | exact |
| `components/PainelGestor.tsx` | component (section) | request-response | `components/Hero.tsx` | exact (2-col layout + mockup) |
| `components/Funcionalidades.tsx` | component (section) | request-response | `components/Diagnostico.tsx` | exact (grid + Card) |
| `components/ParaQuem.tsx` | component (section) | request-response | `components/Diagnostico.tsx` | exact (grid + Card) |
| `components/Diferencial.tsx` | component (section) | request-response | `components/Tese.tsx` | role-match (dark bg variant) |
| `components/ProvaSocial.tsx` | component (section) | event-driven | `components/Navbar.tsx` | role-match (useInView + Framer Motion) |
| `components/CTAFinal.tsx` | component (section + form) | event-driven | `components/Navbar.tsx` | role-match (AnimatePresence state swap) |
| `components/Footer.tsx` | component (layout) | request-response | `components/Navbar.tsx` | role-match (Container + nav links + BRAND_NAME) |
| `hooks/useFadeUpVariants.ts` | hook (utility) | transform | `components/Navbar.tsx` | partial (motion config extracted) |
| `lib/constants.ts` (modified) | config | — | `lib/constants.ts` | exact (extend existing pattern) |
| `app/page.tsx` (modified) | route | request-response | `app/page.tsx` | exact |
| `components/Hero.tsx` (modified) | component (anim wrapper) | event-driven | `components/Navbar.tsx` | partial (add whileInView) |

---

## Pattern Assignments

### `components/ComoFunciona.tsx` (component, request-response)

**Analog:** `components/Diagnostico.tsx`

**Imports pattern** (Diagnostico.tsx lines 1–5):
```typescript
import { EyeOff, GitBranch, FileSpreadsheet, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { DIAGNOSTICO } from "@/lib/constants";
```
Adapt to:
```typescript
import { MapPin, ClipboardList, BarChart2, CheckCircle, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AppVendedor } from "@/components/mockups/AppVendedor";
import { COMO_FUNCIONA } from "@/lib/constants";
```

**Section shell pattern** (Diagnostico.tsx lines 19–25):
```tsx
<section
  id="como-funciona"
  aria-labelledby="como-funciona-heading"
  className="bg-pruma-off-white py-section-y-mobile lg:py-section-y-desktop"
>
  <Container as="div">
    <Eyebrow tone="light">{COMO_FUNCIONA.eyebrow}</Eyebrow>
```
Note: background is `bg-pruma-off-white` (`#FAFAFA`) per CONTEXT.md SECT-05.

**2-column layout pattern** (Hero.tsx lines 15–17):
```tsx
<Container
  as="div"
  className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center"
>
  <div className="lg:col-span-7"> {/* numbered steps left */} </div>
  <div className="lg:col-span-5"> {/* AppVendedor right */} </div>
</Container>
```

**Numbered list item pattern** — no existing analog; compose from Diagnostico card pattern:
```tsx
<ol className="flex flex-col gap-8 mt-12">
  {COMO_FUNCIONA.steps.map((step, i) => {
    const Icon = iconMap[step.icon];
    return (
      <li key={step.title} className="flex items-start gap-5">
        <span className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan flex-shrink-0 mt-1 w-5">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div>
          <Icon className="w-5 h-5 text-pruma-navy mb-2" strokeWidth={1.5} aria-hidden="true" />
          <h3 className="font-serif text-xl font-medium text-pruma-navy leading-tight">{step.title}</h3>
          <p className="font-sans text-base text-pruma-gray-text leading-[1.55] mt-1">{step.description}</p>
        </div>
      </li>
    );
  })}
</ol>
```

**Server component rule:** No `"use client"` — no hooks or events. Animation wrapper (motion.div whileInView) is added separately at the inner-content level; see Shared Patterns section.

---

### `components/PainelGestor.tsx` (component, request-response)

**Analog:** `components/Hero.tsx` (2-col grid + central mockup)

**Imports pattern** (Hero.tsx lines 1–5):
```typescript
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PainelDashboard } from "@/components/mockups/PainelDashboard";
import { PAINEL_GESTOR } from "@/lib/constants";
```

**3-column grid pattern** (adapt from Hero.tsx lines 15–17):
```tsx
<Container as="div" className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-12 items-start">
  {/* Left callouts — 2 stacked */}
  <div className="flex flex-col gap-6 order-2 lg:order-1"> ... </div>
  {/* Center mockup */}
  <div className="order-1 lg:order-2 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
    <PainelDashboard />
  </div>
  {/* Right callouts — 2 stacked */}
  <div className="flex flex-col gap-6 order-3"> ... </div>
</Container>
```

**Callout item pattern** (per CONTEXT.md D-19 spec):
```tsx
<div className="flex flex-col gap-1.5">
  <span className="font-serif text-2xl font-medium text-pruma-navy leading-none">{callout.number}</span>
  <p className="font-sans text-sm text-pruma-gray-text leading-[1.5]">{callout.text}</p>
</div>
```

**Server component rule:** No `"use client"`.

---

### `components/Funcionalidades.tsx` (component, request-response)

**Analog:** `components/Diagnostico.tsx` (grid + Card reuse)

**Bento grid pattern** — hero card full-width + 5 cards below:
```tsx
<ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-12 list-none">
  {/* Hero card — col-span full, embeds PainelDashboard */}
  <Card as="li" interactive={false} className="lg:col-span-3 overflow-hidden p-0">
    <div className="p-8 pb-0">
      <h3 className="font-serif text-2xl font-semibold text-pruma-navy">{FUNCIONALIDADES.hero.title}</h3>
      <p className="font-sans text-base text-pruma-gray-text mt-2">{FUNCIONALIDADES.hero.description}</p>
    </div>
    {/* Mockup window — scale(0.7) per CONTEXT.md specifics */}
    <div className="overflow-hidden mt-6" style={{ height: "260px" }}>
      <div className="origin-top-left" style={{ transform: "scale(0.7)", transformOrigin: "top center" }}>
        <PainelDashboard />
      </div>
    </div>
  </Card>

  {/* 5 smaller cards — icon + title + description */}
  {FUNCIONALIDADES.cards.map((card) => {
    const Icon = iconMap[card.icon];
    return (
      <Card key={card.title} as="li" interactive>
        <Icon className="w-5 h-5 text-pruma-navy" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="font-serif text-lg font-semibold text-pruma-navy mt-5 leading-tight">{card.title}</h3>
        <p className="font-sans text-sm text-pruma-gray-text leading-[1.55] mt-2">{card.description}</p>
      </Card>
    );
  })}
</ul>
```

**Imports pattern** (Diagnostico.tsx lines 1–5 adapted):
```typescript
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { PainelDashboard } from "@/components/mockups/PainelDashboard";
import { FUNCIONALIDADES } from "@/lib/constants";
```

---

### `components/ParaQuem.tsx` (component, request-response)

**Analog:** `components/Diagnostico.tsx` (exact — 3-card grid)

**Section shell pattern** (Diagnostico.tsx lines 19–25 — white background):
```tsx
<section
  id="para-quem"
  aria-labelledby="para-quem-heading"
  className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop"
>
```

**3-card grid pattern** (Diagnostico.tsx lines 39–59):
```tsx
<ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-12 lg:mt-16 list-none">
  {PARA_QUEM.profiles.map((profile) => (
    <Card key={profile.title} as="li" interactive>
      <p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan">{profile.segment}</p>
      <h3 className="font-serif text-2xl font-semibold text-pruma-navy mt-4 leading-tight">{profile.title}</h3>
      <p className="font-sans text-base text-pruma-gray-text leading-[1.55] mt-3">{profile.description}</p>
    </Card>
  ))}
</ul>
```

---

### `components/Diferencial.tsx` (component, request-response)

**Analog:** `components/Tese.tsx` (centered layout), adapted for dark background

**Dark section shell** — only section with `bg-pruma-navy`:
```tsx
<section
  id="diferencial"
  aria-labelledby="diferencial-heading"
  className="bg-pruma-navy py-section-y-mobile lg:py-section-y-desktop"
>
  <Container as="div" className="text-center">
    {/* Eyebrow with tone="dark" — renders cyan label text */}
    <div className="flex justify-center">
      <Eyebrow tone="dark">{DIFERENCIAL.eyebrow}</Eyebrow>
    </div>
    <h2
      id="diferencial-heading"
      className="font-serif text-4xl lg:text-[52px] font-medium text-white leading-[1.10] tracking-tight max-w-[20ch] mx-auto mt-4"
    >
      {DIFERENCIAL.headline}
    </h2>
```

**3 pillars horizontal layout** (no existing analog — compose):
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 lg:mt-16">
  {DIFERENCIAL.pillars.map((pillar) => (
    <div key={pillar.title} className="text-left">
      <span className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan">{pillar.number}</span>
      <h3 className="font-serif text-xl font-semibold text-white mt-3 leading-tight">{pillar.title}</h3>
      <p className="font-sans text-base text-white/70 leading-[1.6] mt-3">{pillar.description}</p>
    </div>
  ))}
</div>
```

**Eyebrow `tone="dark"` pattern** (Eyebrow.tsx lines 9–26):
```tsx
// tone="dark" → label becomes text-pruma-cyan (vs light → text-pruma-navy-deep)
// Cyan line is always cyan regardless of tone
<Eyebrow tone="dark">{DIFERENCIAL.eyebrow}</Eyebrow>
```

---

### `components/ProvaSocial.tsx` (component, event-driven)

**Analog:** `components/Navbar.tsx` (Framer Motion + `useReducedMotion` + `"use client"`)

**"use client" + imports pattern** (Navbar.tsx lines 1–9):
```typescript
"use client";

import { useReducedMotion, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROVA_SOCIAL } from "@/lib/constants";
```

**Counter animation pattern** (per D-09 — `useInView` + `animate` controls):
```typescript
// "use client" required — uses hooks
const ref = useRef<HTMLSpanElement>(null);
const isInView = useInView(ref, { once: true, margin: "-60px" });
const reducedMotion = useReducedMotion();

useEffect(() => {
  if (!isInView || reducedMotion) {
    if (ref.current) ref.current.textContent = String(finalValue);
    return;
  }
  const controls = animate(0, finalValue, {
    duration: 1.5,
    ease: "easeOut",
    onUpdate: (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("pt-BR");
    },
  });
  return () => controls.stop();
}, [isInView, reducedMotion, finalValue]);
```

**Number display pattern** (per CONTEXT.md SECT-10 — Fraunces 64px ciano):
```tsx
<span
  ref={ref}
  className="font-serif text-[64px] font-semibold text-pruma-cyan leading-none tracking-tight"
  aria-live="polite"
>
  0
</span>
```

**Placeholder logo slot pattern** (per CONTEXT.md — 3 logo slots with TODO comment):
```tsx
{/* TODO: substituir com logotipos reais de clientes */}
<div className="flex items-center justify-center h-12 grayscale opacity-40">
  <div className="w-24 h-8 bg-pruma-gray-soft rounded-pruma-sm" aria-hidden="true" />
</div>
```

**Section anchor** (per CONTEXT.md SECT-10):
```tsx
<section id="prova-social" aria-labelledby="prova-social-heading" ...>
```

---

### `components/CTAFinal.tsx` (component, event-driven)

**Analog:** `components/Navbar.tsx` (AnimatePresence state swap pattern)

**"use client" + AnimatePresence imports** (Navbar.tsx lines 1–7):
```typescript
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CTA_FINAL } from "@/lib/constants";
```

**Form state pattern** (per D-16):
```typescript
type FormState = "idle" | "success";
const [formState, setFormState] = useState<FormState>("idle");

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setFormState("success");
}
```

**AnimatePresence state swap** (Navbar.tsx lines 97–151 adapted — per D-15):
```tsx
<AnimatePresence mode="wait">
  {formState === "idle" ? (
    <motion.form
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
    >
      {/* 8 fields */}
    </motion.form>
  ) : (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 py-12 text-center"
    >
      <CheckCircle className="w-10 h-10 text-pruma-cyan" strokeWidth={1.5} aria-hidden="true" />
      <h3 className="font-serif text-2xl font-medium text-pruma-navy">{CTA_FINAL.successHeadline}</h3>
      <p className="font-sans text-base text-pruma-gray-text">{CTA_FINAL.successSubtext}</p>
    </motion.div>
  )}
</AnimatePresence>
```

**Input field pattern** (compose; no existing form analog):
```tsx
<label className="flex flex-col gap-1.5">
  <span className="font-sans text-sm font-medium text-pruma-navy">{CTA_FINAL.fields.nome.label}</span>
  <input
    type="text"
    name="nome"
    required
    placeholder={CTA_FINAL.fields.nome.placeholder}
    className="font-sans text-sm text-pruma-navy bg-white border border-pruma-gray-soft rounded-pruma-sm px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-pruma-cyan focus:ring-offset-2 focus:border-pruma-cyan transition-colors duration-150"
  />
</label>
```

**Select pattern** (same styles as input, native `<select>`):
```tsx
<label className="flex flex-col gap-1.5">
  <span className="font-sans text-sm font-medium text-pruma-navy">{CTA_FINAL.fields.vendedores.label}</span>
  <select
    name="vendedores"
    required
    className="font-sans text-sm text-pruma-navy bg-white border border-pruma-gray-soft rounded-pruma-sm px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-pruma-cyan focus:ring-offset-2 appearance-none"
  >
    <option value="">Selecione...</option>
    {CTA_FINAL.fields.vendedores.options.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
</label>
```

**Section id for Navbar CTA target**:
```tsx
<section id="contato" aria-labelledby="cta-heading" ...>
```

---

### `components/Footer.tsx` (component, request-response)

**Analog:** `components/Navbar.tsx` (Container + BRAND_NAME + NAV_LINKS pattern)

**Imports pattern** (Navbar.tsx lines 1–9 adapted):
```typescript
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND_NAME, FOOTER } from "@/lib/constants";
```

**Dark footer shell** (bg-pruma-navy, white text — mirrors SECT-09 Diferencial):
```tsx
<footer className="bg-pruma-navy py-section-y-mobile lg:py-section-y-desktop">
  <Container as="div">
    {/* Logo */}
    <span className="font-serif font-semibold text-xl text-white tracking-tight">{BRAND_NAME}</span>

    {/* 3-column nav */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {FOOTER.columns.map((col) => (
        <div key={col.heading}>
          <p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan mb-4">{col.heading}</p>
          <ul className="flex flex-col gap-3">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-150 ease-out"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Copyright baseline */}
    <div className="border-t border-white/10 mt-12 pt-8">
      <p className="font-sans text-xs text-white/40">{FOOTER.copyright}</p>
    </div>
  </Container>
</footer>
```

**Server component rule:** No `"use client"` — pure markup, no events.

---

### `hooks/useFadeUpVariants.ts` (hook, transform)

**Analog:** `components/Navbar.tsx` (motion config — reducedMotion + variants)

This is an optional extraction. If a shared hook is created, the pattern is:

```typescript
// hooks/useFadeUpVariants.ts
"use client";
import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export function useFadeUpVariants(staggerChildren = 0.08): {
  container: Variants;
  item: Variants;
} {
  const reducedMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren } },
  };

  return { container, item };
}
```

**Alternatively** — inline variants directly in each "use client" section component (avoids extracting a hook if only 2–3 sections need it).

---

### `lib/constants.ts` (modified — extend existing)

**Analog:** `lib/constants.ts` (exact — follow existing export pattern)

**Existing export pattern** (constants.ts lines 44–55):
```typescript
// ─── Section Name (SECT-XX) ───────────────────────────────────────────────────

/** Copy da seção [Name] — [decision refs]. */
export const SECTION_NAME = {
  eyebrow: "— EYEBROW TEXT",
  headline: "Headline here.",
  subheadline: "Subheadline here.",
  // section-specific fields...
} as const;
```

**8 new exports to add** (one block per section):
- `COMO_FUNCIONA` — eyebrow, headline, subheadline, steps (4 items: title + description + icon)
- `PAINEL_GESTOR` — eyebrow, headline, callouts (4 items: number + text)
- `FUNCIONALIDADES` — eyebrow, headline, hero (title + description), cards (5 items: title + description + icon)
- `PARA_QUEM` — eyebrow, headline, subheadline, profiles (3 items: segment + title + description)
- `DIFERENCIAL` — eyebrow, headline, pillars (3 items: number + title + description), cta
- `PROVA_SOCIAL` — eyebrow, headline, metrics (3 items: value + unit + label), depoimento, logos (3 placeholder entries)
- `CTA_FINAL` — eyebrow, headline, subheadline, fields (object keyed by field name), successHeadline, successSubtext
- `FOOTER` — columns (3 items: heading + links array), copyright

**`as const` assertion** — required on every export (matches existing pattern — see constants.ts line 55, 85, 94, 119, 191).

---

### `app/page.tsx` (modified — append imports)

**Analog:** `app/page.tsx` (exact — append 8 section imports + JSX in order)

**Current pattern** (page.tsx lines 1–3):
```typescript
import { Hero } from "@/components/Hero";
import { Diagnostico } from "@/components/Diagnostico";
import { Tese } from "@/components/Tese";
```

**Extend to** (per CONTEXT.md integration point):
```typescript
import { Hero } from "@/components/Hero";
import { Diagnostico } from "@/components/Diagnostico";
import { Tese } from "@/components/Tese";
import { ComoFunciona } from "@/components/ComoFunciona";
import { PainelGestor } from "@/components/PainelGestor";
import { Funcionalidades } from "@/components/Funcionalidades";
import { ParaQuem } from "@/components/ParaQuem";
import { Diferencial } from "@/components/Diferencial";
import { ProvaSocial } from "@/components/ProvaSocial";
import { CTAFinal } from "@/components/CTAFinal";
import { Footer } from "@/components/Footer";
```

**JSX order** (page.tsx lines 7–11 pattern):
```tsx
<main className="min-h-screen bg-pruma-white">
  <Hero />
  <Diagnostico />
  <Tese />
  <ComoFunciona />
  <PainelGestor />
  <Funcionalidades />
  <ParaQuem />
  <Diferencial />
  <ProvaSocial />
  <CTAFinal />
  <Footer />
</main>
```

---

## Shared Patterns

### Animation: scroll-triggered fade-up (ANIM-01)
**Source:** `components/Navbar.tsx` (motion config lines 99–111) + D-06/D-07 decisions
**Apply to:** All 8 new section components (inner content wrappers), plus retroactive wrapping of Hero, Diagnostico, Tese content

**Pattern for Server Component sections** — wrap inner content with `motion.div` via a thin `"use client"` wrapper component, OR make the section itself `"use client"`:
```typescript
"use client";
import { motion, useReducedMotion } from "framer-motion";
```

**whileInView variant** (exact values from D-06/D-07):
```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

// On the container (section inner div):
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
  {/* Each staggered child */}
  <motion.div variants={itemVariants}>
    <Eyebrow .../>
  </motion.div>
  <motion.h2 variants={itemVariants}>...</motion.h2>
  {/* grid items each wrapped */}
</motion.div>
```

**reducedMotion guard** — globals.css lines 55–62 handles CSS transitions automatically. For JS animations (counter in ProvaSocial), check `useReducedMotion()` and skip animate() call. Pattern from Navbar.tsx lines 14 and 106:
```typescript
const reducedMotion = useReducedMotion();
// In motion props:
initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
```

---

### Icon usage
**Source:** `components/Diagnostico.tsx` lines 1–11 and `components/Navbar.tsx` lines 90–91
**Apply to:** ComoFunciona, Funcionalidades, CTAFinal success state

```typescript
import { MapPin, type LucideIcon } from "lucide-react";
// Always: strokeWidth={1.5}
// Cards: w-5 h-5 (20px) per D-03
// Hero areas: w-6 h-6 (24px)
<Icon className="w-5 h-5 text-pruma-navy" strokeWidth={1.5} aria-hidden="true" />
```

---

### Tailwind token usage
**Source:** `tailwind.config.ts` + `app/globals.css`
**Apply to:** All new files — no inline styles except `transform: scale()` for mockup window in Funcionalidades

| Token | Class | Use |
|---|---|---|
| Navy background | `bg-pruma-navy` | Diferencial, Footer only |
| Off-white background | `bg-pruma-off-white` | ComoFunciona |
| White background | `bg-pruma-white` | ParaQuem, ProvaSocial, CTAFinal |
| Section vertical rhythm | `py-section-y-mobile lg:py-section-y-desktop` | Every section |
| Headline (Fraunces) | `font-serif` | All h2 headlines |
| Body | `font-sans` | All body text |
| Microcopy / eyebrow | `font-mono text-xs uppercase tracking-eyebrow` | Labels, callout numbers |
| Card border + shadow | `border border-pruma-gray-soft shadow-pruma-sm rounded-pruma-md` | All Card uses |
| Focus ring | `focus-visible:ring-2 focus-visible:ring-pruma-cyan focus-visible:ring-offset-2` | All interactive elements |

---

### Eyebrow component usage
**Source:** `components/ui/Eyebrow.tsx` lines 1–28
**Apply to:** All 8 new sections

- **Light sections** (bg-pruma-white, bg-pruma-off-white, bg-pruma-cyan-pale): `<Eyebrow tone="light">` → navy label text
- **Dark sections** (bg-pruma-navy): `<Eyebrow tone="dark">` → cyan label text

---

### Container usage
**Source:** `components/ui/Container.tsx` lines 1–19
**Apply to:** All 8 new sections

```tsx
// Section root → Container as="div" (most sections)
// Use as="section" only when the outer element is not already <section>
<Container as="div">
  {/* max-w-6xl mx-auto px-6 md:px-8 applied automatically */}
</Container>
```

---

### Card component usage
**Source:** `components/ui/Card.tsx` lines 1–28
**Apply to:** Funcionalidades (bento cards), ParaQuem (profile cards)

```tsx
// interactive=true → hover translate-y-0.5 + border-pruma-cyan-light (already wired — D-10 verified)
<Card as="li" interactive>...</Card>

// interactive=false → static display card (e.g., Diagnostico cards, bento hero)
<Card as="li" interactive={false}>...</Card>

// className override for sizing (bento hero full-width):
<Card as="li" interactive={false} className="lg:col-span-3 overflow-hidden p-0">
```

---

### "use client" placement rule
**Source:** `components/Navbar.tsx` line 1 (only file currently with "use client")
**Apply to:** ProvaSocial, CTAFinal (animation + state), and any section using whileInView hooks

**Rule from CONTEXT.md code_context:**
- Server Components by default
- `"use client"` only when using hooks or browser events
- `whileInView` on `motion.div` does NOT require "use client" if no hooks are used — but `useInView`, `useReducedMotion`, `useState`, `useEffect` all do
- Best practice: keep the section component as Server Component and extract only the animated sub-component to a `"use client"` file if needed; OR make the whole section "use client" when animation is the primary content

---

## No Analog Found

All files have identifiable analogs. The following patterns have no direct codebase precedent but are fully specified in CONTEXT.md and RESEARCH.md:

| Pattern | Handled By |
|---|---|
| Counter animation (ProvaSocial) | CONTEXT.md D-09 spec + Framer Motion `animate()` API |
| Form with 8 fields + success swap (CTAFinal) | CONTEXT.md D-11–D-16 spec + Navbar.tsx AnimatePresence pattern |
| Bento grid hero card with scaled mockup (Funcionalidades) | CONTEXT.md D-01/D-02 spec + `transform: scale(0.7)` |

---

## Metadata

**Analog search scope:** `/components/**`, `/app/**`, `/lib/**`
**Files scanned:** 12
**Pattern extraction date:** 2026-05-07
