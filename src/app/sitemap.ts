import type { MetadataRoute } from "next";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  const formatterPages = FORMATTERS.map((formatter) => ({
    url: `${SITE_URL}/${formatter.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...base, ...formatterPages];
}
