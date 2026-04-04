"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "min(880px, 100%)", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 20 }}>
        <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 28, display: "grid", gap: 18 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Sign in</div>
          <h1 style={{ margin: 0, fontSize: 54, lineHeight: 0.94, fontFamily: "var(--font-display), serif" }}>Return to your DEFRAG workspace.</h1>
          <p style={{ margin: 0, color: "rgba(245,242,236,0.62)", lineHeight: 1.74 }}>
            Sign in to continue your baseline, open the relationship workspace, and manage billing from one account.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              ["Baseline", "Intake and first profile"],
              ["Workspace", "Desktop and mobile views"],
              ["Billing", "Checkout and portal"],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>{label}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 28 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Access</div>
            <div style={{ fontSize: 34, fontFamily: "var(--font-display), serif" }}>Sign in</div>
          </div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
          {error ? <div style={{ color: "#fca5a5" }}>{error}</div> : null}
          <button type="submit" disabled={loading} style={{ border: 0, padding: "14px 18px", background: "#f5f2ec", color: "#050505", fontWeight: 700 }}>
            {loading ? "Signing in..." : "Continue"}
          </button>
          <div style={{ color: "rgba(245,242,236,0.62)", lineHeight: 1.7 }}>
            Need an account? <Link href="/signup" style={{ color: "#f5f2ec" }}>Create one</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
