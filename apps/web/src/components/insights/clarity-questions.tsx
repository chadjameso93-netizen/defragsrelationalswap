const CLARITY_QUESTIONS = [
  "What part of this moment felt most charged for you?",
  "What outcome are you actually hoping for from the next conversation?",
  "What might the other person be protecting, avoiding, or not yet ready to say?",
];

export default function ClarityQuestions() {
  return (
    <section
      style={{
        display: "grid",
        gap: 12,
        padding: 20,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
        Questions worth holding
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {CLARITY_QUESTIONS.map((question, index) => (
          <div
            key={question}
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr",
              gap: 10,
              alignItems: "start",
            }}
          >
            <span style={{ fontSize: 11, color: "#52525b", paddingTop: 3 }}>0{index + 1}</span>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>{question}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
