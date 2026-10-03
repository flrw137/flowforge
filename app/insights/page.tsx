import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { InsightsFilter } from "@/components/sections/insights-filter";
import { SectionVideoBackground } from "@/components/sections/section-video-background";
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
      {/* The wvideo ambient reel belongs to this section only.

          Section-scoped sticky background, matching /work, /services, and the
          home Selected Work section: the video is a stage pinned to the
          viewport for exactly as long as this section lasts, while the
          heading, filter, and article grid scroll naturally upward over it.

          The stage fills the viewport height at every breakpoint so the
          parallax reads the same on mobile — on small screens the stage is
          pinned too, rather than collapsing into a short in-flow band, and
          the content below overlaps it via -mt.

          The source is 1924x1076 (~16:9), so object-cover fills the taller
          portrait viewport on its own with no horizontal stretch needed. The
          desktop zoom matches /work; mobile leaves the zoom off, since a
          portrait viewport already crops a landscape source heavily.

          The sticky element must not sit inside an overflow container
          (ancestor overflow would trap it), so clipping lives on the stage
          itself. */}
      <section className="relative">
        <SectionVideoBackground
          src="/media/videos/wvideo.mp4"
          className="sticky top-0 h-svh w-full overflow-hidden"
          videoClassName="md:scale-x-[1.65] md:scale-y-[1.5]"
        />

        <div className="relative z-10 -mt-[100svh]">
          <section className="container-xl pt-40 pb-24 text-center">
            <SectionHeading
              label="Insights"
              title="Notes from the studio."
              supporting="What we're learning while building AI systems, automation, and web products — written for people who make decisions, not for search engines."
              align="center"
            />
          </section>

          <InsightsFilter articles={articles} />
        </div>
      </section>
    </main>
  );
}