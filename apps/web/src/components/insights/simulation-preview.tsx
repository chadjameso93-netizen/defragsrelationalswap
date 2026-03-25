import type { SimulationApiResponse } from "@/types/contracts";

interface SimulationPreviewProps {
  simulation: SimulationApiResponse | null;
}

export default function SimulationPreview({ simulation }: SimulationPreviewProps) {
  // Awareness line variants
  const awarenessVariants = [
    "This may land more easily with a softer start right now.",
    "This may be a slightly sensitive moment to bring this up.",
    "A steadier approach may help this come across more clearly right now."
  ];
  // Deterministic rotation: changes every minute
  const variantIndex = Math.floor(Date.now() / 60000) % awarenessVariants.length;
  const awarenessLine = awarenessVariants[variantIndex];

  if (!simulation) {
    return (
      <section style={{ padding: "24px 20px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "var(--color-surface)", marginTop: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 96 }}>
        <span style={{ color: "var(--color-text-secondary)", fontSize: 15, letterSpacing: 0.1, textAlign: "center", width: "100%" }}>
          See how this may land for others
        </span>
      </section>
    );
  }

  const [firstBranch, secondBranch, thirdBranch] = simulation.branches;

  return (
    <section style={{ padding: "24px 20px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "var(--color-surface)", marginTop: 8, marginBottom: 8 }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: "var(--color-accent)", background: "rgba(255, 220, 120, 0.07)", borderRadius: 8, padding: "7px 14px", fontWeight: 500, maxWidth: 420, lineHeight: 1.5 }}>
          {awarenessLine}
        </div>
      </div>
      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <h3 style={{ fontSize: 12, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>How this may land</h3>
          <p style={{ fontSize: 15, color: "var(--color-text-primary)", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>
            {firstBranch || "This may land more clearly if the opening feels simple and non-accusing."}
          </p>
        </div>
        <div>
          <h3 style={{ fontSize: 12, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>What they may need</h3>
          <p style={{ fontSize: 15, color: "var(--color-text-primary)", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>
            {secondBranch || "A little more space, specificity, and less urgency."}
          </p>
        </div>
      </div>
      <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid var(--color-surface-hover)", display: "grid", gap: 10 }}>
        <div>
          <h4 style={{ fontSize: 12, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.13em", margin: 0, marginBottom: 6 }}>How you could say it</h4>
          <p style={{ fontSize: 15, color: "var(--color-text-primary)", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>
            {thirdBranch || "You could start with something simple and open, like ‘Could we talk for a minute?’"}
          </p>
          <p style={{ fontSize: 15, color: "var(--color-text-primary)", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>
            Or try a gentler alternative, such as “I want to make sure this comes across the right way.”
          </p>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 400 }}>
            This may land differently for each person or group, and that’s okay.
          </p>
        </div>
      </div>
    </section>
  );
}
