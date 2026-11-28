import { ogContentType, ogImage, ogSize } from "@/lib/og";

// This page's social preview image (see lib/og.jsx).
export const alt = "Download MeetFly for Mac and Windows";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "Download", top: "Get MeetFly", mark: "on your desktop." });
}
