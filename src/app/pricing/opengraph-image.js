import { ogContentType, ogImage, ogSize } from "@/lib/og";

// This page's social preview image (see lib/og.jsx).
export const alt = "MeetFly pricing";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "Pricing", top: "Every feature, on every plan.", mark: "7 days free." });
}
