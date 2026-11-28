import { ogContentType, ogImage, ogSize } from "@/lib/og";

// This page's social preview image (see lib/og.jsx).
export const alt = "MeetFly privacy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "Privacy", top: "Your calls live", mark: "on your computer." });
}
