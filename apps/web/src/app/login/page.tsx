"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const isValidEmail = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail || status === "sending") return;

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", backgroundColor: "#050505", color: "#f5f5f5" }}>
      <LoginBackground />

      <div style={{ position: "relative", margin: "0 auto", display: "flex", minHeight: "100vh", maxWidth: 1200, alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>
        <div style={{ display: "grid", width: "100%", maxWidth: 1040, alignItems: "center", gap: 64, gridTemplateColumns: "1.1fr 520px" }} className="login-grid">
          
          <section className="brand-side" style={{ display: "grid", gap: 32 }}>
            <div style={{ maxWidth: 500 }}>
              <div style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 9999, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "8px 16px", backdropFilter: "blur(40px)" }}>
                <div style={{ height: 8, width: 8, borderRadius: "50%", backgroundColor: "#22d3ee" }} />
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.8)" }}>
                  DEFRAG
                </span>
              </div>

              <h1 style={{ maxWidth: "12ch", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, color: "white", margin: 0 }}>
                See the pattern. Change what happens next.
              </h1>

              <p style={{ marginTop: 24, opacity: 0.7, fontSize: 18, lineHeight: 1.6 }}>
                DEFRAG helps you understand what happened, notice pressure, and know what to do next.
              </p>

              <div style={{ marginTop: 40, display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)" }}>
                <SignalItem label="Understand" value="What happened" />
                <SignalItem label="Notice" value="What changed" />
                <SignalItem label="Decide" value="The next move" />
              </div>
            </div>
          </section>

          <section style={{ width: "100%", maxWidth: 440, margin: "0 auto" }}>
            <div style={{ borderRadius: 32, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "48px 40px", backdropFilter: "blur(40px)", boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }}>
              <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.5)" }}>
                    Sign in
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", color: "white", margin: 0 }}>
                    Continue to DEFRAG
                  </h2>
                </div>
                <div style={{ borderRadius: 16, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(0,0,0,0.2)", padding: 12 }}>
                  <Lock style={{ height: 20, width: 20, color: "rgba(245, 245, 245, 0.8)" }} />
                </div>
              </div>

              <p style={{ marginBottom: 32, fontSize: 15, lineHeight: 1.6, color: "rgba(245, 245, 245, 0.7)" }}>
                Enter your email and we’ll send you a secure sign-in link.
              </p>

              {status === "sent" ? (
                <div style={{ borderRadius: 24, border: "1px solid rgba(16, 185, 129, 0.2)", backgroundColor: "rgba(16, 185, 129, 0.05)", padding: 24 }}>
                  <div style={{ marginBottom: 12, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#6ee7b7" }}>
                    <CheckCircle2 style={{ height: 16, width: 16 }} />
                    Check your inbox
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(110, 231, 183, 0.8)" }}>
                    We sent a sign-in link to{" "}
                    <span style={{ fontWeight: 600, color: "white" }}>{email}</span>.
                  </p>

                  <button
                    type="button"
                    onClick={() => { setEmail(""); setStatus("idle"); }}
                    style={{ marginTop: 20, fontSize: 13, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", padding: "10px 16px", borderRadius: 9999, cursor: "pointer" }}
                  >
                    Use a different email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 24 }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    <label htmlFor="email" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
                      Email address
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 18, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(0,0,0,0.2)", padding: "14px 18px" }}>
                      <Mail style={{ height: 16, width: 16, color: "rgba(245, 245, 245, 0.4)" }} />
                      <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", border: "none", background: "transparent", color: "white", fontSize: 15, outline: "none" }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValidEmail || status === "sending"}
                    style={{ 
                      width: "100%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      gap: 10, 
                      borderRadius: 18, 
                      backgroundColor: "white", 
                      color: "#050505", 
                      padding: "16px", 
                      fontSize: 16, 
                      fontWeight: 600, 
                      border: "none", 
                      cursor: isValidEmail ? "pointer" : "not-allowed",
                      opacity: isValidEmail ? 1 : 0.6
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Continue"}
                    <ArrowRight style={{ height: 18, width: 18 }} />
                  </button>

                  <p style={{ fontSize: 12, color: "rgba(245, 245, 245, 0.4)", lineHeight: 1.6 }}>
                    By continuing, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .login-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .brand-side {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function SignalItem(props: { label: string; value: string }) {
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 8 }}>
        {props.label}
      </div>
      <div style={{ fontSize: 15, color: "white" }}>{props.value}</div>
    </div>
  );
}

function LoginBackground(): React.JSX.Element {
  return (
    <div style={{ pointerEvents: "none", position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: "-8%", top: "-10%", height: "34rem", width: "34rem", borderRadius: "50%", background: "rgba(34, 211, 238, 0.08)", filter: "blur(120px)" }} />
      <div style={{ position: "absolute", right: "-10%", top: "8%", height: "28rem", width: "28rem", borderRadius: "50%", background: "rgba(79, 70, 229, 0.06)", filter: "blur(120px)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at top, rgba(255, 255, 255, 0.05), transparent 40%)" }} />
    </div>
  );
}
