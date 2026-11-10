"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { buildSimulatedAIDraft, deriveDemoResult } from "@/lib/demo/engine";
import {
  actionItems,
  assessmentQuestions,
  growthFixture,
} from "@/lib/demo/fixtures";
import type { DemoRole as Role, DemoScenario as Scenario } from "@/lib/demo/types";

type PastorView = "overview" | "findings" | "draft" | "debrief" | "plan";
type DraftReviewStatus = "unreviewed" | "approved" | "rejected";

const roleLabels: Record<Role, string> = {
  pastor: "Pastor Frank",
  alex: "Alex Rivera",
  jordan: "Jordan Rivera",
};

const demoResult = deriveDemoResult(growthFixture);
const simulatedDraft = buildSimulatedAIDraft(demoResult)!;
const fixtureRoles = ["alex", "jordan"] as const;

const evidenceTraceability = assessmentQuestions.flatMap((question) =>
  fixtureRoles.flatMap((role) =>
    question.evidenceIds[role].map((evidenceId) => ({
      evidenceId,
      questionId: question.id,
      questionVersion: question.version,
      eyebrow: question.eyebrow,
      role,
      response:
        question.options[question.fixtureResponses[role]] ??
        "Missing authored fixture response",
    })),
  ),
);

const ruleTraceability: Record<
  string,
  { rule: string; inputs: string }
> = {
  "F-REPAIR": {
    rule: "repair.alex < 50 AND repair.jordan < 50",
    inputs: "Authored fixture indicators: Alex 38 · Jordan 44",
  },
  "F-TRUST-GAP": {
    rule: "ABS(trust.alex - trust.jordan) >= 15",
    inputs: "Authored fixture indicators: Alex 51 · Jordan 67 · gap 16",
  },
  "F-MEANING": {
    rule: "sharedMeaning.alex >= 75 AND sharedMeaning.jordan >= 75",
    inputs: "Authored fixture indicators: Alex 82 · Jordan 79",
  },
};

if (!simulatedDraft) {
  throw new Error("Growth fixture must produce a simulated draft");
}

const pastorNavigation: Array<{
  id: PastorView;
  number: string;
  label: string;
}> = [
  { id: "overview", number: "01", label: "Case overview" },
  { id: "findings", number: "02", label: "Findings" },
  { id: "draft", number: "03", label: "Simulated AI draft" },
  { id: "debrief", number: "04", label: "Debrief guide" },
  { id: "plan", number: "05", label: "Action plan" },
];

function Brand() {
  return (
    <div className="brand">
      <div className="brand-monogram" aria-hidden="true">
        CC
      </div>
      <div>
        <p className="brand-name">Covenant Compass</p>
        <p className="brand-tagline">Pastoral workflow prototype</p>
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="demo-notice" role="note">
      <div className="demo-notice-copy">
        <span className="demo-dot" aria-hidden="true" />
        <span>
          <strong>Prototype only.</strong> Synthetic people, original unlicensed
          questions, deterministic results, no stored responses, and no live
          AI. Not a clinical, diagnostic, or crisis service.
        </span>
      </div>
      <div className="demo-notice-links">
        <Link href="/methodology">Review assumptions</Link>
        <Link href="/data-and-ai">See data &amp; AI boundary</Link>
      </div>
    </div>
  );
}

function ProvenanceStrip({
  includeAI = false,
}: {
  includeAI?: boolean;
}) {
  return (
    <div className="provenance-strip compact" aria-label="Content provenance">
      <span>Synthetic case</span>
      <span>Original demo content</span>
      <span>Unlicensed placeholder</span>
      <span>Assumption—not validated</span>
      <span>{includeAI ? "Simulated AI" : "Deterministic simulation"}</span>
    </div>
  );
}

function DemoWatermark() {
  return (
    <div className="demo-watermark" aria-label="Demo report watermark">
      DEMO · SYNTHETIC DATA · NOT FOR CLINICAL USE
    </div>
  );
}

function RoleSwitcher({
  role,
  onChange,
}: {
  role: Role;
  onChange: (next: Role) => void;
}) {
  return (
    <div
      className="role-switcher"
      aria-label="Role preview; this does not authenticate a user"
    >
      {(Object.keys(roleLabels) as Role[]).map((item) => (
        <button
          className={role === item ? "role-button active" : "role-button"}
          key={item}
          onClick={() => onChange(item)}
          type="button"
          aria-pressed={role === item}
        >
          <span>{item === "pastor" ? "Facilitator preview" : "Spouse preview"}</span>
          {roleLabels[item]}
        </button>
      ))}
    </div>
  );
}

