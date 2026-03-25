import Link from "next/link";
import { AppShell } from "../components/app-shell";

export default function LandingPage() {
  return (
    <AppShell
      eyebrow="Relational Insight"
      title="See the pattern before it becomes the story."
      description="DEFRAG is a reasoning environment that helps you untangle complex relationships, identify repeating cycles, and change how you respond—without relying on fixed labels or diagnostic blame."
    >
      <section
        className="landing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "grid", gap: 18, alignContent: "flex-start" }}>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              ["The Tension", "Misunderstandings escalate rapidly when we react to the moment instead of recognizing the historical pattern."],
              ["The Practice", "By mapping the history of interactions, you can see how dynamics trigger and what causes the cycle to repeat."],
              ["The Shift", "Instead of asking 'who is at fault', DEFRAG helps you answer 'what do I do next' with calm, grounded timing."],
            ].map(([label, copy]) => (
              <div key={label} className="premium-fade-up" data-delay="2" style={{ padding: "14px 0", borderTop: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 8 }}>{label}</div>
                <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.65 }}>{copy}</div>
              </div>
            ))}
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <Link
              href="/pricing"
              className="premium-panel premium-fade-up"
              data-delay="2"
              style={{ padding: "12px 18px", borderRadius: "var(--radius-pill)", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 700 }}
            >
              Access the System
            </Link>
          </div>
        </div>

        <section
          className="landing-visual premium-panel premium-fade-up"
          data-delay="2"
          style={{
            minHeight: 460,
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            position: "relative",
            border: "1px solid var(--color-border-hover)",
            background:
              "radial-gradient(circle at 20% 18%, rgba(214,195,161,0.08), transparent 28%), radial-gradient(circle at 70% 32%, rgba(111,145,201,0.05), transparent 32%), var(--color-surface)",
          }}
        >
          <div className="landing-visual-inner" style={{ position: "absolute", inset: 0, padding: 24, display: "grid", alignContent: "space-between" }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["History", "Pattern", "Guidance"].map((token) => (
                  <span key={token} style={{ padding: "6px 10px", borderRadius: "var(--radius-pill)", background: "var(--color-border)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {token}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, maxWidth: 340, fontSize: 24, lineHeight: 1.18 }}>
                Guidance that stays grounded in timing, wording, and repetition while naming the actual pattern.
              </p>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <div className="landing-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  ["Highest charge", "Conflict"],
                  ["Repair window", "Narrow"],
                  ["Next move", "One small reset"],
                ].map(([label, value]) => (
                  <div key={label} style={{ padding: 16, borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", backdropFilter: "blur(12px)" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{label}</div>
                    <div style={{ marginTop: 8, fontSize: 14, color: "var(--color-text-primary)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <section
        className="premium-panel premium-fade-up"
        data-delay="2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          padding: 22,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        {[
          ["Beyond the profile", "People are more than their labels. DEFRAG treats symbolic priors as weaker context, placing ultimate weight on actual events and repetitive behaviors."],
          ["Calm interpretation", "The environment doesn't diagnose you or the other person. It provides an objective translation of what may be occurring."],
          ["Actionable staging", "Discover exactly how to diffuse pressure, structure your language, and approach the repair window securely."],
        ].map(([title, copy]) => (
          <div key={title} style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)" }}>{title}</div>
            <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{copy}</div>
          </div>
        ))}
      </section>
      
      <style>{`
        @media (max-width: 720px) {
          .landing-grid {
            gap: 18px !important;
          }

          .landing-visual {
            min-height: 360px !important;
            border-radius: 22px !important;
          }

          .landing-visual-inner {
            padding: 18px !important;
          }

          .landing-stat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
