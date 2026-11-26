import { FaqHero } from "@/components/faq-page/faq-hero";
import { FaqBrowse } from "@/components/faq-page/faq-browse";
import { FaqClose } from "@/components/faq-page/faq-close";
import { PageWave } from "@/components/page-wave/page-wave";

export const metadata = {
  title: "FAQ · MeetFly",
  description: "Answers to the questions people ask about MeetFly: bots, call apps, plans and pricing, reply speed, translation, notes, privacy, setup and devices.",
};

// The FAQ page is built one section at a time. So far: the hero, every answer by topic, and the close.
export default function Page() {
  return (
    <>
      <PageWave from="faq-top" lift={-24} />
      <FaqHero />
      <FaqBrowse />
      <FaqClose />
    </>
  );
}
