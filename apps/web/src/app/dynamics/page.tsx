import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { DynamicsWorkspace } from "../../components/dynamics-workspace";
import { PublicPreviewCta } from "../../components/public-preview-cta";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";
import { listThreadsForUser } from "../../server/dynamics-store";
import DefragAISurface from "../../components/defrag-ai-surface";
import { ArrowRight, Zap } from "lucide-react";

export default async function DynamicsPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Console"
        title="See the pattern. Change what happens next."
        description="DEFRAG helps you understand what's happening, notice pressure, and know what to do next."
        accent="#22d3ee"
      >
        <div style={{ display: "grid", gap: 64 }}>
          <PublicPreviewCta
            title="Analysis requires a connected session."
            description="The console tracks exchanges over time to help you identify what to do next. Start a session to begin."
            primaryLabel="Try it"
            secondaryLabel="Pricing"
            secondaryHref="/account/billing"
          />

          <div style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "1fr 340px", gap: 64, alignItems: "start" }} className="dynamics-preview-grid">
            <div style={{ display: "grid", gap: 48 }}>

              {/* Capability Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="dynamics-preview-metrics">
                {[
                  ["Session", "Live Transcript Analysis"],
                  ["Analysis", "Interaction Modeling"],
                  ["Scenario", "Next-Move Simulation"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 8 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "white" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Analysis Preview */}
              <div style={{ paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gap: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>What happened</div>
                <p style={{ margin: 0, fontSize: 24, lineHeight: 1.4, color: "white", fontWeight: 400, maxWidth: 600 }}>
                  The tension stems less from incompatibility, and more from parallel repair attempts colliding while both parties remain on guard.
                </p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(245,245,245,0.6)", fontWeight: 300 }}>
                  DEFRAG helps you understand both sides, see what changed, and decide what to say next.
                </p>
                <Link href="/login" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content", padding: "18px 36px", borderRadius: 16, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                  Try it <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
              </div>
            </div>

            {/* Right Column: Context */}
            <div style={{ display: "grid", gap: 32 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>Context</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "rgba(245,245,245,0.6)" }}>Recurring themes are mapped across the conversation to help you see the pattern and respond clearly.</p>
              </div>
              {[
                "Conflict de-escalation mapping",
                "Tone shifting anomalies",
                "Repetitive post-event stress cycles",
              ].map((thread, index) => (
                <div key={thread} style={{ paddingLeft: 16, borderLeft: index === 0 ? "2px solid #22d3ee" : "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: index === 0 ? "#22d3ee" : "rgba(245,245,245,0.3)", marginBottom: 8 }}>Analysis Trace</div>
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

  const { entitlements } = await getBillingStateForUser(user.userId);
  const threads = await listThreadsForUser(user.userId);
  return <DefragAISurface />;
}
