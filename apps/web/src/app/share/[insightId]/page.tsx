import Link from "next/link";
import { AppShell } from "../../../components/app-shell";
import { ArrowRight, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SharedInsightLandingPage(props: { params: Promise<{ insightId: string }> }) {
  const { insightId } = await props.params;

  return (
    <AppShell
      eyebrow=""
      title="Someone asked for your perspective."
      description="You've been invited to view a short summary of a recent conversation and add your own context. Your response is kept private."
    >
      <div style={{ maxWidth: 640, display: "grid", gap: 48 }}>

        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>What you'll do</div>
          <p style={{ margin: 0, color: "rgba(245,245,245,0.65)", lineHeight: 1.6, fontSize: 16, fontWeight: 300 }}>
            You will see a neutral summary of what happened. You can review it and decide if you want to share your side of the story.
          </p>
        </div>

        <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee" }}>
            <Shield style={{ width: 14, height: 14 }} />
            Secure Link
          </div>
          <p style={{ margin: 0, color: "white", fontSize: 16, lineHeight: 1.5, fontWeight: 400 }}>
            This summary is private. Enter your email below to verify your identity and view the context safely.
          </p>
          <Link 
            href={`/login?next=/share/${insightId}`}
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              width: "fit-content",
              padding: "18px 36px",
              borderRadius: 16,
              background: "white",
              color: "#050505",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Sign in to view <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
        </div>

        <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="share-features">
          {[
            ["Private by default", "You control what you share. Your response is fully isolated until you explicitly decide to send it back."],
            ["A clearer picture", "DEFRAG helps people untangle misunderstandings without assigning blame. Your perspective makes the picture complete."],
          ].map(([title, copy]) => (
            <div key={title} style={{ display: "grid", gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{title}</div>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(245,245,245,0.6)", lineHeight: 1.6 }}>{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .share-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
