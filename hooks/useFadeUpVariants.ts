"use client";

import { useReducedMotion, type Variants } from "framer-motion";

export interface FadeUpVariants {
  container: Variants;
  item: Variants;
}

export function useFadeUpVariants(staggerChildren: number = 0.08): FadeUpVariants {
  const reducedMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reducedMotion ? 0 : staggerChildren },
    },
  };

  return { container, item };
}
