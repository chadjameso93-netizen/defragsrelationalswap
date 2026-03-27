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
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420, border: "1px solid rgba(255,255,255,0.08)", padding: 40 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 8 }}>
            Sign in
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>
            Enter Defrag
          </h1>
        </div>

        <p style={{ fontSize: 14, color: "rgba(245,245,245,0.6)", marginBottom: 24 }}>
          Enter your email. You will receive a secure link to continue.
        </p>

        {status === "sent" ? (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6ee7b7" }}>
              <CheckCircle2 style={{ width: 16, height: 16 }} />
              Link sent
            </div>
            <p style={{ fontSize: 14, color: "rgba(245,245,245,0.6)", margin: 0 }}>
              Check your email and follow the link to continue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px" }}>
              <Mail style={{ width: 16, height: 16, color: "rgba(245,245,245,0.4)" }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white" }}
              />
            </div>

            <button
              type="submit"
              disabled={!isValidEmail || isPending}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: 14, background: "white", color: "#050505", border: "none", cursor: "pointer", opacity: isValidEmail ? 1 : 0.5 }}
            >
              {status === "sending" ? "Sending..." : "Send link"}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>

            {error && (
              <p style={{ fontSize: 13, color: "#ef4444" }}>{error}</p>
            )}
          </form>
        )}
      </div>
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
