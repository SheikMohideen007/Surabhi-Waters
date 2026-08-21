import type { Solution } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks({ steps }: { steps: Solution["howItWorks"] }) {
  return (
    <section className="border-y border-sand-200 bg-sand-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="The treatment sequence"
          className="mb-14 lg:mb-16"
        />

        <ol className="grid gap-px overflow-hidden rounded-[4px] bg-sand-200 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal
              as="li"
              key={step.title}
              delay={index * 0.06}
              className="group relative flex flex-col bg-white p-6 sm:p-7"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100"
              />
              <span className="font-serif text-2xl text-brand-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-navy-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
