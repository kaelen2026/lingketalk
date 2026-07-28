import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "./site";

/**
 * Everything on the site is meant to be indexed, so this exists mainly to
 * advertise the sitemap — crawlers look here first.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
