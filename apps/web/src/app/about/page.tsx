import Link from "next/link";
import { AppShell } from "../../components/app-shell";

const sections = [
  {
    title: "What Defrag helps you see",
    body: "Defrag helps you understand what happened, how pressure changed the interaction, and what may help next.",
  },
  {
    title: "How it works",
    body: "You bring the moment, the context, and the details that matter. Defrag helps you slow the interaction down so you can see the pattern more clearly.",
  },
  {
    title: "What it is not",
    body: "Defrag does not diagnose people or replace professional support. It is a tool for clearer reflection and better decisions.",
  },
  {
    title: "Why that matters",
    body: "When you can see the pattern earlier, you have more room to respond with timing, care, and precision instead of reacting from pressure alone.",
  },
];

export default function AboutPage() {
  return (
    <AppShell eyebrow="Method" title="A clearer way to understand difficult interactions." description="Defrag helps you see the pattern, understand what may be happening, and choose a better next step." accent="#c8d8a2">
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 56 }} className="about-grid">
          <div style={{ display: "grid", gap: 48 }}>
            {sections.map((section, i) => (
              <div key={section.title} data-delay={String(i)} style={{ display: "grid", gap: 14 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.15rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "white" }}>{section.title}</h2>
                <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.7)", lineHeight: 1.8, fontSize: 18, fontWeight: 300 }}>{section.body}</p>
              </div>
            ))}
          </div>
          <aside className="about-aside" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 18 }}>Get started</div>
              <div style={{ display: "grid", gap: 12 }}>
                <Link href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>Sign in</Link>
                <Link href="/dynamics" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "white", textDecoration: "none", fontSize: 16 }}>Open workspace</Link>
              </div>
            </div>
            <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 16 }}>Resources</div>
              <div style={{ display: "grid", gap: 14 }}>
                <Link href="/account/billing" style={{ color: "rgba(245, 245, 245, 0.6)", textDecoration: "none", fontSize: 14 }}>Plans</Link>
                <Link href="/privacy" style={{ color: "rgba(245, 245, 245, 0.6)", textDecoration: "none", fontSize: 14 }}>Privacy</Link>
                <Link href="/terms" style={{ color: "rgba(245, 245, 245, 0.6)", textDecoration: "none", fontSize: 14 }}>Terms</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } .about-aside { padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.08); } }`}</style>
    </AppShell>
  );
}
