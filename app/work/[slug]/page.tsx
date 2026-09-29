import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaPanel } from "@/components/sections/cta-panel";
import { getWorkProject, getAllWorkProjects } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllWorkProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.title, description: project.positioning };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();

  const all = getAllWorkProjects();
  const currentIndex = all.findIndex((w) => w.slug === slug);
  const next = all[(currentIndex + 1) % all.length];

  const chapters = [
    { label: "Overview", body: project.overview },
    { label: "Challenge", body: project.challenge },
    { label: "Approach", body: project.approach },
    { label: "Solution", body: project.solution },
    { label: "Outcome", body: project.results },
  ];

  return (
    <main id="main" className="flex-1">
      {/* Header — identity + positioning */}
      <section className="container-xl pt-40 pb-16">
        <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {`${project.industry} · ${project.year}`}
        </p>
        <h1 className="mt-6 font-display text-h1 font-medium text-text-primary">
          {project.title}
        </h1>
        <p className="mt-6 font-body text-body-lg text-text-secondary measure-body">
          {project.positioning}
        </p>
      </section>

      {/* Hero visual */}
      <section className="container-xl pb-16">
        <div className="aspect-video overflow-hidden rounded-xl bg-bg-secondary">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.src.width}
            height={project.image.src.height}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Quiet index — engagement, technology, year */}
      <section className="container-xl pb-20">
        <dl className="grid gap-8 border-y border-border-subtle py-10 md:grid-cols-3">
          <div>
            <dt className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
              Engagement
            </dt>
            <dd className="mt-3 font-body text-body text-text-primary">
              {project.services.join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
              Technology
            </dt>
            <dd className="mt-3 font-body text-body text-text-primary">
              {project.technologies.join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
              Year
            </dt>
            <dd className="mt-3 font-body text-body text-text-primary">
              {project.year}
            </dd>
          </div>
        </dl>
      </section>

      {/* Narrative — editorial chapters */}
      <section className="container-xl pb-24">
        <div className="divide-y divide-border-subtle border-t border-border-subtle">
          {chapters.map((chapter) => (
            <div
              key={chapter.label}
              className="grid gap-6 py-12 md:grid-cols-[minmax(140px,220px)_1fr] md:gap-16"
            >
              <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                {chapter.label}
              </p>
              <p className="max-w-[42rem] font-body text-body-lg text-text-secondary">
                {chapter.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next project — the work leads onward, not a sales pitch */}
      <section className="container-xl pb-24">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between gap-6 border-t border-border-subtle py-12"
        >
          <div>
            <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
              Next project
            </p>
            <p className="mt-3 font-display text-h3 font-medium text-text-primary transition-colors duration-[180ms] ease-facet group-hover:text-accent">
              {next.title}
            </p>
          </div>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-text-muted transition-all duration-[280ms] ease-facet group-hover:translate-x-1 group-hover:text-text-primary"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>

      <CtaPanel
        heading="Working on something similar?"
        supporting="Tell us what you're trying to build. We'll tell you what it takes and whether we're the right studio for it."
      />
    </main>
  );
}