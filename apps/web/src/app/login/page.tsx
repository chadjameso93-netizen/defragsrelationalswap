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
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#f5f5f5", padding: 18 }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gap: 18 }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03) 55%, transparent)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.08fr) minmax(360px,0.92fr)", gap: 26, minHeight: "calc(100vh - 72px)" }} className="login-grid">
          <section style={{ position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))", padding: "42px clamp(22px, 4vw, 54px)", display: "grid", alignContent: "space-between", gap: 36 }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 10% 12%, rgba(159,179,164,0.22), transparent 18%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.08), transparent 14%)" }} />
            <div style={{ position: "relative", display: "grid", gap: 18, alignContent: "start", maxWidth: 760 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>
                Relational Intelligence Infrastructure
              </div>
              <h1 className="font-display" style={{ margin: 0, fontSize: "clamp(4rem, 8vw, 7.2rem)", lineHeight: 0.84, color: "white" }}>
                Open the workspace and read the moment clearly.
              </h1>
              <p style={{ margin: 0, maxWidth: 620, fontSize: 17, lineHeight: 1.84, color: "rgba(245,245,245,0.66)" }}>
                Use Defrag to understand difficult interactions, compare perspectives across sides, and receive structured guidance on what may be happening and what to do next.
              </p>
            </div>

            <div style={{ position: "relative", display: "grid", gap: 14, maxWidth: 760 }}>
              {[
                "Read what may be happening beneath the interaction.",
                "Compare how each side may be reading the moment.",
                "Choose a next move that lowers pressure instead of adding more distortion.",
              ].map((line, index) => (
                <div key={line} style={{ width: `${92 - index * 10}%`, marginLeft: index === 2 ? "auto" : 0, padding: "16px 18px", borderLeft: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.03)", boxShadow: "0 22px 48px rgba(0,0,0,0.26)", fontSize: 15, lineHeight: 1.72, color: "rgba(245,245,245,0.92)" }}>
                  {line}
                </div>
              ))}
            </div>
          </section>

          <section style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", padding: "32px 28px", display: "grid", alignContent: "start", gap: 24 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
                Sign in
              </div>
              <h2 className="font-display" style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 0.92, color: "white" }}>
                Enter Defrag
              </h2>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.58)" }}>
                Enter your email and we will send a secure link so you can continue directly to your workspace.
              </p>
            </div>

            {status === "sent" ? (
              <div style={{ display: "grid", gap: 12, padding: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#c8d8a2", fontSize: 14, fontWeight: 600 }}>
                  <CheckCircle2 style={{ width: 16, height: 16 }} />
                  Link sent
                </div>
                <p style={{ fontSize: 14, color: "rgba(245,245,245,0.62)", margin: 0, lineHeight: 1.6 }}>
                  Check your email and follow the link to continue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(255,255,255,0.1)", padding: "16px 16px", background: "rgba(0,0,0,0.16)" }}>
                  <Mail style={{ width: 16, height: 16, color: "rgba(245,245,245,0.4)" }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: 15 }}
                  />
                </div>
                <button type="submit" disabled={!isValidEmail || isPending} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: 17, background: "white", color: "#050505", border: "none", cursor: isValidEmail ? "pointer" : "default", opacity: isValidEmail ? 1 : 0.55, fontWeight: 600, fontSize: 15 }}>
                  {status === "sending" ? "Sending..." : "Send secure link"}
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
                {error ? <p style={{ margin: 0, fontSize: 13, color: "#fca5a5" }}>{error}</p> : null}
              </form>
            )}
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .login-grid { grid-template-columns: 1fr !important; }
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
