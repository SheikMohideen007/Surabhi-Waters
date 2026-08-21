import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { getSolution } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function IndustriesSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <ScrollReveal>
              <Eyebrow>Where we work</Eyebrow>
              <h2 className="text-display-sm sm:text-display mt-6 text-navy-900">
                Built for the places water is actually used
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
                Residential communities, hotels, food industries, industrial plants, commercial
                developments and municipal bodies — each with a different load and a different
                reason for treating it.
              </p>
            </ScrollReveal>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2">
            {industries.map((industry, index) => (
              <ScrollReveal
                as="li"
                key={industry.slug}
                delay={index * 0.05}
                className="group relative flex flex-col overflow-hidden rounded-[4px] border border-sand-200 bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-navy-900/15 hover:shadow-card"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-sand-100">
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                    quality={72}
                    className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                    {industry.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {industry.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {industry.solutions.map((slug) => {
                      const solution = getSolution(slug);
                      if (!solution) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/solutions/${slug}`}
                            className="text-xs font-semibold text-brand-600 underline decoration-brand-600/25 decoration-1 underline-offset-4 transition-colors hover:decoration-brand-600"
                          >
                            {solution.shortName}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
