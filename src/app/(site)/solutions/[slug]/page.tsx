import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { FactsStrip } from "@/components/solutions/FactsStrip";
import { HowItWorks } from "@/components/solutions/HowItWorks";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { TechnologyAccordion } from "@/components/solutions/TechnologyAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/icons";
import { company } from "@/data/company";
import { getRelatedSolutions, getSolution, solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  const path = `/solutions/${solution.slug}`;

  return {
    title: `${solution.name} — ${solution.tagline}`,
    description: solution.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${solution.name} | ${company.shortName}`,
      description: solution.summary,
      url: absoluteUrl(path),
      images: [{ url: solution.image, alt: solution.imageAlt }],
    },
  };
}

export default async function SolutionDetailPage({ params }: Params) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = getRelatedSolutions(slug);
  const path = `/solutions/${solution.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: solution.name,
        alternateName: solution.shortName,
        serviceType: solution.name,
        description: solution.summary,
        url: absoluteUrl(path),
        provider: { "@id": absoluteUrl("/#organization") },
        areaServed: ["Bangalore", "Mumbai", "Chennai", "Tirupur"],
        audience: solution.applications.map((application) => ({
          "@type": "Audience",
          audienceType: application,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Solutions", item: absoluteUrl("/solutions") },
          { "@type": "ListItem", position: 3, name: solution.name, item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={solution.shortName}
        title={solution.name}
        description={solution.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.name },
        ]}
        image={{ src: solution.image, alt: solution.imageAlt }}
      >
        {solution.facts ? <FactsStrip facts={solution.facts} /> : null}
      </PageHero>

      {/* Overview + the problem it solves */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <ScrollReveal>
              <Eyebrow>Overview</Eyebrow>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                {solution.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="border-l-2 border-brand-500 bg-sand-50 p-7 sm:p-8">
                <Eyebrow>The problem it solves</Eyebrow>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-navy-900">
                  {solution.problem.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {solution.problem.body}
                </p>
                <div className="mt-7">
                  <ButtonLink href="/contact" size="sm" withArrow>
                    Request a quote
                  </ButtonLink>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <HowItWorks steps={solution.howItWorks} />

      {solution.technologies ? (
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <SectionHeading
              eyebrow="Technology"
              title={solution.technologies.heading}
              className="mb-12"
            />
            <TechnologyAccordion items={solution.technologies.items} />
          </Container>
        </section>
      ) : null}

      {/* Benefits */}
      <section className="border-y border-sand-200 bg-sand-50 py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Key benefits"
            title="What you get from the system"
            className="mb-14"
          />
          <div
            className={cn(
              "grid gap-5",
              solution.benefits.length > 1 ? "lg:grid-cols-3" : "lg:grid-cols-2",
            )}
          >
            {solution.benefits.map((group, index) => (
              <ScrollReveal
                key={group.title}
                delay={index * 0.07}
                className="rounded-[4px] border border-sand-200 bg-white p-6 sm:p-7"
              >
                <h3 className="border-b border-sand-200 pb-4 text-base font-semibold tracking-tight text-navy-900">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy-800">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <ScrollReveal>
              <Eyebrow>Applications</Eyebrow>
              <h2 className="text-display-sm mt-6 text-navy-900">Where this system is used</h2>
              <ul className="mt-8 border-t border-sand-200">
                {solution.applications.map((application) => (
                  <li
                    key={application}
                    className="group flex items-center gap-4 border-b border-sand-200 py-4 text-base text-navy-800"
                  >
                    <span
                      aria-hidden
                      className="h-px w-5 bg-brand-400 transition-all duration-300 ease-[var(--ease-brand)] group-hover:w-8"
                    />
                    {application}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative aspect-4/3 overflow-hidden rounded-[4px] bg-sand-100">
                <Image
                  src={solution.detailImage ?? solution.image}
                  alt={solution.detailImageAlt ?? solution.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  quality={78}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <RelatedSolutions solutions={related} />

      <CTASection
        title={`Planning a ${solution.name.toLowerCase()}?`}
        description="Send us the site details and the load. We will confirm whether this is the right system and what it needs to be sized for."
        primaryLabel="Send an enquiry"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
