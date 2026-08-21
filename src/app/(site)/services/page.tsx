import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Engineering, installation, consultancy and O&M",
  description:
    "Process know-how, design and detail engineering, supply, construction and installation, RO on rentals, EIA / PCB / BWSSB consultancy, after-sales service and operation & maintenance.",
  alternates: { canonical: "/services" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      ],
    },
    {
      "@type": "ItemList",
      name: "Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.body,
          provider: { "@id": absoluteUrl("/#organization") },
        },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Responsibility from first drawing to long-term operation"
        description="A treatment plant is not a purchase, it is a process you have to live with. These are the services that keep it performing."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={{
          src: "/images/solutions/water-treatment-plant.webp",
          alt: "Packaged water treatment plant with pressure filter vessels and membrane racks",
        }}
      />

      <ServicesSection variant="full" withHeading={false} className="border-t-0" />

      <ProcessTimeline />

      <CTASection
        title="Need engineering, consultancy or an O&M contract?"
        description="Tell us where you are in the project — early design, tender stage or an existing plant that is underperforming."
        primaryLabel="Talk to an expert"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
