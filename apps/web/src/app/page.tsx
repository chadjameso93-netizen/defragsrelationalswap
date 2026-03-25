import Link from "next/link";
import { AppShell } from "../components/app-shell";

export default function LandingPage() {
  return (
    <AppShell
      eyebrow=""
      title="Make sense of difficult interactions."
      description="DEFRAG helps you understand what’s happening, see the pattern, notice pressure, and know exactly what to say next. An intelligence product for relationships and conversations."
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 24, marginBottom: 48 }}>
        <Link
          href="/login"
          className="premium-panel premium-fade-up"
          data-delay="2"
          style={{ 
            padding: "14px 24px", 
            borderRadius: "var(--radius-pill)", 
            background: "var(--color-text-primary)", 
            color: "var(--color-bg)", 
            textDecoration: "none", 
            fontWeight: 600,
            fontSize: 15
          }}
        >
          Sign up
        </Link>
        <Link
          href="/about"
          className="premium-panel premium-fade-up"
          data-delay="2"
          style={{ 
            padding: "14px 24px", 
            borderRadius: "var(--radius-pill)", 
            background: "transparent", 
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)", 
            textDecoration: "none", 
            fontWeight: 500,
            fontSize: 15
          }}
        >
          How it works
        </Link>
      </div>

      <section
        className="landing-visual premium-panel premium-fade-up"
        data-delay="3"
        style={{
          minHeight: 460,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          position: "relative",
          border: "1px solid var(--color-border)",
          background:
            "radial-gradient(circle at 50% 10%, rgba(216, 196, 159, 0.05), transparent 40%), var(--color-surface)",
          display: "grid",
          alignItems: "end",
          padding: 32
        }}
      >
        <div style={{ position: "absolute", top: 32, left: 32, display: "gap", margin: 0 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{ padding: "6px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border)", fontSize: 11, letterSpacing: "0.06em", color: "var(--color-text-secondary)" }}>
              Analysis
            </span>
            <span style={{ padding: "6px 12px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border)", fontSize: 11, letterSpacing: "0.06em", color: "var(--color-text-secondary)" }}>
              Preparation
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gap: 24, maxWidth: 640 }}>
          <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.2, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
            Prepare before you respond.
          </h2>
          <div className="landing-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              ["Current pressure", "High"],
              ["Timing window", "Wait to reply"],
              ["What to try next", "Acknowledge first"],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: 20, borderRadius: "var(--radius-md)", background: "rgba(0,0,0,0.4)", border: "1px solid var(--color-border)", backdropFilter: "blur(12px)" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>{label}</div>
                <div style={{ marginTop: 8, fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="premium-fade-up"
        data-delay="4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
          marginTop: 48,
          paddingTop: 48,
          borderTop: "1px solid var(--color-border)",
        }}
      >
        {[
          [
            "Understand what’s happening", 
            "Keep important context in one place. DEFRAG helps you step back from the immediate emotion to see how dynamics trigger and what causes a cycle to repeat."
          ],
          [
            "Notice the pressure", 
            "Read the room accurately. The platform helps you identify when tension is high, when to give space, and when the window for repair actually opens."
          ],
          [
            "Know what to say next", 
            "Don't guess. DEFRAG provides clear, structured suggestions to help you frame your language, avoid unnecessary conflict, and respond effectively."
          ],
        ].map(([title, copy]) => (
          <div key={title} style={{ display: "grid", gap: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)" }}>{title}</h3>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 15 }}>{copy}</p>
          </div>
        ))}
      </section>
      
      <style>{`
        @media (max-width: 720px) {
          .landing-visual {
            min-height: 360px !important;
            padding: 24px !important;
          }

          .landing-stat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
