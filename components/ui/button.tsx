import Link from "next/link";

type ButtonProps<T extends "link" | "button"> = {
  /** Rendering element: next/link wrapper or native button */
  as?: T;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  className?: string;
  children: React.ReactNode;
} & Omit<
  T extends "link"
    ? React.ComponentProps<typeof Link>
    : React.ComponentProps<"button">,
  "className" | "children" | "as"
>;

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-sm px-6 font-body text-body font-medium transition-[background-color,border-color,color,transform] duration-[180ms] ease-facet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  // Primary CTA — inverse surface. Design-reference decision (2026-09-10):
  // the signature visual is the single bright focal element per viewport;
  // a solid accent button competed with it. Neutral light preserves that
  // hierarchy; the accent is reserved for interaction states (<15% rule).
  // Radius: client override — 8px (token sm), not Pill.
  primary:
    "bg-surface-inverse text-text-inverse hover:shadow-sm active:translate-y-[-1px]",
  // Secondary — hairline border, quiet surface.
  secondary:
    "border border-border-strong bg-transparent text-text-primary hover:border-text-muted hover:bg-bg-elevated active:translate-y-[-1px]",
  // Text/link action — approved accent use: "links on hover".
  ghost:
    "h-auto px-0 text-text-secondary underline-offset-4 hover:text-accent hover:underline",
} as const;

const sizes = {
  md: "h-12 px-6",
  sm: "h-10 px-5 text-small",
} as const;

export function Button<T extends "link" | "button" = "button">({
  as = "button" as T,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps<T>) {
  const classes = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if (as === "link") {
    return (
      <Link
        className={classes}
        {...(rest as React.ComponentProps<typeof Link>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ComponentProps<"button">)}
    >
      {children}
    </button>
  );
}
