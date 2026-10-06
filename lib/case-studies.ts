import type { StaticImageData } from "next/image";
import caseNornClaims from "@/public/media/images/case-norn-claims.png";
import caseHarborlineDispatch from "@/public/media/images/case-harborline-dispatch.png";
import caseAlderOnboarding from "@/public/media/images/case-alder-onboarding.png";
import caseMeridianClinicalSearch from "@/public/media/images/case-meridian-clinical-search.png";

/**
 * Case-study data source — implements the approved project template in
 * `my-app/content/case-studies.md`. Components render this single source for
 * the home Selected Work section, the /case-studies index, and the detail
 * template.
 *
 * NOTE: The four entries below are FICTIONAL DEMO CONTENT (flagged in
 * content/case-studies.md, added 2026-09-14 by client decision) so the work
 * section can be shown during demos. They must be replaced with real,
 * approved client content before any public launch. Images are Facet-built
 * mockups, not screenshots of shipped products.
 *
 * Detail route: /case-studies/[slug]
 */

export type CaseStudy = {
  /** URL slug, e.g. "acme-platform" */
  slug: string;
  /** Project name */
  title: string;
  /** One sentence — what it is */
  positioning: string;
  /** e.g. "AI systems · Web development" */
  services: string;
  /** e.g. "2026" */
  year: string;
  /** 2–3 sentences, concise storytelling */
  summary: string;
  /**
   * Visual asset (StaticImageData; local PNGs in public/media/images/,
   * kebab-case). Entries without a visual render text-first, never a fake
   * image.
   */
  image?: { src: StaticImageData; alt: string };
  /** Live URL if public; omit otherwise */
  link?: string;
};

/**
 * Demo content — see note at the top of this file. Order is intentional:
 * [norn-claims, harborline-dispatch, alder-onboarding, meridian-clinical-search].
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "norn-claims",
    title: "Norn Claims",
    positioning: "Claims intake and document review, rebuilt as a single review desk.",
    services: "AI systems · Automation",
    year: "2026",
    summary:
      "Norn's claims operations ran on email, spreadsheets, and manual re-entry. Facet rebuilt it as a shared review desk that routes claims, extracts policy and loss details from attached documents, and keeps a human decision at the centre of every payout. Review moved from ad-hoc queues to a single, auditable workflow.",
    image: {
      src: caseNornClaims,
      alt: "Norn Claims review desk: intake queue, extracted claim fields, and an approve decision panel.",
    },
  },
  {
    slug: "harborline-dispatch",
    title: "Harborline Dispatch",
    positioning: "A live dispatch board for a mixed fleet, with every move in one view.",
    services: "Web product · Automation",
    year: "2026",
    summary:
      "Harborline coordinated road and feeder movements across several yards with paper manifests and phone calls. Facet built a live dispatch board that keeps every load, ETA, and hand-off in a single view, so planners can see the whole fleet without leaving the desk. Status now travels with the shipment, not the spreadsheet.",
    image: {
      src: caseHarborlineDispatch,
      alt: "Harborline dispatch board: in-dispatch, en-route, and delivered lanes for a mixed fleet.",
    },
  },
  {
    slug: "alder-onboarding",
    title: "Alder Onboarding",
    positioning: "Client onboarding as a calm, document-light flow.",
    services: "Web product · AI systems",
    year: "2026",
    summary:
      "Opening an account with Alder meant submitting the same documents several times. Facet designed a staged onboarding flow that verifies documents as they arrive and keeps applicants moving through the process. The first impression is one of being handled, not fought over.",
    image: {
      src: caseAlderOnboarding,
      alt: "Alder onboarding flow: staged application form with document verification status.",
    },
  },
  {
    slug: "meridian-clinical-search",
    title: "Meridian Clinical Search",
    positioning: "A retrieval workspace for a private clinical corpus.",
    services: "AI systems · Web development",
    year: "2026",
    summary:
      "Clinical teams needed to find protocol, consent, and safety documents across a sprawling private corpus — without leaving approved surfaces. Facet built a search workspace scoped to indexed sources, with the trail of every result visible and auditable. Less context-switching, and the search boundary is explicit by design.",
    image: {
      src: caseMeridianClinicalSearch,
      alt: "Meridian clinical search workspace: query field, result list, and indexed source panel.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Newest first once entries exist (order = approval order for now). */
export function getAllCaseStudies(): CaseStudy[] {
  return [...CASE_STUDIES];
}