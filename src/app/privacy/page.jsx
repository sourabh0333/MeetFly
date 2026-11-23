import { PrivacyHero } from "@/components/privacy/privacy-hero";
import { Promises } from "@/components/privacy/promises";
import { Record } from "@/components/privacy/record";
import { Consent } from "@/components/privacy/consent";
import { Questions } from "@/components/privacy/questions";
import { PrivacyClose } from "@/components/privacy/privacy-close";
import { PageWave } from "@/components/page-wave/page-wave";

export const metadata = {
  title: "Privacy · MeetFly",
  description:
    "Where every part of your call goes with MeetFly: meetings stay on your computer; audio goes to the speech service and text to the AI service, only to do the work.",
};

// The Privacy page is built one section at a time. So far: the hero, the promises, what the server keeps, consent, questions, and the close.
export default function Page() {
  return (
    <>
      <PageWave from="privacy-top" lift={-24} />
      <PrivacyHero />
      <Promises />
      <Record />
      <Consent />
      <Questions />
      <PrivacyClose />
    </>
  );
}
