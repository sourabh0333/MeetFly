import { ogContentType, ogImage, ogSize } from "@/lib/og";

// This page's social preview image (see lib/og.jsx).
export const alt = "MeetFly features";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "Features", top: "Everything MeetFly does,", mark: "from hello to follow-up." });
}
