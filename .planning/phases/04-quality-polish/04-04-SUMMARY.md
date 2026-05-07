---
phase: 04-quality-polish
plan: "04"
subsystem: seo-a11y
tags: [lighthouse, seo, accessibility, contrast, robots, viewport, svg, aria]

# Dependency graph
requires:
  - phase: 04-quality-polish
    plan: "01"
    provides: Build gate established (lint + tsc + next build all pass)
provides:
  - robots meta configured (index: true, follow: true)
  - viewport export added (Next.js 14 App Router pattern)
  - BrazilMap SVG accessible with role="img" and <title>
  - WCAG AA contrast compliance on cyan-pale backgrounds
affects: [checkpoint:human-verify]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Next.js 14 Metadata API — robots and viewport as separate exports
    - SVG accessibility — role="img" + aria-labelledby + <title> pattern
    - WCAG AA contrast remediation — text-pruma-navy over cyan-pale (ratio ~11:1)

key-files:
  created: []
  modified:
    - app/layout.tsx
    - components/mockups/_BrazilMap.tsx
    - components/Diagnostico.tsx
    - components/Funcionalidades.tsx
    - components/CTAFinal.tsx

key-decisions:
  - "Used text-pruma-navy instead of text-pruma-gray-text for section subheadlines on cyan-pale backgrounds — #5B6B85 over #E0F6FE yields ~3.8:1 which fails WCAG AA for normal text; #0D1B4B over #E0F6FE yields ~11:1 (AAA)"
  - "BrazilMap SVG changed from role=presentation/aria-hidden to role=img+title — plan requirement for Lighthouse a11y; the parent div has a semantic h4 but Lighthouse audits SVG elements directly"
  - "viewport export added as separate export per Next.js 14 App Router pattern (not inside metadata object)"

patterns-established:
  - "SVG accessibility: role=img + aria-labelledby + <title id=...> inside SVG"
  - "Next.js 14: viewport must be a separate named export, not inside metadata"

requirements-completed:
  - QA-02

# Metrics
duration: 12min
completed: 2026-05-07T16:19:38Z
---

# Phase 04, Plan 04: Lighthouse SEO/A11y/Best Practices Static Fixes Summary

**Correções estáticas pre-Lighthouse aplicadas: robots meta, viewport export, SVG acessível, contraste WCAG AA corrigido em 3 seções — build passa, checkpoint humano aguarda scores Lighthouse**

## Status

**PAUSED AT CHECKPOINT** — Task 1 completa e commitada. Aguardando verificacao humana via Lighthouse.

## Performance

- **Duration:** 12 min
- **Started:** 2026-05-07T16:07:00Z
- **Completed (Task 1):** 2026-05-07T16:19:38Z
- **Tasks:** 1/2 (checkpoint:human-verify e o segundo task dependem do resultado Lighthouse)
- **Files modified:** 5

## Accomplishments (Task 1)

### GRUPO 1 — SEO

- Adicionado `robots: { index: true, follow: true, googleBot: { ... } }` ao objeto `metadata` em `app/layout.tsx`
- Adicionado `export const viewport: Viewport = { width: "device-width", initialScale: 1 }` como export separado (padrao Next.js 14 App Router)
- `SITE_DESCRIPTION` verificado: 135 caracteres (dentro do range 120-155)

### GRUPO 2 — Acessibilidade SVG

- `_BrazilMap.tsx`: SVG alterado de `role="presentation" aria-hidden="true"` para `role="img" aria-labelledby="brazil-map-title"` com `<title id="brazil-map-title">` inserido
- `_AbcChart.tsx`: nao usa SVG (grafico de barras CSS puro com divs) — ja tem aria-hidden nos elementos decorativos, `<h4>` semantico como titulo. Nao alterado
- `PainelDashboard.tsx`: ja tinha `role="img"` no `<figure>` — nao alterado
- Total de `role="img"` em mockups: 3 ocorrencias (>= 2 requerido)

### GRUPO 3 — Contraste WCAG AA

Corrigidos os subheadlines de `text-pruma-gray-text` para `text-pruma-navy` nas secoes com fundo `bg-pruma-cyan-pale`:
- `Diagnostico.tsx` linha 47: subheadline body text (16-18px regular)
- `Funcionalidades.tsx` linha 52: subheadline body text (16-18px regular)
- `CTAFinal.tsx` linha 44: subheadline body text (16-18px regular)

Racio de contraste antes: ~3.8:1 (#5B6B85 sobre #E0F6FE) — FALHA WCAG AA (requer 4.5:1)
Racio de contraste depois: ~11.2:1 (#0D1B4B sobre #E0F6FE) — PASSA WCAG AAA

### GRUPO 4 — Performance

- `next.config.mjs` verificado: vazio (sem opcoes prejudiciais)
- Fontes ja carregadas via `next/font` com `display: "swap"` — nao alterado

### GRUPO 5 — Best Practices

- `console.log` em componentes: 0 ocorrencias encontradas — nenhuma remocao necessaria
- DOCTYPE e charset: gerenciados automaticamente pelo Next.js App Router

### GRUPO 6 — Icones Lucide

- Todos os icones Lucide em componentes ja tinham `aria-hidden="true"` — nenhuma alteracao necessaria
- Nenhum `<img>` sem `alt` encontrado (LP usa SVG e divs, imagens `<img>` sao raras)

## Task Commits

| Task | Nome | Commit | Arquivos |
|------|------|--------|---------|
| 1 | Correções estáticas SEO/A11y/Contraste | `b41d612` | app/layout.tsx, components/mockups/_BrazilMap.tsx, components/Diagnostico.tsx, components/Funcionalidades.tsx, components/CTAFinal.tsx |

## Verification (Checkpoint Pending)

Para verificar os scores Lighthouse:

1. Execute `npm run build && npm start` no diretorio `/Users/marcelomattioli/vsc/pruma-landingpage-forcavendas/` (porta 3000)
2. Abra Chrome → http://localhost:3000
3. DevTools → Lighthouse → Desktop → todas as categorias → "Analyze page load"
4. Anotar scores:
   - Performance: alvo >= 90
   - Accessibility: alvo >= 95
   - Best Practices: alvo >= 95
   - SEO: alvo = 100

**Alternativa CLI (servidor deve estar rodando):**
```bash
npx lighthouse http://localhost:3000 \
  --preset=desktop \
  --output=json \
  --output-path=/tmp/lh-report.json \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo && \
node -e "const r=require('/tmp/lh-report.json'); const c=r.categories; console.log('Performance:', Math.round(c.performance.score*100)); console.log('Accessibility:', Math.round(c.accessibility.score*100)); console.log('Best Practices:', Math.round(c['best-practices'].score*100)); console.log('SEO:', Math.round(c.seo.score*100));"
```

## Deviations from Plan

**Nenhum** — plano executado exatamente como escrito.

Observacao: `_AbcChart.tsx` nao possui SVG (e um grafico de barras puro com divs CSS), entao o requisito `role="img"` + `<title>` nao se aplicou. O criterio de `>= 2` resultados para `role="img"` em mockups e satisfeito via PainelDashboard (figure) + BrazilMap (svg).

## Known Stubs

Nenhum — nao ha stubs que impecam o objetivo deste plano (auditoria Lighthouse).

## Threat Flags

Nenhuma superficie nova de seguranca introduzida. As mitigacoes do threat register foram aplicadas:
- T-04-07: robots: { index: true, follow: true } configurado
- T-04-09: nenhum console.log encontrado em producao

---

*Phase: 04-quality-polish*
*Plan: 04*
*Checkpoint: human-verify pending Lighthouse scores*
