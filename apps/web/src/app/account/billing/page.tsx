import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow="Access Structure"
        title="Intelligence Tiers"
        description="DEFRAG AI operates on a tiered capability model. The architecture is designed to support deep interaction tracing without artificial seat constraints."
      >
        <UnauthenticatedTiers />
      </AppShell>
    );
  }

  const { customer, subscription, entitlements } = await getBillingStateForUser(user.userId);
  const activePlanKey = subscription ? subscription.items.data[0]?.price.id : "free";

  return (
    <AppShell
      eyebrow="Access Structure"
      title="Intelligence Tiers"
      description="Select the architectural envelope required for your current relational mapping scope."
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
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>Current Status</div>
            <div style={{ fontSize: 16, color: subscription ? "var(--color-accent)" : "var(--color-text-primary)", fontWeight: 500 }}>
              {activePlanKey === process.env.STRIPE_PRICE_REALTIME ? "Real-time Field Network" :
               activePlanKey === process.env.STRIPE_PRICE_STUDIO ? "Relational Studio" : 
               activePlanKey === process.env.STRIPE_PRICE_CORE ? "Core Extraction" : "Base Capacity"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>Account Authority</div>
            <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{user.email}</div>
          </div>
          {subscription && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>Renewal Cycle</div>
              <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Active / Monitored</div>
            </div>
          )}
        </section>

        {/* The Tiers (Editorial Style instead of Card Comparison) */}
        <div style={{ display: "grid", gap: 20 }}>
          <TierRow 
            title="Base Capacity"
            description="Essential structural readouts and standard DEFRAG AI trace limits. Valid for single-perspective orientation."
            price="Included"
            isActive={!subscription}
          >
             {!subscription && <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Current Level</div>}
          </TierRow>

          <TierRow 
            title="Core Extraction"
            description="Removes structural limitations on insight processing. Gain fluid access to interpretation panels and simulation pathways."
            price="$15 / mo"
            isActive={activePlanKey === process.env.STRIPE_PRICE_CORE}
          >
            <BillingActions
              planName="Core Extraction"
              priceId={process.env.STRIPE_PRICE_CORE!}
              isCurrentPlan={activePlanKey === process.env.STRIPE_PRICE_CORE}
              hasSubscription={!!subscription}
              stripeCustomerId={customer?.id}
            />
          </TierRow>

          <TierRow 
            title="Relational Studio"
            description="Deep temporal analysis. Retains extended interaction timelines to spot generational and systemic architecture. Export structural artifacts."
            price="$45 / mo"
            isActive={activePlanKey === process.env.STRIPE_PRICE_STUDIO}
            isPremium
          >
             <BillingActions
              planName="Relational Studio"
              priceId={process.env.STRIPE_PRICE_STUDIO!}
              isCurrentPlan={activePlanKey === process.env.STRIPE_PRICE_STUDIO}
              hasSubscription={!!subscription}
              stripeCustomerId={customer?.id}
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
        title="Base Capacity"
        description="Standard DEFRAG AI tracing bounds. Functional mapping for acute disconnects. Available automatically."
        price="Included"
        isActive={false}
      />
      <TierRow 
        title="Core Extraction"
        description="Unhindered processing volume. Simulation pathways and granular insight overlays for continuous interaction monitoring."
        price="$15 / mo"
        isActive={false}
      />
      <TierRow 
        title="Relational Studio"
        description="Temporal field projection. Deep-time capability, architectural artifact creation, and multi-perspective field locking."
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
        <div style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>Identify your requirements internally. Access requires authentication.</div>
        <a href="/login" style={{ padding: "12px 24px", borderRadius: "100px", background: "var(--color-text-primary)", color: "var(--color-bg)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Authenticate Access</a>
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
          {isPremium && <span style={{ padding: "4px 8px", borderRadius: 4, background: "rgba(216,196,159,0.15)", color: "var(--color-accent)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>High Capacity</span>}
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
