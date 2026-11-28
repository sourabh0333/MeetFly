import { guides } from "@/content/guides";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

// Each guide's social preview image: its topic as the pill and its title (see lib/og.jsx).
export const alt = "A MeetFly guide";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug) || guides[0];
  return ogImage({ tag: g.tag, top: "", mark: g.title, small: true });
}
