import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { PublicPreviewCta } from "../../components/public-preview-cta";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";
import { listThreadsForUser } from "../../server/dynamics-store";
import DefragAISurface from "../../components/defrag-ai-surface";
import { ArrowRight } from "lucide-react";

export default async function DynamicsPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Workspace"
        title="See the pattern. Change what happens next."
        description="Defrag helps you understand what may be happening, notice where pressure changed, and choose a better next step."
        accent="#22d3ee"
      >
        <div style={{ display: "grid", gap: 48 }}>
          <PublicPreviewCta
            title="Sign in to open your workspace."
            description="Your workspace helps you review one interaction, understand what may be happening, and decide what to do next."
            primaryLabel="Sign in"
            secondaryLabel="Plans"
            secondaryHref="/account/billing"
          />

          <div style={{ maxWidth: 980, display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }} className="dynamics-preview-grid">
            <div style={{ display: "grid", gap: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="dynamics-preview-metrics">
                {[
                  ["Focus", "One interaction at a time"],
                  ["Insight", "What may be happening"],
                  ["Next step", "Clearer wording"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 8 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "white", lineHeight: 1.5 }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gap: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>What you will see</div>
                <p style={{ margin: 0, fontSize: 22, lineHeight: 1.45, color: "white", fontWeight: 400, maxWidth: 640 }}>
                  Defrag helps you separate the event from the story around it so you can respond with more clarity.
                </p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(245,245,245,0.62)", fontWeight: 300 }}>
                  You can describe the exchange, review what may be happening, and choose a smaller, steadier next move.
                </p>
                <Link href="/login" style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content", padding: "16px 28px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                  Open workspace <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
              </div>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>Inside the workspace</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "rgba(245,245,245,0.6)" }}>Review what may be happening, what it may be causing, and what to try next.</p>
              </div>
              {[
                "What may be happening",
                "What it may be causing",
                "What to try next",
              ].map((thread, index) => (
                <div key={thread} style={{ paddingLeft: 16, borderLeft: index === 0 ? "2px solid #22d3ee" : "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: index === 0 ? "#22d3ee" : "rgba(245,245,245,0.3)", marginBottom: 8 }}>Section</div>
                  <span style={{ lineHeight: 1.55, color: "white", fontSize: 14 }}>{thread}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .dynamics-preview-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 720px) {
            .dynamics-preview-metrics { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AppShell>
    );
  }

  await getBillingStateForUser(user.userId);
  await listThreadsForUser(user.userId);
  return <DefragAISurface />;
}
