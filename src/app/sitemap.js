import { siteConfig } from "@/config/site";
import { platforms } from "@/content/platforms";
import { guides } from "@/content/guides";

// /sitemap.xml: every page, for search engines. Add new pages here as they're built.
const PAGES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/features", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/download", priority: 0.9, changeFrequency: "monthly" },
  { path: "/use-cases", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.6, changeFrequency: "yearly" },
  // The "works with" pages, one per meeting app (content/platforms.js).
  ...platforms.map((p) => ({ path: `/works-with/${p.slug}`, priority: 0.8, changeFrequency: "monthly" })),
  // The guides (content/guides.js).
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.6, changeFrequency: "monthly" })),
];

export default function sitemap() {
  const lastModified = new Date();
  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
