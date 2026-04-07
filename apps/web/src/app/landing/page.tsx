import { ClosingScene, HeroScene, ListScene, StepScene, TitleCardScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const pillars = ["Simple language", "Relationship workspace", "Perspective comparison", "Practical next-step guidance"];

export default function LandingPage() {
  return (
    <PublicPageShell
      eyebrow="Defrag"
      title="Understand hard relationship moments faster."
      description="Public pages now share a single system of spacing, type, background, motion, and CTA tokens for consistent experience."
    >
      <HeroScene
        lead={<TitleCardScene title="From uncertainty to a clear next step." body="Defrag helps you identify the pattern, compare perspectives, and respond with less friction." />}
        visual={<ListScene title="What you get" items={pillars} />}
      />

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "var(--space-md)" }}>
        <StepScene step="01" title="Baseline" body="Capture personal context once." />
        <StepScene step="02" title="Workspace" body="Bring difficult interactions into one place." />
        <StepScene step="03" title="Action" body="Choose a practical next reply." />
      </section>

      <ClosingScene
        title="Move from reaction to intention."
        body="Open the workspace and run a real conversation through Defrag."
        primaryCta={{ href: "/enter", label: "Open Defrag" }}
        secondaryCta={{ href: "/studio#how-it-works", label: "How it works" }}
      />
    </PublicPageShell>
  );
}
