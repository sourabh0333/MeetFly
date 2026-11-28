import { platforms } from "@/content/platforms";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

// Each "works with" page's social preview image (see lib/og.jsx).
export const alt = "MeetFly, the AI meeting assistant for your meeting app";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return platforms.map((p) => ({ platform: p.slug }));
}

export default async function Image({ params }) {
  const { platform } = await params;
  const p = platforms.find((x) => x.slug === platform) || platforms[0];
  return ogImage({ tag: `Works with ${p.name}`, top: p.og.top, mark: p.og.mark });
}
