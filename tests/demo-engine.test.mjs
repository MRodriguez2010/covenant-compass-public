import assert from "node:assert/strict";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import { build } from "esbuild";

const projectRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const bundlePath = path.join(
  tmpdir(),
  `covenant-compass-engine-${process.pid}-${Date.now()}.mjs`,
);

await build({
  bundle: true,
  format: "esm",
  platform: "node",
  stdin: {
    contents: `
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/engine.ts"))};
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/fixtures.ts"))};
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/cohort.ts"))};
      export * from ${JSON.stringify(path.join(projectRoot, "lib/demo/providers.ts"))};
    `,
    loader: "ts",
    resolveDir: projectRoot,
  },
  outfile: bundlePath,
});

const demo = await import(`${pathToFileURL(bundlePath).href}?v=${Date.now()}`);

test.after(async () => {
  await rm(bundlePath, { force: true });
});

test("deterministic engine produces repeatable evidence-linked findings", () => {
  const first = demo.deriveDemoResult(demo.growthFixture);
  const second = demo.deriveDemoResult(demo.growthFixture);
  assert.deepEqual(first, second);
  assert.equal(first.generatedBy, "deterministic-rules-v1");
  assert.equal(first.safetySuppressed, false);
  assert.equal(first.releaseEligible, true);
  assert.equal("overallScore" in first, false);

  const knownEvidence = new Set(
    demo.growthFixture.evidence.map((item) => item.id),
  );
  for (const finding of first.findings) {
    assert.ok(finding.evidenceIds.length > 0);
    for (const id of finding.evidenceIds) {
      assert.ok(knownEvidence.has(id), `Unknown evidence reference ${id}`);
    }
  }
});

test("safety fixture deterministically suppresses reports and AI drafts", () => {
  const result = demo.deriveDemoResult(demo.safetyFixture);
  assert.equal(result.safetySuppressed, true);
  assert.equal(result.releaseEligible, false);
  assert.deepEqual(result.scores, []);
  assert.deepEqual(result.findings, []);
  assert.equal(demo.buildSimulatedAIDraft(result), null);
});

test("simulated AI draft is local, repeatable, and human-review shaped", () => {
  const result = demo.deriveDemoResult(demo.growthFixture);
  const first = demo.buildSimulatedAIDraft(result);
  const second = demo.buildSimulatedAIDraft(result);

  assert.deepEqual(first, second);
  assert.equal(first.modelCalled, false);
  assert.equal(first.generatedBy, "deterministic-template-v1");
  assert.ok(first.themes.every((theme) => theme.evidenceIds.length > 0));
  assert.doesNotMatch(
    first.themes.map((theme) => theme.hypothesis).join(" "),
    /\bdiagnos(?:e|is)|root cause|predicts? divorce\b/i,
  );
});

test("all provider boundaries are disconnected and paid integrations are empty", () => {
  assert.deepEqual(demo.paidRuntimeIntegrations, []);
  for (const provider of Object.values(demo.demoProviderBoundaries)) {
    assert.equal(provider.connected, false);
  }
});

test("synthetic cohort summary is deterministic and includes only group-ready cases", () => {
  const first = demo.buildSyntheticCohortSummary(demo.syntheticSeminarCases);
  const second = demo.buildSyntheticCohortSummary(demo.syntheticSeminarCases);

  assert.deepEqual(first, second);
  assert.equal(first.generatedBy, "deterministic-cohort-rules-v1");
  assert.equal(first.groupReadyCount, 5);
  assert.equal(first.aggregateVisible, true);
  assert.deepEqual(first.includedCaseIds, [
    "SEM-A",
    "SEM-B",
    "SEM-C",
    "SEM-D",
    "SEM-E",
  ]);
  assert.deepEqual(first.excludedCaseIds, ["SEM-F", "SEM-G", "SEM-H"]);
  assert.ok(first.domains.length > 0);
  assert.ok(first.recommendations.length > 0);
});

test("cohort fixtures and summary remain explicitly synthetic and unlicensed", () => {
  for (const fixture of demo.syntheticSeminarCases) {
    assert.equal(fixture.fictional, true);
    assert.equal(fixture.provenance.validationStatus, "synthetic");
    assert.equal(fixture.provenance.licenseStatus, "unlicensed_placeholder");
    assert.equal(fixture.provenance.persistenceMode, "memory_only");
    assert.equal(fixture.provenance.runtimeAI, false);
  }

  assert.equal(demo.syntheticSeminarSummary.fictional, true);
  assert.equal(
    demo.syntheticSeminarSummary.provenance.licenseStatus,
    "unlicensed_placeholder",
  );
  assert.equal(demo.syntheticSeminarSummary.provenance.runtimeAI, false);
});

test("synthetic cohort suppresses aggregates below the minimum group size", () => {
  const belowThresholdCases = demo.syntheticSeminarCases.filter(
    (item) => item.id !== "SEM-E",
  );
  const summary = demo.buildSyntheticCohortSummary(belowThresholdCases);

  assert.equal(summary.groupReadyCount, 4);
  assert.equal(summary.minimumAggregationSize, 5);
  assert.equal(summary.aggregateVisible, false);
  assert.deepEqual(summary.includedCaseIds, [
    "SEM-A",
    "SEM-B",
    "SEM-C",
    "SEM-D",
  ]);
  assert.deepEqual(summary.domains, []);
  assert.deepEqual(summary.recommendations, []);
});

test("synthetic cohort suppresses a domain with fewer than five values", () => {
  const sparseDomainCases = demo.syntheticSeminarCases.map((fixture) =>
    fixture.id === "SEM-E"
      ? {
          ...fixture,
          domains: fixture.domains.filter(
            (domain) => domain.domain !== "trust",
          ),
        }
      : fixture,
  );
  const summary = demo.buildSyntheticCohortSummary(sparseDomainCases);

  assert.equal(summary.aggregateVisible, true);
  assert.equal(summary.groupReadyCount, 5);
  assert.equal(
    summary.domains.some((domain) => domain.domain === "trust"),
    false,
  );
  assert.ok(
    summary.domains.every(
      (domain) => domain.fixtureCount >= summary.minimumAggregationSize,
    ),
  );
});

test("every original demo question has valid fixture response traceability", () => {
  const knownEvidence = new Set(
    demo.growthFixture.evidence.map((item) => item.id),
  );

  for (const question of demo.assessmentQuestions) {
    for (const role of ["alex", "jordan"]) {
      const responseIndex = question.fixtureResponses[role];
      assert.ok(
        Number.isInteger(responseIndex),
        `${question.id} ${role} response must be an integer index`,
      );
      assert.ok(
        responseIndex >= 0 && responseIndex < question.options.length,
        `${question.id} ${role} response index is outside its options`,
      );

      const evidenceIds = question.evidenceIds[role];
      assert.ok(
        evidenceIds.length > 0,
        `${question.id} ${role} response must cite evidence`,
      );
      for (const evidenceId of evidenceIds) {
        assert.ok(
          knownEvidence.has(evidenceId),
          `${question.id} ${role} cites unknown evidence ${evidenceId}`,
        );
      }
    }
  }
});
