/**
 * Services data source — powers the /services carousel and the detailed
 * capabilities below it. Copy follows the approved draft in
 * `my-app/content/services.md` (four disciplines) plus Custom Software,
 * added by client decision 2026 for a five-item carousel.
 * No pricing copy, no invented metrics, no client names.
 */

export type Service = {
  /** "01" */
  index: string;
  title: string;
  /** Short editorial description (carousel slide) */
  summary: string;
  /** e.g. "LLM integration · RAG · Agents · Evaluation" */
  tags: string;
  /** One-line position — shown under the headline */
  supporting: string;
  /** Typical engagements (detailed section) */
  engagements: string[];
  /** What you receive (detailed section) */
  deliverables: string[];
  /** Who this is for (detailed section) */
  idealClient: string;
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "AI systems",
    summary:
      "Practical AI built into real products and workflows — retrieval, agents, and integrations that earn their place instead of demoing well.",
    tags: "LLM integration · RAG · Agents · Evaluation",
    supporting: "Retrieval, agents, and evaluation — practical AI built into real workflows.",
    engagements: [
      "Retrieval over private corpora",
      "Agents that work within guardrails",
      "Evaluation and test harnesses",
      "Integration into existing products and tools",
    ],
    deliverables: [
      "Working systems and integrations",
      "Documented limits and evaluation results",
      "Runbooks and handover to your team",
    ],
    idealClient:
      "Teams with a real data problem, a defined boundary, and a clear owner.",
  },
  {
    index: "02",
    title: "Automation",
    summary:
      "We map the process, then automate the parts worth automating. Fewer manual steps, clearer ownership, systems your team can actually maintain.",
    tags: "Workflow design · Integrations · Ops tooling",
    supporting: "Fewer manual steps, clearer ownership, systems your team can maintain.",
    engagements: [
      "Mapping the current process, decision by decision",
      "Automating the parts worth automating",
      "Integrations across email, files, systems, and APIs",
      "Exception handling and ownership rules",
    ],
    deliverables: [
      "A mapped workflow with visible decision points",
      "Automated steps with failure handling",
      "A maintenance and ownership guide",
    ],
    idealClient:
      "Operational teams whose most valuable person is also the most interrupted.",
  },
  {
    index: "03",
    title: "Web design & development",
    summary:
      "Sites and web products with editorial clarity and engineering discipline. Fast, accessible, and built to be maintained — not just launched.",
    tags: "Next.js · Design systems · CMS · Performance",
    supporting: "Fast, accessible, and built to be maintained — not just launched.",
    engagements: [
      "Marketing sites and editorial experiences",
      "Web application front and back ends",
      "Design systems and component libraries",
      "CMS setup and content tooling",
    ],
    deliverables: [
      "A redesigned or rebuilt site",
      "Design and interaction foundations for future pages",
      "Build and publishing documentation",
    ],
    idealClient:
      "Teams that want a web presence that behaves like a product, not a brochure.",
  },
  {
    index: "04",
    title: "Digital products",
    summary:
      "From prototype to production: interfaces, data models, and the decisions in between. We build the version that should ship.",
    tags: "Product strategy · Prototyping · Full-stack builds",
    supporting: "From prototype to production — the version that should ship.",
    engagements: [
      "Product strategy and scoping",
      "Prototyping and user testing",
      "Full-stack builds and relaunches",
      "Data models and the decisions around them",
    ],
    deliverables: [
      "A prototype or a production product",
      "Interface, data model, and architecture decisions",
      "Deployments your team can operate",
    ],
    idealClient:
      "Teams with a product idea and no patience for month-long discovery phases.",
  },
  {
    index: "05",
    title: "Custom software",
    summary:
      "Off-the-shelf tools force your process into their shape. When that friction costs more than building, we design and build the system your workflow was already asking for.",
    tags: "Product engineering · Internal tools · Legacy replacement",
    supporting: "The system your team already described — built properly.",
    engagements: [
      "Internal tools and back offices",
      "Client-facing platforms and portals",
      "Consolidating the spreadsheet that became a system",
      "Replacing legacy software without losing its lessons",
    ],
    deliverables: [
      "Designed and shipped software, not scaffolding",
      "Documentation and runbooks",
      "Training and handover to your team",
    ],
    idealClient:
      "Teams whose process outgrew their tools and don't want to hire around the gap.",
  },
];

export function getAllServices(): Service[] {
  return [...SERVICES];
}