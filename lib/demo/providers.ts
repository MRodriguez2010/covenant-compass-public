import { buildSimulatedAIDraft, deriveDemoResult } from "./engine";
import { growthFixture } from "./fixtures";

export type DemoProviderMode =
  | "local_fixture"
  | "browser_memory"
  | "blocked"
  | "simulated";

export interface DemoProviderBoundary {
  label: string;
  mode: DemoProviderMode;
  connected: false;
  description: string;
}

export const demoProviderBoundaries = {
  repository: {
    label: "Assessment repository",
    mode: "local_fixture",
    connected: false,
    description: "Reads versioned synthetic fixtures bundled with the demo.",
  },
  identity: {
    label: "Identity provider",
    mode: "simulated",
    connected: false,
    description: "Role switching previews views; it does not authenticate users.",
  },
  notifications: {
    label: "Email and SMS",
    mode: "blocked",
    connected: false,
    description: "No messages or private follow-up requests are sent.",
  },
  licensedInstrument: {
    label: "Licensed instrument",
    mode: "blocked",
    connected: false,
    description: "Only original demonstration questions are available.",
  },
  aiSummary: {
    label: "AI summary provider",
    mode: "simulated",
    connected: false,
    description: "A deterministic local template produces the preview draft.",
  },
  fileStorage: {
    label: "File storage",
    mode: "blocked",
    connected: false,
    description: "No report, response, or upload is persisted.",
  },
  audit: {
    label: "Audit trail",
    mode: "browser_memory",
    connected: false,
    description: "Preview events disappear when the page is refreshed.",
  },
} satisfies Record<string, DemoProviderBoundary>;

export const demoRepository = Object.freeze({
  getCase() {
    return growthFixture;
  },
});

export const simulatedSummaryProvider = Object.freeze({
  generate() {
    return buildSimulatedAIDraft(deriveDemoResult(demoRepository.getCase()));
  },
});

export const paidRuntimeIntegrations: readonly string[] = Object.freeze([]);
