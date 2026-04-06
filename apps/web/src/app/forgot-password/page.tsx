"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const PREVIEW_ENV_ERROR =
  "Password reset is unavailable in this preview environment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to continue.";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      setStatus("error");
      setError(PREVIEW_ENV_ERROR);
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setStatus("error");
      setError(resetError.message);
      return;
    }

    setStatus("sent");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "min(660px, 100%)", display: "grid", gap: 18, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 28 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Password reset</div>
          <h1 style={{ margin: 0, fontSize: 40, lineHeight: 0.98, fontFamily: "var(--font-display), serif" }}>Reset your password</h1>
          <p style={{ margin: 0, color: "rgba(245,242,236,0.62)", lineHeight: 1.72 }}>
            Enter your account email and we’ll send a secure reset link.
          </p>
        </div>

        {status === "sent" ? (
          <div style={{ padding: 16, border: "1px solid rgba(159,179,164,0.3)", background: "rgba(159,179,164,0.08)", color: "#d8e3be", lineHeight: 1.7 }}>
            Check your inbox for the reset link. If it doesn’t appear, check spam and try again.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
            {error ? <div style={{ color: "#fca5a5", lineHeight: 1.6 }}>{error}</div> : null}
            <button type="submit" disabled={status === "sending"} style={{ border: 0, padding: "14px 18px", background: "#f5f2ec", color: "#050505", fontWeight: 700 }}>
              {status === "sending" ? "Sending link..." : "Send reset link"}
            </button>
          </form>
        )}

        <div style={{ color: "rgba(245,242,236,0.62)" }}>
          Return to <Link href="/signin/studio" style={{ color: "#f5f2ec" }}>Sign in</Link>.
        </div>
      </section>
    </main>
  );
}
