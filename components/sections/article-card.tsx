import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/lib/insights";

/**
 * ArticleCard — editorial card for the /insights index (filtered list).
 * Category, date, and reading time sit above the title; the excerpt carries
 * the weight of the grid card.
 */
export function ArticleCard({ article }: { article: Insight }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block rounded-lg border border-border-subtle bg-surface-primary transition-colors duration-[280ms] ease-facet hover:border-border-default"
    >
      <div className="aspect-video overflow-hidden rounded-t-lg bg-bg-secondary">
        <Image
          src={article.cover.src}
          alt={article.cover.alt}
          width={article.cover.src.width}
          height={article.cover.src.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[450ms] ease-facet group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-8">
        <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {article.category} · {article.dateLabel} · {article.readTime}
        </p>
        <h3 className="mt-4 font-display text-h4 font-medium text-text-primary">
          {article.title}
        </h3>
        <p className="mt-3 font-body text-body text-text-secondary">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}