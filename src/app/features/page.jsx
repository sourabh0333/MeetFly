import { FeaturesHero } from "@/components/features/features-hero";
import { BeforeCall } from "@/components/features/before-call";
import { DuringCall } from "@/components/features/during-call";
import { AccentVoice } from "@/components/features/accent-voice";
import { AfterCall } from "@/components/features/after-call";
import { Everywhere } from "@/components/features/everywhere";
import { WorksWith } from "@/components/features/works-with";
import { Templates } from "@/components/features/templates";
import { Control } from "@/components/features/control";
import { FeaturesFaq } from "@/components/features/features-faq";
import { FeaturesEnd } from "@/components/features/features-end";
import { PageWave } from "@/components/page-wave/page-wave";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/features",
  title: "Features: live replies, translation and notes · MeetFly",
  description:
    "Everything MeetFly does on a call: live transcript and instant replies, read my screen, live translation, accent voice, call prep and practice, notes and search.",
});

// The Features page is built one section at a time. Hero, Before, During, Accent voice, After, Note templates, Works with, Everywhere, Your data, Questions, the close.
export default function Page() {
  return (
    <>
      <PageWave from="features-top" lift={-24} />
      <FeaturesHero />
      <BeforeCall />
      <DuringCall />
      <AccentVoice />
      <AfterCall />
      <Templates />
      <WorksWith />
      <Everywhere />
      <Control />
      <FeaturesFaq />
      <FeaturesEnd />
    </>
  );
}
