import { FaqHero } from "@/components/faq-page/faq-hero";
import { FaqBrowse } from "@/components/faq-page/faq-browse";
import { FaqClose } from "@/components/faq-page/faq-close";
import { PageWave } from "@/components/page-wave/page-wave";
import { JsonLd, pageMeta, faqJsonLd } from "@/lib/seo";
import { faqs } from "@/content/faq";

export const metadata = pageMeta({
  path: "/faq",
  title: "FAQ: bots, pricing, privacy and setup · MeetFly",
  description:
    "Answers to what people ask about MeetFly: bots, call apps, plans and pricing, the free trial, translation, accent voice, notes, privacy, setup and devices.",
});

// The FAQ page is built one section at a time. So far: the hero, every answer by topic, and the close.
export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageWave from="faq-top" lift={-24} />
      <FaqHero />
      <FaqBrowse />
      <FaqClose />
    </>
  );
}
