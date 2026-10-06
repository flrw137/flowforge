import type { Metadata } from "next";
import { SectionHeading, Label } from "@/components/ui/section-heading";
import { CtaPanel } from "@/components/sections/cta-panel";
import { SectionVideoBackground } from "@/components/sections/section-video-background";

export const metadata: Metadata = {
  title: "About",
  description:
    "Facet is a technology and design studio. Design and engineering as one practice — fewer projects, done properly.",
};

const process = [
  {
    name: "Discover",
    description:
      "We understand the problem, the constraints, and what success actually looks like.",
  },
  {
    name: "Design",
    description:
      "We shape the solution: architecture, interface, and the trade-offs in between.",
  },
  {
    name: "Build",
    description: "We ship working increments weekly. You see progress, not decks.",
  },
  {
    name: "Support",
    description:
      "We stay after launch for the part most studios skip: making sure it keeps working.",
  },
];

const principles = [
  "Precision over decoration — if it doesn't earn its place, we remove it.",
  "Design and engineering as one practice, not a handoff.",
  "A smaller number of projects, each done properly.",
  "Working software over status reports and decks.",
  "Direct communication — we say what we think.",
  "Staying after launch — support is part of the work.",
];

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      {/* The wkfv ambient reel belongs to this section only.

          Section-scoped sticky background, matching /work, /services, and
          /insights: the video is a stage pinned to the viewport for exactly as
          long as this section lasts, while the philosophy, process, and
          principles rows scroll naturally upward over it.

          The stage fills the viewport height at every breakpoint so the
          parallax reads the same on mobile — on small screens the stage is
          pinned too, rather than collapsing into a short in-flow band, and
          the content below overlaps it via -mt.

          The source is 1920x1080 (exactly 16:9), so object-cover fills the
          taller portrait viewport on its own with no horizontal stretch
          needed. The desktop zoom matches /work; mobile leaves the zoom off,
          since a portrait viewport already crops a landscape source heavily.

          The sticky element must not sit inside an overflow container
          (ancestor overflow would trap it), so clipping lives on the stage
          itself.

          preload stays at the component default ("auto"): this is the first
          thing on the page and it is the section's whole visual identity, so
          it must not depend on the autoPlay heuristic winning a race with
          the preload hint. "metadata" stalls at readyState 1 and the video
          never paints a frame. */}
      <section className="relative">
        <SectionVideoBackground
          src="/media/videos/wkfv.mp4"
          className="sticky top-0 h-svh w-full overflow-hidden"
          videoClassName="md:scale-x-[1.65] md:scale-y-[1.5]"
        />

        <div className="relative z-10 -mt-[100svh]">
          {/* Opening point of view */}
          <section className="container-xl pt-40 pb-24 text-center">
            <SectionHeading
              label="The studio"
              title="Facet is a technology and design studio."
              supporting="We believe the best digital work comes from treating design and engineering as one practice, not a handoff. We take on fewer projects so each one gets the attention it deserves."
              align="center"
            />
          </section>

          {/* Philosophy + approach */}
          <section className="section-md container-xl">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="font-display text-h3 font-medium text-text-primary">
                  Precision over decoration.
                </h2>
                <p className="mt-6 font-body text-body-lg text-text-secondary measure-body">
                  Interfaces should communicate through typography, spacing,
                  and composition — not effects. Systems should be as considered
                  under the hood as they are on the surface. If a visual element
                  doesn&apos;t earn its place, we remove it.
                </p>
              </div>
              <div>
                <h2 className="font-display text-h3 font-medium text-text-primary">
                  A smaller number of projects, done properly.
                </h2>
                <p className="mt-6 font-body text-body-lg text-text-secondary measure-body">
                  We work in short cycles with working software at the end of
                  each one. You talk directly to the people building. Decisions
                  are made where the work happens, not in a chain of
                  intermediaries.
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section-md container-xl">
            <Label>Process</Label>
            <h2 className="mt-4 font-display text-h3 font-medium text-text-primary">
              Four phases, no mystery.
            </h2>

            <ol className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
              {process.map((step, i) => (
                <li
                  key={step.name}
                  className="grid gap-4 py-10 md:grid-cols-[minmax(120px,180px)_1fr] md:gap-16"
                >
                  <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-h4 font-medium text-text-primary">
                      {step.name}
                    </h3>
                    <p className="mt-3 font-body text-body text-text-secondary measure-body">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Principles */}
          <section className="section-md container-xl">
            <Label>Principles</Label>
            <h2 className="mt-4 font-display text-h3 font-medium text-text-primary">
              How the studio makes decisions.
            </h2>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle md:grid-cols-2">
              {principles.map((principle) => (
                <li key={principle} className="bg-bg-primary p-8 md:p-10">
                  <p className="font-body text-body-lg text-text-primary">
                    {principle}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      {/* Closing CTA */}
      <CtaPanel
        heading="Built for teams that care how things are made."
        supporting="If you're evaluating studios, judge us by the work and how we talk about it. The next step is a conversation, not a pitch deck."
      />
    </main>
  );
}