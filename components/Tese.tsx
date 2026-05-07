"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionReveal } from "@/components/SectionReveal";
import { useFadeUpVariants } from "@/hooks/useFadeUpVariants";
import { TESE } from "@/lib/constants";

export function Tese() {
  const { item } = useFadeUpVariants();
  return (
    <section
      id="tese"
      aria-labelledby="tese-heading"
      className="bg-pruma-white py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div" className="text-center">
        <SectionReveal>
          <motion.div variants={item} className="flex justify-center">
            <Eyebrow tone="light">{TESE.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h2
            variants={item}
            id="tese-heading"
            className="font-serif text-4xl lg:text-[56px] font-medium text-pruma-navy leading-[1.15] tracking-tight max-w-[20ch] mx-auto mt-4"
          >
            {TESE.headline}
          </motion.h2>

          <motion.p
            variants={item}
            className="font-sans text-[17px] lg:text-[19px] font-normal text-pruma-navy leading-[1.6] max-w-[720px] mx-auto mt-8 lg:mt-12"
          >
            {TESE.body}
          </motion.p>
        </SectionReveal>
      </Container>
    </section>
  );
}
