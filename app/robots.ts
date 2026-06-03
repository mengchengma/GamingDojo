import type { MetadataRoute } from "next";

const SITE_URL = "https://gamingdojo.co";

/**
 * Next.js auto-generates /robots.txt from this file at build time.
 * Allows all crawlers, points them at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block Next.js internals + private folders if any get added later
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
