import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const templateRoot = new URL("../", import.meta.url);
const projectRoot = fileURLToPath(templateRoot);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${pathname}-${process.pid}-${Date.now()}-${Math.random()}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function readSourceTree(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      output.push(...(await readSourceTree(target)));
    } else if (/\.(?:ts|tsx|js|mjs)$/.test(entry.name)) {
      output.push(await readFile(target, "utf8"));
    }
  }
  return output.join("\n");
}

test("server-renders the stakeholder demo with persistent boundaries", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Covenant Compass — Pastoral Workflow Prototype<\/title>/i,
  );
  assert.match(html, /Prototype demonstration/);
  assert.match(html, /original unlicensed questions/i);
  assert.match(html, /no live AI/i);
  assert.match(html, /not validated, clinical, or crisis care/i);
  assert.match(html, /Synthetic case/);
  assert.match(html, /role preview—not authentication/i);
  assert.match(html, /DEMO · SYNTHETIC DATA · NOT FOR CLINICAL USE/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /<input\b|<textarea\b/i);
});

test("methodology route discloses assumptions, claims, and paid gates", async () => {
  const response = await render("/methodology");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Methodology &amp; limitations/i);
  assert.match(html, /Everything shown is a controlled simulation/i);
  assert.match(html, /Assumption—not validated/i);
  assert.match(html, /Claims register/i);
  assert.match(html, /Instrument license and digital-delivery rights after Phase 5/i);
  assert.match(html, /No paid runtime capability is active/i);
});

test("data and AI route proves all production providers are disconnected", async () => {
  const response = await render("/data-and-ai");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /No real submissions\. No model calls\. No hidden delivery/i);
  assert.match(html, /Do not enter personal information/i);
  assert.match(html, /No OpenAI API key or model provider is configured or called/i);
  assert.match(html, /Connected: no/i);
  assert.match(html, /Codex subscription for building—not app runtime/i);
});

test("cohort route preserves synthetic aggregation and no-capture boundaries", async () => {
  const response = await render("/cohort");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Prototype demonstration/i);
  assert.match(html, /original unlicensed questions/i);
  assert.match(html, /no live AI/i);
  assert.match(html, /not validated, clinical, or crisis care/i);
  assert.match(html, /Aggregate simulation—not population insight/i);
  assert.match(html, /no submissions or storage/i);
  assert.match(html, /Restricted, incomplete, and individual-follow-up cases are excluded/i);
  assert.match(html, /Live AI or paid APIs/i);
  assert.doesNotMatch(html, /<input\b|<textarea\b|<form\b/i);
  assert.doesNotMatch(html, />\s*(?:Send|Export)(?:\s|<)/i);
  assert.doesNotMatch(
    html,
    /SEM-[A-H]\b|Synthetic case [A-H](?:\s|<)|Restricted synthetic case/i,
  );
});

test("demo guide route keeps stakeholder claims inside prototype boundaries", async () => {
  const response = await render("/demo-guide");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Prototype demonstration/i);
  assert.match(html, /Synthetic fixtures/i);
  assert.match(html, /Unlicensed placeholder/i);
  assert.match(html, /Assumptions—not validated/i);
  assert.match(html, /No runtime AI/i);
  assert.match(html, /synthetic workflow prototype/i);
  assert.match(html, /Do not say: “validated assessment”/i);
  assert.match(html, /live AI stay deferred/i);
  assert.doesNotMatch(html, /<input\b|<textarea\b|<form\b/i);
  assert.doesNotMatch(html, />\s*(?:Send|Export)(?:\s|<)/i);
});

test("source preserves the no-paid-integration and synthetic-only boundary", async () => {
  const [page, layout, manifest, hosting, packageJson, appSource, libSource] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../lib/demo/manifest.ts", import.meta.url), "utf8"),
      readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readSourceTree(path.join(projectRoot, "app")),
      readSourceTree(path.join(projectRoot, "lib")),
    ]);

  assert.match(page, /Simulated AI draft · no model called/);
  assert.match(page, /role\s+switching\s+is\s+not\s+authentication/i);
  assert.match(page, /Do\s+not\s+use\s+the\s+demo\s+for\s+your\s+relationship/i);
  assert.match(page, /working hypothesis/i);
  assert.match(page, /Simulated joint-work pause/);
  assert.match(layout, /PrototypeBanner/);
  assert.match(manifest, /unlicensed_placeholder/);
  assert.match(manifest, /runtimeAI: false/);
  assert.doesNotMatch(packageJson, /openai|twilio|sendgrid|stripe/i);
  assert.doesNotMatch(
    `${appSource}\n${libSource}`,
    /OPENAI_API_KEY|ANTHROPIC_API_KEY|SENDGRID_API_KEY|TWILIO_/,
  );

  const hostingConfig = JSON.parse(hosting);
  assert.equal(hostingConfig.d1, null);
  assert.equal(hostingConfig.r2, null);

  await assert.rejects(
    access(new URL("app/_sites-preview/SkeletonPreview.tsx", templateRoot)),
  );
  await assert.rejects(
    access(new URL("app/_sites-preview/preview.css", templateRoot)),
  );
});
