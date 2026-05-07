"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROVA_SOCIAL } from "@/lib/constants";

// ─── AnimatedCounter ──────────────────────────────────────────────────────────
// Private sub-component — not exported. Drives a single metric count animation.
// ANIM-02: fires once when element enters viewport (-60px margin), 0 → final,
// 1.5s easeOut via Framer Motion animate(). Respects useReducedMotion() by
// skipping the animate() call and rendering the final value immediately.
// textContent-only writes — never innerHTML, per T-03-10 mitigation.

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ value, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    // Reduced-motion or already in view: render final value immediately, no animation
    if (!isInView || reducedMotion) {
      ref.current.textContent = reducedMotion
        ? `${prefix}${value.toLocaleString("pt-BR")}${suffix}`
        : `${prefix}0${suffix}`;
      return;
    }

    // Animated path: 0 → value over 1.5s easeOut (D-09)
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("pt-BR")}${suffix}`;
        }
      },
    });

    // Cleanup: cancel on unmount — prevents memory leak (T-03-11 mitigation)
    return () => controls.stop();
  }, [isInView, reducedMotion, value, prefix, suffix]);

  const finalLabel = `${prefix}${value.toLocaleString("pt-BR")}${suffix}`;

  return (
    <>
      {/* Animated span: aria-hidden so mid-flight values are not announced */}
      <span
        ref={ref}
        aria-hidden="true"
        className="font-serif text-5xl lg:text-[64px] font-semibold text-[#0099CC] leading-none tracking-tight tabular-nums"
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

// ─── ProvaSocial (SECT-10) ────────────────────────────────────────────────────
// Proof block: 3 placeholder logo slots + 3 credibility numbers (animated via
// AnimatedCounter) + 1 featured depoimento card. Background: bg-pruma-white.
// All replaceable content is annotated with TODO: substituir comments.

export function ProvaSocial() {
  return (
    <section
      id="prova-social"
      aria-labelledby="prova-social-heading"
      className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        {/* Section heading */}
        <div className="text-center max-w-[60ch] mx-auto">
          <div className="flex justify-center">
            <Eyebrow tone="light">{PROVA_SOCIAL.eyebrow}</Eyebrow>
          </div>
          <h2
            id="prova-social-heading"
            className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight"
          >
            {PROVA_SOCIAL.headline}
          </h2>
        </div>

        {/* Logo strip — 3 placeholder slots */}
        {/* TODO: substituir com logotipos reais de clientes */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mt-12 lg:mt-16"
          role="group"
          aria-label="Clientes"
        >
          {PROVA_SOCIAL.logos.map((logo) => (
            <div
              key={logo.id}
              role="img"
              className="flex items-center justify-center h-12 grayscale opacity-40"
              aria-label={logo.alt}
            >
              {/* TODO: substituir com logotipo real */}
              <div
                className="w-28 h-8 bg-pruma-gray-soft rounded-pruma-sm"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Metrics row — 3 large Fraunces 64px ciano numbers (ANIM-02 animated) */}
        {/* TODO: substituir com métricas reais validadas pelo cliente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mt-16 lg:mt-20 text-center">
          {PROVA_SOCIAL.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-3">
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
              <p className="font-mono text-xs uppercase tracking-eyebrow text-pruma-gray-text max-w-[24ch]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Depoimento card */}
        {/* TODO: substituir com depoimento real autorizado pelo cliente */}
        <figure className="mt-16 lg:mt-20 mx-auto max-w-[720px] bg-white border border-pruma-gray-soft rounded-pruma-md shadow-pruma-sm p-8 lg:p-12">
          <blockquote className="font-serif text-xl lg:text-2xl text-pruma-navy leading-[1.4]">
            &ldquo;{PROVA_SOCIAL.depoimento.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex flex-col gap-1">
            <span className="font-sans text-sm font-medium text-pruma-navy">
              {PROVA_SOCIAL.depoimento.author}
            </span>
            <span className="font-mono text-xs uppercase tracking-eyebrow text-pruma-gray-text">
              {PROVA_SOCIAL.depoimento.role} · {PROVA_SOCIAL.depoimento.company}
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
