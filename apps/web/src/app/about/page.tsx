import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { marketingCopy } from "../../content/marketingCopy";

export default function AboutPage() {
  return (
    <AppShell
      eyebrow={marketingCopy.about.eyebrow}
      title={marketingCopy.about.title}
      description={marketingCopy.about.description}
      accent="#c8d8a2"
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 56 }} className="about-grid">
          <div style={{ display: "grid", gap: 48 }}>
            {marketingCopy.about.sections.map((section) => (
              <div key={section.title} style={{ display: "grid", gap: 14 }}>
                <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.15rem)", fontWeight: 500, letterSpacing: "-0.03em", color: "white" }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.68)", lineHeight: 1.82, fontSize: 18, fontWeight: 300 }}>{section.body}</p>
              </div>
            ))}
          </div>

          <aside className="about-aside" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 18 }}>
                Open Defrag
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <Link href="/enter" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                  Open Defrag
                </Link>
                <Link href="/studio#how-it-works" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "white", textDecoration: "none", fontSize: 16 }}>
                  See how it works
                </Link>
              </div>
            </div>

            <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "grid", gap: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
                Core capabilities
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {marketingCopy.coreValue.capabilities.map((item) => (
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
