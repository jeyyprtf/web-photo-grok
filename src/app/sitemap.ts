import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/showcase", "/about", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: absoluteUrl(`/${locale}${page}`),
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
