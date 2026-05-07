---
phase: 03-full-lp-animations
reviewed: 2026-05-07T00:00:00Z
depth: standard
files_reviewed: 15
files_reviewed_list:
  - app/page.tsx
  - components/ComoFunciona.tsx
  - components/CTAFinal.tsx
  - components/Diagnostico.tsx
  - components/Diferencial.tsx
  - components/Footer.tsx
  - components/Funcionalidades.tsx
  - components/Hero.tsx
  - components/PainelGestor.tsx
  - components/ParaQuem.tsx
  - components/ProvaSocial.tsx
  - components/SectionReveal.tsx
  - components/Tese.tsx
  - hooks/useFadeUpVariants.ts
  - lib/constants.ts
findings:
  critical: 1
  warning: 4
  info: 7
  total: 12
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-05-07
**Depth:** standard
**Files Reviewed:** 15
**Status:** issues_found

## Summary

All fifteen files were reviewed. The animation and reveal system (`SectionReveal`, `useFadeUpVariants`, `AnimatedCounter`) is architecturally sound — Framer Motion variant name propagation is correct, reduced-motion handling is thorough, and the stagger pattern works as intended across all sections. The mock data arithmetic in `MOCK_APP` is internally consistent.

One critical accessibility defect was found: `aria-live="polite"` placed directly on the animated counter span causes a screen reader to announce every intermediate numeric value during the 1.5-second count animation — roughly 90 interruptions per counter. Four warnings cover a design-constraint gradient, an unsafe type assertion, an emoji in shipped copy, and a real user email address hardcoded in source. Seven info items cover unused exports and dead data in constants.

---

## Critical Issues

### CR-01: `aria-live="polite"` on AnimatedCounter fires on every animation frame

**File:** `components/ProvaSocial.tsx:57`

**Issue:** The `<span>` element that drives the counter animation has `aria-live="polite"` set directly. The animation calls `ref.current.textContent = ...` on every `framer-motion` update tick — approximately 60 times per second for 1.5 seconds. Every `textContent` mutation inside a live region is announced by the screen reader. This produces ~90 consecutive spoken interruptions ("0", "8", "17", …, "847") that disrupt users who rely on assistive technology, and may prevent them from hearing other page content.

The `aria-live` attribute should be on a visually-hidden wrapper that receives only the final value once the animation ends, not on the animating element itself.

**Fix:**
```tsx
// Render the live region separately from the animating element.
// The live region receives only the final value (announced once).
// The animating span is aria-hidden so screen readers ignore mid-flight values.

function AnimatedCounter({ value, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (!isInView || reducedMotion) {
      ref.current.textContent = reducedMotion
        ? `${prefix}${value.toLocaleString("pt-BR")}${suffix}`
        : `${prefix}0${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("pt-BR")}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, reducedMotion, value, prefix, suffix]);

  const finalLabel = `${prefix}${value.toLocaleString("pt-BR")}${suffix}`;

  return (
    <>
      {/* Animated span: aria-hidden so mid-flight values are not announced */}
      <span
        ref={ref}
        aria-hidden="true"
        className="font-serif text-5xl lg:text-[64px] font-semibold text-pruma-cyan leading-none tracking-tight tabular-nums"
      >
        {prefix}0{suffix}
      </span>
      {/* Visually hidden live region: receives final value once animation ends */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {isInView ? finalLabel : ""}
      </span>
    </>
  );
}
```

---

## Warnings

### WR-01: `linear-gradient` inline style violates "NO gradients" design constraint

**File:** `components/Funcionalidades.tsx:72`

**Issue:** An inline `linear-gradient` is used as a fade overlay on the hero bento card to blend the mockup into the section background. The project CLAUDE.md states: "NO gradients, emojis, generic SaaS visuals." Even though the gradient is technically invisible (transparent → same background color), it ships as a gradient and violates the explicit constraint. A future background-color change would also break the overlay.

**Fix:** Replace the gradient with a solid white-to-transparent mask using `opacity` or a CSS `mask-image` property, or use a `box-shadow` inset to create the cutoff illusion without a gradient:

```tsx
// Option A: inset box-shadow fade (compositor-friendly, no gradient)
<div
  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
  style={{
    boxShadow: "inset 0 -64px 32px -16px #E0F6FE",
  }}
  aria-hidden="true"
