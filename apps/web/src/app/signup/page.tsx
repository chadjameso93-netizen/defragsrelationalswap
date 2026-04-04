"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "min(760px, 100%)", display: "grid", gap: 18, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))", padding: 28 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,236,0.42)" }}>Create account</div>
          <h1 style={{ margin: 0, fontSize: 44, lineHeight: 0.98, fontFamily: "var(--font-display), serif" }}>Create your DEFRAG account</h1>
          <p style={{ margin: 0, color: "rgba(245,242,236,0.62)", lineHeight: 1.72 }}>
            Create an account first so your baseline, workspace access, and billing state can stay attached to one profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required style={{ padding: "14px 16px", background: "#0a0a0a", color: "#f5f2ec", border: "1px solid rgba(255,255,255,0.1)" }} />
          {error ? <div style={{ color: "#fca5a5" }}>{error}</div> : null}
          <button type="submit" disabled={loading} style={{ border: 0, padding: "14px 18px", background: "#f5f2ec", color: "#050505", fontWeight: 700 }}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div style={{ color: "rgba(245,242,236,0.62)" }}>
          Already have an account? <Link href="/login" style={{ color: "#f5f2ec" }}>Sign in</Link>
        </div>
      </section>
    </main>
  );
}
