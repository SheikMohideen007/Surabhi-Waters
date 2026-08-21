import { strengths } from "@/data/company";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function WhySurabhi() {
  return (
    <section className="border-y border-sand-200 bg-sand-50 py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ScrollReveal>
              <Eyebrow>Why Surabhi</Eyebrow>
              <h2 className="text-display-sm sm:text-display mt-6 text-navy-900">
                Reasons customers keep coming back
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-muted">
                Two decades of designing, manufacturing and maintaining treatment systems — with
                the same team answering the phone after handover.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" withArrow>
                  Discuss your requirement
                </ButtonLink>
              </div>
            </ScrollReveal>
          </div>

          <ul className="border-t border-sand-200">
            {strengths.map((strength, index) => (
              <ScrollReveal
                as="li"
                key={strength.title}
                delay={index * 0.05}
                className="group border-b border-sand-200"
              >
                <div className="relative flex gap-5 py-7 transition-[padding] duration-500 ease-[var(--ease-brand)] sm:gap-8 lg:group-hover:pl-4">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 h-px w-0 bg-brand-500 transition-all duration-500 ease-[var(--ease-brand)] group-hover:w-full"
                  />
                  <span className="font-serif text-base text-brand-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-navy-900 sm:text-xl">
                      {strength.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {strength.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