/>

// Option B: if gradient must be kept, use a Tailwind class tied to the token
// so background changes stay in sync (requires extending tailwind.config.ts)
```

---

### WR-02: Unsafe type assertion `as keyof typeof iconMap` on empty-string key

**File:** `components/Funcionalidades.tsx:88`

**Issue:** `feature.iconName` for the hero feature entry is `""` (empty string) per `lib/constants.ts:268`. The assertion `feature.iconName as keyof typeof iconMap` tells TypeScript that `""` is a valid `iconMap` key — it is not. `iconMap[""]` returns `undefined` at runtime. The `{Icon && ...}` null-guard on line 93 prevents a crash, but the type assertion is a lie to the compiler that masks a structural mismatch.

The root issue is that `heroFeature` should never reach this code path (it is excluded by the `filter` on line 26), but the assertion exists for the general loop over `smallFeatures`, which does include the filtered-out hero feature's shape. The safe fix is to remove the assertion and let TypeScript enforce correct typing:

**Fix:**
```tsx
// In lib/constants.ts: give the hero feature a distinct shape so it never has iconName=""
// Or tighten the iconName type in the feature union:

type SmallFeature = {
  isHero: false;
  title: string;
  description: string;
  iconName: "Smartphone" | "Sliders" | "TrendingUp" | "AlertTriangle" | "BarChart2";
};

type HeroFeature = {
  isHero: true;
  title: string;
  description: string;
  iconName: "";
};

// Then in Funcionalidades.tsx remove the unsafe cast:
// const Icon = iconMap[feature.iconName]; // TypeScript will now flag "" correctly
```

---

### WR-03: Emoji (`🟢`) in `MOCK_APP.status` violates design constraint

**File:** `lib/constants.ts:102`

**Issue:** `MOCK_APP.status` is `"🟢 ONLINE"`. This value is rendered verbatim inside `components/mockups/AppVendedor.tsx` line 23 (in the review scope's dependency). CLAUDE.md explicitly prohibits emojis: "NO gradients, emojis, generic SaaS visuals." This is a mockup that will be visible in the live landing page.

**Fix:**
```ts
// Replace emoji with a CSS-driven status indicator in AppVendedor.tsx,
// and update the constant to emoji-free text:
status: "ONLINE",

// In AppVendedor.tsx, render the dot as a styled element:
// <span className="w-2 h-2 rounded-full bg-green-500 inline-block" aria-hidden="true" />
// {MOCK_APP.status}
```

---

### WR-04: Real user email address hardcoded in shipped source

**File:** `lib/constants.ts:503`

**Issue:** `kelly.lima@w1business.com.br` is hardcoded directly in the `FOOTER.columns` contact links. This is a real email address that will be committed to the git history and shipped as plaintext to every visitor's browser. It exposes a personal/business email to scrapers and automated harvesters permanently. Even if the address is intentionally public, hardcoding it in version-controlled source (instead of a CMS or environment variable) means rotating the address requires a code change and new deployment, and the old address remains in git history.

**Fix:**
```ts
// Option A: Move to a config/environment level and inject at build time
// NEXT_PUBLIC_CONTACT_EMAIL=kelly.lima@w1business.com.br

// In constants.ts:
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
export const FOOTER = {
  // ...
  columns: [
    // ...
    {
      heading: "CONTATO",
      links: [
        { label: contactEmail, href: `mailto:${contactEmail}` },
        // ...
      ],
    },
  ],
} as const;
```

---

## Info

### IN-01: `CTA_FINAL.successMicrocopy` exported but never rendered

**File:** `lib/constants.ts:474`

**Issue:** `successMicrocopy: "SEM SPAM · SEM COMPROMISSO"` is defined and exported but `CTAFinal.tsx` never references `CTA_FINAL.successMicrocopy`. The success state renders only `successHeadline` and `successSubtext`. The microcopy string goes unshown.

**Fix:** Either render it below the success subtext in `CTAFinal.tsx`, or remove the field to avoid misleading future maintainers:
```tsx
<p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-gray-text mt-2">
  {CTA_FINAL.successMicrocopy}
