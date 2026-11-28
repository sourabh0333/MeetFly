import { siteConfig } from "@/config/site";

// /robots.txt. Until the real public address is set (siteConfig.isLive), every crawler is asked to
// stay out, matching the "noindex" on every page. Once it's set, everything may be crawled and the
// sitemap is listed.
export default function robots() {
  if (!siteConfig.isLive) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
