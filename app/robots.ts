import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: ["AhrefsBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: [
      "https://malayalammovieshub.com/sitemap.xml",
      "https://malayalammovieshub.com/sitemap-movies.xml",
      "https://malayalammovieshub.com/sitemap-news.xml",
    ],
  }
}
