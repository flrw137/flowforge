import { Button } from "@/components/ui/button";
import { GlassCube } from "@/components/sections/glass-cube";
import { HeroServicesTape } from "@/components/sections/hero-services-tape";

/**
 * Hero — the primary visual and messaging statement of FlowForge.
 * Copy: approved `my-app/content/home.md` (do not rewrite).
 * Composition (client decision 2026-09-10): Glass Cube as full-bleed section
 * background — z-10 per token layering (Section media). Copy sits in the
 * z-20 (Content) layer.
 * The cube remains the single dominant animated element (Level 1 motion).
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden md:min-h-[820px] xl:min-h-[920px]">
      {/* Signature visual — full-bleed background (Section media, z-10) */}
      <div className="absolute inset-0 z-10">
        <GlassCube className="h-full w-full" />
      </div>

      {/* Copy — Content layer (z-20), bottom-left of the hero */}
      <div className="relative z-20 container-xl w-full pb-16 md:pb-20 xl:pb-24">
        <div className="measure-hero">
          <p className="animate-rise font-body text-caption font-medium uppercase tracking-caption text-text-secondary">
            AI, automation &amp; digital systems
          </p>
          <h1 className="animate-rise-1 mt-5 max-w-[980px] font-display text-[clamp(2rem,6.5vw,15rem)] leading-[0.86] tracking-[-0.08em] text-text-primary md:text-[clamp(3.125rem,7.5vw,15rem)] md:leading-[0.78]">
            We build digital systems that hold up under scrutiny.
          </h1>
          <p className="animate-rise-2 mt-7 max-w-[760px] font-body text-[clamp(1.1rem,1.65vw,2rem)] leading-[1.45] text-text-secondary">
            FlowForge is a technology and design studio. We design and build AI
            systems, automation, and web products for teams that care how
            things are made.
          </p>
          <div className="animate-rise-3 mt-10 flex flex-wrap items-center gap-4 md:mt-12">
            <Button as="link" href="/contact">
              Start a project
            </Button>
            <Button as="link" href="/case-studies" variant="secondary">
              See our work
            </Button>
          </div>
        </div>
      </div>

      {/* Services tape — merged Phase 4 + 6 (client decision 2026-09-14):
          thin perpetual marquee of discipline titles along the hero bottom. */}
      <HeroServicesTape />
    </section>
  );
}
