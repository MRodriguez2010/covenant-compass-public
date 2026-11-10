import type { DemoProvenance } from "./types";

export const DEMO_VERSION = "0.6.0-demo";
export const DEMO_LAST_REVIEWED = "July 30, 2026";

export const ORIGINAL_DEMO_PROVENANCE: DemoProvenance = {
  environment: "demo",
  contentSource: "original_demo",
  validationStatus: "synthetic",
  processingMode: "deterministic_demo",
  licenseStatus: "unlicensed_placeholder",
  persistenceMode: "memory_only",
  runtimeAI: false,
};

export const SIMULATED_AI_PROVENANCE: DemoProvenance = {
  ...ORIGINAL_DEMO_PROVENANCE,
  validationStatus: "assumption",
  processingMode: "simulated_ai",
};

export const DEMO_BOUNDARIES = [
  "Synthetic people and fictional scenarios only",
  "Original, unlicensed demonstration questions",
  "Deterministic fixture-based indicators",
  "No real assessment submissions",
  "No persistent data storage",
  "No live AI, email, SMS, payments, or analytics",
  "No clinical, diagnostic, therapeutic, or crisis service",
] as const;

export const DEMO_PHASES = [
  {
    number: "0",
    title: "Disclosure baseline",
    evidence:
      "Global prototype banner, provenance badges, report watermark, version, and review date.",
  },
  {
    number: "1",
    title: "Decision-ready specification",
    evidence:
      "Assumption register, claims register, paid gates, and approved demo language.",
  },
  {
    number: "2",
    title: "Local-first architecture",
    evidence:
      "Typed fixtures, disconnected provider boundaries, browser-memory state, and no production bindings.",
  },
  {
    number: "3",
    title: "Deterministic engine",
    evidence:
      "Versioned fictional cases, transparent rules, evidence IDs, and reproducible outputs.",
  },
  {
    number: "4",
    title: "Pastoral and safety simulation",
    evidence:
      "Role preview, simulated consent, safety suppression, human review, staged release, and governed actions.",
  },
  {
    number: "5",
    title: "AI-shaped, no-API experience",
    evidence:
      "Deterministic summary template, evidence-linked themes, prohibited uses, and review controls.",
  },
] as const;

export const DEMO_ASSUMPTIONS = [
  {
    area: "Assessment content",
    current:
      "Six original sample questions and four synthetic relationship domains.",
    assumption:
      "A future licensed instrument can be integrated without changing the core pastoral journey.",
    paidGate: "Instrument license and digital-delivery rights after Phase 5.",
  },
  {
    area: "Scoring",
    current:
      "Transparent deterministic rules applied to versioned fictional fixtures.",
    assumption:
      "Future licensed scoring and norms can replace the demonstration indicators.",
    paidGate: "Licensing and psychometric review after Phase 5.",
  },
  {
    area: "Privacy and identity",
    current:
      "Role switching visually simulates separate spouse and facilitator experiences.",
    assumption:
      "A production identity system can enforce truly separate sessions and organization roles.",
    paidGate: "Production identity, messaging, and security review after Phase 5.",
  },
  {
    area: "Safety workflow",
    current:
      "A fictional pathway demonstrates suppression and minimum-necessary visibility.",
    assumption:
      "Texas-qualified advisors will approve the protocol before a real pilot.",
    paidGate: "Legal, clinical, and safety review after Phase 5.",
  },
  {
    area: "AI summaries",
    current:
      "A deterministic template simulates an evidence-linked draft. No model is called.",
    assumption:
      "A future model can produce sufficiently reliable drafts under mandatory human review.",
    paidGate: "API, vendor review, and shadow-mode evaluation after Phase 5.",
  },
  {
    area: "Seminar cohort",
    current:
      "A deterministic aggregate of synthetic fixtures with minimum-size suppression and no participant-level display.",
    assumption:
      "Pastors can use carefully governed aggregate themes to plan a seminar without exposing a couple.",
    paidGate:
      "Privacy review, licensed norms, approved curriculum, identity, and storage after Phase 5.",
  },
] as const;

export const CLAIMS_REGISTER = [
  {
    claim: "The demo shows a facilitator-guided workflow.",
    status: "Demonstrated",
    allowed: "Workflow prototype",
  },
  {
    claim: "The questions measure relationship health.",
    status: "Unsupported",
    allowed: "Original demonstration questions",
  },
  {
    claim: "The indicators are validated scores.",
    status: "Unsupported",
    allowed: "Synthetic demonstration domain indicators",
  },
  {
    claim: "The system identifies a root cause.",
    status: "Unsupported",
    allowed: "Working hypothesis to confirm or reject in conversation",
  },
  {
    claim: "AI generated the report.",
    status: "Not connected",
    allowed: "Deterministic simulated AI draft; no model called",
  },
  {
    claim: "The platform provides crisis response.",
    status: "Not connected",
    allowed: "Fictional safety-workflow preview only",
  },
] as const;
