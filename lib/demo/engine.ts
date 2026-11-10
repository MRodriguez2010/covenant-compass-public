import { SIMULATED_AI_PROVENANCE } from "./manifest";
import type {
  DemoCaseFixture,
  DemoEvidence,
  DemoFinding,
  DemoResult,
  SimulatedAIDraft,
} from "./types";

function evidenceLabels(
  evidence: DemoEvidence[],
  evidenceIds: string[],
): string[] {
  const byId = new Map(evidence.map((item) => [item.id, item.label]));
  return evidenceIds.map((id) => byId.get(id) ?? `Missing evidence ${id}`);
}

export function deriveDemoResult(fixture: DemoCaseFixture): DemoResult {
  if (fixture.scenario === "safety") {
    return {
      caseId: fixture.id,
      fixtureVersion: fixture.fixtureVersion,
      scoringVersion: fixture.scoringVersion,
      generatedBy: "deterministic-rules-v1",
      safetySuppressed: true,
      releaseEligible: false,
      scores: [],
      findings: [],
    };
  }

  const scores = fixture.domains.map((domain) => ({
    ...domain,
    gap: Math.abs(domain.alex - domain.jordan),
  }));

  const byDomain = new Map(scores.map((score) => [score.id, score]));
  const findings: DemoFinding[] = [];
  const repair = byDomain.get("repair");
  const trust = byDomain.get("trust");
  const sharedMeaning = byDomain.get("sharedMeaning");

  if (repair && repair.alex < 50 && repair.jordan < 50) {
    const evidenceIds = ["E-REPAIR-A", "E-REPAIR-J", "E-REPAIR-S"];
    findings.push({
      id: "F-REPAIR",
      number: "01",
      status: "Explore first",
      title: "Repair attempts may not be landing",
      summary:
        "The fictional indicators suggest difficulty reconnecting after conflict, even when one person tries.",
      evidenceIds,
      evidence: evidenceLabels(fixture.evidence, evidenceIds),
      question:
        "In this fictional scenario, what might signal that it is safe to return to the conversation?",
      kind: "growth",
    });
  }

  if (trust && trust.gap >= 15) {
    const evidenceIds = ["E-TRUST-GAP", "E-COMMIT"];
    findings.push({
      id: "F-TRUST-GAP",
      number: "02",
      status: "Explore next",
      title: "Trust is experienced differently",
      summary:
        "The fictional couple agrees on commitment but differs in how predictable and emotionally reliable the relationship feels.",
      evidenceIds,
      evidence: evidenceLabels(fixture.evidence, evidenceIds),
      question:
        "What could reliability look like as a small, observable action in this example?",
      kind: "growth",
    });
  }

  if (
    sharedMeaning &&
    sharedMeaning.alex >= 75 &&
    sharedMeaning.jordan >= 75
  ) {
    const evidenceIds = ["E-MEANING-A", "E-MEANING-J", "E-GOAL"];
    findings.push({
      id: "F-MEANING",
      number: "03",
      status: "Protect this strength",
      title: "Shared meaning appears strong",
      summary:
        "The synthetic fixture describes shared faith, investment in family, and a mutual desire to repair.",
      evidenceIds,
      evidence: evidenceLabels(fixture.evidence, evidenceIds),
      question:
        "Which shared value could guide the fictional money conversation?",
      kind: "strength",
    });
  }

  return {
    caseId: fixture.id,
    fixtureVersion: fixture.fixtureVersion,
    scoringVersion: fixture.scoringVersion,
    generatedBy: "deterministic-rules-v1",
    safetySuppressed: false,
    releaseEligible: true,
    scores,
    findings,
  };
}

export function buildSimulatedAIDraft(
  result: DemoResult,
): SimulatedAIDraft | null {
  if (result.safetySuppressed) return null;

  return {
    id: `${result.caseId}-draft-v1`,
    status: "simulated",
    generatedBy: "deterministic-template-v1",
    modelCalled: false,
    caseId: result.caseId,
    themes: result.findings.map((finding) => ({
      id: `T-${finding.id}`,
      title: finding.title,
      hypothesis: finding.summary,
      evidenceIds: finding.evidenceIds,
      uncertainty:
        "Demonstration hypothesis only; a facilitator would need to confirm, revise, or reject it.",
      followUpQuestion: finding.question,
    })),
    prohibitedUses: [
      "Diagnosis or treatment direction",
      "Divorce or outcome prediction",
      "Independent safety decisions",
      "Automatic release to either spouse",
    ],
    provenance: SIMULATED_AI_PROVENANCE,
  };
}
