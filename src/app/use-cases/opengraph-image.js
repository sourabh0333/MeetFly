import { ogContentType, ogImage, ogSize } from "@/lib/og";

// This page's social preview image (see lib/og.jsx).
export const alt = "MeetFly use cases";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "Use cases", top: "Made for people", mark: "who talk for a living." });
}
