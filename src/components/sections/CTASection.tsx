import Image from "next/image";
import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mail, Phone } from "@/components/ui/icons";

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
};

export function CTASection({
  title = "Tell us what your site needs to do with its water",
  description = "Share the load, the site and the discharge or reuse target. Our engineers will come back with the process that fits — not a product number.",
  primaryLabel = "Talk to an expert",
}: CTASectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <Image
        src="/images/backgrounds/dark-water.webp"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="-z-20 object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/70"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <ScrollReveal>
            <h2 className="text-display-sm sm:text-display max-w-2xl text-white">{title}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/contact" size="lg" variant="light" withArrow>
                {primaryLabel}
              </ButtonLink>
              <ButtonLink href="/solutions" size="lg" variant="ghostLight">
                Explore solutions
              </ButtonLink>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:pb-2">
            <div className="border-t border-white/15 pt-8">
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-300 uppercase">
                Or reach us directly
              </p>
              <ul className="mt-6 space-y-4">
                {company.phones.slice(1).map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="group flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-brand-300"
                    >
                      <Phone className="size-4 text-brand-400" />
                      {phone.value}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 text-sm font-medium break-all text-white/75 transition-colors hover:text-white"
                  >
                    <Mail className="size-4 shrink-0 text-brand-400" />
                    {company.email}
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
