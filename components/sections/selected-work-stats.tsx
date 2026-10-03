"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { getAllCaseStudies } from "@/lib/case-studies";

function CountUp({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const startValue = 0;
          const endValue = target;

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - (1 - progress) ** 3;
            const currentValue = Math.floor(
              startValue + (endValue - startValue) * easeOutCubic
            );
            setValue(currentValue);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setValue(endValue);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref}>
      <span>{value}</span>
      {suffix}
    </div>
  );
}

export function SelectedWorkStats() {
  const studies = getAllCaseStudies();

  return (
    <section className="relative">
      {/* Section-scoped sticky background. Full viewport height at every
          breakpoint so the parallax reads the same on mobile: the stage is
          pinned on small screens too, instead of collapsing into a short
          in-flow 16:9 band. The source is narrower than 16:9 (748x462), so
          object-cover fills the taller portrait viewport via a modest
          desktop horizontal stretch, and the content below overlaps via -mt. */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center md:scale-x-[1.18] md:scale-y-[1.06]"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
        >
          <source src="/media/videos/stvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 -mt-[100svh]">
        {/* Statistics block */}
        <div className="container-xl pt-16 md:pt-40 pb-16 md:pb-24">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            <div>
              <div className="font-display text-6xl md:text-8xl font-medium text-text-primary">
                <CountUp target={120} suffix="+" />
              </div>
              <p className="mt-4 font-body text-small uppercase tracking-caption text-text-secondary">
                Clients &amp; Partners
              </p>
            </div>
            <div>
              <div className="font-display text-6xl md:text-8xl font-medium text-text-primary">
                <CountUp target={86} suffix="+" />
              </div>
              <p className="mt-4 font-body text-small uppercase tracking-caption text-text-secondary">
                Projects
              </p>
            </div>
            <div>
              <div className="font-display text-6xl md:text-8xl font-medium text-text-primary">
                <CountUp target={5} suffix="+" />
              </div>
              <p className="mt-4 font-body text-small uppercase tracking-caption text-text-secondary">
                Years of Experience
              </p>
            </div>
          </div>
        </div>

        {/* Selected Work content */}
        <div className="container-xl pb-24">
          <div className="flex flex-col items-center gap-8 text-center">
            <SectionHeading
              label="Selected work"
              title="The work speaks for itself."
              supporting="A selection of recent projects. Full case studies on the work page."
              align="center"
            />
            <Button as="link" href="/case-studies" variant="ghost">
              View all work →
            </Button>
          </div>

          {studies.length > 0 ? (
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {studies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border-default bg-bg-secondary/60 backdrop-blur-sm">
              <p className="font-body text-body text-text-muted">
                Case studies coming soon — projects are being documented.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
