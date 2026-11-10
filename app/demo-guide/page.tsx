import Link from "next/link";

import { DemoInfoLayout } from "@/components/demo-info-layout";

const walkthrough = [
  {
    time: "01 min",
    step: "01",
    title: "Set the boundary first",
    action:
      "Point out the dark prototype banner and the provenance badges before showing a result.",
    say: "Everything here is synthetic, unlicensed, deterministic, and designed to test the workflow—not the psychology.",
    destination: "/methodology",
    linkLabel: "Open methodology",
  },
  {
    time: "03 min",
    step: "02",
    title: "Show the individual growth case",
    action:
      "Open the relationship map, then move from Case overview to Findings.",
    say: "The fixture turns two fictional perspectives into evidence-linked working hypotheses, never a single marriage score.",
    destination: "/",
    linkLabel: "Open individual case",
  },
  {
    time: "02 min",
    step: "03",
    title: "Review the no-model draft",
    action:
      "Choose Simulated AI draft and demonstrate approve, reject, and reset.",
    say: "This is a deterministic template. It shows the proposed human-review contract without an API call or AI bill.",
    destination: "/",
    linkLabel: "Open facilitator workspace",
  },
  {
    time: "02 min",
    step: "04",
    title: "Switch to a spouse preview",
    action:
      "Select Alex or Jordan and replay one authored fixture response.",
    say: "The enabled choice is the versioned fictional response behind the pre-authored report. Role switching is not authentication or a real privacy boundary.",
    destination: "/",
    linkLabel: "Open role preview",
  },
  {
    time: "03 min",
    step: "05",
    title: "Demonstrate safety suppression",
    action:
      "Change Demo pathway to Safety pathway and compare facilitator, Alex, and Jordan views.",
    say: "The fictional trigger suppresses group work, reports, recommendations, and partner notification. No real crisis service is connected.",
    destination: "/",
    linkLabel: "Open safety preview",
  },
  {
    time: "03 min",
    step: "06",
    title: "Close with the seminar cohort",
    action:
      "Show the minimum group threshold, aggregate indicators, private exclusions, and seminar emphasis.",
    say: "The cohort view demonstrates how a pastor could plan group teaching while keeping restricted or incomplete cases out of aggregate reporting.",
    destination: "/cohort",
    linkLabel: "Open cohort preview",
  },
];

const stakeholderQuestions = [
  "Does the facilitator workflow match how a pastor would actually prepare for a couple conversation?",
  "Which findings need more context before they would be useful?",
  "What language feels appropriately pastoral without sounding diagnostic?",
  "Should a couple receive a shared summary before, during, or after a facilitated debrief?",
  "What should a pastor see when a case cannot safely enter a joint or group pathway?",
  "Is the individual-case experience or the seminar-cohort experience the stronger first product?",
];

export default function DemoGuidePage() {
  return (
    <DemoInfoLayout
      eyebrow="Stakeholder demo guide"
      title="A focused 15-minute stakeholder walkthrough."
      intro="Use this sequence to demonstrate the product vision while keeping every assumption, privacy limitation, and paid dependency explicit."
    >
      <section className="info-section demo-guide-intro">
        <div>
          <p className="eyebrow">Before you begin</p>
          <h2>Frame this as a workflow decision—not a product claim.</h2>
        </div>
        <div className="demo-guide-boundaries">
          <span>Do say: “synthetic workflow prototype”</span>
          <span>Do say: “working hypothesis”</span>
          <span>Do say: “simulated privacy behavior”</span>
          <span>Do not say: “validated assessment”</span>
          <span>Do not say: “AI found the root cause”</span>
          <span>Do not say: “the system handles crises”</span>
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Walkthrough</p>
          <h2>Move from one fictional couple to a synthetic cohort</h2>
        </div>
        <div className="walkthrough-list">
          {walkthrough.map((item) => (
            <article key={item.step}>
              <div className="walkthrough-index">
                <span>{item.step}</span>
                <small>{item.time}</small>
              </div>
              <div className="walkthrough-copy">
                <h3>{item.title}</h3>
                <p>{item.action}</p>
                <blockquote>“{item.say}”</blockquote>
                <Link href={item.destination}>{item.linkLabel}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-section-heading">
          <p className="eyebrow">Discussion prompts</p>
          <h2>Questions that should shape the next milestone</h2>
        </div>
        <ol className="stakeholder-question-list">
          {stakeholderQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>

      <section className="info-section guide-deferred-card">
        <div>
          <p className="eyebrow">Keep for the end</p>
          <h2>Do not make the demo conversation about vendor selection yet.</h2>
        </div>
        <p>
          Instrument licensing, professional review, Spanish validation,
          production identity, messaging, storage, and live AI stay deferred.
          The immediate stakeholder decision is whether the pastoral workflows,
          safety boundaries, evidence presentation, and cohort use case are
          worth advancing.
        </p>
      </section>
    </DemoInfoLayout>
  );
}
