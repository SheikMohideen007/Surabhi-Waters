import { customers, type Customer } from "@/data/customers";
import { socialProofNote } from "@/data/company";
import { CustomerLogo } from "@/components/customers/CustomerLogo";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

function MarqueeRow({ items, reverse = false }: { items: Customer[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden" aria-hidden>
      <div className={`marquee-track flex shrink-0 items-stretch gap-8 pr-8 sm:gap-12 sm:pr-12 ${reverse ? "is-reverse" : ""}`}>
        {[...items, ...items].map((customer, index) => (
          <CustomerLogo
            key={`${customer.slug}-${index}`}
            customer={customer}
            size="marquee"
            className="w-36 shrink-0 sm:w-40"
          />
        ))}
      </div>
    </div>
  );
}

export function CustomersSection() {
  const half = Math.ceil(customers.length / 2);
  const rowOne = customers.slice(0, half);
  const rowTwo = customers.slice(half);

  return (
    <section className="overflow-hidden bg-white py-20 lg:py-24">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <Eyebrow>Our customers</Eyebrow>
          <h2 className="text-display-sm sm:text-display mt-6 text-navy-900">
            Trusted by builders, developers and hotel groups
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">{socialProofNote}</p>
        </ScrollReveal>
      </Container>

      <ScrollReveal className="relative mt-12 flex flex-col gap-8 lg:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32"
        />
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />

        <ul className="sr-only">
          {customers.map((customer) => (
            <li key={customer.slug}>{customer.name}</li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
