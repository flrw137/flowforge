import { Button } from "@/components/ui/button";
import { GlassCube } from "@/components/sections/glass-cube";
import { HeroServicesTape } from "@/components/sections/hero-services-tape";

/**
 * Hero — the primary visual and messaging statement of Facet.
 * Copy: approved `my-app/content/home.md` (do not rewrite).
 * Composition (client decision 2026-09-10): Glass Cube as full-bleed section
 * background — z-10 per token layering (Section media). Copy sits in the
 * z-20 (Content) layer.
 * The cube remains the single dominant animated element (Level 1 motion).
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[720px] items-end overflow-hidden md:min-h-[820px] xl:min-h-[920px]">
      {/* SVG noise filter for shiny text */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="c3-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="1"
              seed="2"
            />
            <feDisplacementMap in="SourceGraphic" scale="0" />
          </filter>
        </defs>
      </svg>
      {/* Signature visual — full-bleed background (Section media, z-10) */}
      <div className="absolute inset-0 z-10">
        <GlassCube className="h-full w-full" />
      </div>

      {/* Copy — Content layer (z-20). Bottom-left of the hero; bottom-centred on
          mobile (below md), which is where the site draws its mobile boundary
          — the same rule as the `md:hidden` shiny spans above. */}
      <div className="relative z-20 container-xl w-full pb-16 md:pb-20 xl:pb-24">
        <div className="measure-hero text-center md:text-left">
          <p className="animate-rise font-body text-caption font-medium uppercase tracking-caption text-text-secondary">
            AI, automation &amp;{' '}
            <span
              className="md:hidden animate-shiny"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                filter: 'url(#c3-noise)',
              }}
            >
              digital systems
            </span>
            <span className="hidden md:inline">digital systems</span>
          </p>
          <h1 className="animate-rise-1 mt-5 max-w-[980px] font-display text-4xl font-semibold leading-[0.86] tracking-[-0.08em] text-text-primary md:text-[clamp(3.125rem,7.5vw,15rem)] md:font-normal md:leading-[0.78]">
            We build{' '}
            <span
              className="md:hidden animate-shiny"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                filter: 'url(#c3-noise)',
              }}
            >
              digital systems
            </span>
            <span className="hidden md:inline">digital systems</span> that hold
            up under scrutiny.
          </h1>
          <p className="animate-rise-2 mt-7 max-w-[760px] font-body text-[clamp(1.1rem,1.65vw,2rem)] leading-[1.45] text-text-secondary">
            Facet is a technology and design studio. We design and build AI
            systems, automation, and web products for teams that care how
            things are made.
          </p>
          <div className="animate-rise-3 mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12 md:justify-start">
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
