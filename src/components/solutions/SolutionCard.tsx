import Image from "next/image";
import Link from "next/link";
import type { Solution } from "@/data/solutions";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type SolutionCardProps = {
  solution: Solution;
  /** `featured` renders a wide two-column card for the lead solution. */
  variant?: "default" | "featured";
  priority?: boolean;
};

export function SolutionCard({
  solution,
  variant = "default",
  priority = false,
}: SolutionCardProps) {
  const featured = variant === "featured";

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-sand-200 bg-white",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)]",
        "hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-lift focus-visible:-translate-y-1",
        featured && "lg:flex-row",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-sand-100",
          featured ? "aspect-16/10 lg:aspect-auto lg:w-1/2" : "aspect-4/3",
        )}
      >
        <Image
          src={solution.image}
          alt={solution.imageAlt}
          fill
          priority={priority}
          sizes={featured ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          quality={78}
          className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100"
        />
        <span className="absolute top-4 left-4 rounded-[2px] bg-navy-950/75 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          {solution.shortName}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        <h3
          className={cn(
            "font-semibold tracking-tight text-navy-900",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {solution.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-brand-600">{solution.tagline}</p>
        <p
          className={cn(
            "mt-4 flex-1 text-sm leading-relaxed text-ink-muted",
            featured && "sm:text-base",
          )}
        >
          {solution.summary}
        </p>

        {featured ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {solution.technologies?.items.map((tech) => (
              <li
                key={tech.name}
                className="rounded-[2px] border border-sand-200 bg-sand-50 px-2.5 py-1 text-xs font-medium text-navy-800"
              >
                {tech.abbr ?? tech.name}
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
          Explore solution
          <ArrowRight className="size-4 text-brand-600 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
