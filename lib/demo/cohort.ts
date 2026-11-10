import { ORIGINAL_DEMO_PROVENANCE } from "./manifest";
import type { DemoDomain, DemoProvenance, DemoTone } from "./types";

export type CohortWorkflowState =
  | "group_ready"
  | "facilitator_follow_up"
  | "awaiting_partner"
  | "private_review";

export type CohortDomainIndicator = {
  domain: DemoDomain;
  label: string;
  coupleMean: number;
  perspectiveGap: number;
  tone: DemoTone;
};

export type SyntheticCohortCase = {
  id: string;
  alias: string;
  fictional: true;
  workflowState: CohortWorkflowState;
  completion: "complete" | "partial";
  domains: CohortDomainIndicator[];
  provenance: DemoProvenance;
};

export type CohortDomainSummary = {
  domain: DemoDomain;
  label: string;
  fixtureCount: number;
  averageIndicator: number;
  averagePerspectiveGap: number;
  tone: DemoTone;
};

export type CohortRecommendation = {
  id: string;
  priority: "begin_with_strength" | "group_emphasis" | "facilitator_boundary";
  title: string;
  rationale: string;
  format: string;
  boundary: string;
};

export type CohortSummary = {
  cohortId: string;
  cohortVersion: string;
  fictional: true;
  provenance: DemoProvenance;
  invitedCount: number;
  completedCount: number;
  groupReadyCount: number;
  restrictedCount: number;
  followUpCount: number;
  awaitingPartnerCount: number;
  minimumAggregationSize: number;
  aggregateVisible: boolean;
  includedCaseIds: string[];
  excludedCaseIds: string[];
  domains: CohortDomainSummary[];
  recommendations: CohortRecommendation[];
  generatedBy: "deterministic-cohort-rules-v1";
};

const domain = (
  id: DemoDomain,
  label: string,
  coupleMean: number,
  perspectiveGap: number,
  tone: DemoTone,
): CohortDomainIndicator => ({
  domain: id,
  label,
  coupleMean,
  perspectiveGap,
  tone,
});

