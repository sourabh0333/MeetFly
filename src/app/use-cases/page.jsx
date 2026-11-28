import { UseCasesHero } from "@/components/use-cases/uc-hero";
import { UseCasesSetup } from "@/components/use-cases/uc-setup";
import { UseCasesTools } from "@/components/use-cases/uc-tools";
import { UseCasesAsk } from "@/components/use-cases/uc-ask";
import { UseCasesMore } from "@/components/use-cases/uc-more";
import { UseCasesPlans } from "@/components/use-cases/uc-plans";
import { UseCasesClose } from "@/components/use-cases/uc-close";
import { PageWave } from "@/components/page-wave/page-wave";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/use-cases",
  title: "Use cases: sales, support and interview practice · MeetFly",
  description:
    "How MeetFly helps on sales calls, support calls, founder pitches, hiring interviews, interview practice and calls in another language, with a plan for each.",
});

// The Use cases page is built one section at a time. So far: the hero, then how each role sets
// MeetFly up, then the tools each role connects it to,
// then the questions each role asks, more kinds of call, which plan fits each role, and the close.
export default function Page() {
  return (
    <>
      <PageWave from="use-cases-top" lift={-24} />
      <UseCasesHero />
      <UseCasesSetup />
      <UseCasesTools />
      <UseCasesAsk />
      <UseCasesMore />
      <UseCasesPlans />
      <UseCasesClose />
    </>
  );
}
