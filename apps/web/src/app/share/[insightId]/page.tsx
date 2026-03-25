import Link from "next/link";
import { AppShell } from "../../../components/app-shell";

export const dynamic = "force-dynamic";

export default async function SharedInsightLandingPage({ params }: { params: { insightId: string } }) {
  // In a full DB implementation, this would look up the insight summary. 
  // For the current infrastructure bounds, we render the secure landing shell.
  
  return (
    <AppShell
      eyebrow=""
      title="Someone asked for your perspective."
      description="You've been invited to view a short summary of a recent conversation and add your own context. Your response is kept private."
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
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-muted)" }}>What you'll do</span>
            <p style={{ margin: "8px 0 0 0", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              You will see a neutral summary of what happened. You can review it and decide if you want to share your side of the story.
            </p>
          </div>

          <div style={{ padding: 16, background: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-hover)" }}>
            <span style={{ fontSize: 11, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Secure Link</span>
            <p style={{ margin: "6px 0 0 0", color: "var(--color-text-primary)", fontSize: 15, lineHeight: 1.5 }}>
              This summary is private. Enter your email below to verify your identity and view the context safely.
            </p>
          </div>

          <Link 
            href={`/login?next=/share/${params.insightId}`}
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
            Sign in to view
          </Link>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            ["Private by default", "You control what you share. Your response is fully isolated until you explicitly decide to send it back."],
            ["A clearer picture", "DEFRAG helps people untangle misunderstandings without assigning blame. Your perspective makes the picture complete."],
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
