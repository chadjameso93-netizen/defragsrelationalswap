export default function TimingHints() {
  const hints = [
    "If a conversation ended hot, wait until your body is less busy before reopening it.",
    "If someone already made one repair attempt, acknowledge that before adding your own view.",
    "If the field still feels fragile, ask for ten honest minutes instead of trying to resolve the whole issue.",
  ];

  return (
    <div style={{ padding: "40px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "grid", gap: 32 }}>
       <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245, 245, 245, 0.4)" }}>Timing hints</div>
       <div style={{ display: "grid", gap: 24 }}>
          {hints.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 8 }}>
               <span style={{ fontSize: 14, color: "rgba(245, 245, 245, 0.3)", fontWeight: 500 }}>{String(i+1).padStart(2, "0")}</span>
               <div style={{ color: "rgba(245, 245, 245, 0.8)", lineHeight: 1.6, fontSize: 13 }}>{item}</div>
            </div>
          ))}
       </div>
    </div>
  );
}
