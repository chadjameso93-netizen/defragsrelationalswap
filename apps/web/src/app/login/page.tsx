"use client";

import React, { Suspense, useMemo, useState, useTransition } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { enterEmailSystemLink } from "./actions";
import { useSearchParams } from "next/navigation";

function LoginContent(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dynamics";

  const isValidEmail = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail || isPending) return;

    setStatus("sending");
    setError(null);

    startTransition(async () => {
      const result = await enterEmailSystemLink(email, nextPath);

      if (result?.error) {
        setStatus("error");
        setError(result.error);
        return;
      }

      setStatus("sent");
    });
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#f5f5f5", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 1080, display: "grid", gridTemplateColumns: "minmax(0,1fr) 420px", gap: 48 }} className="login-grid">
        <section style={{ display: "grid", gap: 28, alignContent: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>
            Relational Intelligence Infrastructure
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 0.96, letterSpacing: "-0.05em", fontWeight: 500, color: "white" }}>
            Sign in to open your Defrag workspace.
          </h1>
          <p style={{ margin: 0, maxWidth: 620, fontSize: 17, lineHeight: 1.8, color: "rgba(245,245,245,0.64)" }}>
            Use Defrag to understand difficult interactions, compare perspectives across sides, and receive structured guidance on what may be happening and what to do next.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }} className="login-points">
            {[
              ["Read the moment", "See what may be happening and where pressure changed."],
              ["Compare perspectives", "Understand how each side may be reading the interaction."],
              ["Choose the next move", "Get clearer wording and steadier next-step guidance."],
            ].map(([title, body]) => (
              <div key={title} style={{ display: "grid", gap: 10, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(245,245,245,0.55)" }}>{body}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: 32, display: "grid", gap: 22, alignContent: "start" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>
              Sign in
            </div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 500, color: "white" }}>Enter Defrag</h2>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.58)" }}>
              Enter your email and we will send a secure link so you can continue directly to your workspace.
            </p>
          </div>

          {status === "sent" ? (
            <div style={{ display: "grid", gap: 12, padding: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6ee7b7", fontSize: 14, fontWeight: 600 }}>
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                Link sent
              </div>
              <p style={{ fontSize: 14, color: "rgba(245,245,245,0.62)", margin: 0, lineHeight: 1.6 }}>
                Check your email and follow the link to continue.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", background: "rgba(0,0,0,0.16)" }}>
                <Mail style={{ width: 16, height: 16, color: "rgba(245,245,245,0.4)" }} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: 15 }}
                />
              </div>

              <button
                type="submit"
                disabled={!isValidEmail || isPending}
                style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: 16, background: "white", color: "#050505", border: "none", cursor: isValidEmail ? "pointer" : "default", opacity: isValidEmail ? 1 : 0.55, fontWeight: 600, fontSize: 15 }}
              >
                {status === "sending" ? "Sending..." : "Send secure link"}
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>

              {error && <p style={{ margin: 0, fontSize: 13, color: "#fca5a5" }}>{error}</p>}
            </form>
          )}
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-grid, .login-points {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function LoginFallback(): React.JSX.Element {
  return <div style={{ minHeight: "100vh", backgroundColor: "#050505" }} />;
}

export default function LoginPage(): React.JSX.Element {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
