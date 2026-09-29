import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { ServicesCapabilities } from "@/components/sections/services-capabilities";
import { CtaPanel } from "@/components/sections/cta-panel";

export const metadata: Metadata = {
  title: "Services",
  description:
    "FlowForge capabilities — AI systems, automation, web design and development, digital products, and custom software, carried end to end.",
};

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      <section className="container-xl pt-40 pb-24">
        <SectionHeading
          label="Capabilities"
          title="What we do"
          supporting="Five disciplines, one studio. We take on a small number of projects and carry each one end to end."
        />
      </section>

      <section className="container-xl pb-24">
        <ServicesCarousel />
      </section>

      <ServicesCapabilities />

      <CtaPanel />
    </main>
  );
}