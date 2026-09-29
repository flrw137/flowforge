import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkFilter } from "@/components/sections/work-filter";
import { getAllWorkProjects } from "@/lib/work";

/**
 * /work — the studio's project index. Same information as /case-studies was
 * built on, shown with an industry filter. Copy: fictional demo projects
 * (flagged in lib/work.ts), narration follows the approved editorial voice.
 */
export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by FlowForge — software, automation, and AI systems designed and built end to end.",
};

export default function WorkPage() {
  const projects = getAllWorkProjects();

  return (
    <main id="main" className="flex-1">
      <section className="container-xl pt-40 pb-24">
        <SectionHeading
          label="Work"
          title="Selected work"
          supporting="A selection of projects across fintech, logistics, healthcare, professional services, manufacturing, and architecture. Each one was designed and built by FlowForge end to end."
        />
      </section>

      <WorkFilter projects={projects} />
    </main>
  );
}