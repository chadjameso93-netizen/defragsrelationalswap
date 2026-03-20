import { guidancePhrasing } from "@/lib/guidance-rules";

export default function PerspectiveNote() {
  return (
    <div style={{ padding: "24px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, background: "rgba(255,255,255,0.02)" }}>
      <h3 style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>From another side</h3>
      <div style={{ display: "grid", gap: 14 }}>
        {guidancePhrasing.otherSideGuidance.map((note, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#52525b", marginTop: 1 }}>•</span>
            <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", lineHeight: 1.6 }}>{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
