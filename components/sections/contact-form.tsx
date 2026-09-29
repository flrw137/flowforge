"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";

/**
 * ContactForm — the site's only interactive form. "use client" is required:
 * idle / submitting / success / failure states, client-side validation, and a
 * single POST to /api/contact. Copy is approved `content/contact.md` — the
 * submission path never exposes server configuration to the client.
 */
const PROJECT_TYPES = [
  "AI systems",
  "Automation",
  "Web design & development",
  "Digital product",
  "Something else",
] as const;

const BUDGETS = [
  "Under $25k",
  "$25k–$75k",
  "$75k–$150k",
  "$150k+",
  "Not sure yet",
] as const;

const EMAIL_RE = /\S+@\S+\.\S+/;

type FieldName =
  | "name"
  | "email"
  | "company"
  | "projectType"
  | "description"
  | "budget";

type FormValues = Record<FieldName, string>;

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  description: "",
  budget: "",
};

const FIELD_ERRORS: Record<string, string> = {
  name: "Please add your name.",
  email: "Please add your email so we can reply.",
  projectType: "Please choose a project type.",
  description: "Please tell us a little about the project.",
};

const fieldBase =
  "w-full rounded-md border border-border-default bg-bg-secondary px-4 font-body text-body text-text-primary placeholder:text-text-muted transition-colors duration-[180ms] ease-facet focus:border-border-strong";

const suite = (error?: string) =>
  [fieldBase, error ? "border-border-strong" : "hover:border-border-strong"]
    .join(" ");

function validate(values: FormValues): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = FIELD_ERRORS.name;
  if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) {
    errors.email = FIELD_ERRORS.email;
  }
  if (!values.projectType) errors.projectType = FIELD_ERRORS.projectType;
  if (!values.description.trim()) {
    errors.description = FIELD_ERRORS.description;
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const clearError = (field: keyof typeof errors) =>
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const update = (field: FieldName) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = (await res.json().catch(() => null)) as {
        errors?: string[];
      } | null;
      if (data && Array.isArray(data.errors)) {
        const serverErrors: Partial<Record<FieldName, string>> = {};
        for (const field of data.errors) {
          if (FIELD_ERRORS[field]) {
            serverErrors[field as FieldName] = FIELD_ERRORS[field];
          }
        }
        setErrors(serverErrors);
        setStatus("idle");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-border-subtle bg-surface-primary p-10"
      >
        <h2 className="font-display text-h3 font-medium text-text-primary">
          Thanks — it&apos;s on its way.
        </h2>
        <p className="mt-4 font-body text-body text-text-secondary">
          We&apos;ve received your message and will reply within two business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 md:grid-cols-2">
      {status === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-border-strong bg-surface-primary p-6 md:col-span-2"
        >
          <h3 className="font-display text-h5 font-medium text-text-primary">
            That didn&apos;t go through.
          </h3>
          <p className="mt-2 font-body text-small text-text-secondary">
            Something went wrong on our end. Your message is still in the form
            — try again, or email us directly.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => setStatus("idle")}
          >
            Try again
          </Button>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-body text-small font-medium text-text-secondary"
        >
          Name{" "}
          <span aria-hidden="true" className="font-normal text-text-muted">
            *
          </span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update("name")(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={[suite(errors.name), "h-12"].join(" ")}
        />
        {errors.name ? (
          <p id="name-error" className="mt-2 font-body text-small text-text-muted">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-body text-small font-medium text-text-secondary"
        >
          Email{" "}
          <span aria-hidden="true" className="font-normal text-text-muted">
            *
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => update("email")(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={[suite(errors.email), "h-12"].join(" ")}
        />
        {errors.email ? (
          <p
            id="email-error"
            className="mt-2 font-body text-small text-text-muted"
          >
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-2 block font-body text-small font-medium text-text-secondary"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => update("company")(e.target.value)}
          className={[suite(), "h-12"].join(" ")}
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="mb-2 block font-body text-small font-medium text-text-secondary"
        >
          Project type{" "}
          <span aria-hidden="true" className="font-normal text-text-muted">
            *
          </span>
        </label>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            required
            value={values.projectType}
            onChange={(e) => update("projectType")(e.target.value)}
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
            className={[suite(errors.projectType), "h-12 appearance-none pr-10"].join(
              " ",
            )}
          >
            <option value="" disabled>
              Choose a project type
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {errors.projectType ? (
          <p
            id="projectType-error"
            className="mt-2 font-body text-small text-text-muted"
          >
            {errors.projectType}
          </p>
        ) : null}
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="description"
          className="mb-2 block font-body text-small font-medium text-text-secondary"
        >
          Project description{" "}
          <span aria-hidden="true" className="font-normal text-text-muted">
            *
          </span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          placeholder="What are you building, and where are you starting from?"
          value={values.description}
          onChange={(e) => update("description")(e.target.value)}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          className={[suite(errors.description), "min-h-40 resize-y py-3"].join(
            " ",
          )}
        />
        {errors.description ? (
          <p
            id="description-error"
            className="mt-2 font-body text-small text-text-muted"
          >
            {errors.description}
          </p>
        ) : null}
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="budget"
          className="mb-2 block font-body text-small font-medium text-text-secondary"
        >
          Budget{" "}
          <span aria-hidden="true" className="font-normal text-text-muted">
            (optional)
          </span>
        </label>
        <div className="relative md:max-w-md">
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget")(e.target.value)}
            className={[suite(), "h-12 appearance-none pr-10"].join(" ")}
          >
            <option value="">Select budget</option>
            {BUDGETS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="mt-4 font-body text-small text-text-muted">
          We use your details only to respond to this inquiry. Nothing is
          stored on this site.
        </p>
      </div>
    </form>
  );
}