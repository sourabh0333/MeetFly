import { notFound } from "next/navigation";
import { platforms } from "@/content/platforms";
import { JsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { PlatformPage } from "@/components/platform/platform-page";
import { PageWave } from "@/components/page-wave/page-wave";

// /works-with/zoom, /works-with/google-meet, /works-with/microsoft-teams: one page per meeting
// app (content/platforms.js), built ahead of time. Any other address under /works-with is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return platforms.map((p) => ({ platform: p.slug }));
}

const find = (slug) => platforms.find((p) => p.slug === slug);

export async function generateMetadata({ params }) {
  const { platform } = await params;
  const p = find(platform);
  if (!p) return {};
  return pageMeta({ path: `/works-with/${p.slug}`, title: p.meta.title, description: p.meta.description });
}

export default async function Page({ params }) {
  const { platform } = await params;
  const p = find(platform);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={faqJsonLd(p.faq)} />
      <PageWave from="platform-top" lift={-24} />
      <PlatformPage p={p} />
    </>
  );
}
