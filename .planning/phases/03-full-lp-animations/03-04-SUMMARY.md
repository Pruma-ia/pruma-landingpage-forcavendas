---
phase: "03-full-lp-animations"
plan: "04"
subsystem: "sections"
tags: ["bento-grid", "footer", "sect-07", "sect-12", "server-component", "phase3"]
dependency_graph:
  requires:
    - "lib/constants.ts#FUNCIONALIDADES (03-01)"
    - "lib/constants.ts#FOOTER (03-01)"
    - "lib/constants.ts#BRAND_NAME (03-01)"
    - "components/mockups/PainelDashboard.tsx (phase-2)"
    - "components/ui/Card.tsx (phase-1)"
    - "components/ui/Container.tsx (phase-1)"
    - "components/ui/Eyebrow.tsx (phase-1)"
    - "components/ui/Button.tsx (phase-1)"
  provides:
    - "components/Funcionalidades.tsx — SECT-07 bento grid"
    - "components/Footer.tsx — SECT-12 dark footer"
  affects:
    - "app/page.tsx (Plan 03-07 — wiring all sections)"
tech_stack:
  added: []
  patterns:
    - "PainelDashboard embedded via transform: scale() inside overflow-hidden crop container"
    - "isHero boolean flag on features[] drives hero vs. small card split"
    - "grid-cols-4 footer: brand col + 3 link cols (per UI-SPEC)"
    - "Overlay fade using inline linear-gradient to match section bg (#E0F6FE)"
key_files:
  created:
    - "components/Funcionalidades.tsx"
    - "components/Footer.tsx"
  modified: []
decisions:
  - "Used scale(0.72) per UI-SPEC SECT-07 spec (vs. 0.7 in plan action block) — UI-SPEC is authoritative"
  - "Hero card uses bottom-label + overlay pattern per UI-SPEC bento spec (not top-copy pattern from plan action block)"
  - "Footer uses 4-col grid with brand col per UI-SPEC (vs. 3-col pure links in plan action block)"
  - "CTA_PRIMARY imported in Footer for ghost Button in brand column per UI-SPEC SECT-12 spec"
  - "Privacy policy link added to footer baseline per UI-SPEC footer baseline spec"
  - "smallFeatures derived via features.filter(f => !f.isHero) to match actual FUNCIONALIDADES shape"
metrics:
  duration: "~20 minutes"
  completed: "2026-05-07"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 3 Plan 04: Funcionalidades + Footer Summary

**One-liner:** SECT-07 bento grid with hero card embedding PainelDashboard at scale 0.72 + 5 interactive feature cards; SECT-12 dark navy footer with brand column, 3 link columns, and ghost CTA — both Server Components consuming typed constants.

---

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Create components/Funcionalidades.tsx (SECT-07 bento grid) | `8c6d7b9` | components/Funcionalidades.tsx |
| 2 | Create components/Footer.tsx (SECT-12 dark footer) | `b2b218b` | components/Footer.tsx |

---

## Funcionalidades (SECT-07) — Implementation Details

### Bento Layout

Layout follows UI-SPEC SECT-07 spec exactly:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` responsive grid
- Hero card: `lg:col-span-3 overflow-hidden p-0 relative`
- 5 smaller cards: `interactive className="p-6"` with `p-6` override (24px padding per UI-SPEC bento small card exception)

### Hero Card — Mockup Window

The `<PainelDashboard />` component embeds inside a fixed-height crop container:

```tsx
<div className="overflow-hidden" style={{ height: "320px" }}>
  <div style={{ transform: "scale(0.72)", transformOrigin: "top center" }}>
    <PainelDashboard />
  </div>
</div>
```

- Scale: 0.72 (UI-SPEC value — see Deviation 1)
- Crop height: 320px — shows KPIs + top of charts
- Origin: top center — crops from top, dashboard stays left-aligned

### Bottom Overlay Fade

An absolutely-positioned `div` at the card bottom applies a 20px gradient fade from transparent → `#E0F6FE` (the section background). This smoothly crops the dashboard without abrupt cutoff:

