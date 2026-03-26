import Link from "next/link";
import { AppShell } from "../../components/app-shell";

export default function AboutPage() {
  return (
    <AppShell
      eyebrow="Approach"
      title="A practical approach to difficult interactions."
      description="DEFRAG helps you understand what happened, see the pattern, and know what to do next."
      accent="#c8d8a2"
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 80 }} className="about-grid">
          
          <div style={{ display: "grid", gap: 64 }}>
            {[
              {
                title: "What DEFRAG is for",
                body: "DEFRAG shows you the behavioral pattern you default to under stress and helps you interrupt it before it repeats. It is designed for high-stakes conversations where the outcome matters.",
              },
              {
                title: "Seeing the pattern",
                body: "When a tense moment occurs, our first response is often based on past tension instead of the current event. The details matter less than the recurring timeline of the conflict. By documenting what happened, we can see the pattern instead of getting caught in it.",
              },
              {
                title: "What DEFRAG does not do",
                body: "DEFRAG is not a therapist and not a mystic. It does not diagnose people or assign labels. It stays with observable events, helping you understand both sides and decide what to do next.",
              },
              {
                title: "Changing what happens next",
                body: "Once you see the pattern, DEFRAG provides guidance grounded in wording and timing. It helps you notice pressure and respond clearly, preserving the interaction without sacrificing your perspective.",
              },
            ].map((section, i) => (
              <div key={section.title} className="premium-fade-up" data-delay={String(i)} style={{ display: "grid", gap: 16 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "white" }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.7)", lineHeight: 1.8, fontSize: 18, fontWeight: 300 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <aside className="about-aside" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
             <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 24 }}>System Access</div>
                <div style={{ display: "grid", gap: 12 }}>
                  <Link href="/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px", borderRadius: 16, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                    Try DEFRAG
                  </Link>
                  <Link href="/dynamics" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "white", textDecoration: "none", fontSize: 16 }}>
                    Open Console
                  </Link>
                </div>
             </div>

             <div style={{ paddingTop: 40, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 20 }}>Resources</div>
                <div style={{ display: "grid", gap: 16 }}>
                   <Link href="/account/billing" style={{ color: "rgba(245, 245, 245, 0.6)", textDecoration: "none", fontSize: 14 }}>Tiers & Capacity</Link>
                   <Link href="/privacy" style={{ color: "rgba(245, 245, 245, 0.6)", textDecoration: "none", fontSize: 14 }}>Privacy Policy</Link>
                   <Link href="/terms" style={{ color: "rgba(245, 245, 245, 0.6)", textDecoration: "none", fontSize: 14 }}>Terms of Service</Link>
                </div>
             </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .about-aside {
            padding-top: 64px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
      `}</style>
    </AppShell>
  );
}
