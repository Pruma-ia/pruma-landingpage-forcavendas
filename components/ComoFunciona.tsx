"use client";

import { MapPin, ShoppingCart, ShieldCheck, BarChart3, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AppVendedor } from "@/components/mockups/AppVendedor";
import { SectionReveal } from "@/components/SectionReveal";
import { useFadeUpVariants } from "@/hooks/useFadeUpVariants";
import { COMO_FUNCIONA } from "@/lib/constants";

const iconMap: Record<"MapPin" | "ShoppingCart" | "ShieldCheck" | "BarChart3", LucideIcon> = {
  MapPin,
  ShoppingCart,
  ShieldCheck,
  BarChart3,
};

export function ComoFunciona() {
  const { item } = useFadeUpVariants();
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="bg-pruma-off-white py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        <SectionReveal>
          <motion.div variants={item}>
            <Eyebrow tone="light">{COMO_FUNCIONA.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h2
            variants={item}
            id="como-funciona-heading"
            className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight max-w-[20ch]"
          >
            {COMO_FUNCIONA.headline}
          </motion.h2>

          <motion.p
            variants={item}
            className="font-sans text-base lg:text-lg font-normal text-pruma-gray-text leading-[1.6] mt-4 max-w-[60ch]"
          >
            {COMO_FUNCIONA.subheadline}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start mt-12 lg:mt-16">
            {/* Numbered list — left, 7 cols */}
            <ol className="lg:col-span-7 flex flex-col gap-8 list-none">
              {COMO_FUNCIONA.steps.map((step, i) => {
                const Icon = iconMap[step.icon];
                return (
                  <motion.li key={step.title} variants={item} className="flex items-start gap-5">
                    <span className="font-mono text-xs uppercase tracking-eyebrow text-pruma-cyan flex-shrink-0 mt-1 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <Icon
                        className="w-5 h-5 text-pruma-navy mb-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <h3 className="font-serif text-xl lg:text-2xl font-medium text-pruma-navy leading-tight">
                        {step.title}
                      </h3>
                      <p className="font-sans text-base text-pruma-gray-text leading-[1.55] mt-2">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            {/* AppVendedor mockup — right, 5 cols */}
            <motion.div
              variants={item}
              className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            >
              <AppVendedor />
            </motion.div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
