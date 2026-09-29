import { getAllServices } from "@/lib/services";
import { Label } from "@/components/ui/section-heading";

/**
 * ServicesCapabilities — the quiet, detailed treatment below the carousel.
 * One row per discipline: index + title on the left, the story on the right.
 * Hairline dividers do the layout work; no cards, no icons, no decoration.
 */
export function ServicesCapabilities() {
  const services = getAllServices();

  return (
    <section className="section-md container-xl">
      <Label>In detail</Label>

      <div className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
        {services.map((service) => (
          <div
            key={service.index}
            className="grid gap-10 py-14 md:grid-cols-[minmax(200px,280px)_1fr]"
          >
            <div>
              <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                {service.index}
              </p>
              <h3 className="mt-3 font-display text-h4 font-medium text-text-primary">
                {service.title}
              </h3>
              <p className="mt-3 font-body text-small text-text-muted">
                {service.tags}
              </p>
            </div>

            <div className="max-w-[54rem]">
              <p className="font-body text-body-lg text-text-secondary">
                {service.summary}
              </p>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div>
                  <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                    Engagements
                  </p>
                  <ul className="mt-5 space-y-3">
                    {service.engagements.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 font-body text-body text-text-secondary"
                      >
                        <span aria-hidden="true" className="text-text-muted">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-body text-caption font-medium uppercase tracking-caption text-text-muted">
                    Deliverables
                  </p>
                  <ul className="mt-5 space-y-3">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 font-body text-body text-text-secondary"
                      >
                        <span aria-hidden="true" className="text-text-muted">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-10 font-body text-body text-text-muted">
                <span className="font-medium text-text-secondary">
                  Ideal client —{" "}
                </span>
                {service.idealClient}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}