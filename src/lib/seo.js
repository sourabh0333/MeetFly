import { siteConfig } from "@/config/site";
import { pass, plans } from "@/content/pricing";

// Page metadata in one shape for every page: the title and description Google shows, the page's
// one official address (canonical), and what a shared link shows on LinkedIn, X, WhatsApp or
// Slack. Next.js merges `openGraph` shallowly, so each page sets its own full block here.
export function pageMeta({ path, title, description }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Structured data (JSON-LD) as a script tag, as the Next.js guide recommends. `<` is escaped so a
// string can never close the script tag.
export function JsonLd({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

const abs = (path) => `${siteConfig.url}${path}`;

// Who publishes the site, and the site itself. On every page (in the root layout).
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": abs("/#organization"),
      name: siteConfig.name,
      url: abs("/"),
      logo: abs("/apple-icon.png"),
    },
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      name: siteConfig.name,
      url: abs("/"),
      publisher: { "@id": abs("/#organization") },
    },
  ],
};

// The app, with its real plans and prices (from content/pricing.js). No ratings or reviews: we
// have none, and they're never invented.
export const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "macOS 12 or later, Windows 10 or later",
  description: siteConfig.description,
  url: abs("/"),
  downloadUrl: abs("/download"),
  publisher: { "@id": abs("/#organization") },
  offers: [...plans, pass].map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: String(p.usd),
    priceCurrency: "USD",
    url: abs("/pricing"),
  })),
};

// FAQ questions and answers as structured data. Answers may carry **bold** marks (pricing FAQ);
// they're removed here.
export function faqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a.replace(/\*\*/g, "") },
    })),
  };
}

// A guide as an Article, published by MeetFly, with its preview image and dates.
export function articleJsonLd({ path, title, description, published, updated }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    dateModified: updated,
    mainEntityOfPage: abs(path),
    image: abs(`${path}/opengraph-image`),
    author: { "@id": abs("/#organization") },
    publisher: { "@id": abs("/#organization") },
  };
}

// Where a page sits: Home › Guides › This guide.
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}
