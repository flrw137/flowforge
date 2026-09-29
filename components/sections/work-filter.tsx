"use client";

import { useState } from "react";
import type { WorkProject } from "@/lib/work";
import { WorkCard } from "@/components/sections/work-card";

type WorkFilterProps = {
  projects: WorkProject[];
};

/**
 * WorkFilter — client island: industry filter bar + the project grid.
 * The grid re-renders from the same data source on filter change; no
 * animation, no hiding — state simply narrows what is shown.
 */
export function WorkFilter({ projects }: WorkFilterProps) {
  const industries = ["All", ...new Set(projects.map((p) => p.industry))];
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? projects : projects.filter((p) => p.industry === active);

  return (
    <div className="container-xl pb-24">
      <div
        role="group"
        aria-label="Filter projects by industry"
        className="flex flex-wrap gap-2"
      >
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => setActive(industry)}
            aria-pressed={active === industry}
            className={`rounded-sm border px-4 py-2 font-body text-small font-medium transition-colors duration-[180ms] ease-facet ${
              active === industry
                ? "border-border-strong bg-bg-elevated text-text-primary"
                : "border-border-subtle text-text-muted hover:border-border-default hover:text-text-primary"
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {visible.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}