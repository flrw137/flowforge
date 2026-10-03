import { Button } from "@/components/ui/button";
import { getAllServices } from "@/lib/services";

/**
 * ServicesCarousel — the one required interactive treatment on /services.
 *
 * Continuous drift: the track slides at a constant velocity in pure CSS and
 * loops forever, pausing on hover. A stepped interval — advance one slide
 * every few seconds — reads as a presentation being clicked through by an
 * invisible hand; constant motion is what makes it read as a carousel.
 * Nothing is click-to-advance, so there are no previous/next controls and no
 * index readout.
 *
 * Seamless loop: the slide set is rendered twice and one full lap is a
 * translateX(-50%) — exactly one set's width, since both halves are
 * identical. The track therefore never "wraps" and never jumps. Duplicating
 * also means the window is always full at any viewport width, including the
 * narrow case where one set is narrower than the window.
 *
 * Duplicates are `aria-hidden` and their links are removed from the tab order,
 * so assistive tech and keyboard users meet each service exactly once.
 *
 * The window is a scroll container, so touch, trackpad, and keyboard
 * navigation keep working over the animation; `overflow-x-auto` is the
 * fallback path entirely once prefers-reduced-motion freezes the drift.
 */
export function ServicesCarousel() {
  const services = getAllServices();

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Services"
      className="container-xl"
    >
      {/* Window clips the track and scopes the hover pause. */}
      <div
        tabIndex={0}
        aria-label="Scroll through services"
        className="group overflow-x-auto scroll-px-4 scrollbar-hide pb-2 outline-none"
      >
        <div className="carousel-track flex gap-4 group-hover:[animation-play-state:paused]">
          {[0, 1].map((set) =>
            services.map((service) => {
              const isClone = set === 1;

              return (
                <article
                  key={`${set}-${service.index}`}
                  data-slide
                  aria-hidden={isClone || undefined}
                  className="flex w-[min(600px,88%)] shrink-0 flex-col justify-between rounded-lg border border-glass-border bg-glass-card p-8 backdrop-blur-glass md:p-10"
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
                    <Button
                      as="link"
                      href="/contact"
                      variant="ghost"
                      tabIndex={isClone ? -1 : undefined}
                    >
                      Discuss this
                    </Button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}