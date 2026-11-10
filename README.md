# Covenant Compass prototype

A portfolio demonstration of a facilitator-guided workshop and de-identified cohort reporting. All couples and responses in the fixture are fictional.

A Sites-backed product demo for a facilitator-guided, faith-based
marital workflow.

## Phase 0–5 milestone

The current milestone intentionally requires no paid runtime integration beyond
the existing development and Sites access. It contains only:

- versioned synthetic couple fixtures;
- original, unlicensed illustrative questions;
- transparent deterministic rules and indicators;
- browser-memory interaction state that clears on refresh;
- simulated facilitator, spouse, consent, staged-release, safety, and action-plan
  views;
- a deterministic simulated-AI draft with mandatory review controls;
- evidence-to-question traceability for every pre-authored result;
- a deterministic synthetic seminar-cohort view with minimum-size suppression;
- a stakeholder walkthrough guide;
- methodology, assumptions, claims, data, and AI disclosure pages.

It does not collect or persist assessment submissions, call an AI model, provide
therapy, diagnose a condition, authenticate the previewed roles, or connect to
crisis services, email, SMS, analytics, payments, databases, or file storage.
The role switch previews future access boundaries; it does not enforce them.

The public-facing prototype language must remain consistent with
`lib/demo/manifest.ts`. Licensed instruments, professional review, production
identity, persistent storage, real submissions, and model APIs are deferred
until a separately approved post-Phase-5 milestone.

## Demo routes

- `/` — interactive synthetic role and workflow preview;
- `/cohort` — privacy-conscious synthetic seminar-planning aggregate;
- `/demo-guide` — focused stakeholder walkthrough and discussion prompts;
- `/methodology` — assumptions, limitations, paid gates, and claims register;
- `/data-and-ai` — temporary data lifecycle and disconnected-provider status.

## Local preview

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The local server prints the preview URL. Changes under `app/` update through the
development server.

## Validation

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

The project uses the bundled vinext/Sites runtime with a neutral local configuration.
