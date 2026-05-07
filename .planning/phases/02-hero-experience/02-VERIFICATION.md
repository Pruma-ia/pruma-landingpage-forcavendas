---
phase: 02-hero-experience
verified: 2026-05-07T00:00:00Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Visit the page at localhost:3000 and scroll past 8px — confirm Navbar transitions from transparent to bg-white/72 + backdrop blur + hairline shadow"
    expected: "Navbar background animates smoothly to translucent white with blur and shadow visible at scrollY > 8px"
    why_human: "CSS transition + scroll behavior cannot be verified by static grep; requires browser render"
  - test: "Resize viewport to below 768px — confirm desktop nav links disappear and hamburger icon appears; click hamburger to open mobile drawer"
    expected: "Full-screen drawer opens with PRUMA wordmark, close button, 4 anchor links, full-width primary CTA; body scroll locks"
    why_human: "Responsive breakpoint behavior and Framer Motion drawer animation require browser interaction"
  - test: "In mobile drawer, press Escape — confirm drawer closes"
    expected: "Drawer closes and body scrolling restores"
    why_human: "Keyboard interaction requires browser/Playwright testing"
  - test: "Inspect Hero section on desktop (>= 1024px) — confirm PainelDashboard occupies right column and hero headline renders in Fraunces at ~72px"
    expected: "2-column layout with text left (col-span-7) and full dashboard mockup right (col-span-5); headline clearly serif at large scale"
    why_human: "Visual typography and grid layout require browser render to confirm"
  - test: "Inspect Diagnostico section — confirm 3 cards render on pale cyan background; verify EyeOff and GitBranch icons are navy, FileSpreadsheet icon is cyan"
    expected: "Three cards visible with correct icon colors as specified by tone field"
    why_human: "Icon color rendering requires visual browser inspection"
---

# Phase 2: Hero Experience Verification Report

