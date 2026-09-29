import type { StaticImageData } from "next/image";
import insightAiFirst from "@/public/media/images/insight-ai-first.jpg";
import insightAutomationOutlives from "@/public/media/images/insight-automation-outlives.jpg";
import insightInternalSoftware from "@/public/media/images/insight-internal-software.jpg";
import insightRetrievalRecall from "@/public/media/images/insight-retrieval-recall.jpg";
import insightSmallTeams from "@/public/media/images/insight-small-teams.jpg";
import insightEvaluation from "@/public/media/images/insight-evaluation.jpg";
import insightWorkflowInterface from "@/public/media/images/insight-workflow-interface.jpg";
import insightShippingNotSlides from "@/public/media/images/insight-shipping-not-slides.jpg";

/**
 * Insights data source — powers /insights index and /insights/[slug] detail.
 *
 * FICTIONAL DEMO CONTENT: eight editorial notes written so the studio's blog
 * can be shown during demos (client decision, 2026). They are positioned as
 * studio-writing, contain no invented facts about clients, and must be
 * replaced or rewritten with real approved articles before public launch.
 *
 * Index route: /insights (filterable), Detail route: /insights/[slug]
 */

export type InsightCategory = "AI Systems" | "Automation" | "Studio Notes";

export type Insight = {
  slug: string;
  category: InsightCategory;
  title: string;
  readTime: string;
  /** ISO date, display order newest first */
  date: string;
  /** e.g. "Aug 2026" */
  dateLabel: string;
  excerpt: string;
  cover: { src: StaticImageData; alt: string };
  /** Short paragraphs — 3 per article, editorial, restrained */
  body: string[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "when-ai-shouldnt-be-the-first-solution",
    category: "AI Systems",
    title: "When AI Shouldn't Be the First Solution",
    readTime: "7 min",
    date: "2026-08-11",
    dateLabel: "Aug 2026",
    excerpt:
      "The temptation to start with the model is strongest when the real problem sits further down the funnel. Most of the systems we inherit are failing before the AI ever gets a chance to.",
    cover: {
      src: insightAiFirst,
      alt: "An open notebook with pen and pencil on a plain surface — the blank page before the technology decision.",
    },
    body: [
      "Almost every engagement starts the same way: we think there's AI in here somewhere. Sometimes there is. More often there's a broken workflow, an unlabelled corpus, or a decision nobody can explain — and no model fixes any of those.",
      "We ask what a system should be able to prove before we ask what it should be able to do. If the data is a mess, the model will be a confident mess. If the process is the problem, the AI simply automates the bottleneck.",
      "The useful question isn't can we use AI here but what would have to be true for it to work. When those conditions don't exist, we say so — and we build the foundation first, so the AI can be added when it earns its place.",
    ],
  },
  {
    slug: "automation-that-outlives-the-builder",
    category: "Automation",
    title: "Automation That Outlives the Person Who Built It",
    readTime: "5 min",
    date: "2026-07-02",
    dateLabel: "Jul 2026",
    excerpt:
      "The best automation is boring. The worst dies with its author. Ownership — not cleverness — is the property that survives a handover.",
    cover: {
      src: insightAutomationOutlives,
      alt: "Old industrial gears and machinery — engineered to keep running long after they were built.",
    },
    body: [
      "We've inherited more systems than we've written. The pattern is always the same: a sharp individual built something that worked perfectly for them, and the day they left, the knowledge left with them.",
      "Automation is only maintainable if three things are true: the mapped process exists on paper rather than in someone's head, failures carry the owner's name, and the system documents its own decisions. None of those are technical — they're discipline.",
      "So we build automation to be read, not just run. Every step has a reason a new person can find, and every exception has a named owner. Clever systems demo well. Boring ones get deployed and stay deployed.",
    ],
  },
  {
    slug: "designing-internal-software-people-enjoy",
    category: "Studio Notes",
    title: "Designing Internal Software People Actually Enjoy",
    readTime: "7 min",
    date: "2026-06-30",
    dateLabel: "Jun 2026",
    excerpt:
      "Internal tools are judged by a harsher metric than public products: people use them every day, or they build a spreadsheet to route around them.",
    cover: {
      src: insightInternalSoftware,
      alt: "A workshop with tools in use — craft, care, and the daily use that shapes good work.",
    },
    body: [
      "Public products lose users slowly and measure everything. Internal tools lose users fast, and the signal is silent — people simply stop logging in and start doing the work in email.",
      "We design internal software like public products: clear hierarchy, generous spacing, and a workflow that matches how people actually work rather than how the org chart imagines they do. The interface is the training material.",
      "It's also the kind of work that ships fastest. When the users are a few dozen people you can talk to daily, iteration cycles are hours, not sprints. That immediacy is exactly why much of our best work never sees a launch page.",
    ],
  },
  {
    slug: "the-difference-between-retrieval-and-recall",
    category: "AI Systems",
    title: "The Difference Between Retrieval and Recall",
    readTime: "7 min",
    date: "2026-05-21",
    dateLabel: "May 2026",
    excerpt:
      "A model that has read your documents is not the same as a system that can find them. Retrieval quality decides whether an assistant is useful or just confident.",
    cover: {
      src: insightRetrievalRecall,
      alt: "Shelves of books in warm light — a corpus memory that can be returned to and verified.",
    },
    body: [
      "There's a seductive idea that once a model has read your corpus, you can ask it anything. The polite version of the truth is that it can quote your documents confidently. The less polite version: confidence has nothing to do with being right.",
      "Retrieval is the difference. It's the discipline of knowing what the corpus contains, what it doesn't, and producing the source for any answer in milliseconds. Facility in answering follows retrieval quality.",
      "That's why we build retrieval systems before we build assistants. When every answer can be traced to a source, the model is doing its job — being fluent. Ours is the job of making sure the source was true.",
    ],
  },
  {
    slug: "why-small-teams-build-better-systems",
    category: "Studio Notes",
    title: "Why Small Teams Build Better Systems",
    readTime: "5 min",
    date: "2026-03-04",
    dateLabel: "Mar 2026",
    excerpt:
      "Small teams fail faster in public and learn in the open. The constraint isn't capacity — it's the discipline of fewer decisions.",
    cover: {
      src: insightSmallTeams,
      alt: "Precise machinery and dials — small, tight systems functioning as one.",
    },
    body: [
      "A small team has fewer people to make mistakes, but that isn't the real advantage. The real advantage is that fewer decisions have to pass through fewer hands to reach the work.",
      "In a small team, a trade-off is discussed once, between two people, before the code is written. In a large one, the same decision travels through a review chain and arrives diluted. You don't get worse engineers at scale — you get more handoffs.",
      "That discipline shows in the systems we inherit and the ones we ship. The least-maintained software we've seen wasn't built by a small team. It was built by a process with nobody genuinely accountable for it.",
    ],
  },
  {
    slug: "evaluation-is-the-measure",
    category: "AI Systems",
    title: "Evaluation Is the Measure",
    readTime: "6 min",
    date: "2026-02-19",
    dateLabel: "Feb 2026",
    excerpt:
      "If you can't measure whether a system works, you can't say it works. The evaluation harness — not the demo — is what separates a pilot from a deployment.",
    cover: {
      src: insightEvaluation,
      alt: "A ruler resting on a plain surface — measurement before judgement.",
    },
    body: [
      "Demos are where AI systems are at their best and their worst. In front of an audience, a model can seem astonishing. The honest test lives in the input you'd never put in front of an audience.",
      "We build the evaluation before the product: a fixed set of cases the system must pass, including the failures it should refuse gracefully. Every change runs against it. A model that passes today and fails tomorrow is caught on a commit, not at go-live.",
      "None of this is glamorous, which is the point. Organizations that deploy AI for real and keep it deployed share one habit: they can produce the evidence that it works. The demo is for deciding. The harness is for shipping.",
    ],
  },
  {
    slug: "your-workflow-is-already-the-interface",
    category: "Automation",
    title: "Your Workflow Is Already the Interface",
    readTime: "6 min",
    date: "2025-11-14",
    dateLabel: "Nov 2025",
    excerpt:
      "Before building anything, map the path a request takes from first touch to done. The workflow is the product — the software is just a better way to walk it.",
    cover: {
      src: insightWorkflowInterface,
      alt: "A screen glowing in a dark room — the interface shaped by the work that runs through it.",
    },
    body: [
      "Every tool we've inherited has been a snapshot of a workflow that existed before it. The spreadsheet that drifted into being a system is evidence that a process was trying to happen and the tooling gave up.",
      "So we map the path before we draw a pixel: where a request enters, who touches it, what it needs to leave. The map is the product spec. The interface is just a better way to walk the route.",
      "It's also the fastest way to find the parts not worth automating. Most processes are twenty percent value and eighty percent routing — and the routing is what the workflow owns, and what your team is spending its life on.",
    ],
  },
  {
    slug: "shipping-software-not-slides",
    category: "Studio Notes",
    title: "Shipping Software, Not Slides",
    readTime: "6 min",
    date: "2025-09-16",
    dateLabel: "Sep 2025",
    excerpt:
      "Demos communicate a direction. Shipped software communicates evidence. We'd rather argue about what's real than what's planned.",
    cover: {
      src: insightShippingNotSlides,
      alt: "Construction cranes against an evening sky — the built version, not the rendering.",
    },
    body: [
      "The worst meeting we ever lost was about slides. The best one we ever won was about a working system, running live, in front of the people who would have to use it.",
      "Working software creates a different conversation. Plans invite opinions; working systems invite adjustments. People react to something they can touch with a specificity no deck has ever produced.",
      "It's the way we run every engagement: small increments, each one real. By the time a project ends, the discussion is about what's shipped, what's working, and what should change next.",
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((a) => a.slug === slug);
}

/** Index order — newest first, as authored above. */
export function getAllInsights(): Insight[] {
  return [...INSIGHTS];
}