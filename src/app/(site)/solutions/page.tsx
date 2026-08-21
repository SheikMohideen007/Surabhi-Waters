import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions — STP, WTP, ETP, Organic Waste & Pool Systems",
  description:
    "Explore Surabhi Water Solutions' product range: sewage treatment plants, water treatment plants, organic waste converters, effluent treatment plants and swimming pool systems.",
  alternates: { canonical: "/solutions" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Solutions", item: absoluteUrl("/solutions") },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product range"
        title="Treatment systems engineered around your water"
        description="Five product lines covering sewage, drinking and process water, industrial effluent, organic waste and swimming pools — designed, manufactured and maintained in-house."
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        image={{
          src: "/images/backgrounds/hero-treatment-plant.webp",
          alt: "Clarifier tank at a water treatment plant",
        }}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <ScrollReveal
                key={solution.slug}
                delay={index * 0.06}
                className={index === 0 ? "sm:col-span-2" : "h-full"}
              >
                <SolutionCard
                  solution={solution}
                  variant={index === 0 ? "featured" : "default"}
                  priority={index === 0}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Not sure which process fits your site?"
        description="Send us the water quality, the daily load and what you need the treated water for. We will tell you which of these systems applies — and which does not."
        primaryLabel="Discuss your requirement"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
