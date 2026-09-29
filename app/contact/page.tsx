import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { Label } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell FlowForge about your project — AI systems, automation, design, and development, built end to end. We reply within two business days.",
};

// Placeholder until the client's real address is provided (progress-tracker).
const CONTACT_EMAIL = "hello@flowforge.studio";

export default function ContactPage() {
  return (
    <main id="main" className="flex-1">
      <section className="section-lg container-xl">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div>
            <Label>Contact</Label>
            <h1 className="mt-4 font-display text-h2 font-medium text-text-primary">
              Tell us about your project.
            </h1>
            <p className="mt-4 font-body text-body-lg text-text-secondary measure-body">
              The more context you give, the more useful our first conversation
              will be. We reply within two business days.
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
    </main>
  );
}