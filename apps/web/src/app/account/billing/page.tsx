import { AppShell } from "../../../components/app-shell";
import { BillingActions } from "../../../components/billing-actions";
import { getBillingStateForUser } from "../../../lib/billing-server";
import { getAuthenticatedUserOrNull } from "../../../server/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function BillingPage() {
  const user = await getAuthenticatedUserOrNull();

  if (!user) {
    return (
      <AppShell
        eyebrow=""
        title="Pricing & Tiers."
        description="Select the level of analysis that fits your situation."
      >
        <div style={{ maxWidth: 720, display: "grid", gap: 64 }}>
          <div style={{ display: "grid", gap: 20 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500, color: "white" }}>Start a session</h3>
            <p style={{ margin: 0, fontSize: 16, color: "rgba(245,245,245,0.6)", lineHeight: 1.6, fontWeight: 300 }}>
              Access to DEFRAG requires an account. Create your workspace to see your conversations and select a tier.
            </p>
            <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "fit-content", padding: "18px 36px", borderRadius: 16, background: "white", color: "#050505", textDecoration: "none", fontWeight: 600, fontSize: 16 }}>
              Sign in <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          </div>

          <TierBreakdown activePlanKey={null} />
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
      title="Pricing & Tiers."
      description="Select the level of analysis that fits your situation."
    >
      <div style={{ maxWidth: 900, display: "grid", gap: 64 }}>
        
        {/* Workspace Status */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 32, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>Current Plan</div>
            <div style={{ fontSize: 32, fontWeight: 400, color: "white", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: 12 }}>
              {activePlanKey === "realtime" ? "Studio+" :
               activePlanKey === "studio" ? "Studio" : 
               activePlanKey === "core" ? "Core" : "Base"}
               {isSubscribed && <span style={{ padding: "4px 10px", borderRadius: 9999, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#6ee7b7", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>Active</span>}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "rgba(245,245,245,0.5)" }}>{user.email}</p>
          </div>
          
          <BillingActions currentPlan={account.plan} hasCustomer={isSubscribed} />
        </div>

        <TierBreakdown activePlanKey={activePlanKey} />
      </div>
    </AppShell>
  );
}

function TierBreakdown({ activePlanKey }: { activePlanKey: string | null }) {
  const tiers = [
    { key: "base", label: "Base", price: "Included", description: "Standard tracking. Perfect for mapping scattered interactions and basic context building." },
    { key: "core", label: "Core", price: "$15", period: "/ mo", description: "Unlimited insight processing. Access structured interpretation panels and next-move simulations." },
    { key: "studio", label: "Studio", price: "$45", period: "/ mo", description: "Deep temporal analysis. Retain extended interaction history and identify long-term patterns." },
  ];

  return (
    <div style={{ display: "grid", gap: 48 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>Pricing</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }} className="tier-grid">
        {tiers.map((tier) => {
          const isActive = activePlanKey === tier.key;
          return (
            <div key={tier.key} style={{ display: "grid", gap: 16, opacity: isActive ? 0.4 : 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: tier.key === "core" ? "#22d3ee" : "rgba(245,245,245,0.5)" }}>{tier.label}</div>
              <div style={{ fontSize: 28, fontWeight: 400, color: "white", letterSpacing: "-0.02em" }}>
                {tier.price}
                {tier.period && <span style={{ fontSize: 16, color: "rgba(245,245,245,0.4)" }}> {tier.period}</span>}
              </div>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.6)", lineHeight: 1.6, fontSize: 14, fontWeight: 300 }}>
                {tier.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