function ScenarioControl({
  scenario,
  onChange,
}: {
  scenario: Scenario;
  onChange: (next: Scenario) => void;
}) {
  return (
    <label className="scenario-control">
      <span>Demo pathway</span>
      <select
        value={scenario}
        onChange={(event) => onChange(event.target.value as Scenario)}
      >
        <option value="growth">Growth pathway</option>
        <option value="safety">Safety pathway</option>
      </select>
    </label>
  );
}

function AppHeader({
  role,
  scenario,
  onRoleChange,
  onScenarioChange,
}: {
  role: Role;
  scenario: Scenario;
  onRoleChange: (next: Role) => void;
  onScenarioChange: (next: Scenario) => void;
}) {
  return (
    <header className="topbar">
      <div className="mobile-brand">
        <Brand />
      </div>
      <div className="topbar-title">
        <p className="eyebrow">
          Synthetic case {growthFixture.id} · role preview—not authentication
        </p>
        <p>
          {growthFixture.coupleLabel} · Fictional couple · Married{" "}
          {growthFixture.marriageYears} years
        </p>
      </div>
      <div className="topbar-controls">
        <ScenarioControl scenario={scenario} onChange={onScenarioChange} />
        <RoleSwitcher role={role} onChange={onRoleChange} />
      </div>
    </header>
  );
}

function Sidebar({
  activeView,
  onViewChange,
}: {
  activeView: PastorView;
  onViewChange: (next: PastorView) => void;
}) {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-case">
        <p className="eyebrow">Active case</p>
        <h2>Rivera marriage</h2>
        <p>Synthetic fixture · Simulated completion</p>
      </div>
      <nav className="side-nav" aria-label="Pastor workspace">
        {pastorNavigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeView === item.id ? "nav-item active" : "nav-item"}
            onClick={() => onViewChange(item.id)}
            aria-current={activeView === item.id ? "page" : undefined}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <nav className="sidebar-secondary" aria-label="Explore prototype">
        <p className="eyebrow">Explore prototype</p>
        <Link href="/cohort">Seminar cohort</Link>
        <Link href="/demo-guide">Stakeholder guide</Link>
        <Link href="/methodology">Methodology</Link>
      </nav>
      <div className="sidebar-footer">
        <p className="eyebrow">Previewing facilitator role</p>
        <div className="avatar-row">
          <span className="avatar">FC</span>
          <span>
            <strong>Pastor Frank</strong>
            <small>Stakeholder demo persona · not authenticated</small>
          </span>
        </div>
      </div>
    </aside>
  );
}

