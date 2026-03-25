import Link from "next/link";
import { AppShell } from "../../components/app-shell";

export default function PublicPricingPage() {
  return (
    <AppShell
      eyebrow=""
      title="Intelligence capacity."
      description="DEFRAG AI operates on a tiered framework to support deep interaction tracing and history."
    >
      <div 
        className="premium-fade-up" 
        data-delay="2" 
        style={{ 
          marginTop: 24, 
          display: "grid", 
          gap: 16 
        }}
      >
        <section 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            padding: 32,
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            background: "rgba(6, 7, 10, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
            <span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-secondary)" }}>Base</span>
            <div style={{ fontSize: 32, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>Included</div>
            <p style={{ margin: "12px 0 0 0", color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 15 }}>
              Standard tracking and identification. Perfect for mapping scattered interactions and basic context building.
            </p>
          </div>

          <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-accent)" }}>Core</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>$15 <span style={{ fontSize: 18, color: "var(--color-text-muted)" }}>/ mo</span></div>
            <p style={{ margin: "12px 0 0 0", color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 15 }}>
              Unlimited insight processing. Access structured interpretation panels, explore alternative responses, and generate simulations.
            </p>
          </div>

          <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
            <span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-text-secondary)" }}>Studio</span>
            <div style={{ fontSize: 32, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>$45 <span style={{ fontSize: 18, color: "var(--color-text-muted)" }}>/ mo</span></div>
            <p style={{ margin: "12px 0 0 0", color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 15 }}>
              Deep temporal analysis. Retain extended interaction history, access premium evidence breakdown, and identify long-term patterns.
            </p>
          </div>
        </section>

        <section 
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 24,
            alignItems: "center",
            padding: 32,
            background: "linear-gradient(90deg, var(--color-surface), transparent)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            marginTop: 16
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: "var(--color-text-primary)" }}>Begin mapping interactions</h3>
            <p style={{ margin: "6px 0 0 0", fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: 500 }}>
              Access to DEFRAG requires an account. Create your workspace to view the live relational field and select a capacity tier.
            </p>
          </div>
          <Link 
            href="/login"
            style={{
              padding: "16px 28px",
              borderRadius: "var(--radius-pill)",
              background: "var(--color-text-primary)",
              color: "var(--color-bg)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              whiteSpace: "nowrap"
            }}
          >
            Sign up
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
