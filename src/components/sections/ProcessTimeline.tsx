"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easeBrand, viewportOnce } from "@/lib/motion";

export function ProcessTimeline() {
  const railRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="From requirement to running plant"
          description="A single line of responsibility across process selection, engineering, manufacture, installation and long-term operation."
        />

        <ol ref={railRef} className="relative mt-14 lg:mt-20">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-sand-200 sm:left-[1.4375rem]"
          />
          {!reduceMotion ? (
            <motion.div
              aria-hidden
              style={{ scaleY }}
              className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-brand-500 sm:left-[1.4375rem]"
            />
          ) : null}

          {processSteps.map((step) => (
            <motion.li
              key={step.step}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: easeBrand }}
              className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-10 last:pb-0 sm:grid-cols-[3rem_1fr] sm:gap-x-8 lg:grid-cols-[3rem_14rem_1fr]"
            >
              <div className="relative flex justify-center pt-1 sm:justify-start">
                <span className="relative z-10 flex size-6 items-center justify-center rounded-full border border-sand-200 bg-white sm:size-12">
                  <span className="size-2 rounded-full bg-brand-500 sm:size-2.5" />
                </span>
              </div>

              <div className="lg:contents">
                <p className="font-serif text-sm text-brand-600 lg:pt-1.5">
                  {step.step}
                  <span className="ml-3 hidden font-sans text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase lg:inline">
                    Step
                  </span>
                </p>
                <div className="mt-2 lg:mt-0">
                  <h3 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-4 border-t border-sand-200 pt-8 text-sm text-ink-muted"
        >
          Steps reflect the scope the company delivers: process know-how, design and detail
          engineering, supply, construction and installation, after-sales service and operation
          &amp; maintenance.
        </motion.p>
      </Container>
    </section>
  );
}
