import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { InsightsFilter } from "@/components/sections/insights-filter";
import { getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes from the studio on AI systems, automation, and web products — written for people who make decisions.",
};

export default function InsightsPage() {
  const articles = getAllInsights();

  return (
    <main id="main" className="flex-1">
      <section className="container-xl pt-40 pb-24">
        <SectionHeading
          label="Insights"
          title="Notes from the studio."
          supporting="What we're learning while building AI systems, automation, and web products — written for people who make decisions, not for search engines."
        />
      </section>

      <InsightsFilter articles={articles} />
    </main>
  );
}