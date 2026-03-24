export default function StateSummary() {
  return (
    <section
      style={{
        padding: 20,
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.025)",
        display: "grid",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>State summary</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[
          ["Steadiest area", "One or two relationships still feel readable and open enough for gentle repair."],
          ["Watchpoint", "Distance is more likely to accumulate where the conversation stayed unfinished."],
          ["Suggested posture", "Use observation first, then ask one low-pressure question rather than explaining everything."],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.16)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 11, color: "#f5f5f5", marginBottom: 8 }}>{label}</div>
            <div style={{ color: "#a1a1aa", fontSize: 13, lineHeight: 1.7 }}>{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
