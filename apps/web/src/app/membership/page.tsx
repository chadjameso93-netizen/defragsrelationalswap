import Link from "next/link";
import { PublicPageShell } from "../../components/public/page-shell";

const tiers = [
  {
    step: "Preview",
    title: "$0",
    body: "Best for trying the flow.",
    points: ["Baseline intake preview", "Relationship workspace access", "Mobile workspace view"],
  },
  {
    step: "Core",
    title: "$24/mo",
    body: "Best for regular personal use.",
    points: ["Saved baseline profile", "Full workspace access", "Family overlays and focused threads"],
  },
  {
    step: "Deep Work",
    title: "$72/mo",
    body: "Best for extended reflection and family mapping.",
    points: ["Expanded family layering", "Longer guided sessions", "Priority access to deeper workspace features"],
  },
];

export default function MembershipPage() {
  return (
    <PublicPageShell
      eyebrow="Membership"
      title="Choose the way in"
      description="Pick a plan, then move into the Defrag intake flow."
    >
      <section className="public-card public-stack-md" style={{ padding: "1.25rem" }}>
        {tiers.map((tier) => (
          <article key={tier.step} className="public-legal-row">
            <p className="public-eyebrow" style={{ marginTop: "0.3rem" }}>{tier.step}</p>
            <div className="public-stack-sm">
              <h2 className="public-title-sm">{tier.title}</h2>
              <p className="public-body public-muted">{tier.body}</p>
              <ul className="public-list">
                {tier.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div>
                <Link className="public-cta public-cta-primary" href="/enter">Select plan</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </PublicPageShell>
  );
}
