export default function StateSummary() {
  return (
    <section
      style={{
        padding: 20,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        display: "grid",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.18em" }}>State summary</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[
          ["Steadiest area", "One or two relationships still feel readable and open enough for gentle repair."],
          ["Watchpoint", "Distance is more likely to accumulate where the conversation stayed unfinished."],
          ["Suggested approach", "Use observation first, then ask one low-pressure question rather than explaining everything."],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: 14, borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.16)", border: "1px solid var(--color-surface-hover)" }}>
            <div style={{ fontSize: 11, color: "var(--color-text-primary)", marginBottom: 8 }}>{label}</div>
            <div style={{ color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 1.7 }}>{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
