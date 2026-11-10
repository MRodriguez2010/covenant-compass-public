import { DemoInfoLayout } from "@/components/demo-info-layout";
import { demoProviderBoundaries } from "@/lib/demo/providers";

const dataLifecycle = [
  {
    number: "01",
    title: "Fixture loads",
    text: "A versioned fictional case is bundled with the demo source.",
  },
  {
    number: "02",
    title: "Rules run locally",
    text: "Transparent deterministic rules derive the same indicators and findings every time.",
  },
  {
    number: "03",
    title: "Preview state changes",
    text: "Selections, role switching, release status, and action checks live only in page memory.",
  },
  {
    number: "04",
    title: "Refresh clears it",
    text: "No response, report, message, upload, or audit event is persisted.",
  },
];

export default function DataAndAIPage() {
  return (
    <DemoInfoLayout
      eyebrow="Data & AI"
      title="No real submissions. No model calls. No hidden delivery."
      intro="The prototype is intentionally self-contained. It demonstrates future product boundaries without connecting paid or production services."
    >
      <section className="info-section warning-panel">
        <div className="warning-icon" aria-hidden="true">
          !
        </div>
        <div>
          <p className="eyebrow">Do not enter personal information</p>
          <h2>This demo is not accepting real assessment data.</h2>
          <p>
            The interactive questions are fixed-choice previews for fictional
            roles. There are no fields for names, emails, personal narratives,
            uploads, or real intake details.
          </p>
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Local data lifecycle</p>
          <h2>Temporary by design</h2>
        </div>
        <div className="lifecycle-grid">
          {dataLifecycle.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Provider boundaries</p>
          <h2>Every paid or production service remains disconnected</h2>
        </div>
        <div className="provider-grid">
          {Object.entries(demoProviderBoundaries).map(([id, provider]) => (
            <article key={id}>
              <div className="provider-heading">
                <h3>{provider.label}</h3>
                <span className="status-badge disconnected">
                  {provider.mode.replaceAll("_", " ")}
                </span>
              </div>
              <p>{provider.description}</p>
              <small>Connected: no</small>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section ai-boundary">
        <div>
          <p className="eyebrow">Simulated AI</p>
          <h2>The draft is a deterministic template.</h2>
          <p>
            The facilitator preview uses the same evidence-linked structure
            planned for a future AI draft, but the words come from local rules
            and authored fixture content. No OpenAI API key or model provider is
            configured or called.
          </p>
        </div>
        <ul>
          <li>No diagnosis or treatment direction</li>
          <li>No divorce or outcome prediction</li>
          <li>No independent safety decision</li>
          <li>No automatic release to a spouse</li>
          <li>No names, emails, or narratives sent anywhere</li>
        </ul>
      </section>

      <section className="info-section paid-boundary-card">
        <div>
          <p className="eyebrow">Development approach</p>
          <h2>Codex subscription for building—not app runtime.</h2>
        </div>
        <p>
          Codex assists development through the existing subscription. It is
          not embedded in the website and does not provide AI processing to
          visitors. Any future API integration begins only after Phase 5 and a
          separate budget, privacy, evaluation, and approval gate.
        </p>
      </section>
    </DemoInfoLayout>
  );
}
