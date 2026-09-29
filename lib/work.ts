import type { StaticImageData } from "next/image";
import workLedgerFlow from "@/public/media/images/work-ledger-flow.jpg";
import workNorthbound from "@/public/media/images/work-northbound.jpg";
import workAret from "@/public/media/images/work-aret.jpg";
import workCompassIndex from "@/public/media/images/work-compass-index.jpg";
import workAtlasOps from "@/public/media/images/work-atlas-ops.jpg";
import workStudioGrid from "@/public/media/images/work-studio-grid.jpg";

/**
 * Work data source — powers /work index and /work/[slug] detail pages.
 *
 * FICTIONAL DEMO CONTENT (deployed 2026 with the client-site work sections).
 * Below are six credible mid-market projects written so the studio can be
 * shown during demos. They must be replaced with real, approved client work
 * before any public launch. No invented clients, awards, or impossible metrics.
 *
 * Index route: /work (filterable), Detail route: /work/[slug]
 */

export type WorkProject = {
  /** URL slug, e.g. "ledger-flow" */
  slug: string;
  /** Project / client name */
  title: string;
  /** Industry for filtering, e.g. "Fintech" */
  industry: string;
  /** e.g. "2026" */
  year: string;
  /** Service tags, e.g. ["AI systems", "Web development"] */
  services: string[];
  /** Technologies used */
  technologies: string[];
  /** One sentence — what it is (grid cards + detail intro) */
  positioning: string;
  /** 2–3 sentences, concise storytelling */
  overview: string;
  challenge: string;
  approach: string;
  solution: string;
  /** Restrained, qualitative outcome */
  results: string;
  /** Local JPG in public/media/images/, kebab-case */
  image: { src: StaticImageData; alt: string };
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "ledger-flow",
    title: "LedgerFlow",
    industry: "Fintech",
    year: "2026",
    services: ["AI systems", "Web development"],
    technologies: ["TypeScript", "React", "PostgreSQL", "Document extraction", "Evaluation harnesses"],
    positioning: "Creditor-ledger software that turned a month-end spreadsheet ritual into a single, reviewable process.",
    overview:
      "LedgerFlow builds treasury software for the finance teams of growing companies. When FlowForge came in, their own month-end ran on spreadsheets that travelled between three departments — each editing, none agreeing.",
    challenge:
      "Balances rarely reconciled on the first pass. Matched lines were tracked in comments, unmatched lines lived in a fourth spreadsheet, and nobody could say after the fact who had approved what. Every close started from a trust deficit.",
    approach:
      "We mapped the month-end flow with the finance team before writing code: where lines were entered, where they broke, and what a done close actually required. Then we designed a single reviewed workspace around that sequence.",
    solution:
      "A web application with one shared ledger. Imports land in a queue where the system classifies each line against known payees and rules; anything it can't place confidently goes to a reviewer. Every classification carries a reason, every approval a trail.",
    results:
      "Finance closes in one place instead of four. The team sees the whole month-end in a single view, and the close became a process people can point at — not a ritual kept alive by memory.",
    image: {
      src: workLedgerFlow,
      alt: "Abstract architectural facade in black and white — geometric rhythm standing in for LedgerFlow's ledger workspace.",
    },
  },
  {
    slug: "northbound",
    title: "Northbound",
    industry: "Logistics",
    year: "2025",
    services: ["Web product", "Automation"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Status automation"],
    positioning: "A live dispatch platform that replaced whiteboards and email chains for a regional freight forwarder.",
    overview:
      "Northbound moves freight across three yards with forty trucks. Dispatch ran on a whiteboard everyone disagreed with and a phone line nobody stopped calling.",
    challenge:
      "Nobody had a single view of the fleet. Loads were assigned twice, statuses lived in phone calls, and hand-offs between drivers and the yard were lost on a regular basis. The whiteboard was always almost right.",
    approach:
      "We shadowed two full shifts and mapped the movements dispatchers actually manage — then designed a live board that mirrored the real workflow rather than an idealized one.",
    solution:
      "An operations board showing every load, vehicle, and lane in one view. Statuses update as drivers confirm them; exceptions surface with the responsible person attached. Nothing moves without a visible hand-off.",
    results:
      "Dispatchers plan from a single live view, drivers stop calling for status, and the shift hand-over no longer depends on memory.",
    image: {
      src: workNorthbound,
      alt: "Container ship and gantry cranes at night — the scale of Northbound's freight operations.",
    },
  },
  {
    slug: "aret",
    title: "Aret",
    industry: "Healthcare",
    year: "2026",
    services: ["AI systems", "Web development"],
    technologies: ["TypeScript", "Vector retrieval", "RAG pipeline", "Audit logging"],
    positioning: "A retrieval workspace that turned a scattered clinical corpus into one searchable, traceable place.",
    overview:
      "Aret's clinical effectiveness team keeps protocols, policies, and study documents across shared drives and email. Finding the current version of anything took minutes; trusting that it was current took an act of faith.",
    challenge:
      "The corpus had no single boundary. Documents lived in several systems with different access rules, and search surfaced whatever was indexed — not whatever was approved. Acting on an outdated protocol was a real risk.",
    approach:
      "We started from what is safe to surface, not what would make a good demo. Search was scoped to approved, permissioned sources, and every result had to carry its source, version date, and access level.",
    solution:
      "A private retrieval workspace over the team's corpus. Results rank by relevance, and every one shows where it came from and when it was last reviewed. The search boundary is explicit; every session leaves a trail.",
    results:
      "Staff find documents instead of asking for them. Version confusion dropped out of the workflow, and the trail of what was searched and found exists for any session that needs one.",
    image: {
      src: workAret,
      alt: "A quiet, minimal hospital corridor — restraint standing in for Aret's approved-surface search workspace.",
    },
  },
  {
    slug: "compass-index",
    title: "Compass Index",
    industry: "Professional Services",
    year: "2024",
    services: ["Custom software", "Automation"],
    technologies: ["React", "TypeScript", "PostgreSQL", "Workflow engine"],
    positioning: "A matter-management system that gave a consultancy one view of every engagement.",
    overview:
      "Compass Index advises mid-market firms, and every engagement lived in email, spreadsheets, and a calendar that disagreed with both. Growth made the gaps expensive.",
    challenge:
      "There was no consistent intake. Engagement details were split across the people who held them, and monthly reporting was assembled by hand from whatever could still be found. Growing meant hiring people to chase information.",
    approach:
      "We designed around the engagement record: one shape every service line could fill, with the intake steps that had previously been scaffolded informally. Rollout happened practice by practice.",
    solution:
      "A custom matter workspace. Intake follows a staged template; status and ownership travel with the matter; reporting is generated from the single record instead of assembled from inboxes.",
    results:
      "One record holds the truth about every engagement. Partners see pipeline and delivery in the same view, and monthly reporting went from a scramble to an export.",
    image: {
      src: workCompassIndex,
      alt: "A long wooden conference table in a dim, refined room — the setting of Compass Index's advisory work.",
    },
  },
  {
    slug: "atlas-ops",
    title: "Atlas Ops",
    industry: "Manufacturing",
    year: "2025",
    services: ["Custom software", "Automation"],
    technologies: ["TypeScript", "React", "Node.js", "Machine state capture"],
    positioning: "Shop-floor scheduling and job tracking for a two-hundred-person precision manufacturer.",
    overview:
      "Atlas Ops machines precision parts across two shifts, and production ran on paper tickets with a whiteboard for scheduling. The floor knew more than the office.",
    challenge:
      "Job status was only visible at the machine. Bottlenecks surfaced at the end of the week rather than the moment they formed. Rework was discovered after delivery, and prioritization was a morning conversation nobody repeated in the afternoon.",
    approach:
      "We worked with the shop-floor leads, not around them. Digital job tickets replaced clipboard passes, and machines reported state through simple, unbreakable inputs.",
    solution:
      "A job board for the whole floor: every part, its queue position, and its live status. Bottlenecks surface as they form, rework is flagged at the machine, and priorities have a visible basis.",
    results:
      "Supervisors see the floor's work-in-progress live. Scheduling decisions come from one board, and rework stops arriving as a surprise at shipping.",
    image: {
      src: workAtlasOps,
      alt: "Industrial machinery in a workshop, softly lit — the precision-productive atmosphere of Atlas Ops' floor.",
    },
  },
  {
    slug: "studio-grid",
    title: "Studio Grid",
    industry: "Architecture",
    year: "2026",
    services: ["Web product", "Custom software"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "File indexing"],
    positioning: "A project workspace for a thirty-person architecture practice: drawings, decisions, and deliverables in one record.",
    overview:
      "Studio Grid is a thirty-person architecture practice. Project files lived on a server, decisions lived in email, and deliverables were found by asking. The studio needed a memory.",
    challenge:
      "There was no unified project record. Drawings had versions, but the current answer lived in the most recent email thread. RFIs and coordination decisions disappeared into archives nobody could search.",
    approach:
      "We started from an information model for a project — phases, deliverables, decisions, and the drawings that carry them — then designed an interface the studio would prefer to their file server.",
    solution:
      "A project workspace where phase status, a deliverable registry, and a decision log live together. Drawings are indexed by issue; every coordination response is recorded where the project can find it.",
    results:
      "The studio has one record per project instead of a hundred threads. Where is that? dropped out of the vocabulary, and hand-offs between phase teams stopped being investigations.",
    image: {
      src: workStudioGrid,
      alt: "A brutalist facade of repeating rectangular windows — the grid logic of Studio Grid's practices.",
    },
  },
];

export function getWorkProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((w) => w.slug === slug);
}

export function getAllWorkProjects(): WorkProject[] {
  return [...WORK_PROJECTS];
}

/** Stable industry list for the /work filter bar. */
export function getWorkIndustries(): string[] {
  return [...new Set(WORK_PROJECTS.map((w) => w.industry))];
}