```tsx
style={{ background: "linear-gradient(to bottom, transparent, #E0F6FE)" }}
```

This inline style is intentional — the gradient color must match the exact section background color (not a token), which is why an inline style is used rather than a Tailwind class.

### Hero Label

Bottom-left label overlays the fade with `relative z-10 px-8 pb-6 -mt-8`:
- Fraunces, 20px, semibold, navy
- Sourced from `FUNCIONALIDADES.features[0].title` ("Painel do Gestor em tempo real")

### Small Cards — Icon Map

Icons from the `FUNCIONALIDADES.features` data (actual iconNames in constants.ts):

| Card | Icon | Constants value |
|------|------|-----------------|
| App do vendedor | Smartphone | `"Smartphone"` |
| Política comercial | Sliders | `"Sliders"` |
| Curva ABC | TrendingUp | `"TrendingUp"` |
| Clientes em risco | AlertTriangle | `"AlertTriangle"` |
| Relatórios | BarChart2 | `"BarChart2"` |

All icons: 20px, strokeWidth 1.5, `text-pruma-navy-deep` (per UI-SPEC accent reserved-for list).

---

## Footer (SECT-12) — Implementation Details

### Layout

4-column grid per UI-SPEC SECT-12:

```
Col 1: Brand (wordmark + tagline + ghost CTA button)
Col 2: PRODUTO link column
Col 3: EMPRESA link column
Col 4: CONTATO link column
```

Responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

### Brand Column

- Wordmark: Fraunces semibold 20px white (`BRAND_NAME`)
- Tagline: Inter 14px `text-white/70` (`FOOTER.tagline` = "Governança comercial para B2B")
- Ghost CTA: `<Button variant="ghost" href="#contato">` with dark-bg override: `border-white text-white hover:bg-white/10`

### Link Columns

- Column headers: `font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan` (per UI-SPEC dark section color overrides)
- Links: `text-white/80 hover:text-white` (per UI-SPEC footer links spec)
- All links sourced from `FOOTER.columns[].links[]` — no hardcoded anchors

### Footer Baseline

- Divider: `border-t border-white/10 mt-12 pt-6`
- Copyright: `text-white/50` left-aligned (`FOOTER.copyright`)
- Privacy policy: `text-white/40` right-aligned (href="#" with TODO comment per UI-SPEC)

---

## Deviations from Plan

### Deviation 1 — Scale 0.72 per UI-SPEC (plan action block said 0.7)

**Found during:** Task 1

**Issue:** The plan's `<action>` block specified `transform: "scale(0.7)"` for the dashboard embed. The UI-SPEC SECT-07 spec specifies `transform: scale(0.72)`.

**Fix:** Used 0.72 per UI-SPEC. The UI-SPEC is the authoritative design contract. The plan's acceptance criterion `grep -c 'transform: "scale(0.7)"'` fails — this is expected; the correct scale is 0.72.

**Files modified:** components/Funcionalidades.tsx

**Commit:** 8c6d7b9

---

### Deviation 2 — Hero card uses bottom-label + overlay pattern (plan specified top-copy pattern)

**Found during:** Task 1

**Issue:** The plan's `<action>` block specified a hero card with heading copy at the top (`<div className="p-8 pb-0">` then mockup below). The UI-SPEC SECT-07 specifies: "Contains `<PainelDashboard />` at `transform: scale(0.72)` inside a fixed-height crop container" and "Hero card label (bottom-left inside card): Fraunces 20px weight 600 navy."

**Fix:** Implemented per UI-SPEC — no text above the dashboard; label appears bottom-left overlaying the fade. PainelDashboard fills the card visually as a window.

**Files modified:** components/Funcionalidades.tsx

**Commit:** 8c6d7b9

---

### Deviation 3 — Footer uses 4-column grid with brand column (plan specified 3-column links only)

**Found during:** Task 2

