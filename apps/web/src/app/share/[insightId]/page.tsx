import Link from "next/link";
import { AppShell } from "../../../components/app-shell";

export const dynamic = "force-dynamic";

export default async function SharedInsightLandingPage({ params }: { params: { insightId: string } }) {
  // In a full DB implementation, this would look up the insight summary. 
  // For the current infrastructure bounds, we render the secure landing shell.
  
  return (
    <AppShell
      eyebrow="Shared Summary"
      title="Someone asked for your perspective."
      description="You have been invited to review a relational summary and safely add your own context. Your response is kept private and bounded to this interaction sequence."
    >
      <div 
        className="premium-fade-up" 
        data-delay="2" 
        style={{ 
          marginTop: 24, 
          display: "grid", 
          gap: 24, 
          maxWidth: 680 
        }}
      >
        <section 
          style={{ 
            background: "rgba(6, 7, 10, 0.6)", 
            backdropFilter: "blur(24px)", 
            border: "1px solid var(--color-border)", 
            borderRadius: "var(--radius-lg)", 
            padding: 24,
            display: "grid",
            gap: 16
          }}
        >
          <div>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--color-text-muted)" }}>Interaction Extract</span>
            <p style={{ margin: "8px 0 0 0", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              A structural summary of a recent interaction has been mapped. DEFRAG AI uses these summaries to identify repeating patterns and diffuse pressure.
            </p>
          </div>

          <div style={{ padding: 16, background: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-hover)" }}>
            <span style={{ fontSize: 11, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Status</span>
            <p style={{ margin: "6px 0 0 0", color: "var(--color-text-primary)", fontSize: 15 }}>
              The record is locked. To view the summary and add your side of the interaction, authenticate below.
            </p>
          </div>

          <Link 
            href={`/login?next=/dynamics`}
            style={{
              marginTop: 8,
              padding: "14px 24px",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-text-primary)",
              color: "var(--color-bg)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              textAlign: "center",
              display: "inline-block"
            }}
          >
            Authenticate to view summary
          </Link>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            ["Private by default", "Your intake remains fully isolated from the sender's account until you explicitly choose to merge timelines."],
            ["Objective translation", "DEFRAG maps the architecture of the conversation, it does not assign blame or fixed personality models."],
          ].map(([title, copy]) => (
            <div key={title} style={{ padding: 20, border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{title}</div>
              <p style={{ margin: "8px 0 0 0", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{copy}</p>
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
