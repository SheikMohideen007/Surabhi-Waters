import Link from "next/link";
import { company, offices } from "@/data/company";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Mail, MapPin, Phone } from "@/components/ui/icons";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/projects", label: "Clients & projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-300 uppercase">
      {children}
    </h2>
  );
}

const linkClass =
  "text-sm text-white/65 transition-colors duration-300 hover:text-white focus-visible:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="grid-overlay absolute inset-0 opacity-60" />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-6 text-sm leading-relaxed text-white/65">
              Sewage treatment, water and wastewater treatment and filtration systems — designed,
              manufactured and maintained by our own engineering team since {company.foundedYear}.
            </p>
            <p className="mt-5 font-serif text-lg text-brand-300 italic">{company.tagline}</p>
          </div>

          <div>
            <ColumnHeading>Solutions</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link href={`/solutions/${solution.slug}`} className={linkClass}>
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Company</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-[0.6875rem] font-semibold tracking-[0.18em] text-brand-300 uppercase">
              Services
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link href="/services" className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Head office</ColumnHeading>
            <address className="mt-5 flex flex-col gap-4 text-sm text-white/65 not-italic">
              <span className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span className="leading-relaxed">
                  {offices[0].address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
              {company.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-brand-400" />
                  {phone.value}
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-brand-400" />
                {company.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <ColumnHeading>Offices</ColumnHeading>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
            {offices.map((office) => (
              <li key={office.id} className="text-sm">
                <span className="font-semibold text-white">{office.city}</span>
                <span className="mt-1 block text-xs text-white/50">
                  {office.type === "head" ? "Head office" : office.country}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Enquiries
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/45">
          Website developed by Sheik Mohideen M ·{" "}
          <a
            href="mailto:shemo.thedeveloper@gmail.com"
            className="text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
          >
            shemo.thedeveloper@gmail.com
          </a>
        </p>
      </Container>
    </footer>
  );
}
