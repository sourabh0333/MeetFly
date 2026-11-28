import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingCompare } from "@/components/pricing/pricing-compare";
import { PricingBilling } from "@/components/pricing/pricing-billing";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { PricingClose } from "@/components/pricing/pricing-close";
import { PageWave } from "@/components/page-wave/page-wave";
import { JsonLd, pageMeta, faqJsonLd } from "@/lib/seo";
import { pricingFaq } from "@/content/pricing";

export const metadata = pageMeta({
  path: "/pricing",
  title: "Pricing: free plan and 7-day free trial · MeetFly",
  description:
    "MeetFly's plans: Free, Pro, Pro + Voice, Team and the Interview Pass. Every feature on every plan; plans differ in monthly hours. 7 days free, no card needed.",
});

// The Pricing page is built one section at a time. So far: the hero, Compare plans, How billing works, Quick answers, the close.
export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaq.items)} />
      <PageWave from="pricing-top" lift={-24} />
      <PricingHero />
      <PricingCompare />
      <PricingBilling />
      <PricingFaq />
      <PricingClose />
    </>
  );
}
