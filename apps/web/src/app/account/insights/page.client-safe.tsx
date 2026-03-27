"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function InsightsPageClientSafe() {
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <AppShell
      eyebrow="Insight Studio"
      title="Look a little closer."
      description="Stored reads, simulations, and calmer reframes for one moment at a time."
      accent="#d9c49f"
    >
      <div style={{ display: "grid", gap: 20, maxWidth: 760 }}>
        <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", padding: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Status</div>
          <h2 style={{ margin: "12px 0 8px", fontSize: 24, color: "#f5f5f5" }}>
            {hasSupabase ? "Insight history is ready." : "Insight history needs environment setup."}
          </h2>
          <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.7, fontSize: 14 }}>
            {hasSupabase ? "Your account insight surface can now be connected to persisted reads and simulations." : "This fallback is build-safe so production can deploy before Supabase environment variables are added."}
          </p>
        </div>

        <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: 24, display: "grid", gap: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Live testing</div>
          <p style={{ margin: 0, color: "#d4d4d8", lineHeight: 1.7, fontSize: 14 }}>
            The fastest production validation path is now the live AI surface.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
            <Link href="/ai" style={{ textDecoration: "none", color: "#050505", background: "#fff", padding: "12px 18px", borderRadius: 999, fontWeight: 600 }}>Open live AI</Link>
            <Link href="/account/billing" style={{ textDecoration: "none", color: "#f5f5f5", border: "1px solid rgba(255,255,255,0.12)", padding: "12px 18px", borderRadius: 999 }}>Billing</Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
