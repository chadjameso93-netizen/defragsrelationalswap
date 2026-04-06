"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const PREVIEW_ENV_ERROR =
  "Password reset completion is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "saved" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [supabaseAvailable, setSupabaseAvailable] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (data.session) {
          setStatus("ready");
          return;
        }
        setStatus("error");
        setError("Your reset link is invalid or expired. Request a new password reset link.");
      } catch {
        if (!mounted) return;
        setSupabaseAvailable(false);
        setStatus("error");
        setError(PREVIEW_ENV_ERROR);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setStatus("saving");
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setStatus("error");
        setError(updateError.message);
        return;
      }
      setStatus("saved");
    } catch {
      setStatus("error");
      setError(PREVIEW_ENV_ERROR);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "min(660px, 100%)", display: "grid", gap: 18, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 28 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Reset password</div>
          <h1 style={{ margin: 0, fontSize: 40, lineHeight: 0.98, fontFamily: "var(--font-display), serif" }}>Choose a new password</h1>
        </div>

        {status === "loading" ? (
          <div style={{ color: "rgba(245,242,236,0.62)" }}>Preparing your reset session...</div>
        ) : null}

        {status === "ready" ? (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New password" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm new password" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
            {error ? <div style={{ color: "#fca5a5", lineHeight: 1.6 }}>{error}</div> : null}
            <button type="submit" style={{ border: 0, padding: "14px 18px", background: "#f5f2ec", color: "#050505", fontWeight: 700 }}>
              Save new password
            </button>
          </form>
        ) : null}

        {status === "saved" ? (
          <div style={{ padding: 16, border: "1px solid rgba(159,179,164,0.3)", background: "rgba(159,179,164,0.08)", color: "#d8e3be", lineHeight: 1.7 }}>
            Your password has been updated. You can now sign in with your new credentials.
          </div>
        ) : null}

        {status === "error" && error ? (
          <div style={{ padding: 16, border: "1px solid rgba(252,165,165,0.35)", background: "rgba(252,165,165,0.08)", color: "#fecaca", lineHeight: 1.7 }}>
            {error}
          </div>
        ) : null}

        <div style={{ color: "rgba(245,242,236,0.62)" }}>
          {supabaseAvailable ? (
            <>
              Need a new link? <Link href="/forgot-password" style={{ color: "#f5f2ec" }}>Request reset email</Link>.
            </>
          ) : null}{" "}
          <Link href="/signin/studio" style={{ color: "#f5f2ec" }}>Return to sign in</Link>.
        </div>
      </section>
    </main>
  );
}