**Phase Goal:** A visitor lands on the page and immediately sees a credible, premium above-fold experience with working interactive mockups
**Verified:** 2026-05-07T00:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Sticky Navbar is visible with backdrop blur on scroll and a working "Falar com um consultor" CTA | VERIFIED | `sticky top-0 z-40`, `scrollY > 8` flip, `bg-white/72 backdrop-blur-md shadow-pruma-md` classes present; CTA_PRIMARY rendered unconditionally in both header and mobile drawer |
| 2 | Hero section renders with Fraunces 72px headline, two side-by-side CTAs, and the dashboard mockup on the right | VERIFIED | `lg:text-[72px] font-serif`, `variant="primary"` + `variant="ghost"` CTAs present, `<PainelDashboard />` imported and rendered in right column |
| 3 | Diagnostico section shows 3 cards on `#E0F6FE` background with correct structural pain points | VERIFIED | `bg-pruma-cyan-pale` maps to `#E0F6FE` (verified in tailwind.config.ts), 3 cards from `DIAGNOSTICO.cards` with locked titles consumed from constants |
| 4 | Tese Pruma section displays the editorial centered headline at 56px with body copy at max-width 720px | VERIFIED | `lg:text-[56px]`, `max-w-[720px]`, `text-center`, single `TESE.body` paragraph — no second paragraph |
| 5 | AppVendedor and PainelDashboard render as HTML/CSS components with specified data | VERIFIED | AppVendedor: MOCK_APP.client, 8 items, total 18420.0, discount 3%, status 🟢 ONLINE, cta "Fechar pedido" — all sourced from constants. PainelDashboard: 4 KPI cards (184/R$14.820/1.247/73%), AbcChart (12 bars, 3 cyan+3 navy-deep+6 gray-soft), BrazilMap (SVG viewBox 0 0 240 280, 8 cyan dots), risk table (3 rows Crítico/Atenção) |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `lib/constants.ts` | BRAND_NAME, NAV_LINKS, HERO, DIAGNOSTICO, TESE, MOCK_APP, MOCK_PAINEL exports | VERIFIED | All 7 exports present; existing CTA_PRIMARY preserved; 191 lines |
| `components/Navbar.tsx` | Sticky Navbar with scroll-blur, mobile drawer, anchor links, primary CTA | VERIFIED | 154 lines; `"use client"` directive; sticky top-0 z-40; all behavioral hooks present |
| `app/layout.tsx` | Mounts `<Navbar />` outside `<main>`, skip link, fonts preserved | VERIFIED | Navbar imported as named export, rendered before {children}; Fraunces/Inter/JetBrains_Mono font vars preserved |
| `components/Hero.tsx` | Above-fold 2-column layout embedding PainelDashboard | VERIFIED | 58 lines; server component; PainelDashboard embedded in overflow-x-auto wrapper |
| `components/Diagnostico.tsx` | 3-card pain-point section on cyan-pale bg | VERIFIED | 62 lines; server component; typed iconMap lookup; strokeWidth={1.5} on all icons |
| `components/Tese.tsx` | Centered editorial Tese section | VERIFIED | 30 lines; server component; TESE.headline + TESE.body from constants |
| `app/page.tsx` | Composes Hero + Diagnostico + Tese in order | VERIFIED | 13 lines; `<Hero /><Diagnostico /><Tese />` in declared order; placeholder removed |
| `components/mockups/AppVendedor.tsx` | Mobile-frame mockup at max-w-[380px] | VERIFIED | 85 lines; server component; role="img"; all MOCK_APP fields rendered |
| `components/mockups/PainelDashboard.tsx` | Widescreen dashboard with 4 bands | VERIFIED | 110 lines; server component; role="img"; min-w-[760px]; imports AbcChart + BrazilMap |
| `components/mockups/_BrazilMap.tsx` | Inline SVG silhouette + cyan dots | VERIFIED | 39 lines; viewBox="0 0 240 280"; 8 circle elements from MOCK_PAINEL.map.points; fill="#00AEEF" |
| `components/mockups/_AbcChart.tsx` | 12-bar Pareto distribution | VERIFIED | 43 lines; AbcChart export; colorMap record; border-dashed divider line |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `components/Navbar.tsx` | `lib/constants.ts` | `import { BRAND_NAME, NAV_LINKS, CTA_PRIMARY }` | WIRED | Import present; all three identifiers rendered in JSX |
| `app/layout.tsx` | `components/Navbar.tsx` | `import { Navbar }` + `<Navbar />` | WIRED | Named import + rendered before {children} |
| `components/Hero.tsx` | `components/mockups/PainelDashboard.tsx` | `import { PainelDashboard }` | WIRED | Import on line 4; `<PainelDashboard />` on line 52 |
| `components/Hero.tsx` | `lib/constants.ts` | `import { HERO, CTA_PRIMARY, CTA_SECONDARY }` | WIRED | Import present; HERO.eyebrow/headlineLine1/headlineLine2/subheadline/microcopy all rendered |
| `components/Diagnostico.tsx` | `lib/constants.ts` | `import { DIAGNOSTICO }` | WIRED | Import present; DIAGNOSTICO.eyebrow/headline/subheadline/cards all rendered |
| `components/Tese.tsx` | `lib/constants.ts` | `import { TESE }` | WIRED | Import present; TESE.eyebrow/headline/body all rendered |
| `app/page.tsx` | `Hero`, `Diagnostico`, `Tese` | imports + JSX composition | WIRED | All three imported as named exports; rendered as `<Hero /><Diagnostico /><Tese />` |
| `components/mockups/AppVendedor.tsx` | `lib/constants.ts` | `import { MOCK_APP }` | WIRED | Import present; MOCK_APP.client/items/adjustment/subtotal/discountPercent/discountValue/total/cta/status all rendered |
| `components/mockups/PainelDashboard.tsx` | `lib/constants.ts` | `import { MOCK_PAINEL }` | WIRED | Import present; MOCK_PAINEL.brand/filters/kpis/risk rendered |
| `components/mockups/PainelDashboard.tsx` | `components/mockups/_BrazilMap.tsx` | `import { BrazilMap }` | WIRED | Import on line 4; `<BrazilMap />` on line 69 |
| `components/mockups/PainelDashboard.tsx` | `components/mockups/_AbcChart.tsx` | `import { AbcChart }` | WIRED | Import on line 3; `<AbcChart />` on line 66 |
| `components/mockups/_AbcChart.tsx` | `lib/constants.ts` | `import { MOCK_PAINEL }` | WIRED | MOCK_PAINEL.abc.bars/title/subtitle consumed |
| `components/mockups/_BrazilMap.tsx` | `lib/constants.ts` | `import { MOCK_PAINEL }` | WIRED | MOCK_PAINEL.map.points/title consumed |

### Data-Flow Trace (Level 4)

All data is static (SSR from lib/constants.ts as const objects). No async data fetching — all values are compile-time constants flowing directly into JSX. No disconnected props or empty fallbacks.

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| Hero.tsx | HERO.headlineLine1/headlineLine2/subheadline/microcopy | lib/constants.ts as const | Yes — literal strings | FLOWING |
| Diagnostico.tsx | DIAGNOSTICO.cards (3 items) | lib/constants.ts as const | Yes — 3 locked card objects | FLOWING |
| Tese.tsx | TESE.headline/body | lib/constants.ts as const | Yes — literal strings | FLOWING |
| AppVendedor.tsx | MOCK_APP.items (8 items), totals | lib/constants.ts as const | Yes — 8 product rows + financials | FLOWING |
| PainelDashboard.tsx | MOCK_PAINEL.kpis (4), .risk.rows (3) | lib/constants.ts as const | Yes — full data objects | FLOWING |

### Behavioral Spot-Checks

