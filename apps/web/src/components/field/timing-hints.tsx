export default function TimingHints() {
  return (
    <section
      style={{
        padding: 20,
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        display: "grid",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 10, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.18em" }}>Timing hints</div>
      <div style={{ display: "grid", gap: 10 }}>
        {[
          "If a conversation ended hot, wait until your body is less busy before reopening it.",
          "If someone already made one repair attempt, acknowledge that before adding your own view.",
          "If the field still feels fragile, ask for ten honest minutes instead of trying to resolve the whole issue.",
        ].map((item) => (
          <div key={item} style={{ padding: "12px 14px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "#d4d4d8", lineHeight: 1.7, fontSize: 13 }}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
