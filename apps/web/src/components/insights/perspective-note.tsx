import { guidancePhrasing } from "@/lib/guidance-rules";

export default function PerspectiveNote() {
  return (
    <div style={{ padding: "24px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "var(--color-surface)" }}>
      <h3 style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 20 }}>From another side</h3>
      <div style={{ display: "grid", gap: 14 }}>
        {guidancePhrasing.otherSideGuidance.map((note, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#52525b", marginTop: 1 }}>•</span>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
