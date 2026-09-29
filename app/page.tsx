import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <SelectedWork />
      <FinalCta />
    </main>
  );
}
