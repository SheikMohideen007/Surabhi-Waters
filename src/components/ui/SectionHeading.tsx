import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  /** Rendered to the right of the heading on large screens. */
  action?: ReactNode;
  className?: string;
  as?: "h2" | "h1" | "h3";
};

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "light" ? "text-brand-300" : "text-brand-600",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-6", tone === "light" ? "bg-brand-300/60" : "bg-brand-500/50")}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  action,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center",
        className,
      )}
    >
      <ScrollReveal className={cn("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <Tag
          className={cn(
            "text-display-sm sm:text-display mt-5",
            tone === "light" ? "text-white" : "text-navy-900",
          )}
        >
          {title}
        </Tag>
        {description ? (
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              tone === "light" ? "text-white/70" : "text-ink-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </ScrollReveal>
      {action ? (
        <ScrollReveal delay={0.1} className="shrink-0">
          {action}
        </ScrollReveal>
      ) : null}
    </div>
  );
}
