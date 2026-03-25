export default function TimingHints() {
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
      <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.18em" }}>Timing hints</div>
      <div style={{ display: "grid", gap: 10 }}>
        {[
          "If a conversation ended hot, wait until your body is less busy before reopening it.",
          "If someone already made one repair attempt, acknowledge that before adding your own view.",
          "If the field still feels fragile, ask for ten honest minutes instead of trying to resolve the whole issue.",
        ].map((item) => (
          <div key={item} style={{ padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--color-surface)", border: "1px solid var(--color-surface-hover)", color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: 13 }}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
