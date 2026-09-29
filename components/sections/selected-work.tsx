import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { getAllCaseStudies } from "@/lib/case-studies";

/**
 * Selected Work (Home). Copy: approved `content/home.md`. Projects come from
 * `lib/case-studies.ts` (approved template) — shared with /case-studies and
 * the detail template, so this section auto-fills when real projects are
 * added. Empty state is explicitly flagged, never invented work.
 */
export function SelectedWork() {
  const studies = getAllCaseStudies();

  return (
    <section className="section-lg">
      <div className="container-xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            label="Selected work"
            title="The work speaks for itself."
            supporting="A selection of recent projects. Full case studies on the work page."
          />
          <Button as="link" href="/case-studies" variant="ghost">
            View all work →
          </Button>
        </div>

        {studies.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        ) : (
          /* Placeholder — flagged, removed once approved projects exist. */
          <div className="mt-16 flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border-default bg-bg-secondary">
            <p className="font-body text-body text-text-muted">
              Case studies coming soon — projects are being documented.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