**Issue:** The plan's `<action>` block specified a simplified 3-column footer (wordmark + 3 link columns stacked). The UI-SPEC SECT-12 specifies: `grid grid-cols-4 gap-8 on desktop. Col 1: brand + tagline. Cols 2–4: link columns.` with a ghost CTA button in the brand column.

**Fix:** Implemented per UI-SPEC 4-col layout. Added `CTA_PRIMARY` import for the ghost button. Added `FOOTER.tagline` rendering in brand column. This is a richer implementation that matches the approved design contract.

**Files modified:** components/Footer.tsx

**Commit:** b2b218b

---

### Deviation 4 — Footer link opacity text-white/80 (plan specified text-white/70)

**Found during:** Task 2

**Issue:** Plan action block specified `text-white/70` for footer links. UI-SPEC SECT-12 Dark Section Color Overrides table specifies `text-white/80` default for footer links.

**Fix:** Used `text-white/80` per UI-SPEC.

**Files modified:** components/Footer.tsx

**Commit:** b2b218b

---

### Deviation 5 — Privacy policy link added to footer baseline

**Found during:** Task 2

**Issue:** Plan action block did not mention a privacy policy link. UI-SPEC footer baseline specifies: `"Privacy note: Inter 12px text-white/40 right-aligned: 'Política de privacidade' (link, href='#' TODO)"`

**Fix:** Added privacy policy link per UI-SPEC. No behavior impact — href="#" with TODO comment.

**Files modified:** components/Footer.tsx

**Commit:** b2b218b

---

## Known Stubs

| Stub | File | Line | Reason |
|------|------|------|--------|
| Footer brand ghost button `href="#contato"` | components/Footer.tsx | 23 | Points to form anchor — correct for LP, no replacement needed |
| Footer EMPRESA links `href="#"` | components/Footer.tsx | via constants | 3 links in EMPRESA column have `#` href — no real URLs yet (inherited from FOOTER constant) |
| Footer CONTATO `mailto:kelly.lima@w1business.com.br` | components/Footer.tsx | via constants | Email from user memory — needs confirmation with client |
| Footer privacy policy `href="#"` | components/Footer.tsx | 61 | Real policy URL not yet defined |

---

## Threat Surface Scan

Per PLAN.md threat model:

**T-03-07 (Tampering — no dangerouslySetInnerHTML):**
- `grep -c "dangerouslySetInnerHTML" components/Funcionalidades.tsx components/Footer.tsx` = 0 — PASS

**T-03-08 (Footer external links — no target="_blank" added):**
- No `target="_blank"` in either component
- `rel="noopener noreferrer"` not needed (no external window opens)
- All hrefs from typed `FOOTER.columns[].links[].href` — no user-supplied URLs

**T-03-09 (Funcionalidades hero card PainelDashboard — fictional data):**
- Accepted in Phase 2 — no new surface

No new threat surfaces introduced beyond the PLAN.md threat model.

---

## Self-Check: PASSED

- [x] `components/Funcionalidades.tsx` exists (101 lines)
- [x] `components/Footer.tsx` exists (67 lines)
- [x] Commit `8c6d7b9` exists in git log (Task 1)
- [x] Commit `b2b218b` exists in git log (Task 2)
- [x] `npm run build` exits 0 — TypeScript compiles cleanly
- [x] `grep -c 'lg:col-span-3' components/Funcionalidades.tsx` = 1
- [x] `grep -c 'scale(0.72)' components/Funcionalidades.tsx` = 1
- [x] `grep -c 'bg-pruma-cyan-pale' components/Funcionalidades.tsx` = 1
- [x] `grep -c 'bg-pruma-navy' components/Footer.tsx` = 1
- [x] `grep -c '<footer' components/Footer.tsx` = 1
- [x] `grep -c 'FOOTER.columns.map' components/Footer.tsx` = 1
- [x] `grep -c 'FOOTER.copyright' components/Footer.tsx` = 1
- [x] No `"use client"` in either file
- [x] No `dangerouslySetInnerHTML` in either file
- [x] No gradients in Footer (bg-gradient/from-/to- = 0)
