"use client";

import { useState } from "react";
import type { Insight } from "@/lib/insights";
import { ArticleCard } from "@/components/sections/article-card";

type InsightsFilterProps = {
  articles: Insight[];
};

/**
 * InsightsFilter — client island: category filter bar + article grid.
 * Mirrors the work filter: narrowing state, no decoration.
 */
export function InsightsFilter({ articles }: InsightsFilterProps) {
  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <div className="container-xl pb-24">
      <div
        role="group"
        aria-label="Filter notes by topic"
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`rounded-sm border px-4 py-2 font-body text-small font-medium transition-colors duration-[180ms] ease-facet ${
              active === category
                ? "border-border-strong bg-bg-elevated text-text-primary"
                : "border-border-subtle text-text-muted hover:border-border-default hover:text-text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}