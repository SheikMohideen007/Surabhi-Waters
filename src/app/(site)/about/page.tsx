import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { WhySurabhi } from "@/components/sections/WhySurabhi";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin } from "@/components/ui/icons";
import { company, metrics, offices } from "@/data/company";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Water & wastewater engineering since 2005",
  description:
    "Surabhi Water Solutions has been a leading provider of sewage treatment, water and wastewater treatment and filtration systems since 2005. Founded by Mr. N. Mohan Babu, headquartered in Bangalore.",
  alternates: { canonical: "/about" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl("/about") },
  ],
};

/** Milestones limited to what the company states publicly. */
const timeline = [
  {
    marker: "2005",
    title: "Surabhi Water Solutions begins operating",
    body: "Established as a provider of sewage treatment plants, water and wastewater treatment and filtration systems and solutions.",
  },
  {
    marker: "Products",
    title: "Five product lines developed in-house",
    body: `${solutions.map((s) => s.name).join(", ")} — developed, designed and manufactured by the company.`,
  },
  {
    marker: "Technology",
    title: "Four sewage treatment processes",
    body: "Conventional aeration, sequential batch reactor, membrane bio reactor and fluidised bed reactor, with plants designed as per CPCB norms.",
  },
  {
    marker: "Reach",
    title: "Head office in Bangalore, four further offices",
    body: "Branch offices in Mumbai, Tirupur and Chennai, plus a presence in Sundsvall, Sweden.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Twenty years of making water{" "}
            <span className="font-serif text-brand-300 italic">usable again</span>
          </>
        }
        description={company.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Company story */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <ScrollReveal>
              <Eyebrow>Our approach</Eyebrow>
              <h2 className="text-display-sm mt-6 text-navy-900">
                Engineering that starts with your requirement
              </h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                <p>{company.positioning}</p>
                <p>
                  Our biggest asset is our dedicated team that studies the industry in question and
                  works with the customer to understand their needs, so as to come up with a
                  cost-effective solution. The team comprises highly skilled and dedicated
                  engineers, managers, consultants and technicians.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative aspect-4/3 overflow-hidden rounded-[4px] bg-sand-100">
                <Image
                  src="/images/company/engineering-team.webp"
                  alt="Engineers in hard hats and high-visibility vests reviewing drawings at a treatment facility"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-sand-200 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <ScrollReveal key={metric.label} delay={index * 0.06} className="bg-white p-6 sm:p-8">
                <dd className="text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl">
                  <AnimatedCounter value={metric.value} format={metric.format} />
                </dd>
                <dt className="mt-3 text-sm font-semibold text-navy-900">{metric.label}</dt>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{metric.detail}</p>
              </ScrollReveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Founder */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div aria-hidden className="grid-overlay absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <ScrollReveal>
              <Eyebrow tone="light">Leadership</Eyebrow>
              <p className="mt-6 font-serif text-3xl leading-tight text-white sm:text-4xl">
                {company.founder.name}
              </p>
              <p className="mt-4 text-sm text-brand-300">
                {company.founder.role} — {company.founder.credential}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg leading-relaxed text-white/75 sm:text-xl">
                Our team is led by {company.founder.name}, {company.founder.role.toLowerCase()} of
                the company, whose deep knowledge and vast experience in this field shapes how every
                system is engineered — from process selection through to the operating discipline
                handed over with the plant.
              </p>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                Alongside him, the company&rsquo;s engineers, managers, consultants and technicians
                deliver design, manufacture, installation, commissioning and long-term maintenance.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Company history"
            title="How the business is built"
            description="Only milestones the company states publicly are listed here."
            className="mb-14 lg:mb-20"
          />

          <ol className="relative border-l border-sand-200 pl-8 sm:pl-12">
            {timeline.map((item, index) => (
              <ScrollReveal
                as="li"
                key={item.marker}
                delay={index * 0.06}
                className="relative pb-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-brand-500 sm:-left-[calc(3rem+5px)]"
                />
                <p className="font-serif text-sm text-brand-600">{item.marker}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {item.body}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </Container>
      </section>

      <WhySurabhi />

      {/* Offices */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Locations"
            title="Where you can find us"
            className="mb-14"
          />
          <ul className="grid gap-px overflow-hidden rounded-[4px] bg-sand-200 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, index) => (
              <ScrollReveal
                as="li"
                key={office.id}
                delay={index * 0.05}
                className="bg-white p-6 sm:p-7"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-brand-500" />
                  <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                    {office.city}
                  </h3>
                </div>
                <p className="mt-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                  {office.type === "head" ? "Head office" : `Branch — ${office.country}`}
                </p>
                <address className="mt-4 text-sm leading-relaxed text-ink-muted not-italic">
                  {office.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </ScrollReveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