function ScoreBar({
  value,
  tone,
  name,
}: {
  value: number;
  tone: string;
  name: string;
}) {
  return (
    <div className="score-person">
      <div className="score-person-label">
        <span>{name}</span>
        <strong>{value}</strong>
      </div>
      <div
        className="score-track"
        role="meter"
        aria-label={`${name} synthetic demonstration indicator ${value} out of 100`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <span
          className={`score-fill ${tone}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function RelationshipMap() {
  return (
    <section className="card relationship-card">
      <DemoWatermark />
      <div className="section-heading">
        <div>
          <p className="eyebrow">Relationship map</p>
          <h2>Two perspectives, held side by side</h2>
        </div>
        <span className="status-badge assumption">
          Synthetic indicators—not validated
        </span>
      </div>
      <ProvenanceStrip />
      <div className="score-table">
        {demoResult.scores.map((row) => (
          <div className="score-row" key={row.label}>
            <div className="score-label">{row.label}</div>
            <ScoreBar
              value={row.alex}
              tone={row.tone}
              name="Alex"
            />
            <ScoreBar
              value={row.jordan}
              tone={row.tone}
              name="Jordan"
            />
          </div>
        ))}
      </div>
      <p className="card-footnote">
        Authored fixture values are processed by {demoResult.generatedBy}. They
        are not licensed scores, validated norms, or a measure of marital
        success.
      </p>
    </section>
  );
}

function PatternCard({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const primaryFinding = demoResult.findings[0];

  return (
    <section className="card pattern-card">
      <div className="finding-number">01</div>
      <div className="finding-copy">
        <div className="finding-meta">
          <span className="status-badge priority">Explore first</span>
          <span className="confidence">
            {primaryFinding.evidenceIds.length} synthetic evidence references
          </span>
        </div>
        <p className="eyebrow">Deterministic working hypothesis</p>
        <h2>{primaryFinding.title}</h2>
        <p className="lede">{primaryFinding.summary}</p>
        <div className="evidence-list">
          {primaryFinding.evidence.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="pattern-boundary">
          <strong>Assumption—not validated, licensed, or diagnostic.</strong>
          This fixture demonstrates a hypothesis that a future facilitator
          would need to confirm, revise, or reject.
        </div>
        <button className="primary-button" type="button" onClick={onContinue}>
          Review supporting findings
        </button>
      </div>
    </section>
  );
}

function ReleaseCard({
  released,
  canRelease,
  onRelease,
}: {
  released: boolean;
  canRelease: boolean;
  onRelease: () => void;
}) {
  return (
    <section className="card release-card">
      <div className="release-top">
        <p className="eyebrow">Couple visibility</p>
        <span className={released ? "status-badge ready" : "status-badge neutral"}>
          {released ? "Simulated release" : "Simulated pastor review"}
        </span>
      </div>
      <h3>
        {released
          ? "Shared-summary preview is available"
          : "Facilitator-only view is simulated"}
      </h3>
      <p>
        {released
          ? "The role preview now shows the agreed pattern, strengths, and four-week plan."
          : "A production system would enforce separate access. In this demo, anyone using the role switch can preview every role."}
      </p>
      <div className="release-preview">
        <div>
          <span>Shared strength</span>
          <strong>Shared meaning</strong>
        </div>
        <div>
          <span>Growth focus</span>
          <strong>Repair after conflict</strong>
        </div>
      </div>
      {!released && (
        <button className="secondary-button" type="button" onClick={onRelease}>
          {canRelease
            ? "Simulate approved release"
            : "Review draft before release"}
        </button>
      )}
    </section>
  );
}

function PastorOverview({
  released,
  canRelease,
  onRelease,
  onViewChange,
}: {
  released: boolean;
  canRelease: boolean;
  onRelease: () => void;
  onViewChange: (next: PastorView) => void;
}) {
  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Simulated facilitator workspace</p>
          <h1>Preview a pattern beneath the conflict.</h1>
          <p>
            Begin with two fictional perspectives. Preview one carefully
            reviewed conversation without collecting real information.
          </p>
        </div>
        <div className="case-status">
          <span className="case-status-number">2/2</span>
          <div>
            <strong>Synthetic responses loaded</strong>
            <p>
              Fixture {demoResult.fixtureVersion} · rules{" "}
              {demoResult.scoringVersion}
            </p>
          </div>
        </div>
      </section>
      <DemoNotice />
      <DemoWatermark />
      <ProvenanceStrip />
      <div className="overview-grid">
        <div className="overview-main">
          <RelationshipMap />
          <PatternCard onContinue={() => onViewChange("findings")} />
        </div>
        <aside className="overview-aside">
          <section className="card profile-card">
            <p className="eyebrow">Fictional presenting concern</p>
            <blockquote>{growthFixture.presentingConcern}</blockquote>
            <dl>
              <div>
                <dt>Marriage</dt>
                <dd>{growthFixture.marriageYears} years</dd>
              </div>
              <div>
                <dt>Children</dt>
                <dd>{growthFixture.childrenAtHome} at home</dd>
              </div>
              <div>
                <dt>Faith layer</dt>
                <dd>{growthFixture.faithLayer}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{growthFixture.language}</dd>
              </div>
            </dl>
          </section>
          <ReleaseCard
            released={released}
            canRelease={canRelease}
            onRelease={onRelease}
          />
          <section className="card cohort-callout">
            <div>
              <p className="eyebrow">New no-cost milestone</p>
              <h3>Preview seminar planning at cohort level</h3>
              <p>
                See deterministic group-ready themes without participant rows,
                small-cell details, storage, or a paid service.
              </p>
            </div>
            <Link href="/cohort">Open synthetic cohort</Link>
          </section>
          <section className="principle-card">
            <p className="eyebrow">Facilitator principle</p>
            <p>
              The report should open a door for a better question—not close the
              case with a label.
            </p>
          </section>
        </aside>
      </div>
    </>
  );
}

function FindingsView({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Evidence review</p>
          <h1>Hold the findings lightly.</h1>
          <p>
            Each rule-derived pattern is traceable to versioned synthetic
            evidence. It demonstrates a future review process; it is not a
            validated interpretation.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={onContinue}>
          Preview simulated AI draft
        </button>
      </div>
      <DemoNotice />
      <DemoWatermark />
      <ProvenanceStrip />
      <div className="findings-list">
        {demoResult.findings.map((finding) => (
          <article className="finding-card" key={finding.id}>
            <div className="finding-index">{finding.number}</div>
            <div className="finding-body">
              <div className="finding-meta">
                <span
                  className={
                    finding.number === "01"
                      ? "status-badge priority"
                      : "status-badge neutral"
                  }
                >
                  {finding.status}
                </span>
                <span className="confidence">
                  Deterministic working hypothesis
                </span>
              </div>
              <h2>{finding.title}</h2>
              <p>{finding.summary}</p>
              <div className="evidence-list">
                {finding.evidence.map((item, index) => (
                  <span key={finding.evidenceIds[index]}>
                    <small>{finding.evidenceIds[index]}</small>
                    {item}
                  </span>
                ))}
              </div>
              <details className="traceability-panel">
                <summary>How this result was derived</summary>
                <div className="traceability-rule">
                  <strong>Deterministic rule</strong>
                  <code>{ruleTraceability[finding.id]?.rule}</code>
                  <span>{ruleTraceability[finding.id]?.inputs}</span>
                </div>
                <p>
                  Illustrative responses linked to these evidence IDs are
                  narrative context in fixture {demoResult.fixtureVersion}.
                  They are not converted into indicators, and spouse-preview
                  clicks do not score or change the report.
                </p>
                <div className="traceability-grid">
                  {finding.evidenceIds.flatMap((evidenceId) => {
                    const sources = evidenceTraceability.filter(
                      (source) => source.evidenceId === evidenceId,
                    );

                    return sources.map((source) => (
                      <article
                        className="traceability-item"
                        key={`${evidenceId}-${source.questionId}-${source.role}`}
                      >
                        <div>
                          <span>{evidenceId}</span>
                          <small>
                            {source.questionId} · {source.questionVersion}
                          </small>
                        </div>
                        <strong>
                          {roleLabels[source.role]} · {source.eyebrow}
                        </strong>
                        <p>Authored response: “{source.response}”</p>
                      </article>
                    ));
                  })}
                </div>
              </details>
            </div>
            <div className="question-card">
              <p className="eyebrow">Ask, don’t assume</p>
              <p>{finding.question}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SimulatedDraftView({
  reviewStatus,
  onReview,
  onContinue,
}: {
  reviewStatus: DraftReviewStatus;
  onReview: (status: DraftReviewStatus) => void;
  onContinue: () => void;
}) {
  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Phase 5 · AI-shaped experience</p>
          <h1>Review a simulated draft—without calling a model.</h1>
          <p>
            This preview is assembled by a deterministic local template from
            the evidence IDs shown below. It does not use Codex, an OpenAI API
            key, or any external model at runtime.
          </p>
        </div>
        <span className="status-badge simulated-ai">
          Simulated AI draft · no model called
        </span>
      </div>
      <DemoNotice />
      <DemoWatermark />
      <ProvenanceStrip includeAI />

      <div className="draft-layout">
        <section className="card draft-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Evidence-linked draft</p>
              <h2>Facilitator working notes</h2>
            </div>
            <span className="status-badge assumption">
              Assumption—not validated
            </span>
          </div>
          <div className="draft-meta">
            <span>Generator: {simulatedDraft.generatedBy}</span>
            <span>Model called: {simulatedDraft.modelCalled ? "yes" : "no"}</span>
            <span>Case: {simulatedDraft.caseId}</span>
          </div>
          <div className="draft-themes">
            {simulatedDraft.themes.map((theme, index) => (
              <article key={theme.id}>
                <div className="draft-theme-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3>{theme.title}</h3>
                  <p>{theme.hypothesis}</p>
                  <div className="evidence-id-row">
                    {theme.evidenceIds.map((id) => (
                      <span key={id}>{id}</span>
                    ))}
                  </div>
                  <p className="draft-uncertainty">{theme.uncertainty}</p>
                  <div className="question-card">
                    <p className="eyebrow">Suggested follow-up</p>
                    <p>{theme.followUpQuestion}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="draft-sidebar">
          <section className="card review-card">
            <p className="eyebrow">Mandatory human review simulation</p>
            <h2>
              {reviewStatus === "approved"
                ? "Draft approved for debrief"
                : reviewStatus === "rejected"
                  ? "Draft rejected"
                  : "Pastor decision required"}
            </h2>
            <p>
              A future AI draft must never be released automatically. The
              facilitator confirms the evidence, edits the language, and
              accepts responsibility for the final conversation.
            </p>
            <div className="review-actions">
              {reviewStatus === "unreviewed" ? (
                <>
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => onReview("approved")}
                  >
                    Simulate pastor approval
                  </button>
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => onReview("rejected")}
                  >
                    Reject simulated draft
                  </button>
                </>
              ) : reviewStatus === "approved" ? (
                <>
                  <button
                    className="primary-button"
                    type="button"
                    onClick={onContinue}
                  >
                    Prepare the debrief
                  </button>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => onReview("unreviewed")}
                  >
                    Reset review
                  </button>
                </>
              ) : (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => onReview("unreviewed")}
                >
                  Reset review
                </button>
              )}
            </div>
          </section>
          <section className="card prohibited-card">
            <p className="eyebrow">Prohibited uses</p>
            <ul>
              {simulatedDraft.prohibitedUses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </section>
  );
}

function DebriefView({
  released,
  canRelease,
  onRelease,
  onContinue,
}: {
  released: boolean;
  canRelease: boolean;
  onRelease: () => void;
  onContinue: () => void;
}) {
  const agenda = [
    {
      time: "05 min",
      title: "Set the room",
      detail: "Preview privacy language and invite correction.",
    },
    {
      time: "10 min",
      title: "Begin with strength",
      detail: "Name shared meaning and the mutual desire to repair.",
    },
    {
      time: "20 min",
      title: "Test one pattern",
      detail: "Test one rule-derived hypothesis without assigning blame.",
    },
    {
      time: "10 min",
      title: "Choose one next step",
      detail: "Agree on a pause-and-return practice and follow-up date.",
    },
  ];

  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Simulated facilitated debrief</p>
          <h1>Turn analysis into a safe conversation.</h1>
          <p>
            This shows how a future pastor could confirm, revise, or reject a
            pattern before releasing language or exercises.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={onContinue}>
          Build four-week plan
        </button>
      </div>
      <DemoNotice />
      <DemoWatermark />
      <ProvenanceStrip />
      <div className="debrief-grid">
        <section className="card agenda-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">45-minute session</p>
              <h2>Conversation guide</h2>
            </div>
            <span className="status-badge neutral">
              Simulated facilitator-only view
            </span>
          </div>
          <div className="agenda-list">
            {agenda.map((item, index) => (
              <div className="agenda-item" key={item.title}>
                <div className="agenda-line">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <small>{item.time}</small>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="debrief-side">
          <section className="card language-card">
            <p className="eyebrow">Original demo language · unlicensed</p>
            <blockquote>
              “This does not tell us why you do what you do. It gives us a
              pattern to test together. Tell me where it fits—and where it
              doesn’t.”
            </blockquote>
          </section>
          <ReleaseCard
            released={released}
            canRelease={canRelease}
            onRelease={onRelease}
          />
        </div>
      </div>
    </section>
  );
}

function PlanView({
  released,
  canRelease,
  onRelease,
  completedActions,
  onToggleAction,
}: {
  released: boolean;
  canRelease: boolean;
  onRelease: () => void;
  completedActions: string[];
  onToggleAction: (id: string) => void;
}) {
  return (
    <section className="workspace-section">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Simulated four-week pathway</p>
          <h1>Small practices. Clear ownership.</h1>
          <p>
            Every action names a purpose, cadence, owner, and stop condition.
            These are original demo suggestions—not licensed, validated, or
            professional guidance. Completion changes only in this page.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={onRelease}>
          {released
            ? "Simulated summary released"
            : canRelease
              ? "Simulate approved release"
              : "Review draft before release"}
        </button>
      </div>
      <DemoNotice />
      <DemoWatermark />
      <ProvenanceStrip />
      <div className="plan-layout">
        <div className="action-list">
          {actionItems.map((action) => {
            const checked = completedActions.includes(action.id);
            return (
              <article
                className={checked ? "action-card completed" : "action-card"}
                key={action.id}
              >
                <button
                  className="action-check"
                  type="button"
                  aria-pressed={checked}
                  onClick={() => onToggleAction(action.id)}
                >
                  {checked ? "Done" : "Mark done"}
                </button>
                <div className="action-week">{action.week}</div>
                <div className="action-copy">
                  <h2>{action.title}</h2>
                  <p className="action-purpose">{action.purpose}</p>
                  <p>{action.detail}</p>
                  <div className="action-meta">
                    <span>{action.cadence}</span>
                    <span>{action.owner}</span>
                  </div>
                  <div className="action-stop">
                    <strong>Stop condition</strong>
                    {action.stopCondition}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="card followup-card">
          <p className="eyebrow">Fictional follow-up</p>
          <div className="followup-date">
            <span>28</span>
            <div>
              <strong>August</strong>
              <small>6:30 PM</small>
            </div>
          </div>
          <h3>Pastoral check-in</h3>
          <p>
            Review what was practiced, what felt safe, and whether a licensed
            referral would better serve the couple.
          </p>
          <div className="boundary-note">
            Stop any exercise that increases fear, coercion, retaliation, or
            emotional instability.
          </div>
        </aside>
      </div>
    </section>
  );
}

function SafetyPastorView() {
  return (
    <section className="workspace-section safety-workspace">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">Fictional safety workflow</p>
          <h1>Pause the joint pathway.</h1>
          <p>
            This simulation shows a proposed pause. It does not detect danger,
            notify anyone, or operate a reviewed response protocol.
          </p>
        </div>
        <span className="status-badge safety">
          Simulated joint-work pause
        </span>
      </div>
      <DemoNotice />
      <DemoWatermark />
      <ProvenanceStrip />
      <section className="safety-banner" role="alert">
        <div className="safety-code">S1</div>
        <div>
          <p className="eyebrow">Minimum necessary alert</p>
          <h2>Private safety review required</h2>
          <p>
            This fictional screen intentionally withholds the respondent, exact
            answer, and supporting text. A live system would need an approved
            protocol and qualified human oversight before handling real data.
          </p>
        </div>
      </section>
      <div className="safety-grid">
        <section className="card protocol-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Facilitator protocol preview</p>
              <h2>Protect privacy before interpretation</h2>
            </div>
            <span className="status-badge neutral">
              Simulated facilitator-only view
            </span>
          </div>
          <ol>
            <li>
              <span>01</span>
              Do not confront the other spouse or reveal that a safety answer
              triggered the pause.
            </li>
            <li>
              <span>02</span>
              Contact the respondent privately using the consented safe method.
            </li>
            <li>
              <span>03</span>
              In a live version, follow only an expert-reviewed escalation and
              referral protocol for the respondent’s location.
            </li>
            <li>
              <span>04</span>
              Resume joint work only when an authorized human determines it is
              appropriate.
            </li>
          </ol>
        </section>
        <section className="card suppressed-card">
          <p className="eyebrow">Automatically suppressed</p>
          <h3>No pattern report is available</h3>
          <ul>
            <li>Couple summary and score comparison</li>
            <li>Joint communication exercises</li>
            <li>Partner notifications</li>
            <li>Automated advice or interpretation</li>
          </ul>
          <p className="card-footnote">
            A licensed safety advisor must author the real protocol before any
            live pilot.
          </p>
        </section>
      </div>
    </section>
  );
}

function CoupleSummary({ released }: { released: boolean }) {
  if (!released) {
    return (
      <section className="completion-card">
        <DemoWatermark />
        <ProvenanceStrip />
        <div className="completion-mark">Sample complete</div>
        <p className="eyebrow">Simulated spouse workflow</p>
        <h1>The fictional perspective is complete.</h1>
        <p>
          This previews a future waiting state. No real pastor is reviewing the
          page, and the role switch can open every demo view. Production privacy
          would require authenticated, separate accounts.
        </p>
        <div className="waiting-state">
          <span />
          Simulated summary awaiting facilitator review
        </div>
      </section>
    );
  }

  return (
    <section className="couple-summary">
      <DemoWatermark />
      <ProvenanceStrip />
      <div className="summary-hero">
        <p className="eyebrow">Simulated shared summary</p>
        <h1>You agree on what matters. The next step is learning how to return.</h1>
        <p>
          This demonstrates language that a future facilitator could approve.
          It was not generated by AI or professionally reviewed, and the source
          fixture contains no real responses.
        </p>
      </div>
      <div className="shared-insights">
        <article>
          <span>Shared strength</span>
          <h2>Meaning &amp; commitment</h2>
          <p>
            You both describe faith, family, and repairing the relationship as
            important.
          </p>
        </article>
        <article>
          <span>Growth focus</span>
          <h2>Returning after tension</h2>
          <p>
            Money conversations often stop before either person feels heard.
          </p>
        </article>
      </div>
      <div className="next-practice">
        <p className="eyebrow">This week’s shared practice</p>
        <h2>Build a pause-and-return agreement</h2>
        <p>
          Choose a phrase that pauses the conversation, take 20 minutes, and
          name the exact time you will return.
        </p>
        <div className="action-meta">
          <span>Owner: Together</span>
          <span>Use during conflict</span>
        </div>
      </div>
    </section>
  );
}

function SafetyCoupleView({ role }: { role: Role }) {
  if (role === "jordan") {
    return (
      <section className="completion-card">
        <DemoWatermark />
        <ProvenanceStrip />
        <div className="completion-mark">Sample complete</div>
        <p className="eyebrow">Simulated spouse workflow</p>
        <h1>This role preview withholds the fictional trigger.</h1>
        <p>
          The screen demonstrates minimum-necessary visibility, but it is not
          authenticated privacy. Anyone using the role switch can preview the
          other demonstration roles.
        </p>
        <div className="waiting-state">
          <span />
          Awaiting private facilitator review
        </div>
      </section>
    );
  }

  return (
    <section className="private-safety-card" role="alert">
      <div className="private-label">Simulated private-to-you screen</div>
      <p className="eyebrow">Fictional safety-workflow preview</p>
      <h1>You do not need to continue the couple assessment right now.</h1>
      <p>
        In a live product, this space would show region-appropriate, expert
        reviewed options and a safe way to request human follow-up. Your spouse
        would not receive this answer or be told what triggered the pause.
      </p>
      <div className="private-actions">
        <button className="light-button" type="button">
          Preview private follow-up
        </button>
        <button className="text-button light" type="button">
          Leave this screen
        </button>
      </div>
      <small>
        Demonstration only. No authentication, crisis service, message
        delivery, professional monitoring, or request submission is connected.
      </small>
    </section>
  );
}

function CoupleAssessment({
  role,
  step,
  selected,
  onSelect,
  onContinue,
}: {
  role: "alex" | "jordan";
  step: number;
  selected: number | null;
  onSelect: (index: number) => void;
  onContinue: () => void;
}) {
  const question = assessmentQuestions[step];
  const progress = Math.round(((step + 1) / assessmentQuestions.length) * 100);
  const fixtureResponseIndex = question.fixtureResponses[role];

  return (
    <section className="assessment-shell">
      <div className="assessment-intro">
        <p className="eyebrow">
          Simulated spouse perspective · {roleLabels[role]}
        </p>
        <h1>Preview how both fictional stories could be held.</h1>
        <p>
          Replay the authored answers for this fictional persona only. Do not use the
          demo for your relationship or enter personal information. Role switching is
          not authentication.
        </p>
        <div className="privacy-points">
          <span>Simulated separate-account experience</span>
          <span>Versioned authored fixture responses</span>
          <span>No storage or real privacy guarantee</span>
        </div>
        <div className="consent-preview">
          <strong>Simulated consent checkpoint</strong>
          <span>
            Continuing replays only the versioned synthetic fixture. No
            submission is created, sent, scored, or saved.
          </span>
        </div>
      </div>
      <div className="question-card-large">
        <div className="question-progress">
          <span>
            Preview question {step + 1} of {assessmentQuestions.length}
          </span>
          <strong>{progress}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Demo assessment progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="eyebrow">{question.eyebrow}</p>
        <h2>{question.prompt}</h2>
        <div className="answer-options" role="group" aria-label={question.prompt}>
          {question.options.map((option, index) => (
            <button
              type="button"
              className={[
                "answer-option",
                index === fixtureResponseIndex ? "fixture" : "",
                selected === index ? "selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={option}
              onClick={() => onSelect(index)}
              aria-pressed={selected === index}
              disabled={index !== fixtureResponseIndex}
            >
              <span>{index + 1}</span>
              <div className="answer-option-copy">
                <strong>{option}</strong>
                {index === fixtureResponseIndex && (
                  <small>Authored fixture response · select to replay</small>
                )}
              </div>
            </button>
          ))}
        </div>
        <p className="fixture-response-note">
          Display-only alternatives are disabled so this walkthrough cannot
          imply that a new answer caused the pre-authored report.
        </p>
        <div className="question-footer">
          <p>
            Replay state stays only in page memory and clears on refresh.
          </p>
          <button
            className="primary-button"
            type="button"
            onClick={onContinue}
            disabled={selected === null}
          >
            {step === assessmentQuestions.length - 1
              ? "Complete preview"
              : "Continue preview"}
          </button>
        </div>
      </div>
    </section>
  );
}

function CoupleWorkspace({
  role,
  scenario,
  released,
  partnerSteps,
  selectedAnswers,
  onSelect,
  onContinue,
}: {
  role: "alex" | "jordan";
  scenario: Scenario;
  released: boolean;
  partnerSteps: Record<"alex" | "jordan", number>;
  selectedAnswers: Record<"alex" | "jordan", number | null>;
  onSelect: (index: number) => void;
  onContinue: () => void;
}) {
  if (scenario === "safety") {
    return (
      <div className="couple-page">
        <DemoNotice />
        <SafetyCoupleView role={role} />
      </div>
    );
  }

  if (partnerSteps[role] >= assessmentQuestions.length) {
    return (
      <div className="couple-page">
        <DemoNotice />
        <CoupleSummary released={released} />
      </div>
    );
  }

  return (
    <div className="couple-page">
      <DemoNotice />
      <CoupleAssessment
        role={role}
        step={partnerSteps[role]}
        selected={selectedAnswers[role]}
        onSelect={onSelect}
        onContinue={onContinue}
      />
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState<Role>("pastor");
  const [scenario, setScenario] = useState<Scenario>("growth");
  const [pastorView, setPastorView] = useState<PastorView>("overview");
  const [released, setReleased] = useState(false);
  const [draftReviewStatus, setDraftReviewStatus] =
    useState<DraftReviewStatus>("unreviewed");
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [partnerSteps, setPartnerSteps] = useState({
    alex: 0,
    jordan: assessmentQuestions.length - 1,
  });
  const [selectedAnswers, setSelectedAnswers] = useState<{
    alex: number | null;
    jordan: number | null;
  }>({ alex: null, jordan: null });

  const roleName = useMemo(() => roleLabels[role], [role]);

  function handleScenarioChange(next: Scenario) {
    setScenario(next);
    setPastorView("overview");
    setReleased(false);
    setDraftReviewStatus("unreviewed");
    setCompletedActions([]);
    setPartnerSteps({
      alex: 0,
      jordan: assessmentQuestions.length - 1,
    });
    setSelectedAnswers({ alex: null, jordan: null });
  }

  function toggleAction(id: string) {
    setCompletedActions((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function continueAssessment(partner: "alex" | "jordan") {
    setPartnerSteps((current) => ({
      ...current,
      [partner]: Math.min(
        current[partner] + 1,
        assessmentQuestions.length,
      ),
    }));
    setSelectedAnswers((current) => ({ ...current, [partner]: null }));
  }

  function handleRelease() {
    if (scenario !== "growth" || draftReviewStatus !== "approved") {
      setPastorView("draft");
      return;
    }
    setReleased(true);
  }

  return (
    <div className={role === "pastor" ? "app-shell pastor-shell" : "app-shell"}>
      {role === "pastor" && (
        <Sidebar activeView={pastorView} onViewChange={setPastorView} />
      )}
      <main className="main-shell">
        <AppHeader
          role={role}
          scenario={scenario}
          onRoleChange={setRole}
          onScenarioChange={handleScenarioChange}
        />
        <div className="page-content">
          <p className="sr-only">Current preview role: {roleName}</p>
          {role === "pastor" ? (
            scenario === "safety" ? (
              <SafetyPastorView />
            ) : pastorView === "overview" ? (
              <PastorOverview
                released={released}
                canRelease={draftReviewStatus === "approved"}
                onRelease={handleRelease}
                onViewChange={setPastorView}
              />
            ) : pastorView === "findings" ? (
              <FindingsView onContinue={() => setPastorView("draft")} />
            ) : pastorView === "draft" ? (
              <SimulatedDraftView
                reviewStatus={draftReviewStatus}
                onReview={setDraftReviewStatus}
                onContinue={() => setPastorView("debrief")}
              />
            ) : pastorView === "debrief" ? (
              <DebriefView
                released={released}
                canRelease={draftReviewStatus === "approved"}
                onRelease={handleRelease}
                onContinue={() => setPastorView("plan")}
              />
            ) : (
              <PlanView
                released={released}
                canRelease={draftReviewStatus === "approved"}
                onRelease={handleRelease}
                completedActions={completedActions}
                onToggleAction={toggleAction}
              />
            )
          ) : (
            <CoupleWorkspace
              role={role}
              scenario={scenario}
              released={released}
              partnerSteps={partnerSteps}
              selectedAnswers={selectedAnswers}
              onSelect={(index) =>
                setSelectedAnswers((current) => ({
                  ...current,
                  [role]: index,
                }))
              }
              onContinue={() => continueAssessment(role)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
