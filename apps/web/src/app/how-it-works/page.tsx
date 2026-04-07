import Link from "next/link";
import { AppShell } from "../../components/app-shell";

const steps = [
  {
    step: "Step 1",
    title: "Bring the moment",
    body: "Paste a difficult exchange and add lightweight context so the read is grounded in what actually happened.",
  },
  {
    step: "Step 2",
    title: "Get the relational read",
    body: "Defrag maps where tension rose, what each side may be interpreting, and where intent likely separated from impact.",
  },
  {
    step: "Step 3",
    title: "Leave with a next move",
    body: "You get a practical close: one response path, one boundary-aware framing, and one sentence to move the conversation forward.",
  },
];

const outputs = [
  {
    label: "Pattern read",
    content: "Both sides may be protecting the relationship, but speed and short replies are being read as distance.",
  },
  {
    label: "Perspective split",
    content: "Your intent: de-escalate quickly. Their likely read: withdrawal or dismissal.",
  },
  {
    label: "Next message",
    content: '"I care about this and I went short earlier. I want to answer this more clearly now."',
  },
];

export default function HowItWorksPage() {
  return (
    <AppShell
      eyebrow="How it works"
      title="A quieter extension of the homepage flow."
      description="Same rhythm, expanded detail: three deliberate steps, concrete output examples, and one clear close."
      accent="#d6c3a1"
    >
      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "0 16px", display: "grid", gap: 24 }}>
        <section style={{ display: "grid", gap: 12 }}>
          {steps.map((item, index) => (
            <article
              key={item.title}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.012))",
                padding: "20px 22px",
                display: "grid",
                gap: 8,
                animation: `howFade 420ms ease ${index * 90}ms both`,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>{item.step}</div>
              <h2 style={{ margin: 0, color: "white", fontSize: "clamp(1.45rem, 2.4vw, 2rem)", fontWeight: 500, letterSpacing: "-0.02em" }}>{item.title}</h2>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.66)", lineHeight: 1.75, fontSize: 16, fontWeight: 300 }}>{item.body}</p>
            </article>
          ))}
        </section>

        <section style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.016)", padding: "22px", display: "grid", gap: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>Output examples</div>
          {outputs.map((output) => (
            <div key={output.label} style={{ display: "grid", gap: 6, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ color: "#d6c3a1", fontSize: 14, fontWeight: 500 }}>{output.label}</div>
              <div style={{ color: "rgba(245,245,245,0.68)", lineHeight: 1.75, fontSize: 16 }}>{output.content}</div>
            </div>
          ))}
        </section>

        <section style={{ border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(180deg, rgba(214,195,161,0.10), rgba(255,255,255,0.02))", padding: "24px", display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,245,245,0.44)", fontWeight: 700 }}>Close</div>
          <h2 style={{ margin: 0, color: "white", fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)", fontWeight: 500, letterSpacing: "-0.03em" }}>
            Bring one real exchange. Leave with a steadier response.
          </h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/enter" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", background: "#f5f2ec", color: "#050505", padding: "13px 17px", fontWeight: 600 }}>
              Open Defrag
            </Link>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", color: "white", padding: "13px 17px", background: "rgba(255,255,255,0.03)" }}>
              Read about Defrag
            </Link>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes howFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </AppShell>
  );
}
