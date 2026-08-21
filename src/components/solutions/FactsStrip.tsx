import type { Solution } from "@/data/solutions";

export function FactsStrip({ facts }: { facts: NonNullable<Solution["facts"]> }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-[4px] border border-white/15 bg-white/10 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-navy-900/70 px-5 py-5 backdrop-blur-sm">
          <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-300 uppercase">
            {fact.label}
          </dt>
          <dd className="mt-2 text-sm font-semibold text-white">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
