import Link from "next/link";

import { syntheticSeminarSummary } from "@/lib/demo/cohort";

export default function CohortPage() {
  const summary = syntheticSeminarSummary;

  return (
    <main className="cohort-page">
      <header className="cohort-header">
        <Link className="info-brand" href="/">
          <span aria-hidden="true">CC</span>
          <div>
            <strong>Covenant Compass</strong>
            <small>Synthetic seminar workspace</small>
          </div>
        </Link>
        <nav aria-label="Cohort navigation">
          <Link href="/demo-guide">Stakeholder demo guide</Link>
          <Link className="secondary-button" href="/">
            Open individual case
          </Link>
        </nav>
      </header>

      <section className="cohort-hero">
        <div>
          <p className="eyebrow">Pastor cohort preview</p>
          <h1>Plan a seminar without exposing a couple.</h1>
          <p>
            This synthetic workspace demonstrates how a pastor could see
            aggregate themes, separate private pathways, and plan a group
            session. It is not a licensed assessment or validated ministry
            recommendation.
          </p>
        </div>
        <aside className="cohort-context">
          <span className="status-badge assumption">
            Synthetic cohort only
          </span>
          <h2>Spring Marriage Seminar</h2>
          <p>
            {summary.invitedCount} synthetic case fixtures · not enrolled
            couples · no submissions or storage
          </p>
          <small>
            Cohort {summary.cohortVersion} · {summary.generatedBy}
          </small>
        </aside>
      </section>

      <section className="cohort-disclosure" role="note">
        <strong>Aggregate simulation—not population insight.</strong>
        Each authored domain average appears only when at least{" "}
        {summary.minimumAggregationSize} group-ready synthetic values are
        available for that domain. Restricted, incomplete, and
        individual-follow-up cases are excluded.
      </section>

      <div className="cohort-metrics" aria-label="Synthetic cohort status">
        <article>
          <span>{summary.invitedCount}</span>
          <div>
            <strong>Synthetic case fixtures</strong>
            <small>Not enrolled couples</small>
          </div>
        </article>
        <article>
          <span>{summary.completedCount}</span>
          <div>
            <strong>Sample pairs complete</strong>
            <small>No real respondents</small>
          </div>
        </article>
        <article>
          <span>{summary.groupReadyCount}</span>
          <div>
            <strong>Group-ready fixtures</strong>
            <small>Included in aggregate</small>
          </div>
        </article>
        <article>
          <span>{summary.excludedCaseIds.length}</span>
          <div>
            <strong>Excluded fixtures</strong>
            <small>No reason or identity shown</small>
          </div>
        </article>
      </div>

      <div className="cohort-dashboard-grid">
        <section className="card cohort-domain-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Group-ready subset</p>
              <h2>Authored fixture indicator averages</h2>
            </div>
            <span className="status-badge assumption">
              Not norms or validated scores
            </span>
          </div>
          <div className="cohort-domain-list">
            {summary.domains.map((domain) => (
              <article key={domain.domain}>
                <div className="cohort-domain-heading">
                  <strong>{domain.label}</strong>
                  <span>{domain.averageIndicator}</span>
                </div>
                <div
                  className="cohort-domain-track"
                  role="meter"
                  aria-label={`${domain.label} synthetic cohort indicator ${domain.averageIndicator} out of 100`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={domain.averageIndicator}
                >
                  <span
                    className={domain.tone}
                    style={{ width: `${domain.averageIndicator}%` }}
                  />
                </div>
                <small>
                  {domain.fixtureCount} synthetic fixtures · average fictional
                  perspective gap:{" "}
                  {domain.averagePerspectiveGap} points
                </small>
              </article>
            ))}
          </div>
          <p className="card-footnote">
            These values demonstrate deterministic aggregation. They do not
            measure effectiveness, distress, compatibility, or marital health.
          </p>
        </section>

        <aside className="card cohort-privacy-card">
          <p className="eyebrow">Aggregation guardrail</p>
          <div className="cohort-threshold">
            <span>{summary.groupReadyCount}</span>
            <small>
              of {summary.minimumAggregationSize} minimum synthetic cases
            </small>
          </div>
          <h2>Threshold met for this fixture</h2>
          <p>
            The demonstration hides aggregate indicators below the minimum
            group size. Production thresholds and privacy policy still require
            legal and professional review.
          </p>
          <ul>
            <li>No couple names</li>
            <li>No individual response excerpts</li>
            <li>No restricted case details</li>
            <li>No incomplete cases in averages</li>
          </ul>
        </aside>
      </div>

      <section className="cohort-section">
        <div className="cohort-section-heading">
          <div>
            <p className="eyebrow">Deterministic planning preview</p>
            <h2>Possible seminar emphasis</h2>
          </div>
          <p>
            Original demonstration ideas only. A licensed instrument,
            qualified reviewers, and approved curriculum are deferred.
          </p>
        </div>
        <div className="recommendation-grid">
          {summary.recommendations.map((recommendation, index) => (
            <article className="card recommendation-card" key={recommendation.id}>
              <span className="recommendation-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <small>{recommendation.priority.replaceAll("_", " ")}</small>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.rationale}</p>
              <div>
                <strong>Format preview</strong>
                <span>{recommendation.format}</span>
              </div>
              <div className="recommendation-boundary">
                <strong>Boundary</strong>
                <span>{recommendation.boundary}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card cohort-readiness">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aggregate workflow readiness</p>
            <h2>Show planning status without showing a case list</h2>
          </div>
          <span className="status-badge assumption">
            Synthetic aggregate—not evidence
          </span>
        </div>
        <div className="cohort-readiness-grid">
          <article>
            <strong>{summary.groupReadyCount} group-ready fixtures</strong>
            <p>
              Included only because the synthetic subset meets the minimum
              aggregation threshold.
            </p>
          </article>
          <article>
            <strong>{summary.excludedCaseIds.length} excluded fixtures</strong>
            <p>
              Combined without identifiers or reason-level counts to avoid
              modeling a small-cell disclosure.
            </p>
          </article>
          <article>
            <strong>Private pathways stay private</strong>
            <p>
              Incomplete, follow-up, and restricted fixture details never
              appear in seminar-planning signals.
            </p>
          </article>
        </div>
        <p className="card-footnote">
          This page intentionally has no participant search, row-level table,
          safety rollup, export, or messaging control.
        </p>
      </section>

      <section className="cohort-next-gate">
        <div>
          <p className="eyebrow">Deferred until the end</p>
          <h2>What this preview intentionally does not activate</h2>
        </div>
        <div className="cohort-gate-list">
          <span>Licensed assessment content</span>
          <span>Validated group norms</span>
          <span>Professional curriculum review</span>
          <span>Pastor and participant accounts</span>
          <span>Email invitations or reminders</span>
          <span>Database or file storage</span>
          <span>Live AI or paid APIs</span>
          <span>Real seminar enrollment</span>
        </div>
      </section>
    </main>
  );
}
