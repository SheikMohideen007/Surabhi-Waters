import { solutions } from "@/data/solutions";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SolutionsShowcase() {
  const [lead, ...rest] = solutions;

  return (
    <section className="border-y border-sand-200 bg-sand-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our solutions"
          title="Five product lines, one engineering discipline"
          description="Each system is designed for the water that actually arrives on your site — its load, its impurities and what you need to do with it next."
          action={
            <ButtonLink href="/solutions" variant="outline" withArrow>
              All solutions
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          <ScrollReveal className="sm:col-span-2">
            <SolutionCard solution={lead} variant="featured" priority />
          </ScrollReveal>

          {rest.map((solution, index) => (
            <ScrollReveal key={solution.slug} delay={0.06 * (index + 1)} className="h-full">
              <SolutionCard solution={solution} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
