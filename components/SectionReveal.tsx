"use client";

import { motion } from "framer-motion";
import { useFadeUpVariants } from "@/hooks/useFadeUpVariants";
import type React from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function SectionReveal({ children, stagger = 0.08, className }: SectionRevealProps) {
  const { container } = useFadeUpVariants(stagger);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
