"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
        background: "#050505",
        color: "#f5f5f5",
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "min(100%, 420px)",
          display: "grid",
          gap: 16,
          padding: 24,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#71717a" }}>
            DEFRAG
          </p>
          <h1 style={{ margin: 0, fontSize: 28 }}>Sign in</h1>
          <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.6 }}>
            Use an existing Supabase Auth user to access Companion, billing, and World locally.
          </p>
        </div>

        <label style={{ display: "grid", gap: 8 }}>
          <span style={{ fontSize: 14 }}>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            style={{
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#111111",
              color: "#f5f5f5",
              padding: "12px 14px",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 8 }}>
          <span style={{ fontSize: 14 }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            style={{
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#111111",
              color: "#f5f5f5",
              padding: "12px 14px",
            }}
          />
        </label>

        {error ? <p style={{ margin: 0, color: "#fca5a5" }}>{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          style={{
            border: 0,
            borderRadius: 10,
            padding: "12px 14px",
            background: "#f5f5f5",
            color: "#050505",
            fontWeight: 600,
            cursor: loading ? "progress" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Continue"}
        </button>
      </form>
    </main>
  );
}
