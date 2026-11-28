import { ogContentType, ogImage, ogSize } from "@/lib/og";

// This page's social preview image (see lib/og.jsx).
export const alt = "MeetFly, the AI copilot for every call";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ tag: "AI meeting copilot", top: "Live answers and notes,", mark: "no bot in the call." });
}
