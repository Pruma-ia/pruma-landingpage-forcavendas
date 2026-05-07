"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PainelDashboard } from "@/components/mockups/PainelDashboard";
import { SectionReveal } from "@/components/SectionReveal";
import { useFadeUpVariants } from "@/hooks/useFadeUpVariants";
import { PAINEL_GESTOR } from "@/lib/constants";

export function PainelGestor() {
  const { item } = useFadeUpVariants();
  const leftCallouts = PAINEL_GESTOR.callouts.slice(0, 2);
  const rightCallouts = PAINEL_GESTOR.callouts.slice(2, 4);

  return (
    <section
      id="painel-gestor"
      aria-labelledby="painel-gestor-heading"
      className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop overflow-hidden"
    >
      <Container as="div">
        <SectionReveal>
          <motion.div variants={item} className="text-center max-w-[60ch] mx-auto">
            <div className="flex justify-center">
              <Eyebrow tone="light">{PAINEL_GESTOR.eyebrow}</Eyebrow>
            </div>
            <h2
              id="painel-gestor-heading"
              className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight"
            >
              {PAINEL_GESTOR.headline}
            </h2>
            <p className="font-sans text-base lg:text-lg text-pruma-gray-text leading-[1.6] mt-4">
              {PAINEL_GESTOR.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-12 items-center mt-12 lg:mt-20">
            {/* Left callouts — 01 e 02 */}
            <div className="flex flex-col gap-10 order-2 lg:order-1">
              {leftCallouts.map((callout) => (
                <motion.div key={callout.number} variants={item} className="flex flex-col gap-2 lg:text-right">
                  <span className="font-serif text-3xl font-medium text-pruma-navy leading-none">
                    {callout.number}
                  </span>
                  <p className="font-sans text-sm text-pruma-gray-text leading-[1.5] max-w-[28ch] lg:ml-auto">
                    {callout.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Center mockup — primeiro no mobile */}
            <motion.div
              variants={item}
              className="order-1 lg:order-2 overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 lg:mx-0 lg:px-0 max-w-full"
            >
              <div className="min-w-0">
                <PainelDashboard />
              </div>
            </motion.div>

            {/* Right callouts — 03 e 04 */}
            <div className="flex flex-col gap-10 order-3">
              {rightCallouts.map((callout) => (
                <motion.div key={callout.number} variants={item} className="flex flex-col gap-2">
                  <span className="font-serif text-3xl font-medium text-pruma-navy leading-none">
                    {callout.number}
                  </span>
                  <p className="font-sans text-sm text-pruma-gray-text leading-[1.5] max-w-[28ch]">
                    {callout.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
