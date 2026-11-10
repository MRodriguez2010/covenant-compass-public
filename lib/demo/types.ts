export type DemoRole = "pastor" | "alex" | "jordan";
export type DemoScenario = "growth" | "safety";

export type DemoEnvironment = "demo" | "pilot" | "production";
export type ContentSource =
  | "original_demo"
  | "licensed_core"
  | "approved_pastoral_module";
export type ValidationStatus =
  | "synthetic"
  | "assumption"
  | "expert_review_pending"
  | "licensed"
  | "pilot_validated";
export type ProcessingMode =
  | "deterministic_demo"
  | "simulated_ai"
  | "ai_shadow"
  | "ai_assisted";
export type LicenseStatus = "unlicensed_placeholder" | "licensed";
export type PersistenceMode = "memory_only" | "persistent";

export type DemoProvenance = {
  environment: DemoEnvironment;
  contentSource: ContentSource;
  validationStatus: ValidationStatus;
  processingMode: ProcessingMode;
  licenseStatus: LicenseStatus;
  persistenceMode: PersistenceMode;
  runtimeAI: boolean;
};

export type DemoQuestion = {
  id: string;
  version: string;
  eyebrow: string;
  prompt: string;
  options: string[];
  domain: DemoDomain;
  fixtureResponses: Record<"alex" | "jordan", number>;
  evidenceIds: Record<"alex" | "jordan", string[]>;
  provenance: DemoProvenance;
};

export type DemoDomain =
  | "connection"
  | "repair"
  | "trust"
  | "sharedMeaning";

export type DemoTone = "sage" | "coral" | "gold";

export type DemoDomainFixture = {
  id: DemoDomain;
  label: string;
  alex: number;
  jordan: number;
  tone: DemoTone;
};

export type DemoEvidence = {
  id: string;
  label: string;
};

export type DemoCaseFixture = {
  id: string;
  fixtureVersion: string;
  scoringVersion: string;
  fictional: true;
  scenario: DemoScenario;
  coupleLabel: string;
  marriageYears: number;
  childrenAtHome: number;
  faithLayer: string;
  language: string;
  presentingConcern: string;
  domains: DemoDomainFixture[];
  evidence: DemoEvidence[];
};

export type DemoScore = DemoDomainFixture & {
  gap: number;
};

export type DemoFinding = {
  id: string;
  number: string;
  status: string;
  title: string;
  summary: string;
  evidenceIds: string[];
  evidence: string[];
  question: string;
  kind: "growth" | "strength";
};

export type DemoResult = {
  caseId: string;
  fixtureVersion: string;
  scoringVersion: string;
  generatedBy: "deterministic-rules-v1";
  safetySuppressed: boolean;
  releaseEligible: boolean;
  scores: DemoScore[];
  findings: DemoFinding[];
};

export type DemoAction = {
  id: string;
  week: string;
  title: string;
  purpose: string;
  detail: string;
  cadence: string;
  owner: string;
  stopCondition: string;
  provenance: DemoProvenance;
};

export type SimulatedDraftTheme = {
  id: string;
  title: string;
  hypothesis: string;
  evidenceIds: string[];
  uncertainty: string;
  followUpQuestion: string;
};

export type SimulatedAIDraft = {
  id: string;
  status: "simulated";
  generatedBy: "deterministic-template-v1";
  modelCalled: false;
  caseId: string;
  themes: SimulatedDraftTheme[];
  prohibitedUses: string[];
  provenance: DemoProvenance;
};
