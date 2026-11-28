import { notFound } from "next/navigation";
import { guides } from "@/content/guides";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { GuideArticle } from "@/components/guides/guide-article";

// /guides/<slug>: one guide, built ahead of time. Any other address under /guides is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

const find = (slug) => guides.find((g) => g.slug === slug);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = find(slug);
  if (!g) return {};
  const meta = pageMeta({ path: `/guides/${g.slug}`, title: g.metaTitle.length <= 50 ? `${g.metaTitle} · MeetFly` : g.metaTitle, description: g.description });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: g.published, modifiedTime: g.updated } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const g = find(slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  return (
    <>
      <JsonLd data={articleJsonLd({ path, title: g.title, description: g.description, published: g.published, updated: g.updated })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: g.title, path },
        ])}
      />
      <GuideArticle g={g} />
    </>
  );
}
