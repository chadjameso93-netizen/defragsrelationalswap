import type { SimulationApiResponse } from "@/types/contracts";

interface SimulationPreviewProps {
  simulation: SimulationApiResponse | null;
}

export default function SimulationPreview({ simulation }: SimulationPreviewProps) {
  if (!simulation) {
    return (
      <section style={{ padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginTop: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 96 }}>
        <span style={{ color: "#a1a1aa", fontSize: 15, letterSpacing: 0.1, textAlign: "center", width: "100%" }}>
          See how this may land for others
        </span>
      </section>
    );
  }
  const { simulation: sim, structured_synthesis } = simulation;
  return (
    <section style={{ padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginTop: 8, marginBottom: 8 }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: "#f5c98b", background: "rgba(255, 220, 120, 0.07)", borderRadius: 8, padding: "7px 14px", fontWeight: 500, maxWidth: 420, lineHeight: 1.5 }}>
          This may land more easily with a softer start right now.
        </div>
      </div>
      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <h3 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>How this may land</h3>
          <p style={{ fontSize: 15, color: "#e4e4e7", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>{structured_synthesis.other_experience?.split(". ").slice(0,2).join(". ")}</p>
        </div>
        <div>
          <h3 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>What they may need</h3>
          <p style={{ fontSize: 15, color: "#e4e4e7", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>{sim.likely_tension_points?.[0]}</p>
        </div>
        <div>
          <h3 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>What may help this land better</h3>
          <p style={{ fontSize: 15, color: "#e4e4e7", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>{sim.possible_openings?.[0]}</p>
        </div>
      </div>
      <div style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.04)", display: "grid", gap: 10 }}>
        <div>
          <h4 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.13em", margin: 0, marginBottom: 6 }}>How you could say it</h4>
          <p style={{ fontSize: 15, color: "#e4e4e7", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>
            {sim.possible_openings?.[0] || "You could start with a simple, open line."}
          </p>
          <p style={{ fontSize: 15, color: "#e4e4e7", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 500 }}>
            {sim.phrasing_options?.[0] || "Or try a gentler alternative if it feels tense."}
          </p>
          <p style={{ fontSize: 15, color: "#a1a1aa", margin: 0, lineHeight: 1.6, maxWidth: 420, fontWeight: 400 }}>
            {structured_synthesis.other_experience?.split(". ")[0] || "This may land differently for each person."}
          </p>
        </div>
      </div>
    </section>
  );
}
