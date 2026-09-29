import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * CaseStudyCard — editorial project presentation for index and home sections.
 * Per ui-rules §27: the project is the visual focus; no tiny catalog cards,
 * no fake metrics, no decorative badges. Without an approved visual it renders
 * a quiet placeholder surface — never stock imagery.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block rounded-lg border border-border-subtle bg-surface-primary transition-colors duration-[280ms] ease-facet hover:border-border-default"
    >
      {/* Visual — large, controlled ratio (16/9) */}
      <div className="aspect-video overflow-hidden rounded-t-lg bg-bg-secondary">
        {study.image ? (
          <Image
            src={study.image.src}
            alt={study.image.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-[450ms] ease-facet group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center"
          >
            <span className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
              Visual pending
            </span>
          </div>
        )}
      </div>

      {/* Identity row — quiet metadata */}
      <div className="flex items-baseline justify-between p-8 pb-0">
        <span className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {study.services}
        </span>
        <span className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {study.year}
        </span>
      </div>

      {/* Title + positioning */}
      <div className="p-8 pt-4">
        <h3 className="font-display text-h4 font-medium text-text-primary">
          {study.title}
        </h3>
        <p className="mt-3 font-body text-body text-text-secondary">
          {study.positioning}
        </p>
      </div>
    </Link>
  );
}
