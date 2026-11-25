import { Hero } from "@/components/hero/hero";
import { Join } from "@/components/join/join";
import { Numbers } from "@/components/numbers/numbers";
import { Journey } from "@/components/journey/journey";
import { Answers } from "@/components/answers/answers";
import { Panel } from "@/components/panel/panel";
import { Make } from "@/components/make/make";
import { Notes } from "@/components/notes/notes";
import { Languages } from "@/components/languages/languages";
import { Accent } from "@/components/accent/accent";
import { Compare } from "@/components/compare/compare";
import { Calls } from "@/components/calls/calls";
import { Library } from "@/components/library/library";
import { Share } from "@/components/share/share";
import { Roles } from "@/components/roles/roles";
import { PricingTeaser } from "@/components/pricing-teaser/pricing-teaser";
import { Start } from "@/components/start/start";
import { Privacy } from "@/components/privacy/privacy";
import { Faq } from "@/components/faq/faq";
import { Download } from "@/components/download/download";
import { PageWave } from "@/components/page-wave/page-wave";

// The homepage, top to bottom: the demo, where it works (paste a link and MeetFly joins) and the numbers; why a copilot beats a
// note-taker; the whole call (before, during, after) with the call types as the "before" detail,
// answers, the floating panel, making docs / diagrams / slides mid-call, live translation and the accent voice as "during", notes, the library and where notes go as "after"; who it's built for and what it costs; then privacy,
// getting started, questions and download. The two pinned sections (journey, answers) are kept
// apart by the call types.
export default function HomePage() {
  return (
    <>
      {/* The sound wave that snakes down the whole page, behind everything. */}
      <PageWave from="demo" />
      <Hero />
      <Join />
      <Numbers />
      <Compare />
      <Journey />
      <Calls />
      <Answers />
      <Panel />
      <Make />
      <Languages />
      <Accent />
      <Notes />
      <Library />
      <Share />
      <Roles />
      <PricingTeaser />
      <Privacy />
      <Start />
      <Faq />
      <Download />
    </>
  );
}
