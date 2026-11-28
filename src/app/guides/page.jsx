import { guidesPage } from "@/content/guides";
import { pageMeta } from "@/lib/seo";
import { GuidesIndex } from "@/components/guides/guides-index";
import { PageWave } from "@/components/page-wave/page-wave";

export const metadata = pageMeta({
  path: "/guides",
  title: "Guides: meeting notes and interview practice · MeetFly",
  description:
    "Practical guides for better calls: meeting notes without a bot, real-time help on sales calls, interview practice with AI, meetings in another language, accent voice and notes templates.",
});

// /guides: every guide (content/guides.js).
export default function Page() {
  return (
    <>
      <PageWave from="guides-top" lift={-24} />
      <GuidesIndex />
    </>
  );
}
