export default function StateSummary() {
  const summaries = [
    ["Steadiest area", "One or two relationships still feel readable and open enough for gentle repair."],
    ["Watchpoint", "Distance is more likely to accumulate where the conversation stayed unfinished."],
    ["Suggested approach", "Use observation first, then ask one low-pressure question rather than explaining everything."],
  ];

  return (
    <div style={{ padding: "40px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "grid", gap: 32 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245, 245, 245, 0.4)" }}>State summary</div>
      <div style={{ display: "grid", gap: 32 }}>
        {summaries.map(([label, value]) => (
          <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{label}</div>
            <div style={{ color: "rgba(245, 245, 245, 0.7)", fontSize: 15, lineHeight: 1.7, fontWeight: 300 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
