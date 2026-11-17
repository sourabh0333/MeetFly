import { FeaturesHero } from "@/components/features/features-hero";
import { BeforeCall } from "@/components/features/before-call";
import { DuringCall } from "@/components/features/during-call";
import { PageWave } from "@/components/page-wave/page-wave";

export const metadata = {
  title: "Features · MeetFly",
  description:
    "Everything MeetFly does: live transcript and instant replies, answer styles, read my screen, live translation, call prep and practice, structured notes, recording and search across every call.",
};

// The Features page is built one section at a time. So far: the hero, Before the call, During the call.
export default function Page() {
  return (
    <>
      <PageWave from="features-top" lift={-24} />
      <FeaturesHero />
      <BeforeCall />
      <DuringCall />
    </>
  );
}
