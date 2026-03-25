import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow=""
        title="Intelligence capacity."
        description="Access to DEFRAG AI operates on a tiered capability model."
      >
         <div style={{ marginTop: 24, padding: 32, border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", background: "rgba(6, 7, 10, 0.4)", backdropFilter: "blur(20px)" }}>
           <h3 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: "var(--color-text-primary)" }}>Begin mapping interactions</h3>
           <p style={{ margin: "6px 0 16px 0", fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>Access to DEFRAG requires an account. Create your workspace to view the live relational field and select a capacity tier.</p>
           <a href="/login" style={{ display: "inline-block", padding: "14px 28px", borderRadius: "100px", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontWeight: 600 }}>Sign in</a>
         </div>
      </AppShell>
    );
  }

  const { account } = await getBillingStateForUser(user.userId);
  const activePlanKey = account.plan;
  const isSubscribed = account.subscriptionState === "active" || account.subscriptionState === "trialing";

  return (
    <AppShell
      eyebrow=""
      title="Intelligence capacity."
      description="Manage your current plan or extend your structural analysis."
    >
      <div className="premium-fade-up" data-delay="1" style={{ display: "grid", gap: 48, marginTop: 24 }}>
        
        {/* ACTIVE USAGE STATUS */}
        <section style={{ display: "grid", gap: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Workspace Status</div>
          <div 
            style={{ 
              background: "rgba(6,7,10,0.6)", 
              border: "1px solid var(--color-border-hover)", 
              borderRadius: "var(--radius-lg)", 
              padding: 32,
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)"
            }}
          >
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ fontSize: 32, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 12 }}>
                {activePlanKey === "realtime" ? "Real-time Field Network" :
                 activePlanKey === "studio" ? "Studio" : 
                 activePlanKey === "core" ? "Core" : "Base"}
                 {isSubscribed && <span style={{ padding: "4px 8px", borderRadius: "var(--radius-pill)", background: "rgba(216, 196, 159, 0.1)", color: "var(--color-accent)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>Active</span>}
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>{user.email}</p>
            </div>
            
            <BillingActions currentPlan={account.plan} hasCustomer={isSubscribed} />
          </div>
        </section>

        {/* REFINED UPGRADES LIST */}
        <section style={{ display: "grid", gap: 32, paddingTop: 40, borderTop: "1px solid var(--color-border)" }}>
           <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Available Capacities</div>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
              <div style={{ display: "grid", gap: 12 }}>
                 <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-secondary)" }}>Base</div>
                 <h4 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: "var(--color-text-primary)" }}>Included</h4>
                 <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 14 }}>
                   Standard interaction tracking. Generates isolated basic synthesis without deep contextual chaining or simulation capacity.
                 </p>
              </div>

              <div style={{ display: "grid", gap: 12, opacity: activePlanKey === "core" || activePlanKey === "studio" ? 0.4 : 1 }}>
                 <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: activePlanKey === "core" ? "var(--color-text-secondary)" : "var(--color-accent)" }}>Core</div>
                 <h4 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: "var(--color-text-primary)" }}>$15 <span style={{ fontSize: 16, color: "var(--color-text-muted)" }}>/ mo</span></h4>
                 <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 14 }}>
                   Unlimited insight processing. Unlock structured interpretation overlays, next-step modeling, and the simulation sandbox.
                 </p>
              </div>

              <div style={{ display: "grid", gap: 12, opacity: activePlanKey === "studio" ? 0.4 : 1 }}>
                 <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-secondary)" }}>Studio</div>
                 <h4 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: "var(--color-text-primary)" }}>$45 <span style={{ fontSize: 16, color: "var(--color-text-muted)" }}>/ mo</span></h4>
                 <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 14 }}>
                   Retain extended structural history to spot behavioral tracking cycles. Export insights and view premium evidence breakdown algorithms.
                 </p>
              </div>
           </div>
        </section>

      </div>
    </AppShell>
  );
}
