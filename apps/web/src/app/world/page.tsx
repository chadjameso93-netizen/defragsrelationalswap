import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "../../components/app-shell";
import { PublicPreviewCta } from "../../components/public-preview-cta";
import { WorldAlphaCanvas } from "../../components/world-alpha-canvas";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";

export default async function WorldPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="World Alpha"
        title="See the field, not just the transcript."
        description="The public view keeps the visual field open so you can inspect the canvas language, mobile behavior, and interpretive frame before sign-in without turning the scene into a fixed story about anyone."
        accent="#9fbde8"
      >
        <div style={{ display: "grid", gap: 20 }}>
          <PublicPreviewCta
            title="World stays visible, while interpretation stays private."
            description="The field canvas is open here in preview mode. Sign in when you want a stored interpretation, billing-aware access, and a personal relational scene."
            primaryLabel="Sign in for field insights"
            secondaryLabel="Open Dynamics preview"
            secondaryHref="/companion"
          />

          <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {[
              ["Pressure", "Preview where intensity accumulates before the conversation can name it."],
              ["Edges", "See which connection is carrying strain, reach, or repair demand."],
              ["Repair", "Use the field as orientation before moving into a specific insight."],
            ].map(([label, copy]) => (
              <div key={label} className="premium-panel premium-fade-up" data-delay="2" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>{label}</div>
                <div style={{ marginTop: 12, color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: 14 }}>{copy}</div>
              </div>
            ))}
          </section>

          <WorldAlphaCanvas
            preview
            previewInsight={{
              dominantPattern: "Repair is being attempted before the field has actually cooled.",
              highestChargeNodeId: "conflict",
              highestChargeNodeLabel: "Conflict",
              pressureLevel: "high",
              repairWindow: "narrow",
              strongestEdge: { id: "preview-edge", from: "self", to: "other", type: "tension", intensity: 0.82 },
              nodeReadings: [
                { id: "self", label: "You", type: "person", charge: 0.62, note: "Still trying to stay connected while bracing for another hard turn." },
                { id: "other", label: "Other", type: "person", charge: 0.71, note: "Reading the moment through threat or overwhelm more than closeness." },
                { id: "conflict", label: "Conflict", type: "conflict", charge: 0.8, note: "Holding the most relational weight in the scene right now." },
              ],
              stabilizationHint: "A smaller, slower reopening would likely help more than another fast repair attempt.",
              nextMoves: ["Lower speed before content.", "Name the moment, not the whole pattern.", "Ask for one bounded repair window."],
              timingSummary: "Pressure is high; repair window is narrow.",
            }}
          />

          <div className="premium-fade-up" data-delay="3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "var(--radius-pill)", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 700 }}>
              Sign in for live interpretation
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const { entitlements } = await getBillingStateForUser(user.userId);

  if (!entitlements.canUseCompanion) {
    redirect("/account/billing");
  }

  return (
    <AppShell
      eyebrow="World Alpha"
      title="See the field, not just the transcript."
      description="World maps charge, edge strength, repair timing, and likely stabilization moves across a shared relational scene."
      accent="#9fbde8"
    >
      <section
        className="world-intro"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {[
          ["Pressure", "Track where intensity is accumulating before the conversation names it."],
          ["Edges", "Watch which connection is carrying the most charge, distance, or repair demand."],
          ["Timing", "Use the field insight to slow down rushed repair and find the softer entry."],
        ].map(([label, copy]) => (
          <div key={label} className="premium-panel premium-fade-up" data-delay="2" style={{ padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)" }}>{label}</div>
            <div style={{ marginTop: 12, color: "var(--color-text-secondary)", lineHeight: 1.7, fontSize: 14 }}>{copy}</div>
          </div>
        ))}
      </section>
      <WorldAlphaCanvas />
    </AppShell>
  );
}
