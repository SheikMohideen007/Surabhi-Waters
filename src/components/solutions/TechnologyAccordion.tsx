"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { SolutionTechnology } from "@/data/solutions";
import { Plus } from "@/components/ui/icons";
import { easeBrand } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TechnologyAccordion({ items }: { items: SolutionTechnology[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-navy-900/12">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.name} className="border-b border-navy-900/12">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : index)}
                aria-expanded={expanded}
                aria-controls={`tech-panel-${index}`}
                className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6"
              >
                <span className="font-serif text-sm text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-lg font-semibold tracking-tight text-navy-900 transition-colors group-hover:text-brand-700 sm:text-xl">
                  {item.name}
                  {item.abbr ? (
                    <span className="ml-2.5 text-sm font-medium text-brand-600">{item.abbr}</span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-all duration-400 ease-[var(--ease-brand)]",
                    expanded && "rotate-45 border-brand-500 bg-brand-500 text-white",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={`tech-panel-${index}`}
                  initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeBrand }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pl-8 text-sm leading-relaxed text-ink-muted sm:pl-12 sm:text-base">
                    {item.body}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
