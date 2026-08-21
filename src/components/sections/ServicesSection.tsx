import Image from "next/image";
import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ServicesSectionProps = {
  /** `compact` hides the deliverable lists — used on the homepage. */
  variant?: "full" | "compact";
  className?: string;
  withHeading?: boolean;
};

export function ServicesSection({
  variant = "compact",
  className,
  withHeading = true,
}: ServicesSectionProps) {
  const compact = variant === "compact";

  return (
    <section
      className={cn("border-y border-sand-200 bg-sand-50 py-20 lg:py-28", className)}
    >
      <Container>
        {!withHeading ? <h2 className="sr-only">Services</h2> : null}
        {withHeading ? (
          <SectionHeading
            eyebrow="Our services"
            title="Everything around the plant, not just the plant"
            description="Process know-how through to operation and maintenance — the scope a treatment system needs to keep performing for its whole life."
            action={
              compact ? (
                <ButtonLink href="/services" variant="outline" withArrow>
                  All services
                </ButtonLink>
              ) : undefined
            }
            className="mb-14 lg:mb-16"
          />
        ) : null}

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal
              as="li"
              key={service.slug}
              delay={index * 0.05}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[4px] border border-sand-200 bg-white",
                "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)]",
                "hover:-translate-y-1 hover:border-navy-900/15 hover:shadow-card",
                index === services.length - 1 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-sand-100">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  quality={75}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100"
                />
                <span className="absolute top-4 left-4 rounded-[2px] bg-navy-950/75 px-2.5 py-1 font-serif text-xs text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-navy-900">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.body}
                </p>

                {!compact ? (
                  <ul className="mt-6 space-y-2.5 border-t border-sand-200 pt-5">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm text-navy-800">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
