/**
 * HeroServicesTape — the merged Phase 4 + 6 presentation (client decision
 * 2026-09-14): the services marquee lives in the hero as a thin decorative
 * tape strip across the bottom edge. Four approved discipline titles scroll
 * perpetually right-to-left beside dot separators — new titles appear at the
 * right edge and fall off the left. Pure CSS, no JS island.
 *
 * The set is duplicated four times so the doubled track always spans the full
 * band on desktop: letters never jump in from the middle, and the
 * `translateX(-50%)` seam (a 2-set shift) stays invisible.
 *
 * Decorative only: `aria-hidden`, `pointer-events-none`, no links, never
 * pauses. Reduced motion is handled by the global kill switch. Titles are the
 * approved copy from `my-app/content/services.md` — do not rewrite.
 */
const TITLES = [
  "AI systems",
  "Automation",
  "Web design & development",
  "Digital products",
];

function TapeUnit({ title }: { title: string }) {
  return (
    <span className="flex items-center whitespace-nowrap">
      <span className="font-body text-caption font-medium uppercase tracking-caption text-text-primary">
        {title}
      </span>
      <span
        aria-hidden="true"
        className="mx-6 h-1 w-1 shrink-0 rounded-full bg-text-muted opacity-low"
      />
    </span>
  );
}

export function HeroServicesTape() {
  return (
    <div
      aria-hidden="true"
      className="tape-window tape-ends pointer-events-none absolute inset-x-0 bottom-0 z-20 h-(--tape-height) border-y border-border-subtle bg-glass-bg"
    >
      <div className="marquee-track flex h-full items-center">
        {[0, 1, 2, 3].map((set) =>
          TITLES.map((title) => (
            <TapeUnit key={`${set}-${title}`} title={title} />
          )),
        )}
      </div>
    </div>
  );
}