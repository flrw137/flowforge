import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/section-heading";

type CtaPanelProps = {
  heading?: string;
  supporting?: string;
  ctaLabel?: string;
};

/**
 * Quiet closing CTA for the secondary pages. The Liquid Glass Waves belong
 * exclusively to the Home FinalCta; every other page ends on this flat,
 * hairline-bordered panel.
 */
export function CtaPanel({
  heading = "Have a project in mind?",
  supporting =
    "Tell us where you are and where you want to be. We'll tell you honestly whether we're the right studio for it.",
  ctaLabel = "Start the conversation",
}: CtaPanelProps) {
  return (
    <section className="container-xl section-md">
      <div className="rounded-lg border border-border-subtle bg-surface-primary px-6 py-16 text-center md:px-16">
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