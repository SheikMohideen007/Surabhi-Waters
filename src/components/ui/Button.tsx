import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./icons";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "light" | "ghostLight";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-800",
  accent: "bg-brand-500 text-white hover:bg-brand-600",
  outline:
    "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/35 hover:bg-sand-50",
  light: "bg-white text-navy-900 hover:bg-brand-50",
  ghostLight: "border border-white/25 text-white hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-[0.9375rem]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a right arrow that slides forward on hover. */
  withArrow?: boolean;
  fullWidth?: boolean;
};

const baseClass =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-[3px] font-semibold tracking-tight transition-colors duration-300 ease-[var(--ease-brand)] disabled:cursor-not-allowed disabled:opacity-60";

function content(children: ReactNode, withArrow?: boolean) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover/btn:translate-x-1" />
      ) : null}
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow,
  fullWidth,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(baseClass, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {content(children, withArrow)}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  withArrow,
  fullWidth,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(baseClass, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {content(children, withArrow)}
    </Link>
  );
}
