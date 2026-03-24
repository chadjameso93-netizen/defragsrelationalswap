import Link from "next/link";
import { AppShell } from "../components/app-shell";

export default function LandingPage() {
  return (
    <AppShell
      eyebrow="System"
      title="Calm structure for moments that would otherwise stay tangled."
      description="DEFRAG turns charged exchanges into readable pattern, timing, and next-step guidance without slipping into diagnosis theater."
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 24,
          alignItems: "end",
        }}
      >
        <div style={{ display: "grid", gap: 18 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/companion"
              style={{ padding: "12px 16px", borderRadius: 999, background: "#f5f5f5", color: "#050505", textDecoration: "none", fontWeight: 700 }}
            >
              Open Companion
            </Link>
            <Link
              href="/world"
              style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", color: "#f5f5f5", textDecoration: "none" }}
            >
              Open World
            </Link>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {[
              ["Companion", "Structured reads of one moment, one thread, and one next move at a time."],
              ["Billing", "Stripe-backed upgrade, portal access, and webhook-driven subscription state."],
              ["World", "A visual field surface for charge, pressure, and stabilization guidance."],
            ].map(([label, copy]) => (
              <div key={label} style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 14, color: "#f5f5f5", marginBottom: 6 }}>{label}</div>
                <div style={{ color: "rgba(245,245,245,0.62)", lineHeight: 1.65 }}>{copy}</div>
              </div>
            ))}
          </div>
        </div>

        <section
          style={{
            minHeight: 420,
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "radial-gradient(circle at 20% 18%, rgba(255,240,205,0.38), transparent 24%), radial-gradient(circle at 70% 28%, rgba(130,155,219,0.28), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          }}
        >
          <div style={{ position: "absolute", inset: 0, padding: 24, display: "grid", alignContent: "space-between" }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 10 }}>
                {["pressure", "timing", "repair"].map((token) => (
                  <span key={token} style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {token}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, maxWidth: 340, fontSize: 24, lineHeight: 1.18 }}>
                Reads that stay gentle in tone while still naming the actual pattern.
              </p>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  ["Highest charge", "Conflict"],
                  ["Repair window", "Narrow"],
                  ["Next move", "One small reset"],
                ].map(([label, value]) => (
                  <div key={label} style={{ padding: 12, borderRadius: 16, background: "rgba(0,0,0,0.22)", backdropFilter: "blur(10px)" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,245,245,0.54)" }}>{label}</div>
                    <div style={{ marginTop: 8, fontSize: 14 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </AppShell>
  );
}
