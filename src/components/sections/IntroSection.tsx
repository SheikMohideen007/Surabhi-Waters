import Image from "next/image";
import { company, metrics } from "@/data/company";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function IntroSection() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="intro-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <ScrollReveal>
            <Eyebrow>Since {company.foundedYear}</Eyebrow>
            <h2
              id="intro-heading"
              className="text-display-sm sm:text-display mt-6 text-navy-900"
            >
              A water engineering company, not a{" "}
              <span className="font-serif text-brand-600 italic">catalogue</span>
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              <p>{company.description}</p>
              <p>{company.positioning}</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="outline" withArrow>
                About the company
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                What we deliver
              </ButtonLink>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-[4px] bg-sand-100">
              <Image
                src="/images/company/engineering-team.webp"
                alt="Engineers reviewing plant drawings on site beside stainless steel treatment tanks and pipework"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={80}
                className="object-cover"
              />
            </div>

            <div className="relative z-10 -mt-10 ml-4 max-w-sm border-l-2 border-brand-500 bg-white p-6 shadow-card sm:-mt-14 sm:ml-8 sm:p-7">
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-600 uppercase">
                Led by
              </p>
              <p className="mt-3 text-lg font-semibold text-navy-900">{company.founder.name}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {company.founder.role} — {company.founder.credential}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-sand-200 lg:mt-28 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <ScrollReveal
              key={metric.label}
              delay={index * 0.07}
              className="bg-white p-6 sm:p-8"
            >
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
  );
}
