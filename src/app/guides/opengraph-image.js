import { ogContentType, ogImage, ogSize } from "@/lib/og";

// The Guides index's social preview image (see lib/og.jsx).
export const alt = "MeetFly guides";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "Guides", top: "Guides for people", mark: "who talk for a living." });
}
