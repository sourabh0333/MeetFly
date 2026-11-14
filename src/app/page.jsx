import { Hero } from "@/components/hero/hero";
import { Platforms } from "@/components/platforms/platforms";
import { Journey } from "@/components/journey/journey";
import { PageWave } from "@/components/page-wave/page-wave";

export default function HomePage() {
  return (
    <>
      {/* The sound wave that snakes down the whole page, behind everything. */}
      <PageWave from="demo" />
      <Hero />
      <Platforms />
      <Journey />
    </>
  );
}
