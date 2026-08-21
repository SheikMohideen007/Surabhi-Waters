"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { solutions } from "@/data/solutions";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FlowLines } from "@/components/ui/FlowLines";
import { ArrowRight } from "@/components/ui/icons";
import { easeBrand } from "@/lib/motion";

const headlineWords = ["Why", "waste", "waste", "water?"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[42rem] items-end overflow-hidden bg-navy-950 pt-32 pb-12 sm:min-h-[46rem] lg:min-h-[92svh] lg:pb-16"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={reduceMotion ? undefined : { y: imageY }}
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: easeBrand }}
      >
        <Image
          src="/images/backgrounds/hero-treatment-plant.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent"
      />
      <FlowLines className="-z-10 opacity-70" />

      <Container className="relative">
        <motion.div style={reduceMotion ? undefined : { opacity: contentOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeBrand }}
            className="eyebrow text-brand-300"
          >
            <span aria-hidden className="h-px w-8 bg-brand-300/60" />
            Water &amp; wastewater engineering since 2005
          </motion.p>

          <h1 className="mt-7 max-w-4xl text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-[5rem]">
            <span className="flex flex-wrap gap-x-[0.28em]">
              {headlineWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: "0.5em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 + index * 0.07, ease: easeBrand }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: easeBrand }}
              className="mt-2 block font-serif text-brand-300 italic"
            >
              We&rsquo;ll recycle it for you.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: easeBrand }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            We design, manufacture, install and maintain sewage, water and effluent treatment
            systems — engineered around your site, your load and CPCB norms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88, ease: easeBrand }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <ButtonLink href="/contact" size="lg" variant="accent" withArrow>
              Talk to an expert
            </ButtonLink>
            <ButtonLink href="/solutions" size="lg" variant="ghostLight">
              Explore solutions
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.nav
          aria-label="Product range"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-14 border-t border-white/15 pt-6 lg:mt-20"
        >
          <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
            Our product range
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 lg:gap-x-10">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {solution.name}
                  <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </Container>
    </section>
  );
}
