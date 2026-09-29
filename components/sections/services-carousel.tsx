"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAllServices } from "@/lib/services";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * ServicesCarousel — the one required interactive treatment on /services.
 * One service fully visible, a peek of the next, horizontal drag/swipe,
 * previous/next controls, a visible index, and snap that respects
 * prefers-reduced-motion. Editorial slides, not SaaS cards.
 */
export function ServicesCarousel() {
  const services = getAllServices();
  const total = services.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const slideWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.querySelector<HTMLElement>("[data-slide]");
    return (card ? card.offsetWidth : track.clientWidth) || 0;
  };

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(Math.max(i, 0), total - 1);
    track.scrollTo({
      left: slideWidth() * target,
      behavior: reduceMotion() ? "auto" : "smooth",
    });
    setIndex(target);
  };

  const onScroll = () => {
    const width = slideWidth();
    if (width === 0) return;
    setIndex(Math.round((trackRef.current?.scrollLeft ?? 0) / width));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Services"
      className="container-xl"
    >
      {/* Controls — index left, previous/next right */}
      <div className="flex items-center justify-between">
        <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
          {`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
        </p>
        <div className="flex gap-3">
          <Button
            as="button"
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Previous service"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            className="h-12 w-12 justify-center px-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button
            as="button"
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Next service"
            onClick={() => scrollTo(index + 1)}
            disabled={index === total - 1}
            className="h-12 w-12 justify-center px-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Track — snap per slide, one visible + a controlled peek */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Scroll through services"
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 scrollbar-hide pb-2 outline-none"
      >
        {services.map((service) => (
          <article
            key={service.index}
            data-slide
            className="flex w-[min(600px,88%)] shrink-0 snap-start flex-col justify-between rounded-lg border border-border-subtle bg-surface-primary p-8 md:p-10"
          >
            <div>
              <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                {service.index}
              </p>
              <h3 className="mt-4 font-display text-h3 font-medium text-text-primary">
                {service.title}
              </h3>
              <p className="mt-4 font-body text-body-lg text-text-secondary measure-body">
                {service.summary}
              </p>
              <p className="mt-6 font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                {service.tags}
              </p>
            </div>
            <p className="mt-8 font-body text-body text-text-secondary measure-body">
              {service.supporting}
            </p>
            <div className="mt-8">
              <Button as="link" href="/contact" variant="ghost">
                Discuss this
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}