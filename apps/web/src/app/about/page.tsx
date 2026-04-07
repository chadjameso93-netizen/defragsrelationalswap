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
                <Link href="/enter" className="about-cta about-cta-primary">
                  Open Defrag
                </Link>
                <Link href="/studio#how-it-works" className="about-cta about-cta-secondary">
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
      <style>{`
        .about-cta { display:flex; align-items:center; justify-content:center; padding:12px 16px; border-radius:12px; text-decoration:none; font-size:15px; letter-spacing:0.02em; transition:transform 180ms ease, color 180ms ease, border-color 180ms ease; }
        .about-cta:hover { transform:translateY(-1px); }
        .about-cta-primary { background:#f3ede2; color:#050505; border:1px solid rgba(243,237,226,0.82); font-weight:600; box-shadow:0 8px 20px rgba(0,0,0,0.22); }
        .about-cta-secondary { border:1px solid rgba(255,255,255,0.18); background:transparent; color:rgba(245,242,236,0.92); font-weight:500; }
        .about-cta-secondary:hover { border-color:rgba(255,255,255,0.34); color:#fff; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } .about-aside { padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.08); } .about-cta-primary { width:100%; } .about-cta-secondary { border:none; padding-inline:4px; justify-content:flex-start; color:rgba(245,242,236,0.72); } }
      `}</style>
    </AppShell>
  );
}
