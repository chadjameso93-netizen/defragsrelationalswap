"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { enterEmailSystemLink } from "../server/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const result = await enterEmailSystemLink(email, nextPath || "/dynamics");
      if (result.error) {
        setErrorMessage(result.error);
        setStatus("error");
      } else {
        setStatus("sent");
      }
    } catch (err) {
      setErrorMessage(String(err));
      setStatus("error");
    }
  };

  return (
    <main
      className="premium-fade-up"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(180deg, #040507 0%, #0a0c10 100%)",
        color: "var(--color-text-primary)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          display: "grid",
          gap: 32,
          position: "relative",
          zIndex: 10
        }}
      >
        <div style={{ display: "grid", gap: 12, textAlign: "center" }}>
          <div style={{ letterSpacing: "0.32em", fontSize: 13, textTransform: "uppercase", color: "var(--color-text-secondary)", fontWeight: 500 }}>
            DEFRAG
          </div>
          <h1 style={{ margin: 0, fontSize: "2.4rem", letterSpacing: "-0.02em", color: "var(--color-text-primary)", fontWeight: 400 }}>
            Sign In
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Enter your email to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(10, 12, 16, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: 32,
            display: "grid",
            gap: 20,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
          }}
        >
          {status === "idle" || status === "sending" || status === "error" ? (
            <>
              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginLeft: 4 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--color-text-primary)",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s ease"
                  }}
                />
              </div>

              {status === "error" && (
                <div style={{ padding: 12, borderRadius: 8, background: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", color: "#fca5a5", fontSize: 13, textAlign: "center" }}>
                  {errorMessage || "Authentication failed. The system could not verify the request."}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending" || !email}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "var(--color-text-primary)",
                  color: "var(--color-bg)",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  border: 0,
                  cursor: status === "sending" || !email ? "default" : "pointer",
                  opacity: status === "sending" || !email ? 0.7 : 1,
                  transition: "all 0.2s ease",
                  marginTop: 8
                }}
              >
                {status === "sending" ? "Sending link..." : "Continue with email"}
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", display: "grid", gap: 16, padding: "16px 0" }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: "rgba(216,196,159,0.1)", border: "1px solid rgba(216,196,159,0.3)", display: "grid", placeItems: "center", margin: "0 auto", color: "var(--color-accent)" }}>
                ✓
              </div>
              <div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 400 }}>Check your inbox</h3>
                <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  We sent a secure sign-in link to <strong>{email}</strong>. Click it to sign in.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                style={{ margin: "12px auto 0", background: "none", border: 0, color: "var(--color-text-muted)", fontSize: 13, textDecoration: "underline", cursor: "pointer" }}
              >
                Use a different address
              </button>
            </div>
          )}
        </form>
      </div>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(216, 196, 159, 0.03) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
    </main>
  );
}
