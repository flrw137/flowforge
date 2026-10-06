import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkFilter } from "@/components/sections/work-filter";
import { SectionVideoBackground } from "@/components/sections/section-video-background";
import { getAllWorkProjects } from "@/lib/work";

/**
 * /work — the studio's project index. Same information as /case-studies was
 * built on, shown with an industry filter. Copy: fictional demo projects
 * (flagged in lib/work.ts), narration follows the approved editorial voice.
 */
export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Facet — software, automation, and AI systems designed and built end to end.",
};

export default function WorkPage() {
  const projects = getAllWorkProjects();

  return (
    <main id="main" className="flex-1">
      {/* The wkvideo ambient reel belongs to this section only.

          Section-scoped sticky background: the video is a sticky stage
          pinned to the viewport for exactly as long as this section lasts,
          while the heading/cards scroll naturally upward over it. No
          position:fixed — the video cannot outlive its section, so the
          layout Footer (a sibling in app/layout.tsx) enters with its own
          background and the video never overlaps it.

          The stage fills the viewport height at every breakpoint, so the
          parallax reads the same on mobile: on small screens the stage is
          pinned too, instead of collapsing into a short in-flow 16:9 band.
          The source is natively 16:9 (1920x1080); object-cover fills the
          taller portrait viewport, and the modest desktop horizontal
          stretch keeps the composition balanced without visible distortion.

          The sticky element must not sit inside an overflow container
          (ancestor overflow would trap it), so clipping lives on the stage
          itself. */}
      <section className="relative">
        <SectionVideoBackground
          src="/media/videos/wkvideo.mp4"
          className="sticky top-0 h-svh w-full overflow-hidden"
          videoClassName="md:scale-x-[1.65] md:scale-y-[1.5]"
        />

        <div className="relative z-10 -mt-[100svh]">
          <div className="container-xl pt-16 md:pt-40 pb-24">
            <SectionHeading
              label="Work"
              title="Selected work"
              supporting="A selection of projects across fintech, logistics, healthcare, professional services, manufacturing, and architecture. Each one was designed and built by Facet end to end."
              align="center"
            />
          </div>

          <WorkFilter projects={projects} />
        </div>
      </section>
    </main>
  );
}