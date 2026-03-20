import type { SimulationApiResponse } from "@/types/contracts";

interface SimulationPreviewProps {
  simulation: SimulationApiResponse | null;
}

export default function SimulationPreview({ simulation }: SimulationPreviewProps) {
  if (!simulation) return null;
  const { simulation: sim, structured_synthesis } = simulation;
  return (
    <section style={{ padding: "24px 20px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, background: "rgba(255,255,255,0.02)", marginTop: 8, marginBottom: 8 }}>
      <div style={{ display: "grid", gap: 18 }}>
        <div>
          <h3 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>How this may land for them</h3>
          <p style={{ fontSize: 14, color: "#a1a1aa", margin: 0 }}>{structured_synthesis.other_experience}</p>
        </div>
        <div>
          <h3 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>What may help it land more clearly</h3>
          <p style={{ fontSize: 14, color: "#a1a1aa", margin: 0 }}>{sim.possible_openings[0]}</p>
        </div>
        <div>
          <h3 style={{ fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0, marginBottom: 8 }}>One gentler place to begin</h3>
          <p style={{ fontSize: 14, color: "#a1a1aa", margin: 0 }}>{sim.phrasing_options[0]}</p>
        </div>
      </div>
    </section>
  );
}

