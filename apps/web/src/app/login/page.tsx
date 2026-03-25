"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      setError("Sign in failed. Check your email and password, then try again.");
      setLoading(false);
      return;
    }

    const nextPath = searchParams.get("next");
    router.push(nextPath && nextPath.startsWith("/") ? nextPath : "/companion");
    router.refresh();
  }

  return (
    <main
      className="premium-fade-up"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        padding: 24,
      }}
    >
      <div style={{ width: "min(100%, 980px)", display: "grid", gridTemplateColumns: "1fr 420px", gap: 24, alignItems: "stretch" }}>
        <section
          className="login-story"
          style={{
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: 32,
            background: "linear-gradient(180deg, var(--color-surface), transparent)",
            display: "grid",
            alignContent: "space-between",
            minHeight: 560,
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            <Link href="/" style={{ textDecoration: "none", color: "var(--color-text-primary)", fontSize: 18, letterSpacing: "0.28em", textTransform: "uppercase" }}>
              DEFRAG
            </Link>
            <p className="premium-fade-up" data-delay="1" style={{ margin: 0, fontSize: "clamp(2.2rem, 5vw, 4.6rem)", lineHeight: 0.98, maxWidth: 520, fontFamily: "var(--font-display), serif" }}>
              Sign in to return to your dynamics workspace, saved insights, and account state.
            </p>
            <p className="premium-fade-up" data-delay="2" style={{ margin: 0, maxWidth: 480, color: "var(--color-text-secondary)", lineHeight: 1.75 }}>
              DEFRAG keeps dynamics, insights, world state, and billing in one canonical account flow. Authentication is the handoff between private guidance and stored history.
            </p>
          </div>

          <div className="premium-fade-up" data-delay="3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              ["Dynamics", "Thread-based guidance"],
              ["Insights", "Saved account insights"],
              ["World", "Field interpretation"],
            ].map(([label, value]) => (
              <div key={label} style={{ padding: 16, borderRadius: "var(--radius-md)", background: "var(--color-surface)", border: "1px solid var(--color-border)", backdropFilter: "blur(12px)" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{label}</div>
                <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5, color: "var(--color-text-primary)" }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        <form
          className="login-form premium-fade-up" data-delay="1"
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "grid",
            gap: 20,
            padding: 32,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            alignSelf: "center",
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#d9c49f" }}>
              Access
            </p>
            <h1 style={{ margin: 0, fontSize: 34 }}>Sign in</h1>
            <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.7 }}>
              Use your DEFRAG account to reopen private threads, saved insights, and billing state.
            </p>
          </div>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              style={{
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-hover)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
                padding: "16px 18px",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              style={{
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-hover)",
                background: "var(--color-bg)",
                color: "var(--color-text-primary)",
                padding: "16px 18px",
              }}
            />
          </label>

          {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              border: 0,
              borderRadius: "var(--radius-pill)",
              padding: "16px 20px",
              background: "var(--color-text-primary)",
              color: "var(--color-bg)",
              fontWeight: 700,
              cursor: loading ? "progress" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Continue"}
          </button>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, color: "var(--color-text-muted)", fontSize: 13 }}>
            <Link href="/terms" style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}>
              Terms
            </Link>
            <Link href="/privacy" style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}>
              Privacy
            </Link>
            <Link href="/about" style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}>
              About DEFRAG
            </Link>
          </div>
        </form>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .login-story {
            min-height: auto !important;
          }

          .login-form {
            order: -1;
          }

          main > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
