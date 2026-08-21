import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language. Keeping durations and easing in one place is what
 * makes the animation across the site feel like one product rather than a
 * collection of effects.
 */

export const easeBrand = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  fast: { duration: 0.35, ease: easeBrand } satisfies Transition,
  base: { duration: 0.55, ease: easeBrand } satisfies Transition,
  slow: { duration: 0.9, ease: easeBrand } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: transitions.slow },
};

/** Parent wrapper that staggers direct children using the variants above. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

export const viewportOnce = { once: true, amount: 0.25 } as const;
