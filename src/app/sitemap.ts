import type { MetadataRoute } from "next";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Entry[] = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "monthly" },
    { url: absoluteUrl("/solutions"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/services"), priority: 0.8, changeFrequency: "yearly" },
    { url: absoluteUrl("/about"), priority: 0.7, changeFrequency: "yearly" },
    { url: absoluteUrl("/projects"), priority: 0.6, changeFrequency: "monthly" },
    { url: absoluteUrl("/contact"), priority: 0.8, changeFrequency: "yearly" },
    { url: absoluteUrl("/privacy"), priority: 0.2, changeFrequency: "yearly" },
    ...solutions.map<Entry>((solution) => ({
      url: absoluteUrl(`/solutions/${solution.slug}`),
      priority: 0.85,
      changeFrequency: "monthly",
    })),
  ];

  return routes.map((route) => ({ ...route, lastModified }));
}
