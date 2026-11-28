import { DownloadHero } from "@/components/download-page/download-hero";
import { DownloadSetup } from "@/components/download-page/download-setup";
import { DownloadClose } from "@/components/download-page/download-close";
import { PageWave } from "@/components/page-wave/page-wave";
import { JsonLd, pageMeta, appJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/download",
  title: "Download MeetFly for Mac and Windows",
  description:
    "Download MeetFly for Mac (Apple silicon and Intel) or Windows (x64 and ARM64): the AI copilot that hears your calls and helps from the first word. 7 days free.",
});

// The Download page is built one section at a time. Hero, setup, then the close.
export default function Page() {
  return (
    <>
      <JsonLd data={appJsonLd} />
      <PageWave from="download-top" lift={-24} />
      <DownloadHero />
      <DownloadSetup />
      <DownloadClose />
    </>
  );
}
