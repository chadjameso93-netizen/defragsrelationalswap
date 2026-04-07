import { ClosingScene, HeroScene, QuoteScene, StepScene, TitleCardScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const steps = [
  {
    step: "Step 01",
    title: "Start with your baseline",
    body: "Share core details once so Defrag can frame your communication tendencies in plain language.",
  },
  {
    step: "Step 02",
    title: "Inspect the pattern",
    body: "Open the relationship workspace to map how each person may be reading the same moment differently.",
  },
  {
    step: "Step 03",
    title: "Choose your next move",
    body: "Use guided outputs to pick one lower-pressure next step before you respond.",
  },
];

export default function HomePage() {
  return (
    <PublicPageShell
      eyebrow="Relational intelligence"
      title="The tool you reach for before replying."
      description="Defrag gives you a shared language for what may be happening between two people, then helps you choose what to do next."
    >
      <HeroScene
        lead={(
          <TitleCardScene
            eyebrow="Workspace preview"
            title="See both sides of the same interaction."
            body="Use baseline context + relationship dynamics to understand what landed, why it escalated, and what can lower pressure next."
          />
        )}
        visual={<QuoteScene quote="Both people may care about the relationship, but may be reacting in ways that make each other harder to hear." byline="Defrag preview insight" />}
      />

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-md)" }}>
        {steps.map((item) => (
          <StepScene key={item.step} {...item} />
        ))}
      </section>

      <ClosingScene
        title="Ready to run your own scenario?"
        body="Open Defrag, enter your baseline, and bring a real interaction into the workspace."
        primaryCta={{ href: "/enter", label: "Open Defrag" }}
        secondaryCta={{ href: "/membership", label: "View plans" }}
      />
    </PublicPageShell>
  );
}
