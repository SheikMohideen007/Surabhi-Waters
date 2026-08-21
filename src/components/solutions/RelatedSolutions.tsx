import type { Solution } from "@/data/solutions";
import { SolutionCard } from "./SolutionCard";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function RelatedSolutions({ solutions }: { solutions: Solution[] }) {
  if (!solutions.length) return null;

  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Related solutions"
          title="Often specified alongside"
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {solutions.map((solution, index) => (
            <ScrollReveal key={solution.slug} delay={index * 0.06} className="h-full">
              <SolutionCard solution={solution} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
