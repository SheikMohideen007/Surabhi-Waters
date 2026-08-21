import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, MapPin, Phone } from "@/components/ui/icons";
import { company, headOffice, offices } from "@/data/company";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Talk to our engineers",
  description: `Contact Surabhi Water Solutions in Bangalore, Mumbai, Chennai, Tirupur and Sweden. Call ${company.phones[1].value} or email ${company.email}.`,
  alternates: { canonical: "/contact" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Surabhi Water Solutions",
  url: absoluteUrl("/contact"),
  about: { "@id": absoluteUrl("/#organization") },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(headOffice.mapsQuery)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the people who design the plant"
        description="Send your requirement and our engineers will come back with the process that fits it. For urgent site issues, call us directly."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        size="compact"
      />

      {/* Direct contact strip */}
      <section className="border-b border-sand-200 bg-white">
        <Container>
          <ul className="grid gap-px bg-sand-200 sm:grid-cols-3">
            <li className="bg-white px-1 py-8 sm:px-6">
              <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                Call us
              </p>
              <div className="mt-4 space-y-2">
                {company.phones.map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="flex items-center gap-3 text-base font-semibold text-navy-900 transition-colors hover:text-brand-600"
                  >
                    <Phone className="size-4 text-brand-500" />
                    {phone.value}
                  </a>
                ))}
              </div>
            </li>
            <li className="bg-white px-1 py-8 sm:px-6">
              <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                Email us
              </p>
              <a
                href={`mailto:${company.email}`}
                className="mt-4 flex items-center gap-3 text-base font-semibold break-all text-navy-900 transition-colors hover:text-brand-600"
              >
                <Mail className="size-4 shrink-0 text-brand-500" />
                {company.email}
              </a>
            </li>
            <li className="bg-white px-1 py-8 sm:px-6">
              <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                Head office
              </p>
              <address className="mt-4 flex gap-3 text-sm leading-relaxed text-ink-muted not-italic">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>
                  {headOffice.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </address>
            </li>
          </ul>
        </Container>
      </section>

      {/* Form + map */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <ScrollReveal>
              <Eyebrow>Send an enquiry</Eyebrow>
              <h2 className="text-display-sm mt-6 text-navy-900">
                Tell us about your requirement
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
                Load, water quality, site type and your discharge or reuse target are the details
                that let us respond usefully the first time.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="lg:pt-16">
              <div className="overflow-hidden rounded-[4px] border border-sand-200">
                <iframe
                  src={mapSrc}
                  title="Map showing the Surabhi Water Solutions head office in Bangalore"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0 sm:h-80"
                />
              </div>

              <div className="mt-8 rounded-[4px] border border-sand-200 bg-sand-50 p-6 sm:p-7">
                <h3 className="text-base font-semibold text-navy-900">
                  What happens after you send this
                </h3>
                <ol className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
                  <li className="flex gap-3">
                    <span className="font-serif text-brand-600">01</span>
                    An engineer reviews your requirement, not a sales script.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-serif text-brand-600">02</span>
                    We come back with the process options that genuinely apply.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-serif text-brand-600">03</span>
                    If it helps, we visit the site before proposing anything.
                  </li>
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* All offices */}
      <section className="border-t border-sand-200 bg-sand-50 py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Our offices" title="Five locations" className="mb-14" />

          <ul className="grid gap-px overflow-hidden rounded-[4px] bg-sand-200 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, index) => (
              <ScrollReveal
                as="li"
                key={office.id}
                delay={index * 0.05}
                className="flex flex-col bg-white p-6 sm:p-7"
              >
                <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                  {office.city}
                </h3>
                <p className="mt-1.5 text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
                  {office.type === "head" ? "Head office" : `Branch — ${office.country}`}
                </p>
                <address className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted not-italic">
                  {office.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                {office.contacts?.length ? (
                  <ul className="mt-5 space-y-2 border-t border-sand-200 pt-4">
                    {office.contacts.map((contact) => (
                      <li key={`${contact.name}-${contact.phone ?? contact.email}`} className="text-sm">
                        <span className="text-ink-muted">{contact.name}: </span>
                        {contact.tel ? (
                          <a
                            href={`tel:${contact.tel}`}
                            className="font-medium text-navy-900 transition-colors hover:text-brand-600"
                          >
                            {contact.phone}
                          </a>
                        ) : contact.email ? (
                          <a
                            href={`mailto:${contact.email}`}
                            className="font-medium break-all text-navy-900 transition-colors hover:text-brand-600"
                          >
                            {contact.email}
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </ScrollReveal>
            ))}
          </ul>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
