"use client";

import Link from "next/link";
import { AppShell } from "../components/app-shell";
import { ArrowRight, Zap, PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <AppShell
      eyebrow=""
      title=""
      description=""
      hideHero={true}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80, paddingBottom: 96, paddingLeft: 16, paddingRight: 16 }}>

        {/* 1. Live Analysis Panel — the product artifact */}
        <div className="premium-fade-up" style={{ width: "100%", maxWidth: 1100, marginBottom: 120 }}>
          <div style={{
            borderRadius: 32,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            padding: 8,
            backdropFilter: "blur(60px)",
            boxShadow: "0 64px 128px -32px rgba(0,0,0,0.9)",
            position: "relative"
          }}>
            {/* Live Analysis Badge */}
            <div style={{ padding: "16px 40px 0", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee" }}>Live Analysis</span>
            </div>

            <div style={{ padding: "24px 40px 32px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }} className="analysis-panel-grid">

               {/* Left: Conversation + Response */}
               <div style={{ display: "grid", gap: 32 }}>
                  <div style={{ padding: 32, borderRadius: 24, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                     <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 16 }}>What They Felt</div>
                     <p style={{ color: "rgba(245,245,245,0.8)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>"Every time I try to say this, it turns back toward your side. It makes me feel like my perspective doesn't actually matter."</p>
                  </div>
                  <div style={{ padding: 32, borderRadius: 24, background: "rgba(34, 211, 238, 0.05)", border: "1px solid rgba(34, 211, 238, 0.2)" }}>
                     <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
                        <Zap style={{ width: 14, height: 14, color: "#22d3ee" }} />
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee" }}>Recommended Response</span>
                     </div>
                     <p style={{ color: "white", fontSize: 18, fontWeight: 500, lineHeight: 1.5, margin: 0 }}>"I can see why that landed like a pivot. Let me slow down and stay with what you're saying before I respond."</p>
                     <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                        <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 9999, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#6ee7b7", fontWeight: 500 }}>Lowers Pressure</span>
                        <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 9999, background: "rgba(34, 211, 238, 0.1)", border: "1px solid rgba(34, 211, 238, 0.15)", color: "#22d3ee", fontWeight: 500 }}>Restores Contact</span>
                     </div>
                  </div>
               </div>

               {/* Right: Interpretation Column */}
               <div style={{ padding: 32, borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "grid", gap: 40 }}>

                     <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 16 }}>What DEFRAG Detected</div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: "#ef4444", marginBottom: 8 }}>Pressure Spike</div>
                        <p style={{ fontSize: 13, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>The interaction shifted into pressure. Their perspective stopped feeling held, and your response started landing as redirection.</p>
                     </div>

                     <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#22d3ee", marginBottom: 8 }}>Why It Shifted</div>
                        <p style={{ fontSize: 13, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>If you slow the pace here, the moment can still be repaired before it hardens into a pattern.</p>
                     </div>

                     <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>Best Next Move</div>
                        <p style={{ fontSize: 13, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Validate the pivot first. Do not explain your intent until they feel accurately received.</p>
                     </div>

                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 2. Hero Copy */}
        <div style={{ textAlign: "center", maxWidth: 900, marginBottom: 80 }}>
          <h1 className="premium-fade-up" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: 500, letterSpacing: "-0.04em", marginBottom: 32, lineHeight: 0.9, color: "white" }}>
            Catch the pattern early.<br/>Change what happens next.
          </h1>

          <p className="premium-fade-up" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "rgba(245, 245, 245, 0.6)", marginBottom: 48, lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontWeight: 300 }}>
            DEFRAG identifies the pattern forming between you, detects where pressure changed, and gives you the next move before the moment gets worse.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            <Link
              href="/login"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "white",
                color: "#050505",
                padding: "20px 48px",
                borderRadius: 16,
                fontWeight: 600,
                fontSize: 18,
                textDecoration: "none",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            >
              Run the Analysis
              <ArrowRight style={{ width: 20, height: 20 }} />
            </Link>
            <Link
              href="/dynamics"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255, 255, 255, 0.03)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "20px 48px",
                borderRadius: 16,
                fontWeight: 500,
                fontSize: 18,
                textDecoration: "none",
                backdropFilter: "blur(20px)"
              }}
            >
              <PlayCircle style={{ width: 20, height: 20 }} />
              See It in Action
            </Link>
          </div>
        </div>

        {/* 3. Three-Column Value Props */}
        <div style={{ width: "100%", maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 80 }} className="landing-features">
           <div style={{ display: "grid", gap: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee" }}>01. Detect</div>
              <h3 style={{ fontSize: 18, color: "white", fontWeight: 500, margin: 0 }}>See what actually happened</h3>
              <p style={{ fontSize: 15, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Paste a message, conversation, or tense moment. DEFRAG breaks down what landed, what was missed, and where the interaction started to turn.</p>
           </div>
           <div style={{ display: "grid", gap: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b" }}>02. Locate</div>
              <h3 style={{ fontSize: 18, color: "white", fontWeight: 500, margin: 0 }}>Catch where the pressure shifted</h3>
              <p style={{ fontSize: 15, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Find the exact point the interaction changed so you can respond before frustration hardens into distance, defensiveness, or silence.</p>
           </div>
           <div style={{ display: "grid", gap: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>03. Intervene</div>
              <h3 style={{ fontSize: 18, color: "white", fontWeight: 500, margin: 0 }}>Know what to do next</h3>
              <p style={{ fontSize: 15, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Get precise wording and timing guidance that lowers pressure and helps you respond with more control.</p>
           </div>
        </div>

        <div style={{ marginTop: 120, textAlign: "center" }}>
           <Link href="/login" style={{ fontSize: 16, color: "#22d3ee", textDecoration: "none", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Run your first analysis
              <ArrowRight style={{ width: 16, height: 16 }} />
           </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .analysis-panel-grid { grid-template-columns: 1fr !important; }
          .landing-features { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </AppShell>
  );
}
