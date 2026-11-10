import Link from "next/link";
import type { ReactNode } from "react";

import { DEMO_LAST_REVIEWED, DEMO_VERSION } from "@/lib/demo/manifest";

export function DemoInfoLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="info-page">
      <header className="info-header">
        <Link className="info-brand" href="/">
          <span aria-hidden="true">CC</span>
          <div>
            <strong>Covenant Compass</strong>
            <small>Prototype documentation</small>
          </div>
        </Link>
        <Link className="secondary-button" href="/">
          Return to interactive demo
        </Link>
      </header>

      <section className="info-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="provenance-strip" aria-label="Demo status">
          <span>Synthetic fixtures</span>
          <span>Original demo content</span>
          <span>Unlicensed placeholder</span>
          <span>Assumptions—not validated</span>
          <span>No runtime AI</span>
        </div>
      </section>

      <div className="info-content">{children}</div>

      <footer className="info-version">
        <span>Prototype v{DEMO_VERSION}</span>
        <span>Last reviewed {DEMO_LAST_REVIEWED}</span>
      </footer>
    </main>
  );
}
