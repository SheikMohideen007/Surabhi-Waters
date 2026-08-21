import Image from "next/image";
import type { Project } from "@/data/projects";
import { getSolution } from "@/data/solutions";

export function ProjectCard({ project }: { project: Project }) {
  const solution = getSolution(project.solution);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-sand-200 bg-white transition-[transform,box-shadow] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-lift">
      {project.image ? (
        <div className="relative aspect-4/3 overflow-hidden bg-sand-100">
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.name}
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {solution ? (
          <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
            {solution.name}
          </p>
        ) : null}
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-navy-900">{project.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-sand-200 pt-5 text-sm sm:grid-cols-2">
          {project.location ? (
            <div>
              <dt className="text-xs text-ink-muted">Location</dt>
              <dd className="mt-0.5 font-medium text-navy-900">{project.location}</dd>
            </div>
          ) : null}
          {project.industry ? (
            <div>
              <dt className="text-xs text-ink-muted">Industry</dt>
              <dd className="mt-0.5 font-medium text-navy-900">{project.industry}</dd>
            </div>
          ) : null}
          {project.capacity ? (
            <div>
              <dt className="text-xs text-ink-muted">Capacity</dt>
              <dd className="mt-0.5 font-medium text-navy-900">{project.capacity}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </article>
  );
}
