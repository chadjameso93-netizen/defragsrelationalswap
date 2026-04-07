import Link from "next/link";
import { HowItWorksSection } from "../../components/marketing/HowItWorksSection";
import { PublicMarketingShell } from "../../components/marketing/public-marketing-shell";
import { marketingCopy } from "../../content/marketingCopy";

export default function HowItWorksPage() {
  return (
    <PublicMarketingShell>
      <section className="mk-section mk-card">
        <div className="mk-kicker">How Defrag works</div>
        <h1 className="mk-h2">One calm flow from messy moment to better next line.</h1>
        <p className="mk-body">
          Public preview and workspace thinking use the same logic: bring the exchange, understand both reads, and leave with a grounded next step.
        </p>
        <div className="mk-actions">
          <Link className="mk-btn mk-btn-primary" href="/enter">Open Defrag</Link>
          <Link className="mk-btn mk-btn-secondary" href="/plans">View plans</Link>
        </div>
      </section>

      <HowItWorksSection copy={marketingCopy.howItWorks} />
    </PublicMarketingShell>
  );
}
