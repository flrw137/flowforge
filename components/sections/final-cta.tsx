import { Button } from "@/components/ui/button";
import { LiquidGlassWaves } from "@/components/sections/liquid-glass-waves";

/**
 * Final CTA — the natural conclusion of the site, not a sales module.
 * Copy: approved `content/home.md`. The Liquid Glass Waves HLS video forms the
 * full-bleed background of exactly this section (used once site-wide; never
 * competes with the Hero cube). If playback fails, the flat token surface
 * carries the section and the CTA remains fully usable.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden section-lg bg-bg-secondary border-t border-border-subtle">
      <LiquidGlassWaves className="absolute inset-0 z-10" />
      <div className="relative z-20 container-xl text-center">
        <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          Next step
        </p>
        <h2 className="mx-auto mt-6 font-display text-h2 font-medium text-text-primary">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-6 font-body text-body-lg text-text-secondary measure-body">
          Tell us where you are and where you want to be. We&apos;ll tell you
          honestly whether we&apos;re the right studio for it.
        </p>
        <div className="mt-12 flex justify-center">
          <Button as="link" href="/contact">
            Start the conversation
          </Button>
        </div>
      </div>
    </section>
  );
}
