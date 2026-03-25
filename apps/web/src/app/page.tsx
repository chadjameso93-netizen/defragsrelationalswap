import Link from "next/link";
import { AppShell } from "../components/app-shell";
import { getBaseAppEnv } from "../server/env";

export default function LandingPage() {
  const { DEFRAG_MCP_APP_URL } = getBaseAppEnv();
  return (
    <AppShell
      eyebrow="Relationship clarity"
      title="See the relationship dynamic more clearly before the moment turns into a story."
      description="DEFRAG helps you read relationship dynamics, notice repeating patterns between people, and choose what to do next without diagnosing or labeling anyone. Account, billing, and trust stay canonical on defrag.app."
    >
      <section
        className="landing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          alignItems: "end",
        }}
      >
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/companion"
              className="premium-panel premium-fade-up"
              data-delay="2"
              style={{ padding: "12px 18px", borderRadius: "var(--radius-pill)", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 700 }}
            >
              Open Dynamics
            </Link>
            <Link
              href="/about"
              className="premium-panel premium-fade-up"
              data-delay="2"
              style={{ padding: "12px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", textDecoration: "none" }}
            >
              About DEFRAG
            </Link>
            <Link
              href="/world"
              className="premium-panel premium-fade-up"
              data-delay="3"
              style={{ padding: "12px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", textDecoration: "none" }}
            >
              Open World
            </Link>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {[
              ["Dynamics", "Structured help for one moment, one thread, and one next move at a time."],
              ["Account & Billing", "Canonical sign-in, upgrade, portal access, and Stripe-backed subscription state live on defrag.app."],
              ["Integrations", "MCP and ChatGPT connect back to the DEFRAG account and billing shell instead of becoming a second product site."],
            ].map(([label, copy]) => (
              <div key={label} className="premium-fade-up" data-delay="2" style={{ padding: "14px 0", borderTop: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 8 }}>{label}</div>
                <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.65 }}>{copy}</div>
              </div>
            ))}
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
                {["pressure", "timing", "repair"].map((token) => (
                  <span key={token} style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {token}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, maxWidth: 340, fontSize: 24, lineHeight: 1.18 }}>
                Guidance that stays grounded in timing, wording, and repetition while still naming the actual pattern.
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
          borderRadius: 26,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        {[
          ["Trust and policy", "Terms, privacy, billing ownership, and account expectations stay on the main site."],
          ["Canonical account", "Login, relink, upgrade, and billing handoff always return to defrag.app."],
          ["Grounded framing", "DEFRAG offers pattern clarity and next-step guidance, not diagnosis or fixed personality labels."],
        ].map(([title, copy]) => (
          <div key={title} style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d6c3a1" }}>{title}</div>
            <div style={{ color: "rgba(245,245,245,0.72)", lineHeight: 1.7 }}>{copy}</div>
          </div>
        ))}
        {DEFRAG_MCP_APP_URL ? (
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d6c3a1" }}>MCP host</div>
            <div style={{ color: "rgba(245,245,245,0.72)", lineHeight: 1.7 }}>
              The website can reference the dedicated MCP service host when operators enable private preview.
            </div>
            <code style={{ color: "#f5f5f5", fontSize: 13 }}>{DEFRAG_MCP_APP_URL}</code>
          </div>
        ) : null}
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
