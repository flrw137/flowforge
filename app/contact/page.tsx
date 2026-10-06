import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionVideoBackground } from "@/components/sections/section-video-background";
import { Label } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Facet about your project — AI systems, automation, design, and development, built end to end. We reply within two business days.",
};

// Placeholder until the client's real address is provided (progress-tracker).
const CONTACT_EMAIL = "hello@facet.studio";

export default function ContactPage() {
  return (
    <main id="main" className="flex-1">
      {/* The contactVideo ambient reel belongs to this section only.

          Section-scoped sticky background, matching /work, /services,
          /insights, and /about: the video is a stage pinned to the viewport
          for exactly as long as this section lasts, while the heading and
          form scroll naturally upward over it.

          Slight blur is deliberate here and does real work rather than being
          decoration: the left column's heading and supporting paragraph sit
          directly on the footage with no panel behind them, and a soft
          backdrop is what lets them stay legible without laying a dark wash
          over the whole reel. It also stops the moving background competing
          with the form for attention while someone is typing.

          The stage fills the viewport height at every breakpoint so the
          parallax reads the same on mobile — on small screens the stage is
          pinned too, rather than collapsing into a short in-flow band, and
          the content below overlaps it via -mt.

          The source is 1920x1080 (exactly 16:9), so object-cover fills the
          taller portrait viewport on its own with no horizontal stretch
          needed. The desktop zoom matches /work; mobile leaves the zoom off,
          since a portrait viewport already crops a landscape source heavily.

          scale-[1.03] is not an extra zoom choice — a blur filter fades the
          element's own edges, so the video is scaled slightly past the stage
          to hide that bleed behind the stage's overflow clipping.

          The sticky element must not sit inside an overflow container
          (ancestor overflow would trap it), so clipping lives on the stage
          itself. */}
      <section className="relative">
        <SectionVideoBackground
          src="/media/videos/contactVideo.mp4"
          className="sticky top-0 h-svh w-full overflow-hidden"
          videoClassName="scale-[1.03] blur-sm md:scale-x-[1.65] md:scale-y-[1.5]"
        />

        <div className="relative z-10 -mt-[100svh]">
          <section className="section-lg container-xl">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
              <div>
                <Label>Contact</Label>
                <h1 className="mt-4 font-display text-h2 font-medium text-text-primary">
                  Tell us about your project.
                </h1>
                <p className="mt-4 font-body text-body-lg text-text-secondary measure-body">
                  The more context you give, the more useful our first
                  conversation will be. We reply within two business days.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-8 inline-block font-body text-body font-medium text-text-primary underline underline-offset-4 transition-colors duration-[180ms] ease-facet hover:text-accent"
                >
                  Or write to us directly
                </a>
              </div>

              <ContactForm />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}