</p>
```

---

### IN-02: `CTA_FINAL.microcopy` exported but never rendered

**File:** `lib/constants.ts:427`

**Issue:** `microcopy: "SEM COMPROMISSO · RESPOSTA EM 1 DIA ÚTIL"` is defined in `CTA_FINAL` but `CTAFinal.tsx` never imports or renders it. There is a corresponding field in the success state that is also unrendered (IN-01). This copy was presumably intended to appear below the submit button or above the form.

**Fix:** Render below the submit button as a trust signal, or remove if not part of the finalized design:
```tsx
<Button variant="primary" type="submit" className="self-start mt-2">
  {CTA_FORM}
</Button>
<p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-gray-text mt-3">
  {CTA_FINAL.microcopy}
</p>
```

---

### IN-03: `DIFERENCIAL.subheadline` exported but never rendered

**File:** `lib/constants.ts:352`

**Issue:** `subheadline: "Consultoria que instala o processo, tecnologia que executa. Nessa ordem."` is defined in the `DIFERENCIAL` constant but `Diferencial.tsx` only renders `eyebrow`, `headline`, and `pillars`. The subheadline is silently dropped.

**Fix:** Either add it to `Diferencial.tsx` or remove the field from `DIFERENCIAL` in `constants.ts`.

---

### IN-04: `PROVA_SOCIAL.subheadline` exported but never rendered

**File:** `lib/constants.ts:383-384`

**Issue:** `subheadline: "Números de operações que deixaram de improvisar."` is defined in `PROVA_SOCIAL` but `ProvaSocial.tsx` never references `PROVA_SOCIAL.subheadline`.

**Fix:** Render below the headline or remove from the constant.

---

### IN-05: `DIFERENCIAL.pillars[].iconName` populated but never consumed

**File:** `lib/constants.ts:355-369`

**Issue:** Each pillar in `DIFERENCIAL` has an `iconName` field (`"Compass"`, `"Monitor"`, `"CheckSquare"`), but `Diferencial.tsx` iterates over pillars and only reads `pillar.number`, `pillar.title`, and `pillar.description`. The icons are never imported, mapped, or rendered. The data creates a false expectation that icons will appear in the Diferencial section.

**Fix:** Either add icon rendering to `Diferencial.tsx` (to match the pattern in `Diagnostico`, `ComoFunciona`, etc.) or remove the `iconName` fields from the `DIFERENCIAL` constant to reduce confusion.

---

### IN-06: `FORM_EMPTY_STATE` and `FORM_SUCCESS` exported but never imported

**File:** `lib/constants.ts:25-29`

**Issue:** Two top-level exports, `FORM_EMPTY_STATE` and `FORM_SUCCESS`, are defined but no component in the reviewed codebase imports them. `CTAFinal.tsx` uses `CTA_FINAL.successHeadline` / `CTA_FINAL.successSubtext` instead.

**Fix:** Remove both exports, or replace the inline strings in `CTAFinal.tsx` with these shared constants to reduce duplication.

---

### IN-07: TODO comment and dead `href="#"` on privacy policy link in shipped footer

**File:** `components/Footer.tsx:60`

**Issue:** The privacy policy `<Link>` renders `href="#"` with an inline `{/* TODO: link real para política de privacidade */}` comment. Clicking the link scrolls to the top of the page rather than navigating to a policy. The TODO comment should not ship in production; neither should a non-functional link for a legally required document.

**Fix:** Either wire the href to the real privacy policy URL, or hide the link until the policy page exists:
```tsx
{FOOTER.privacyUrl && (
  <Link href={FOOTER.privacyUrl} ...>
    Política de privacidade
  </Link>
)}
```

---

_Reviewed: 2026-05-07_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
