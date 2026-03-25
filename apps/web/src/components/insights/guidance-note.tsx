export default function GuidanceNote() {
  return (
    <section
      style={{
        display: "grid",
        gap: 10,
        padding: 18,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, color: "#f4f4f5", fontWeight: 500 }}>A steadier frame</p>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
        Use this insight as orientation, not proof. If you bring any part of it into a real conversation, keep it light,
        specific, and open enough for the other person to correct what does not fit.
      </p>
    </section>
  );
}
