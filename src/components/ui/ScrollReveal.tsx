"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { transitions, viewportOnce } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px. Set to 0 for a pure fade. */
  y?: number;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
};

/**
 * The single scroll-entrance primitive used across the site. Motion-reduced
 * users get the final state immediately with no transform.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...transitions.base, delay }}
    >
      {children}
    </MotionTag>
  );
}
