import { cn } from "@/lib/utils";

type LogoProps = {
  /** `dark` renders for light backgrounds, `light` for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  showWordmark?: boolean;
};

export function LogoMark({ className, tone = "dark" }: Omit<LogoProps, "showWordmark">) {
  return (
    <svg
      viewBox="0 0 32 40"
      className={cn("h-9 w-auto", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d="M16 2.4c6.5 7 9.7 13 9.7 18.1a9.7 9.7 0 1 1-19.4 0c0-5.1 3.2-11.1 9.7-18.1Z"
        stroke={tone === "light" ? "#ffffff" : "var(--color-navy-900)"}
        strokeWidth="2.1"
      />
      <path
        d="M9.2 21.6c1.9 1.7 3.7 1.7 5.6 0s3.7-1.7 5.6 0 3.7 1.7 5.6 0"
        stroke="var(--color-brand-500)"
        strokeWidth="2"
      />
      <path
        d="M10.4 27.6c1.6 1.5 3.3 1.5 4.9 0s3.3-1.5 4.9 0"
        stroke={tone === "light" ? "var(--color-brand-300)" : "var(--color-brand-400)"}
        strokeWidth="2"
      />
    </svg>
  );
}

export function Logo({ tone = "dark", className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="h-9 w-auto sm:h-10" />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[1.0625rem] font-bold tracking-[0.14em] sm:text-lg",
              tone === "light" ? "text-white" : "text-navy-900",
            )}
          >
            SURABHI
          </span>
          <span
            className={cn(
              "mt-1 text-[0.6rem] font-semibold tracking-[0.22em] uppercase sm:text-[0.65rem]",
              tone === "light" ? "text-brand-300" : "text-brand-600",
            )}
          >
            Water Solutions
          </span>
        </span>
      ) : null}
    </span>
  );
}
