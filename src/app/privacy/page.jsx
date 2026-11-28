import { PrivacyHero } from "@/components/privacy/privacy-hero";
import { Promises } from "@/components/privacy/promises";
import { Record } from "@/components/privacy/record";
import { Processors } from "@/components/privacy/processors";
import { Rights } from "@/components/privacy/rights";
import { Consent } from "@/components/privacy/consent";
import { Questions } from "@/components/privacy/questions";
import { PrivacyClose } from "@/components/privacy/privacy-close";
import { PageWave } from "@/components/page-wave/page-wave";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/privacy",
  title: "Privacy: your meetings stay on your computer · MeetFly",
  description:
    "Where every part of your call goes with MeetFly: meetings stay on your computer, no bot joins, and audio and text go to the speech and AI services only to do the work.",
});

// The Privacy page is built one section at a time. So far: the hero, the promises, what the server keeps, who handles your data, consent, your rights, questions, and the close.
export default function Page() {
  return (
    <>
      <PageWave from="privacy-top" lift={-24} />
      <PrivacyHero />
      <Promises />
      <Record />
      <Processors />
      <Consent />
      <Rights />
      <Questions />
      <PrivacyClose />
    </>
  );
}
