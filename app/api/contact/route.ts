import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact — the site's only server-side interaction.
 * Client form → this handler → Resend → response. No database, no storage.
 *
 * Placeholder address used until the client's real address is provided
 * (see context/progress-tracker.md). Credentials live in .env.local only:
 *   RESEND_API_KEY        (secret — never exposed to the client)
 *   CONTACT_TO_EMAIL      (destination address; defaults to placeholder)
 *   CONTACT_FROM_EMAIL    (verified sending address; falls back to the
 *                          Resend sandbox sender, test-mode only)
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@facet.studio";

export const PROJECT_TYPES = [
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

type Inquiry = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  description?: string;
  budget?: string;
};

const EMAIL_RE = /\S+@\S+\.\S+/;

function validate(
  inquiry: Inquiry,
): { errors: string[]; cleaned: Inquiry } {
  const errors: string[] = [];
  const cleaned: Inquiry = {};

  if (inquiry.name?.trim()) {
    cleaned.name = inquiry.name.trim();
  } else {
    errors.push("name");
  }

  if (inquiry.email?.trim() && EMAIL_RE.test(inquiry.email.trim())) {
    cleaned.email = inquiry.email.trim();
  } else {
    errors.push("email");
  }

  if (inquiry.company?.trim()) {
    cleaned.company = inquiry.company.trim();
  }

  if (
    inquiry.projectType &&
    (PROJECT_TYPES as readonly string[]).includes(inquiry.projectType)
  ) {
    cleaned.projectType = inquiry.projectType;
  } else {
    errors.push("projectType");
  }

  if (inquiry.description?.trim()) {
    cleaned.description = inquiry.description.trim();
  } else {
    errors.push("description");
  }

  if (
    inquiry.budget &&
    (BUDGETS as readonly string[]).includes(inquiry.budget)
  ) {
    cleaned.budget = inquiry.budget;
  }

  return { errors, cleaned };
}

export async function POST(request: Request) {
  let inquiry: Inquiry;
  try {
    inquiry = (await request.json()) as Inquiry;
  } catch {
    return NextResponse.json(
      { errors: ["name", "email", "projectType", "description"] },
      { status: 400 },
    );
  }

  const { errors, cleaned } = validate(inquiry);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Configuration gate — never tells the client which value is missing.
    console.error("Contact: RESEND_API_KEY is not configured.");
    return NextResponse.json({ message: "not_configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const text = [
    `Name: ${cleaned.name}`,
    `Email: ${cleaned.email}`,
    cleaned.company ? `Company: ${cleaned.company}` : null,
    `Project type: ${cleaned.projectType}`,
    cleaned.budget ? `Budget: ${cleaned.budget}` : null,
    "",
    "Project description:",
    cleaned.description,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Facet <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: cleaned.email as string,
      subject: `New project inquiry — ${cleaned.name}`,
      text,
    });

    if (error) {
      console.error("Contact: Resend rejected the message.", error);
      return NextResponse.json({ message: "not_sent" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact: Resend request failed.", err);
    return NextResponse.json({ message: "not_sent" }, { status: 500 });
  }
}