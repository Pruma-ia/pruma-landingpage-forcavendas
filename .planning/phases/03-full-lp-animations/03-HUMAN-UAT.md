---
status: approved
phase: 03-full-lp-animations
source: [03-VERIFICATION.md]
started: 2026-05-07T00:00:00Z
updated: 2026-05-07T00:00:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Scroll animation fade-up
expected: Sections fade up from y=24px opacity=0 to y=0 opacity=1 when entering viewport; list items and cards stagger visibly (0.08s delay each); animation fires ONCE only per section — does not repeat on scroll up/down

result: [pending]

### 2. Reduced-motion compliance
expected: With `prefers-reduced-motion: reduce` active (OS setting), all sections render in final state immediately with no fade/translate animation; ProvaSocial counter shows final value without counting up; no flickering

result: [pending]

### 3. Counter animation (ProvaSocial)
expected: Three Fraunces 64px cyan numbers count from 0 to their final values (e.g. 847, 94, 3h) over 1.5s with easeOut curve when section enters viewport; animation triggers exactly once; pt-BR number formatting correct (thousands separator)

result: [pending]

### 4. CTAFinal form submission
expected: Fill any field and submit — page does NOT make network request (check DevTools Network tab); success state appears inside the card with CheckCircle icon + headline; AnimatePresence transition visible (form exits, success enters); no full-page reload

result: [pending]

### 5. Hover states on Card and Button
expected: Feature cards in Funcionalidades/ParaQuem/ComoFunciona lift 2px with cyan border on hover; primary CTA buttons lift 1px with cyan shadow on hover; transitions feel snappy (~150ms)

result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
