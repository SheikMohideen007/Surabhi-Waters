import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { FlowLines } from "@/components/ui/FlowLines";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  crumbs: Crumb[];
  image?: { src: string; alt: string };
  /** Extra content rendered under the description (facts strip, CTAs). */
  children?: ReactNode;
  size?: "default" | "compact";
};

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  children,
  size = "default",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-navy-900 pt-30 text-white lg:pt-38",
        size === "compact" ? "pb-14 lg:pb-16" : "pb-16 lg:pb-24",
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={75}
            className="-z-20 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60"
          />
        </>
      ) : (
        <>
          <div aria-hidden className="grid-overlay absolute inset-0 -z-10" />
          <div
            aria-hidden
            className="absolute -top-32 -right-32 -z-10 size-[30rem] rounded-full bg-brand-500/10 blur-3xl"
          />
        </>
      )}
      <FlowLines className="-z-10 opacity-40" />

      <Container className="relative">
        <Breadcrumbs items={crumbs} tone="light" />

        <ScrollReveal y={12} className="mt-8 max-w-3xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="text-display-sm sm:text-display lg:text-display-lg mt-5 text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {description}
            </p>
          ) : null}
        </ScrollReveal>

        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
