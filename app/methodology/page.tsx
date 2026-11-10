import { DemoInfoLayout } from "@/components/demo-info-layout";
import {
  CLAIMS_REGISTER,
  DEMO_ASSUMPTIONS,
  DEMO_BOUNDARIES,
  DEMO_PHASES,
} from "@/lib/demo/manifest";

export default function MethodologyPage() {
  return (
    <DemoInfoLayout
      eyebrow="Methodology & limitations"
      title="What this prototype demonstrates—and what it does not."
      intro="This milestone is a workflow prototype built to help stakeholders evaluate the experience before paid licensing, professional validation, production identity, or live AI work begins."
    >
      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Current milestone</p>
          <h2>Phases 0–5 are represented in the stakeholder demo.</h2>
          <p>
            “Implemented” here means the synthetic, no-new-spend demonstration
            behavior exists. It does not mean the production, licensed, or
            professionally approved equivalent exists.
          </p>
        </div>
        <div className="phase-grid">
          {DEMO_PHASES.map((phase) => (
            <article key={phase.number}>
              <span>{phase.number}</span>
              <div>
                <small>Implemented demo phase</small>
                <h3>{phase.title}</h3>
                <p>{phase.evidence}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Current boundary</p>
          <h2>Everything shown is a controlled simulation.</h2>
        </div>
        <ul className="boundary-grid">
          {DEMO_BOUNDARIES.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Assumption register</p>
          <h2>What still needs evidence, approval, or a license</h2>
          <p>
            These assumptions guide the interface, but they are not claims
            about effectiveness, validity, legal compliance, or clinical
            safety.
          </p>
        </div>
        <div className="assumption-list">
          {DEMO_ASSUMPTIONS.map((item) => (
            <article className="assumption-card" key={item.area}>
              <div>
                <span className="status-badge assumption">
                  Assumption—not validated
                </span>
                <h3>{item.area}</h3>
              </div>
              <dl>
                <div>
                  <dt>What exists now</dt>
                  <dd>{item.current}</dd>
                </div>
                <div>
                  <dt>What is assumed</dt>
                  <dd>{item.assumption}</dd>
                </div>
                <div>
                  <dt>Deferred paid gate</dt>
                  <dd>{item.paidGate}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Claims register</p>
          <h2>Language reviewers can trust</h2>
        </div>
        <div className="claims-table" role="table" aria-label="Prototype claims">
          <div className="claims-row claims-head" role="row">
            <span role="columnheader">Potential claim</span>
            <span role="columnheader">Current status</span>
            <span role="columnheader">Approved demo wording</span>
          </div>
          {CLAIMS_REGISTER.map((item) => (
            <div className="claims-row" role="row" key={item.claim}>
              <span role="cell">{item.claim}</span>
              <strong role="cell">{item.status}</strong>
              <span role="cell">{item.allowed}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section paid-boundary-card">
        <div>
          <p className="eyebrow">Phase 5 boundary</p>
          <h2>No paid runtime capability is active.</h2>
        </div>
        <p>
          Assessment licensing, external professional review, production
          identity, persistent storage, messaging, security services, and model
          APIs are intentionally deferred until a separately approved Phase 6.
        </p>
      </section>
    </DemoInfoLayout>
  );
}
