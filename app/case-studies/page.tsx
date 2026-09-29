import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by FlowForge — AI systems, automation, and web products, designed and built end to end.",
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main id="main" className="flex-1">
      <section className="section-lg container-xl">
        <SectionHeading
          label="Work"
          title="Selected projects"
          supporting="A selection of work across AI systems, automation, and web products. Each project was designed and built by FlowForge end to end."
        />

        {studies.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        ) : (
          /* Honest empty state — no invented clients, metrics, or imagery. */
          <div className="mt-16 flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border-default bg-bg-secondary">
            <p className="font-body text-body text-text-muted">
              Case studies coming soon — projects are being documented.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
