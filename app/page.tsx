import { Hero } from "@/components/sections/hero";
import { SelectedWorkStats } from "@/components/sections/selected-work-stats";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <SelectedWorkStats />
      <FinalCta />
    </main>
  );
}
