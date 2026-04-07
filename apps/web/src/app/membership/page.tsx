import { ClosingScene, ListScene, StepScene, TitleCardScene } from "../../components/public/primitives";
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
    <PublicPageShell eyebrow="Membership" title="Choose the way in." description="Plan pages now share the same typography, spacing, and CTA treatment as every public route.">
      <TitleCardScene
        title="A consistent public surface"
        body="Membership now uses the same public primitives as landing, pricing, trust, and about pages."
      />

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-md)" }}>
        {tiers.map((tier) => (
          <div key={tier.step} style={{ display: "grid", gap: "var(--space-md)" }}>
            <StepScene step={tier.step} title={tier.title} body={tier.body} />
            <ListScene items={tier.points} />
          </div>
        ))}
      </section>

      <ClosingScene
        title="Wire checkout next"
        body="Connect these plan actions to Stripe checkout routes without changing the presentation system."
        primaryCta={{ href: "/billing", label: "Open billing" }}
      />
    </PublicPageShell>
  );
}