export const syntheticSeminarCases: SyntheticCohortCase[] = [
  {
    id: "SEM-A",
    alias: "Synthetic case A",
    fictional: true,
    workflowState: "group_ready",
    completion: "complete",
    domains: [
      domain("connection", "Connection", 72, 8, "sage"),
      domain("repair", "Repair after conflict", 44, 6, "coral"),
      domain("trust", "Trust & reliability", 58, 12, "gold"),
      domain("sharedMeaning", "Shared meaning", 82, 4, "sage"),
    ],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-B",
    alias: "Synthetic case B",
    fictional: true,
    workflowState: "group_ready",
    completion: "complete",
    domains: [
      domain("connection", "Connection", 64, 10, "sage"),
      domain("repair", "Repair after conflict", 39, 8, "coral"),
      domain("trust", "Trust & reliability", 61, 9, "gold"),
      domain("sharedMeaning", "Shared meaning", 78, 6, "sage"),
    ],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-C",
    alias: "Synthetic case C",
    fictional: true,
    workflowState: "group_ready",
    completion: "complete",
    domains: [
      domain("connection", "Connection", 75, 5, "sage"),
      domain("repair", "Repair after conflict", 52, 11, "coral"),
      domain("trust", "Trust & reliability", 49, 14, "gold"),
      domain("sharedMeaning", "Shared meaning", 80, 5, "sage"),
    ],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-D",
    alias: "Synthetic case D",
    fictional: true,
    workflowState: "group_ready",
    completion: "complete",
    domains: [
      domain("connection", "Connection", 59, 12, "sage"),
      domain("repair", "Repair after conflict", 43, 7, "coral"),
      domain("trust", "Trust & reliability", 55, 10, "gold"),
      domain("sharedMeaning", "Shared meaning", 76, 7, "sage"),
    ],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-E",
    alias: "Synthetic case E",
    fictional: true,
    workflowState: "group_ready",
    completion: "complete",
    domains: [
      domain("connection", "Connection", 71, 7, "sage"),
      domain("repair", "Repair after conflict", 47, 9, "coral"),
      domain("trust", "Trust & reliability", 63, 8, "gold"),
      domain("sharedMeaning", "Shared meaning", 84, 3, "sage"),
    ],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-F",
    alias: "Synthetic case F",
    fictional: true,
    workflowState: "facilitator_follow_up",
    completion: "complete",
    domains: [
      domain("connection", "Connection", 57, 22, "sage"),
      domain("repair", "Repair after conflict", 46, 19, "coral"),
      domain("trust", "Trust & reliability", 52, 24, "gold"),
      domain("sharedMeaning", "Shared meaning", 73, 12, "sage"),
    ],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-G",
    alias: "Synthetic case G",
    fictional: true,
    workflowState: "awaiting_partner",
    completion: "partial",
    domains: [],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
  {
    id: "SEM-H",
    alias: "Restricted synthetic case",
    fictional: true,
    workflowState: "private_review",
    completion: "complete",
    domains: [],
    provenance: ORIGINAL_DEMO_PROVENANCE,
  },
];

export const MINIMUM_AGGREGATION_SIZE = 5;

function round(value: number): number {
  return Math.round(value);
}

function buildRecommendations(
  domains: CohortDomainSummary[],
): CohortRecommendation[] {
  if (domains.length === 0) return [];

  const highest = [...domains].sort(
    (a, b) => b.averageIndicator - a.averageIndicator,
  )[0];
  const lowest = [...domains].sort(
    (a, b) => a.averageIndicator - b.averageIndicator,
  )[0];

  return [
    {
      id: "REC-STRENGTH",
      priority: "begin_with_strength",
      title: `Begin with ${highest.label.toLowerCase()}`,
      rationale: `${highest.label} is the strongest authored fixture indicator in the group-ready subset.`,
      format: "10-minute opening reflection using original demonstration language.",
      boundary:
        "This is a synthetic curriculum idea, not a validated group intervention.",
    },
    {
      id: "REC-EMPHASIS",
      priority: "group_emphasis",
      title: `Practice ${lowest.label.toLowerCase()}`,
      rationale: `${lowest.label} is the lowest authored fixture indicator in the group-ready subset.`,
      format:
        "30-minute teaching preview followed by a fictional pause-and-return exercise.",
      boundary:
        "Do not use a group exercise for any couple routed to private review or individual follow-up.",
    },
    {
      id: "REC-BOUNDARY",
      priority: "facilitator_boundary",
      title: "Keep private pathways out of group reporting",
      rationale:
        "Restricted and incomplete cases are excluded from every aggregate and recommendation.",
      format: "Facilitator readiness check before sharing any cohort theme.",
      boundary:
        "Never reveal which couple was excluded or why; a production protocol requires professional review.",
    },
  ];
}

export function buildSyntheticCohortSummary(
  cases: SyntheticCohortCase[],
): CohortSummary {
  const included = cases.filter(
    (item) =>
      item.workflowState === "group_ready" &&
      item.completion === "complete" &&
      item.domains.length > 0,
  );
  const aggregateVisible = included.length >= MINIMUM_AGGREGATION_SIZE;

  const domainReferences = new Map<DemoDomain, CohortDomainIndicator>();
  for (const item of included) {
    for (const candidate of item.domains) {
      if (!domainReferences.has(candidate.domain)) {
        domainReferences.set(candidate.domain, candidate);
      }
    }
  }

  const domains = aggregateVisible
    ? [...domainReferences.values()].flatMap((reference) => {
        const values = included
          .map((item) =>
            item.domains.find(
              (candidate) => candidate.domain === reference.domain,
            ),
          )
          .filter((item): item is CohortDomainIndicator => Boolean(item));

        if (values.length < MINIMUM_AGGREGATION_SIZE) return [];

        return [
          {
            domain: reference.domain,
            label: reference.label,
            fixtureCount: values.length,
            averageIndicator: round(
              values.reduce((sum, item) => sum + item.coupleMean, 0) /
                values.length,
            ),
            averagePerspectiveGap: round(
              values.reduce((sum, item) => sum + item.perspectiveGap, 0) /
                values.length,
            ),
            tone: reference.tone,
          },
        ];
      })
    : [];

  const excluded = cases.filter(
    (item) => !included.some((candidate) => candidate.id === item.id),
  );

  return {
    cohortId: "SPRING-SEMINAR-DEMO",
    cohortVersion: "synthetic-cohort-1.0",
    fictional: true,
    provenance: ORIGINAL_DEMO_PROVENANCE,
    invitedCount: cases.length,
    completedCount: cases.filter((item) => item.completion === "complete")
      .length,
    groupReadyCount: included.length,
    restrictedCount: cases.filter(
      (item) => item.workflowState === "private_review",
    ).length,
    followUpCount: cases.filter(
      (item) => item.workflowState === "facilitator_follow_up",
    ).length,
    awaitingPartnerCount: cases.filter(
      (item) => item.workflowState === "awaiting_partner",
    ).length,
    minimumAggregationSize: MINIMUM_AGGREGATION_SIZE,
    aggregateVisible,
    includedCaseIds: included.map((item) => item.id),
    excludedCaseIds: excluded.map((item) => item.id),
    domains,
    recommendations: buildRecommendations(domains),
    generatedBy: "deterministic-cohort-rules-v1",
  };
}

export const syntheticSeminarSummary = buildSyntheticCohortSummary(
  syntheticSeminarCases,
);
