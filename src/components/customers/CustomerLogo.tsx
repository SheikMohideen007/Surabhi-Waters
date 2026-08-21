import Image from "next/image";
import type { Customer } from "@/data/customers";
import { cn } from "@/lib/utils";

type CustomerLogoProps = {
  customer: Customer;
  /** Larger mark for the projects grid; compact for the homepage marquee. */
  size?: "grid" | "marquee";
  className?: string;
};

export function CustomerLogo({ customer, size = "grid", className }: CustomerLogoProps) {
  const grid = size === "grid";

  return (
    <figure className={cn("flex h-full min-w-0 flex-col", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-white",
          grid ? "h-20 sm:h-24" : "h-12 w-36 sm:h-14 sm:w-40",
        )}
      >
        <Image
          src={customer.logo}
          alt=""
          width={192}
          height={73}
          className="h-full w-full object-contain"
        />
      </div>
      <figcaption
        className={cn(
          "mt-3 text-center font-semibold tracking-tight text-navy-900",
          grid ? "text-xs leading-snug sm:text-sm" : "mt-2 text-[0.7rem] text-navy-900/70 sm:text-xs",
        )}
      >
        {customer.name}
      </figcaption>
    </figure>
  );
}
