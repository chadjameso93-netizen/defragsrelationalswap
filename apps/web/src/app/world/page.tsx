import { redirect } from "next/navigation";
import { AppShell } from "../../components/app-shell";
import { WorldAlphaCanvas } from "../../components/world-alpha-canvas";
import { getBillingStateForUser } from "../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../server/auth";

export default async function WorldPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    redirect("/login");
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
          marginBottom: 18,
        }}
      >
        {[
          ["Pressure", "Track where intensity is accumulating before the conversation names it."],
          ["Edges", "Watch which connection is carrying the most charge, distance, or repair demand."],
          ["Timing", "Use the field read to slow down rushed repair and find the softer entry."],
        ].map(([label, copy]) => (
          <div key={label} className="premium-panel premium-fade-up" data-delay="2" style={{ padding: 18, borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8ca5ca" }}>{label}</div>
            <div style={{ marginTop: 10, color: "#d8e3f8", lineHeight: 1.7, fontSize: 14 }}>{copy}</div>
          </div>
        ))}
      </section>
      <WorldAlphaCanvas />
    </AppShell>
  );
}
