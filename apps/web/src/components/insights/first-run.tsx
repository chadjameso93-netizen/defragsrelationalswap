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
      <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa" }}>Start from a common pattern or open a blank read below.</p>
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
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
              color: "#f5f5f5",
              padding: 16,
              cursor: "pointer",
              display: "grid",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#71717a" }}>{starter.label}</span>
            <span style={{ fontSize: 13, lineHeight: 1.6, color: "#d4d4d8" }}>{starter.data.what}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