Step 7b: SKIPPED for interactive behaviors (scroll, drawer animation) — requires browser. The following static checks were verified:

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| TypeScript compiles cleanly | `npx tsc --noEmit` | 0 errors | PASS |
| Production build succeeds | `npx next build` | 0 errors, 0 warnings, 1 static route | PASS |
| All section components are server components | grep for `"use client"` | Hero.tsx: 0, Diagnostico.tsx: 0, Tese.tsx: 0, AppVendedor.tsx: 0, PainelDashboard.tsx: 0 | PASS |
| No hardcoded visible strings in section JSX | grep for locked copy strings | 0 matches in Hero/Diagnostico/Tese JSX | PASS |
| AppVendedor not mounted in page.tsx (intentional — scoped to later phase) | grep `AppVendedor` in page.tsx | Not present | PASS (per plan scope) |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| SECT-01 | 02-01 | Navbar sticky, backdrop-blur, logo, anchor links, CTA | SATISFIED | Navbar.tsx verified with all behavioral hooks and ARIA |
| SECT-02 | 02-02 | Hero section: white bg, eyebrow, 2-line Fraunces headline, subheadline, 2 CTAs, dashboard mockup, mono microcopy | SATISFIED | Hero.tsx: all elements present, PainelDashboard embedded |
| SECT-03 | 02-02 | Diagnostico: `#E0F6FE` bg (`bg-pruma-cyan-pale`), eyebrow, h2, subheadline, 3 locked cards | SATISFIED | Diagnostico.tsx: all elements from DIAGNOSTICO constant |
| SECT-04 | 02-02 | Tese: white bg, centered editorial, Fraunces 56px headline, Inter 19px body at 720px max-w | SATISFIED | Tese.tsx: lg:text-[56px], lg:text-[19px], max-w-[720px] |
| MOCK-01 | 02-03 | AppVendedor: max-w-[380px], Auto Center São Paulo, 8 items, total R$18.420,00, discount 3%, status 🟢 ONLINE, "Fechar pedido" | SATISFIED | AppVendedor.tsx: all data sourced from MOCK_APP; total=18420.0 correct; `discountValue: 570.61` is arithmetically correct (3% of 19020.28 = 570.608); plan had a typo (569.61) — non-blocking |
| MOCK-02 | 02-03 | PainelDashboard: header+filters, 4 KPI cards, ABC curve 12 bars, Brazil SVG map, risk table 3 rows | SATISFIED | PainelDashboard.tsx: all 4 bands; AbcChart 12 bars with correct tier colors; BrazilMap SVG with 8 cyan dots |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `components/Hero.tsx` | 24 | Missing `sm:text-5xl` intermediate breakpoint (plan snippet showed `text-[40px] sm:text-5xl lg:text-[72px]`) | INFO | On sm viewports (640–1023px) heading remains at 40px instead of scaling to 48px. Roadmap SC2 only requires 72px desktop — unambiguously met. |
| `lib/constants.ts` | 117 | `discountValue: 570.61` vs plan spec `569.61` | INFO | Arithmetically correct (3% of 19020.28 = 570.608 rounds to 570.61); plan had a rounding typo. The rendered AppVendedor UI correctly displays both the discount and total. |

No blockers or warnings found.

### Human Verification Required

#### 1. Navbar Scroll Transition

**Test:** Load `localhost:3000`, scroll the page past 8px (roughly one viewport unit)
**Expected:** Navbar background transitions from fully transparent to `bg-white/72` with `backdrop-blur-md`, a soft shadow, and a hairline bottom border
**Why human:** CSS transition and scroll behavior requires browser rendering; grep confirms the classes are applied conditionally but not that they visually render correctly

#### 2. Mobile Drawer (Hamburger / Open / Close)

**Test:** Resize browser to under 768px width. Confirm desktop nav links hide and hamburger icon appears. Click hamburger — drawer should open with full-screen white overlay containing PRUMA wordmark, close button, 4 anchor links, and full-width primary CTA
**Expected:** Drawer opens with Framer Motion slide-down animation; body scrolling locks; all 4 NAV_LINKS visible; CTA_PRIMARY present
**Why human:** Framer Motion animation + responsive breakpoint + scroll lock require browser interaction

#### 3. Escape Key Closes Drawer

**Test:** With mobile drawer open, press Escape
**Expected:** Drawer closes immediately; body scrolling restores
**Why human:** Keyboard event handling requires browser / Playwright test

#### 4. Hero Layout — Desktop 2-column

**Test:** At 1024px+ viewport, confirm Hero shows text column on the left and PainelDashboard on the right. Confirm headline renders in Fraunces serif at ~72px scale
**Expected:** 2-column grid layout; serif headline at large scale; both CTAs side-by-side on the same row
**Why human:** CSS grid rendering and typography scaling require visual browser inspection

#### 5. Diagnostico Icon Colors

**Test:** At the Diagnostico section, inspect the 3 card icons
**Expected:** EyeOff and GitBranch icons are navy (`text-pruma-navy`); FileSpreadsheet icon is cyan (`text-pruma-cyan`)
**Why human:** Color rendering in the browser cannot be confirmed by static analysis alone; toneClass lookup is correct in code but visual confirmation is standard QA practice for brand-critical color usage

### Gaps Summary

No gaps found. All 5 Roadmap Success Criteria are verified against actual codebase. All 6 requirement IDs (SECT-01 through SECT-04, MOCK-01, MOCK-02) are covered by implemented, substantive, and wired artifacts. TypeScript compiles clean and the production build succeeds with 0 errors and 0 warnings.

The 5 human verification items above are standard browser/visual QA for interactive and animation behavior that cannot be confirmed by static analysis. None of them are expected to fail based on the code quality observed.

---

_Verified: 2026-05-07T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
