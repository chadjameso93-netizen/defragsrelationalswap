import Link from "next/link";
import { AppShell } from "../../components/app-shell";

const sections = [
  {
    title: "What Defrag does",
    body: "Defrag turns a difficult interaction into structured relational analysis. It helps you understand what may be happening, how each side may be reading the moment, where pressure changed, and what move makes sense next.",
  },
  {
    title: "How the system reads a moment",
    body: "You bring the exchange, the people involved, and the context that matters. Defrag evaluates the interaction, compares perspective, reads pressure and timing, and returns a clearer view of the dynamic instead of only reflecting one narrator's story.",
  },
  {
    title: "What the workspace returns",
    body: "The workspace is designed to return structured outputs such as what may be happening, what may be getting misread, where the pressure changed, what pattern is forming, and what wording or next step is most likely to help.",
  },
  {
    title: "Who it is built for",
    body: "Defrag can be used for one person's recurring patterns, two-person interactions, family systems, team systems, and broader relational structures where tension and communication move across more than one participant.",
  },
  {
    title: "What it is not",
    body: "Defrag is not diagnosis, not generic advice, and not a replacement for professional support. It is a relational intelligence system built to make difficult interactions more readable and better decisions more possible.",
  },
];

export default function AboutPage() {
  return (
    <AppShell
      eyebrow="How it works"
      title="How Defrag reads a difficult interaction."
      description="Defrag operates as a relational reasoning system. It helps people understand what may be happening, where pressure changed, and what move is most likely to help next."
      accent="#c8d8a2"
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 56 }} className="about-grid">
          <div style={{ display: "grid", gap: 48 }}>
            {sections.map((section) => (
              <div key={section.title} style={{ display: "grid", gap: 14 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.15rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "white" }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.68)", lineHeight: 1.82, fontSize: 18, fontWeight: 300 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <aside className="about-aside" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 18 }}>
                Open Defrag
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <Link href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                  Sign in
                </Link>
                <Link href="/dynamics" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "white", textDecoration: "none", fontSize: 16 }}>
                  View workspace
                </Link>
              </div>
            </div>

            <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "grid", gap: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
                Core capabilities
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "personal pattern analysis",
                  "1:1 interaction analysis",
                  "multi-person system analysis",
                  "perspective comparison",
                  "structured next-step guidance",
                ].map((item) => (
                  <div key={item} style={{ fontSize: 14, color: "rgba(245,245,245,0.62)", lineHeight: 1.6 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } .about-aside { padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.08); } }`}</style>
    </AppShell>
  );
}
