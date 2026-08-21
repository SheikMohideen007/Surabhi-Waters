import { company } from "@/data/company";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.surabhiwaters.com";

export const siteConfig = {
  name: company.name,
  shortName: company.shortName,
  url: siteUrl,
  /** Used as the default social share image. */
  ogImage: "/images/backgrounds/og-default.jpg",
  keywords: [
    "sewage treatment plant",
    "water treatment plant",
    "effluent treatment plant",
    "organic waste converter",
    "swimming pool water treatment",
    "wastewater recycling Bangalore",
    "STP MBR SBR",
  ],
};

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
