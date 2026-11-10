import Link from "next/link";

import { DEMO_LAST_REVIEWED, DEMO_VERSION } from "@/lib/demo/manifest";

export function PrototypeBanner() {
  return (
    <aside className="prototype-banner" aria-label="Prototype limitations">
      <div className="prototype-banner-copy">
        <span className="prototype-kicker">Prototype demonstration</span>
        <span>
          Synthetic data · original unlicensed questions · deterministic
          results · no live AI · not validated, clinical, or crisis care
        </span>
      </div>
      <nav aria-label="Demo documentation">
        <Link href="/demo-guide">Demo guide</Link>
        <Link href="/cohort">Seminar cohort</Link>
        <Link href="/methodology">Methodology &amp; limitations</Link>
        <Link href="/data-and-ai">Data &amp; AI</Link>
        <span className="prototype-version">
          v{DEMO_VERSION} · reviewed {DEMO_LAST_REVIEWED}
        </span>
      </nav>
    </aside>
  );
}

export function DemoFooter() {
  return (
    <footer className="demo-site-footer">
      <strong>Covenant Compass prototype</strong>
      <span>
        For stakeholder review with synthetic fixtures only. Do not use for
        personal, pastoral, clinical, diagnostic, or crisis decisions.
      </span>
      <nav aria-label="Footer navigation">
        <Link href="/">Interactive demo</Link>
        <Link href="/cohort">Seminar cohort</Link>
        <Link href="/demo-guide">Stakeholder guide</Link>
        <Link href="/methodology">Methodology &amp; limitations</Link>
        <Link href="/data-and-ai">Data &amp; AI</Link>
      </nav>
    </footer>
  );
}
