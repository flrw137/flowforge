import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCaseStudy, getAllCaseStudies } from "@/lib/case-studies";

/**
 * Case-study detail — ONE reusable template for all projects (build-plan
 * Phase 7: data-driven, no one-off component trees per project).
 * Content comes exclusively from lib/case-studies.ts (approved template).
 */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Work" };
  return {
    title: study.title,
    description: study.positioning,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main id="main" className="flex-1">
      {/* Header — identity + positioning */}
      <section className="container-xl pt-40 pb-16">
        <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {study.services} · {study.year}
        </p>
        <h1 className="mt-6 font-display text-h1 font-medium text-text-primary">
          {study.title}
        </h1>
        <p className="mt-6 font-body text-body-lg text-text-secondary measure-body">
          {study.positioning}
        </p>
      </section>

      {/* Visual — large, controlled ratio; quiet placeholder until provided */}
      <section className="container-xl">
        <div className="aspect-video overflow-hidden rounded-xl bg-bg-secondary">
          {study.image ? (
            <Image
              src={study.image.src}
              alt={study.image.alt}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-full w-full object-cover"
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
      </section>

      {/* Summary — concise storytelling, controlled measure */}
      <section className="section-md container-xl">
        <div className="measure-body">
          <h2 className="font-display text-h3 font-medium text-text-primary">
            Overview
          </h2>
          <p className="mt-6 font-body text-body-lg text-text-secondary">
            {study.summary}
          </p>
          {study.link ? (
            <p className="mt-8">
              <Button as="link" href={study.link} variant="secondary">
                Visit project ↗
              </Button>
            </p>
          ) : null}
        </div>
      </section>

      {/* Next step — the conversion path, quiet by design */}
      <section className="container-xl pb-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-lg border border-border-subtle bg-surface-primary p-10">
          <p className="font-body text-body-lg text-text-primary">
            Working on something similar?
          </p>
          <Button as="link" href="/contact">
            Start a project
          </Button>
        </div>
      </section>
    </main>
  );
}
