import Link from "next/link";
import { AppShell } from "../../components/app-shell";
import { ArrowRight } from "lucide-react";

export default function PublicPricingPage() {
  const tiers = [
    { label: "Base", price: "Included", description: "Standard tracking and identification. Perfect for mapping scattered interactions and basic context building." },
    { label: "Core", price: "$15", period: "/ mo", accent: true, description: "Unlimited insight processing. Access structured interpretation panels, explore alternative responses, and generate simulations." },
    { label: "Studio", price: "$45", period: "/ mo", description: "Deep temporal analysis. Retain extended interaction history, access premium evidence breakdown, and identify long-term patterns." },
  ];

  return (
    <AppShell
      eyebrow=""
      title="Pricing & Tiers."
      description="Select the level of analysis that fits your situation."
    >
      <div style={{ maxWidth: 900, display: "grid", gap: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }} className="tier-grid">
          {tiers.map((tier) => (
            <div key={tier.label} style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: tier.accent ? "#22d3ee" : "rgba(245,245,245,0.5)" }}>{tier.label}</div>
              <div style={{ fontSize: 32, fontWeight: 400, color: "white", letterSpacing: "-0.02em" }}>
                {tier.price}
                {tier.period && <span style={{ fontSize: 18, color: "rgba(245,245,245,0.4)" }}> {tier.period}</span>}
              </div>
              <p style={{ margin: 0, color: "rgba(245,245,245,0.6)", lineHeight: 1.6, fontSize: 15, fontWeight: 300 }}>
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap", paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: 500 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500, color: "white" }}>Start a session</h3>
            <p style={{ margin: "12px 0 0", fontSize: 15, color: "rgba(245,245,245,0.6)", lineHeight: 1.6, fontWeight: 300 }}>
              Access to DEFRAG requires an account. Create your workspace to see your conversations and select a tier.
            </p>
          </div>
          <Link 
            href="/login"
            style={{
              padding: "12px 22px",
              borderRadius: 12,
              background: "#f3ede2",
              color: "#050505",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid rgba(243,237,226,0.82)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}
          >
            Sign up <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tier-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
