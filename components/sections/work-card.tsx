import Image from "next/image";
import Link from "next/link";
import type { WorkProject } from "@/lib/work";

/**
 * WorkCard — editorial project card for the /work index (filtered list).
 * The image leads, metadata stays quiet, and the project is the visual focus.
 * Surface uses the shared glass material (same tokens as the navbar scrim)
 * because the card sits on the page's background video.
 */
export function WorkCard({ project }: { project: WorkProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-glass-border bg-glass-card/80 backdrop-blur-glass transition-colors duration-[280ms] ease-facet hover:border-border-default"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={project.image.src}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full scale-110 object-cover blur-sm opacity-30 transition-opacity duration-[450ms] ease-facet group-hover:opacity-40 sm:blur-md md:blur-lg"
        />
        <div className="absolute inset-0 bg-bg-primary/70" />
      </div>

      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.src.width}
          height={project.image.src.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="relative z-10 h-full w-full object-cover transition-transform duration-[450ms] ease-facet group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex items-baseline justify-between p-8 pb-0">
        <span className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {project.industry}
        </span>
        <span className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {project.year}
        </span>
      </div>

      <div className="p-8 pt-4">
        <h3 className="font-display text-h4 font-medium text-text-primary">
          {project.title}
        </h3>
        <p className="mt-3 font-body text-body text-text-secondary">
          {project.positioning}
        </p>
      </div>
    </Link>
  );
}