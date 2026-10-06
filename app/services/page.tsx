import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { ServicesCapabilities } from "@/components/sections/services-capabilities";
import { CtaPanel } from "@/components/sections/cta-panel";
import { SectionVideoBackground } from "@/components/sections/section-video-background";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Facet capabilities — AI systems, automation, web design and development, digital products, and custom software, carried end to end.",
};

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      {/* The srvideo ambient reel belongs to this section only.

          Section-scoped sticky background, matching /work and the home
          Selected Work section: the video is a stage pinned to the viewport
          for exactly as long as this section lasts, while the heading,
          carousel, and capability rows scroll naturally upward over it.

          The stage fills the viewport height at every breakpoint so the
          parallax reads the same on mobile — on small screens the stage is
          pinned too, rather than collapsing into a short in-flow band, and
          the content below overlaps it via -mt.

          The source is 1708x1212 (~1.41:1), narrower than 16:9, so
          object-cover crops the sides on a portrait viewport. The modest
          desktop horizontal stretch keeps the composition balanced without
          visible distortion; mobile leaves the zoom off since a portrait
          viewport already crops a landscape source heavily.

          The sticky element must not sit inside an overflow container
          (ancestor overflow would trap it), so clipping lives on the stage
          itself. */}
      <section className="relative">
        <SectionVideoBackground
          src="/media/videos/srvideo.mp4"
          className="sticky top-0 h-svh w-full overflow-hidden"
          videoClassName="md:scale-x-[1.18] md:scale-y-[1.06]"
        />

        <div className="relative z-10 -mt-[100svh]">
          <section className="container-xl pt-40 pb-24 text-center">
            <SectionHeading
              label="Capabilities"
              title="What we do"
              supporting="Five disciplines, one studio. We take on a small number of projects and carry each one end to end."
              align="center"
            />
          </section>

          <section className="container-xl pb-24">
            <ServicesCarousel />
          </section>

          <ServicesCapabilities />
        </div>
      </section>

      <CtaPanel />
    </main>
  );
}