import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { PublicPreviewCta } from "../../components/public-preview-cta";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";
import { listThreadsForUser } from "../../server/dynamics-store";
import DefragAISurface from "../../components/defrag-ai-surface";
import { ArrowRight } from "lucide-react";

const capabilityBlocks = [
  {
    title: "What the workspace analyzes",
    body: "A difficult interaction, the pressure inside it, how each side may be reading it, what changed, and what pattern is forming beneath the moment.",
  },
  {
    title: "What the system returns",
    body: "Structured outputs such as what may be happening, where pressure changed, what may be getting misread, and what move is most likely to help next.",
  },
  {
    title: "Who it is built for",
    body: "Individuals, two-person dynamics, families, teams, and broader relational systems where communication and pressure move across more than one participant.",
  },
];

const outputLabels = [
  "what may be happening",
  "how each side may be reading it",
  "where pressure changed",
  "what pattern is forming",
  "what to try next",
];

export default async function DynamicsPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Workspace"
        title="A relational intelligence workspace for difficult interactions."
        description="Defrag helps you understand conflict, communication breakdown, emotional pressure, and perspective differences by turning one moment into structured relational analysis."
        accent="#22d3ee"
      >
        <div style={{ display: "grid", gap: 72 }}>
          <PublicPreviewCta
            title="Sign in to open your workspace."
            description="Use Defrag to assess one interaction, compare perspectives across sides, and choose a clearer next move."
            primaryLabel="Sign in"
            secondaryLabel="Plans"
            secondaryHref="/account/billing"
          />

          <section style={{ maxWidth: 1100, display: "grid", gridTemplateColumns: "1.1fr 380px", gap: 48, alignItems: "start" }} className="dynamics-entry-grid">
            <div style={{ display: "grid", gap: 36 }}>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>
                  What this workspace does
                </div>
                <p style={{ margin: 0, fontSize: 28, lineHeight: 1.45, color: "white", fontWeight: 400, letterSpacing: "-0.02em", maxWidth: 760 }}>
                  Defrag turns a confusing interaction into something you can actually read.
                </p>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: "rgba(245,245,245,0.62)", maxWidth: 760 }}>
                  The workspace is designed to assess what happened, how each side may be interpreting it, where the pressure shifted, what pattern is forming, and what move protects truth and lowers distortion next.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }} className="dynamics-capabilities-grid">
                {capabilityBlocks.map((block) => (
                  <div key={block.title} style={{ display: "grid", gap: 12, padding: 24, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: "white" }}>{block.title}</div>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.6)" }}>{block.body}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gap: 16, paddingTop: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>
                  Built for 1:1 and 1:many
                </div>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: "rgba(245,245,245,0.62)", maxWidth: 820 }}>
                  Defrag is not limited to one person's story. It is built to assess individuals, two-person dynamics, family systems, teams, and wider relational structures from all sides available in the input.
                </p>
                <Link href="/login" style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content", padding: "16px 28px", borderRadius: 14, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
                  Open workspace <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
              </div>
            </div>

            <aside style={{ display: "grid", gap: 28 }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 16 }}>
                  Structured outputs
                </div>
                <div style={{ display: "grid", gap: 14 }}>
                  {outputLabels.map((item) => (
                    <div key={item} style={{ paddingLeft: 14, borderLeft: "1px solid rgba(255,255,255,0.1)", fontSize: 14, lineHeight: 1.55, color: "rgba(245,245,245,0.9)" }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, paddingLeft: 16, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.35)" }}>
                  Premium access
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.58)" }}>
                  Save interactions, review patterns over time, and use the workspace as an ongoing relational intelligence system.
                </p>
              </div>
            </aside>
          </section>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .dynamics-entry-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 840px) {
            .dynamics-capabilities-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AppShell>
    );
  }

  await getBillingStateForUser(user.userId);
  await listThreadsForUser(user.userId);
  return <DefragAISurface />;
}
