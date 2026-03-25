"use client";

import Link from "next/link";
import { AppShell } from "../components/app-shell";
import { ArrowRight, MessageSquare, Zap, Shield, PlayCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <AppShell
      eyebrow=""
      title=""
      description=""
      hideHero={true}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 64, paddingBottom: 96, paddingLeft: 16, paddingRight: 16 }}>
        
        {/* 1. Product output (Center Stage) */}
        <div className="premium-fade-up" data-delay="1" style={{ width: "100%", maxWidth: 1000, marginBottom: 80 }}>
          <div style={{ 
            borderRadius: 28, 
            border: "1px solid var(--color-border)", 
            background: "rgba(255, 255, 255, 0.03)", 
            padding: 8, 
            backdropFilter: "blur(24px)", 
            boxShadow: "0 32px 128px -32px rgba(0,0,0,0.8)", 
            position: "relative", 
            overflow: "hidden" 
          }}>
            {/* Top Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
               <div style={{ display: "flex", gap: 8 }}>
                 <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(239, 68, 68, 0.8)" }} />
                 <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(245, 158, 11, 0.8)" }} />
                 <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(16, 185, 129, 0.8)" }} />
               </div>
               <div style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: 500 }}>Analysis</div>
            </div>

            {/* Content Area */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, padding: 24 }}>
              {/* Left Column: Input Simulation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ padding: 24, borderRadius: 20, background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.4)", marginBottom: 12, fontWeight: 600 }}>Their Side</div>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: 14 }}>
                    "Every time I bring this up, you just pivot back to what you want to talk about. It feels like my perspective doesn't actually matter."
                  </p>
                </div>

                <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255, 255, 255, 0.04)" }}>
                   <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <Zap style={{ width: 14, height: 14, color: "var(--color-accent)" }} />
                        <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 700 }}>Next Move</span>
                      </div>
                      <p style={{ color: "var(--color-text-primary)", fontSize: 16, fontWeight: 500 }}>
                        "I can see why it feels like I'm pivoting. I want to slow down and make sure I'm actually hearing you before I say anything else."
                      </p>
                      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                         <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(34, 211, 238, 0.1)", border: "1px solid rgba(34, 211, 238, 0.2)", fontSize: 10, color: "var(--color-accent)" }}>Lowers Pressure</span>
                         <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", fontSize: 10, color: "var(--color-text-secondary)" }}>Acknowledge</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Insight Simulation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                 <div style={{ padding: 20, borderRadius: 20, background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.04)", height: "100%" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.4)", marginBottom: 16, fontWeight: 600 }}>What Happened</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                       <div style={{ display: "flex", gap: 12 }}>
                          <div style={{ marginTop: 4, width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px rgba(245, 158, 11, 0.5)" }} />
                          <div>
                             <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>High Pressure</div>
                             <p style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.5, marginTop: 4 }}>Noticeable loss of agency and felt invisibility in the latest interaction.</p>
                          </div>
                       </div>
                       <div style={{ display: "flex", gap: 12 }}>
                          <div style={{ marginTop: 4, width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 8px rgba(6, 182, 212, 0.5)" }} />
                          <div>
                             <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>What Changed</div>
                             <p style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.5, marginTop: 4 }}>Slowing down now prevents the moment from turning into a story.</p>
                          </div>
                       </div>
                    </div>
                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.3)", marginBottom: 12, fontWeight: 600 }}>Next Move</div>
                        <div style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6 }}>
                           Try validating their perception of the pivot before introducing your intent. 
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Headline */}
        <div style={{ textAlign: "center", maxWidth: 840, marginBottom: 48 }}>
          <h1 className="premium-fade-up" data-delay="0" style={{ fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 500, letterSpacing: "-0.04em", marginBottom: 32, lineHeight: 0.9, color: "var(--color-text-primary)" }}>
            See the pattern.<br/>Change what happens next.
          </h1>
          
          <p className="premium-fade-up" data-delay="1" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "var(--color-text-secondary)", marginBottom: 48, lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontWeight: 300 }}>
            DEFRAG helps you understand what’s happening, notice pressure, and know what to do next.
          </p>

          {/* 3. CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            <Link 
              href="/login" 
              className="premium-panel"
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                background: "var(--color-text-primary)", 
                color: "var(--color-bg)", 
                padding: "20px 48px", 
                borderRadius: "var(--radius-pill)", 
                fontWeight: 600, 
                fontSize: 18, 
                textDecoration: "none",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
            >
              Try DEFRAG
              <ArrowRight style={{ width: 20, height: 20 }} />
            </Link>
            <Link 
              href="/login" 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                background: "rgba(255, 255, 255, 0.05)", 
                color: "var(--color-text-primary)", 
                border: "1px solid var(--color-border)",
                padding: "20px 48px", 
                borderRadius: "var(--radius-pill)", 
                fontWeight: 500, 
                fontSize: 18, 
                textDecoration: "none"
              }}
            >
              <PlayCircle style={{ width: 20, height: 20 }} />
              See how it works
            </Link>
          </div>
        </div>

        {/* 4. Supporting copy (Minimal) */}
        <div className="premium-fade-up" data-delay="2" style={{ marginTop: 120, width: "100%", maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: 12, borderRadius: 16, background: "rgba(34, 211, 238, 0.1)", border: "1px solid rgba(34, 211, 238, 0.2)", width: "fit-content" }}>
                 <MessageSquare style={{ width: 24, height: 24, color: "var(--color-accent)" }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>Understand what happened</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                Paste a conversation, message, or tense moment. DEFRAG shows both sides and what was actually meant.
              </p>
           </div>
           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: 12, borderRadius: 16, background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)", width: "fit-content" }}>
                 <Shield style={{ width: 24, height: 24, color: "#f59e0b" }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>Notice what changed</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                Identify the exact moment the pressure shifted, before the interaction turns into a story.
              </p>
           </div>
           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ padding: 12, borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", width: "fit-content" }}>
                 <Zap style={{ width: 24, height: 24, color: "rgba(255,255,255,0.5)" }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>Know the next move</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                Get practical wording and timing suggestions that help you respond clearly.
              </p>
           </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          div[style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
          h1[style*="clamp(3rem, 10vw, 8rem)"] {
            font-size: 3.5rem !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
