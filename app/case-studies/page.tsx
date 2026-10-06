import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { SectionVideoBackground } from "@/components/sections/section-video-background";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Facet — AI systems, automation, and web products, designed and built end to end.",
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main id="main" className="flex-1">
      {/* stvideo reel as the ambient stage for this page only.

          Section-scoped sticky background, matching /work, /services, /insights,
          and /about: the video is a stage pinned to the viewport for exactly as
          long as this section lasts, while the heading and card grid scroll
          naturally upward over it. Scoped to the section rather than fixed to
          the viewport so the video cannot outlive the section — the layout
          Footer (a sibling in app/layout.tsx) enters with its own background
          and the video never overlaps it.

          The stage fills the viewport height at every breakpoint, so the
          parallax reads the same on mobile: on small screens the stage is
          pinned too, instead of collapsing into a short in-flow 16:9 band. The
          source is 748x462, so object-cover crops the sides on a portrait
          viewport and the video still reads behind the heading.

          Blurred and scrimmed like the detail pages, so the grid stays the
          focus rather than competing with the footage — but only just: both
          values are deliberately half the detail-page treatment (blur-[3px]
          against blur-[6px], bg-bg-primary/50 against bg-bg-primary/70) so the
          reel reads as a recognisable ambient background instead of a smudged
          dark field. Flat token fill, no gradient. The cards carry their own
          bg-glass-card/80 surface, so their contrast is unaffected by how light
          this scrim gets. scale-x/y-[1.04] exists purely to push the blurred
          edge outside the stage — without it the blur bleeds inward and leaves
          a soft transparent frame at the viewport edge. The md: values then add
          the same zoom the home-page use of this file already applies, which
          also hides the upscale from such a small source.

          The sticky element must not sit inside an overflow container
          (ancestor overflow would trap it), so clipping lives on the stage
          itself. */}
      <section className="relative">
        <SectionVideoBackground
          src="/media/videos/stvideo.mp4"
          className="sticky top-0 h-svh w-full overflow-hidden"
          videoClassName="scale-x-[1.04] scale-y-[1.04] blur-[3px] md:scale-x-[1.18] md:scale-y-[1.06]"
          overlayClassName="bg-bg-primary/50"
        />

        <div className="relative z-10 -mt-[100svh]">
          <div className="container-xl pt-16 pb-16 md:pt-40 md:pb-24">
            <SectionHeading
              label="Work"
              title="Selected projects"
              supporting="A selection of work across AI systems, automation, and web products. Each project was designed and built by Facet end to end."
            />
          </div>

          {studies.length > 0 ? (
            <div className="container-xl pb-24 md:pb-32">
              <div className="grid gap-8 md:grid-cols-2">
                {studies.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            </div>
          ) : (
            /* Honest empty state — no invented clients, metrics, or imagery. */
            <div className="container-xl pb-24 md:pb-32">
              <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border-default bg-bg-secondary/60 backdrop-blur-sm">
                <p className="font-body text-body text-text-muted">
                  Case studies coming soon — projects are being documented.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}