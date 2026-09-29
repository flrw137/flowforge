import type { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Uppercase, tracked eyebrow label above headings.
 * Quiet by design — hierarchy comes from typography, not decoration.
 */
export function Label({ children, className = "" }: LabelProps) {
  return (
    <p
      className={`font-body text-caption font-medium uppercase tracking-caption text-text-muted ${className}`}
    >
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  label: string;
  title: string;
  supporting?: string;
  className?: string;
  align?: "start" | "center";
};

/**
 * Consistent section header: eyebrow label + display heading + optional support.
 * Typography and spacing carry the hierarchy; no decorative elements.
 */
export function SectionHeading({
  label,
  title,
  supporting,
  className = "",
  align = "start",
}: SectionHeadingProps) {
  return (
    <div
      className={`${
        align === "center" ? "mx-auto text-center" : ""
      } ${className}`}
    >
      <Label>{label}</Label>
      <h2 className="mt-4 font-display text-h2 font-medium text-text-primary">
        {title}
      </h2>
      {supporting ? (
        <p
          className={`mt-4 font-body text-body-lg text-text-secondary measure-body ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {supporting}
        </p>
      ) : null}
    </div>
  );
}
