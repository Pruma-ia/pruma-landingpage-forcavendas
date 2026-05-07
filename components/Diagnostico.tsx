"use client";

import { EyeOff, GitBranch, FileSpreadsheet, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { SectionReveal } from "@/components/SectionReveal";
import { useFadeUpVariants } from "@/hooks/useFadeUpVariants";
import { DIAGNOSTICO } from "@/lib/constants";

const iconMap: Record<"EyeOff" | "GitBranch" | "FileSpreadsheet", LucideIcon> = {
  EyeOff,
  GitBranch,
  FileSpreadsheet,
};

const toneClass: Record<"navy" | "cyan", string> = {
  navy: "text-pruma-navy",
  cyan: "text-pruma-cyan",
};

export function Diagnostico() {
  const { item } = useFadeUpVariants();
  return (
    <section
      id="diagnostico"
      aria-labelledby="diagnostico-heading"
      className="bg-pruma-cyan-pale py-section-y-mobile lg:py-section-y-desktop"
    >
      <Container as="div">
        <SectionReveal>
          <motion.div variants={item}>
            <Eyebrow tone="light">{DIAGNOSTICO.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h2
            variants={item}
            id="diagnostico-heading"
            className="font-serif text-4xl lg:text-[52px] font-medium text-pruma-navy leading-[1.10] tracking-tight max-w-[18ch]"
          >
            {DIAGNOSTICO.headline}
          </motion.h2>

          <motion.p
            variants={item}
            className="font-sans text-base lg:text-lg font-normal text-pruma-navy leading-[1.6] mt-4 max-w-[60ch]"
          >
            {DIAGNOSTICO.subheadline}
          </motion.p>

          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-12 lg:mt-16 list-none">
            {DIAGNOSTICO.cards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <motion.li key={card.title} variants={item}>
                  <Card as="div" interactive={false}>
                    <Icon
                      className={`w-6 h-6 ${toneClass[card.tone]}`}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="font-serif text-2xl font-semibold text-pruma-navy mt-6 leading-tight">
                      {card.title}
                    </h3>
                    <p className="font-sans text-base font-normal text-pruma-gray-text leading-[1.55] mt-3">
                      {card.body}
                    </p>
                  </Card>
                </motion.li>
              );
            })}
          </ul>
        </SectionReveal>
      </Container>
    </section>
  );
}
