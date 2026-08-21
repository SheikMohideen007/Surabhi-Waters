"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const paths = [
  "M0 120C160 120 200 60 360 60s200 60 360 60 200-60 360-60 200 60 360 60",
  "M0 170C160 170 200 100 360 100s200 70 360 70 200-70 360-70 200 70 360 70",
  "M0 220C160 220 200 150 360 150s200 70 360 70 200-70 360-70 200 70 360 70",
];

/**
 * Decorative flow-line field. Draws once on mount rather than looping, so it
 * reads as a diagram being plotted instead of a permanently moving background.
 */
export function FlowLines({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduceMotion = useReducedMotion();
  const stroke = tone === "light" ? "rgba(255,255,255,0.28)" : "var(--color-brand-500)";

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {paths.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke={stroke}
          strokeWidth={1}
          strokeOpacity={tone === "light" ? 1 : 0.22}
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 2.2,
            delay: reduceMotion ? 0 : 0.3 + index * 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </svg>
  );
}
