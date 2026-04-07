import { ClosingScene, StepScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const tiers = [
  { step: "Base", title: "Included", body: "Standard tracking and identification for initial context building." },
  { step: "Core", title: "$15 / mo", body: "Unlimited insight processing and structured interpretation panels." },
  { step: "Studio", title: "$45 / mo", body: "Deep temporal analysis and extended interaction history." },
];

export default function PublicPricingPage() {
  return (
    <PublicPageShell eyebrow="Pricing" title="Choose the level of support that fits." description="Same visual tokens, same layout primitives, regardless of page owner.">
      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-md)" }}>
        {tiers.map((tier) => (
          <StepScene key={tier.step} step={tier.step} title={tier.title} body={tier.body} />
        ))}
      </section>
      <ClosingScene
        title="Create your workspace"
        body="Sign in to pick a plan and start analyzing real interactions."
        primaryCta={{ href: "/login", label: "Sign up" }}
      />
    </PublicPageShell>
  );
}
