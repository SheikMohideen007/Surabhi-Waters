import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CustomerLogo } from "@/components/customers/CustomerLogo";
import { customers } from "@/data/customers";
import { hasPublishedProjects, projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clients & projects",
  description:
    "Builders, developers, hotel groups and infrastructure companies that have worked with Surabhi Water Solutions on water and wastewater treatment systems.",
  alternates: { canonical: "/projects" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients & projects"
        title="The companies that build with us"
        description="Our customer list is made up of residential developers, infrastructure companies, hotel groups and industrial operators across India."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      {hasPublishedProjects ? (
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <SectionHeading
              eyebrow="Selected projects"
              title="Plants we have delivered"
              className="mb-14"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ScrollReveal key={project.slug} delay={index * 0.06} className="h-full">
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Verified customer list. Individual project details are not published. */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our customers"
            title="Clients who have built with us"
            description="Project-level details such as capacity and scope are shared directly on request rather than published here."
            action={
              <ButtonLink href="/contact" variant="outline" withArrow>
                Request project references
              </ButtonLink>
            }
            className="mb-14"
          />

          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-sand-200 sm:grid-cols-3 lg:grid-cols-4">
            {customers.map((customer, index) => (
              <ScrollReveal
                as="li"
                key={customer.slug}
                delay={Math.min(index, 12) * 0.03}
                y={10}
                className="group flex min-h-[9.5rem] items-center justify-center bg-white px-4 py-5 transition-colors duration-500 hover:bg-sand-50 sm:min-h-44 sm:px-6 sm:py-7"
              >
                <CustomerLogo customer={customer} />
              </ScrollReveal>
            ))}
          </ul>
        </Container>
      </section>

      <IndustriesSection />

      <CTASection
        title="Want references for a project like yours?"
        description="Tell us the type of development and the system you are considering, and we will share the relevant references directly."
        primaryLabel="Request references"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
