import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${company.name} handles the information you send through this website.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "What we collect",
    body: "When you submit the enquiry form we collect the details you enter: your name, company, email address, phone number, site location, the requirement you select and your message. We do not ask for any other personal information.",
  },
  {
    heading: "Why we collect it",
    body: "We use those details for one purpose — to understand and respond to your enquiry about our products and services. We do not sell or rent your information.",
  },
  {
    heading: "How long we keep it",
    body: "Enquiries are retained for as long as needed to respond to you and to maintain a record of the discussion. You can ask us to delete your enquiry at any time.",
  },
  {
    heading: "Third-party services",
    body: "This site embeds a Google Maps frame on the contact page so you can locate our head office. Loading that map involves Google, and their own terms and privacy practices apply to it.",
  },
  {
    heading: "Your choices",
    body: `To ask what we hold, to correct it, or to have it removed, email ${company.email} and we will act on the request.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="A short, plain statement of what this website collects and what we do with it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
        size="compact"
      />

      <section className="bg-white py-16 lg:py-24">
        <Container width="narrow">
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">{section.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-16 border-t border-sand-200 pt-8 text-sm text-ink-muted">
            Questions about this policy can be sent to{" "}
            <a
              href={`mailto:${company.email}`}
              className="font-semibold text-navy-900 underline decoration-brand-500 underline-offset-4"
            >
              {company.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
