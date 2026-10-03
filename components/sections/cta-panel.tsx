import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/section-heading";
import { LiquidGlassWaves } from "@/components/sections/liquid-glass-waves";

type CtaPanelProps = {
  heading?: string;
  supporting?: string;
  ctaLabel?: string;
};

/**
 * Closing CTA for the secondary pages. Full-bleed ambient video background —
 * the same Liquid Glass Waves asset used by the Home FinalCta — so every page
 * ends on the same visual note. The video layer sits behind the content
 * (z-10 vs z-20) and never intercepts pointer events, so the CTA stays
 * clickable. If playback fails, the flat token surface carries the section.
 */
export function CtaPanel({
  heading = "Have a project in mind?",
  supporting =
    "Tell us where you are and where you want to be. We'll tell you honestly whether we're the right studio for it.",
  ctaLabel = "Start the conversation",
}: CtaPanelProps) {
  return (
    <section className="relative section-lg overflow-hidden border-t border-border-subtle bg-bg-secondary">
      <LiquidGlassWaves className="pointer-events-none absolute inset-0 z-10" />
      <div className="relative z-20 container-xl text-center">
        <Label>Next step</Label>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-h2 font-medium text-text-primary">
          {heading}
        </h2>
        <p className="mx-auto mt-6 font-body text-body-lg text-text-secondary measure-body">
          {supporting}
        </p>
        <div className="mt-12 flex justify-center">
          <Button as="link" href="/contact">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}