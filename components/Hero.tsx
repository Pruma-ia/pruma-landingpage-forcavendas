"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PainelDashboard } from "@/components/mockups/PainelDashboard";
import { SectionReveal } from "@/components/SectionReveal";
import { useFadeUpVariants } from "@/hooks/useFadeUpVariants";
import { HERO, CTA_PRIMARY, CTA_SECONDARY } from "@/lib/constants";

export function Hero() {
  const { item } = useFadeUpVariants();
  return (
    <section
      id="topo"
      aria-labelledby="hero-heading"
      className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop overflow-hidden"
    >
      <Container
        as="div"
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center"
      >
        {/* Coluna de texto — esquerda */}
        <SectionReveal className="lg:col-span-7">
          <motion.div variants={item}>
            <Eyebrow tone="light">{HERO.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="font-serif text-[40px] lg:text-[72px] font-medium text-pruma-navy leading-[1.05] tracking-tight max-w-[12ch]"
          >
            {HERO.headlineLine1}
            <br />
            {HERO.headlineLine2}
          </motion.h1>

          <motion.p
            variants={item}
            className="font-sans text-lg lg:text-xl font-normal text-pruma-gray-text leading-[1.6] mt-6 lg:mt-10 max-w-[52ch]"
          >
            {HERO.subheadline}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 lg:mt-12"
          >
            <Button variant="primary" href="#contato">
              {CTA_PRIMARY}
            </Button>
            <Button variant="ghost" href="#funcionalidades">
              {CTA_SECONDARY}
            </Button>
          </motion.div>

          <motion.p
            variants={item}
            className="font-mono text-xs font-normal uppercase tracking-eyebrow text-pruma-gray-text mt-8 lg:mt-12"
          >
            {HERO.microcopy}
          </motion.p>
        </SectionReveal>

        {/* Coluna do mockup — direita, pan horizontal em mobile */}
        <SectionReveal className="lg:col-span-5 w-full">
          <motion.div variants={item} className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 lg:mx-0 lg:px-0 max-w-full">
            <div className="min-w-0">
              <PainelDashboard />
            </div>
          </motion.div>
        </SectionReveal>
      </Container>
    </section>
  );
}
