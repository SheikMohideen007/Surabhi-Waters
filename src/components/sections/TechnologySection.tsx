"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";
import { getSolution } from "@/data/solutions";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { easeBrand } from "@/lib/motion";
import { cn } from "@/lib/utils";

const stp = getSolution("sewage-treatment-plant");

export function TechnologySection() {
  const technologies = stp?.technologies?.items ?? [];
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  if (!technologies.length) return null;

  const current = technologies[active];

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      <div aria-hidden className="grid-overlay absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 size-[34rem] rounded-full bg-brand-500/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <ScrollReveal>
              <Eyebrow tone="light">Treatment technology</Eyebrow>
              <h2 className="text-display-sm sm:text-display mt-6 text-white">
                We specialise in four sewage treatment processes
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
                The process is the decision that defines the plant. We select between these four
                rather than fitting every site to the same one.
              </p>
            </ScrollReveal>

            <div
              role="tablist"
              aria-label="Sewage treatment technologies"
              aria-orientation="vertical"
              className="mt-10 flex flex-col"
            >
              {technologies.map((tech, index) => {
                const selected = index === active;
                return (
                  <button
                    key={tech.name}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${index}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${index}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                        event.preventDefault();
                        setActive((index + 1) % technologies.length);
                      }
                      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        setActive((index - 1 + technologies.length) % technologies.length);
                      }
                    }}
                    className={cn(
                      "group relative flex items-baseline gap-4 border-t border-white/12 py-5 text-left transition-colors duration-300 last:border-b",
                      selected ? "text-white" : "text-white/55 hover:text-white/85",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 left-0 h-px bg-brand-400 transition-all duration-500 ease-[var(--ease-brand)]",
                        selected ? "w-full" : "w-0",
                      )}
                    />
                    <span className="w-8 shrink-0 font-serif text-sm text-brand-300">
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-lg font-semibold tracking-tight sm:text-xl">
                      {tech.name}
                      {tech.abbr ? (
                        <span className="ml-2 text-sm font-medium text-brand-300">
                          {tech.abbr}
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <ScrollReveal delay={0.1} className="flex flex-col">
            <div className="relative aspect-16/10 overflow-hidden rounded-[4px] bg-navy-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: easeBrand }}
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    quality={78}
                    className="object-cover"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent"
              />
            </div>

            <div className="relative mt-8 min-h-52 border-l-2 border-brand-500 pl-6 sm:min-h-44">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  role="tabpanel"
                  id={`${baseId}-panel-${active}`}
                  aria-labelledby={`${baseId}-tab-${active}`}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: easeBrand }}
                >
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{current.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">{current.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8">
              <ButtonLink href="/solutions/sewage-treatment-plant" variant="light" withArrow>
                Sewage treatment plants
              </ButtonLink>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
