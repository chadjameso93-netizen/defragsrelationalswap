export default function GuidanceNote() {
  return (
    <section
      style={{
        display: "grid",
        gap: 10,
        padding: 18,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.025)",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, color: "#f4f4f5", fontWeight: 500 }}>A steadier frame</p>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#a1a1aa" }}>
        Use this read as orientation, not proof. If you bring any part of it into a real conversation, keep it light,
        specific, and open enough for the other person to correct what does not fit.
      </p>
    </section>
  );
}
