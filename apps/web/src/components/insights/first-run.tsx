const STARTERS = [
  {
    label: "Partner tension",
    data: { what: "We had a tense exchange that ended with both of us pulling back.", who: "Partner", difficult: "Timing and defensiveness" },
  },
  {
    label: "Family strain",
    data: { what: "A family conversation turned loaded and no one said what they actually meant.", who: "Family member", difficult: "Old roles coming back quickly" },
  },
  {
    label: "Friend distance",
    data: { what: "A friendship has felt more distant after one awkward moment.", who: "Friend", difficult: "Uncertainty about whether to bring it up" },
  },
];

export default function FirstRun({ onComplete }: { onComplete: (data: { what: string; who: string; difficult: string }) => void }) {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
      <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>Start from a common pattern or open a blank insight below.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {STARTERS.map((starter) => (
          <button
            key={starter.label}
            type="button"
            onClick={() => onComplete(starter.data)}
            className="premium-panel premium-fade-up"
            data-delay="2"
            style={{
              textAlign: "left",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text-primary)",
              padding: 16,
              cursor: "pointer",
              display: "grid",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{starter.label}</span>
            <span style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{starter.data.what}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
