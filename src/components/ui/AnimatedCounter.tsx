"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  /** `year` counts up from a nearby year so the change reads as a date. */
  format?: "year" | "count";
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({
  value,
  format = "count",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [animated, setAnimated] = useState<number | null>(null);

  const from = format === "year" ? value - 18 : 0;

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(from, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimated(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value, from]);

  // Reduced-motion users see the final value; everyone else sees the count-up.
  const display = reduceMotion ? value : (animated ?? from);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
