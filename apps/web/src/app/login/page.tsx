"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/companion");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(214,195,161,0.16), transparent 28%), radial-gradient(circle at 80% 20%, rgba(111,145,201,0.14), transparent 24%), linear-gradient(180deg, #06070a 0%, #090b11 45%, #050505 100%)",
        color: "#f5f5f5",
        padding: 24,
      }}
    >
      <div style={{ width: "min(100%, 980px)", display: "grid", gridTemplateColumns: "1fr 420px", gap: 24, alignItems: "stretch" }}>
        <section
          style={{
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 28,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
            display: "grid",
            alignContent: "space-between",
            minHeight: 560,
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            <Link href="/" style={{ textDecoration: "none", color: "#f5f5f5", fontSize: 18, letterSpacing: "0.28em", textTransform: "uppercase" }}>
              DEFRAG
            </Link>
            <p style={{ margin: 0, fontSize: "clamp(2.2rem, 5vw, 4.6rem)", lineHeight: 0.98, maxWidth: 520, fontFamily: "var(--font-display), serif" }}>
              Sign in to re-enter the workspace with your threads, reads, and field state intact.
            </p>
            <p style={{ margin: 0, maxWidth: 480, color: "rgba(245,245,245,0.66)", lineHeight: 1.75 }}>
              Companion, billing, insights, and World now live in the same shared system. Authentication is the handoff between private reasoning and stored history.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              ["Companion", "Thread-based reasoning"],
              ["Insights", "Saved local reads"],
              ["World", "Field interpretation"],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: 12, borderRadius: 16, background: "rgba(0,0,0,0.22)", backdropFilter: "blur(10px)" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,245,245,0.52)" }}>{label}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "grid",
            gap: 18,
            padding: 28,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.035)",
            alignSelf: "center",
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d9c49f" }}>
              Access
            </p>
            <h1 style={{ margin: 0, fontSize: 34 }}>Sign in</h1>
            <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.7 }}>
              Use the same Supabase account you created for local testing.
            </p>
          </div>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#d4d4d8" }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              style={{
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.22)",
                color: "#f5f5f5",
                padding: "14px 16px",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#d4d4d8" }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              style={{
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.22)",
                color: "#f5f5f5",
                padding: "14px 16px",
              }}
            />
          </label>

          {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              border: 0,
              borderRadius: 999,
              padding: "14px 18px",
              background: "#f5f5f5",
              color: "#050505",
              fontWeight: 700,
              cursor: loading ? "progress" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
