import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FlowLines } from "@/components/ui/FlowLines";
import { solutions } from "@/data/solutions";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950 pt-32 pb-20 text-white">
      <div aria-hidden className="grid-overlay absolute inset-0" />
      <FlowLines className="opacity-40" />

      <Container className="relative">
        <p className="eyebrow text-brand-300">
          <span aria-hidden className="h-px w-8 bg-brand-300/60" />
          Error 404
        </p>
        <h1 className="text-display-sm sm:text-display mt-6 max-w-2xl text-white">
          That page has been filtered out
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
          The page you were looking for doesn&rsquo;t exist. Here is where most people are headed.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="light" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghostLight">
            Contact us
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-3 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <Link
                href={`/solutions/${solution.slug}`}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {solution.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
