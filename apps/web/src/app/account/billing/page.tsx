import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Plans"
        title="Pricing"
        description="DEFRAG AI operates on a tiered capability model capable of supporting deep interaction tracing."
      >
        <UnauthenticatedTiers />
      </AppShell>
    );
  }

  const { account, entitlements } = await getBillingStateForUser(user.userId);
  const activePlanKey = account.plan;
  const isSubscribed = account.subscriptionState === "active" || account.subscriptionState === "trialing";

  return (
    <AppShell
      eyebrow="Plans"
      title="Pricing"
      description="Choose the right plan for your current needs."
    >
      <div style={{ display: "grid", gap: 32, marginTop: 12 }}>
        
        {/* Active Usage Summary */}
        <section 
          className="premium-fade-up"
          style={{ 
            background: "linear-gradient(90deg, rgba(6,7,10,0.8), transparent)", 
            border: "1px solid var(--color-border)", 
            borderRadius: "var(--radius-lg)", 
            padding: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20
          }}
        >
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>Current Plan</div>
            <div style={{ fontSize: 16, color: isSubscribed ? "var(--color-accent)" : "var(--color-text-primary)", fontWeight: 500 }}>
              {activePlanKey === "realtime" ? "Real-time Field Network" :
               activePlanKey === "studio" ? "Studio" : 
               activePlanKey === "core" ? "Core" : "Base"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>Account</div>
            <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{user.email}</div>
          </div>
          {isSubscribed && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>Renewal Cycle</div>
              <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Active / Monitored</div>
            </div>
          )}
        </section>

        {/* The Tiers (Editorial Style instead of Card Comparison) */}
        <div style={{ display: "grid", gap: 20 }}>
          <TierRow 
            title="Base"
            description="Essential structural readouts and standard DEFRAG AI tracing. Valid for single-perspective orientation."
            price="Included"
            isActive={activePlanKey === "free" || !isSubscribed}
          >
             {!isSubscribed && <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Current Level</div>}
          </TierRow>

          <TierRow 
            title="Core"
            description="Unlimited insight processing. Access to interpretation panels and simulation pathways."
            price="$15 / mo"
            isActive={activePlanKey === "core"}
          >
            <BillingActions
              currentPlan={account.plan}
              hasCustomer={!!account.stripeCustomerId}
            />
          </TierRow>

          <TierRow 
            title="Studio"
            description="Deep temporal analysis. Export structural artifacts and retain extended interaction history to spot patterns."
            price="$45 / mo"
            isActive={activePlanKey === "studio"}
            isPremium
          >
             <BillingActions
              currentPlan={account.plan}
              hasCustomer={isSubscribed}
            />
          </TierRow>

        </div>
      </div>
    </AppShell>
  );
}

function UnauthenticatedTiers() {
  return (
    <div className="premium-fade-up" data-delay="1" style={{ display: "grid", gap: 20, marginTop: 12 }}>
      <TierRow 
        title="Base"
        description="Standard DEFRAG AI tracking. Available automatically."
        price="Included"
        isActive={false}
      />
      <TierRow 
        title="Core"
        description="Unlimited processing. Access to simulation pathways and granular insight overlays."
        price="$15 / mo"
        isActive={false}
      />
      <TierRow 
        title="Studio"
        description="Deep temporal analysis and multi-perspective pattern tracking. Export artifacts."
        price="$45 / mo"
        isActive={false}
        isPremium
      />
      
      <div style={{ 
        marginTop: 24, 
        padding: 24, 
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>Choose a plan. Access requires an account.</div>
        <a href="/login" style={{ padding: "12px 24px", borderRadius: "100px", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Sign in</a>
      </div>
    </div>
  );
}

function TierRow({ title, description, price, isActive, isPremium, children }: any) {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "minmax(200px, 1fr) 140px 180px", 
      gap: 24, 
      alignItems: "center",
      padding: "28px 32px",
      borderRadius: "var(--radius-md)",
      border: isActive ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
      background: isActive ? "rgba(216, 196, 159, 0.05)" : "var(--color-surface)",
    }}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>{title}</span>
          {isPremium && <span style={{ padding: "4px 8px", borderRadius: 4, background: "rgba(216,196,159,0.15)", color: "var(--color-accent)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Premium</span>}
        </div>
        <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{description}</p>
      </div>
      
      <div style={{ fontSize: 16, color: "var(--color-text-primary)", fontFamily: "monospace" }}>
        {price}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {children}
      </div>
      <style>{`
        @media (max-width: 800px) {
          .tier-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .tier-row > div:last-child {
            justify-content: flex-start !important;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
}
