import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./site";

/**
 * One route today. The value is small at this size — it earns its keep once
 * there is more than one page, and robots.txt already points here.
 *
 * No `lastModified`: it would be stamped at build time, so every deploy would
 * claim the content changed. An honest date needs a real content source.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_ORIGIN,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
