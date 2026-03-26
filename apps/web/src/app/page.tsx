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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80, paddingBottom: 96, paddingLeft: 16, paddingRight: 16 }}>
        
        {/* 1. Hero Content */}
        <div style={{ textAlign: "center", maxWidth: 900, marginBottom: 80 }}>
          <div style={{ marginBottom: 32, display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 9999, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "8px 16px", backdropFilter: "blur(40px)" }}>
            <div style={{ height: 8, width: 8, borderRadius: "50%", backgroundColor: "#22d3ee" }} />
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.8)" }}>
              Public Preview
            </span>
          </div>

          <h1 className="premium-fade-up" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", fontWeight: 500, letterSpacing: "-0.04em", marginBottom: 32, lineHeight: 0.9, color: "white" }}>
            See the pattern.<br/>Change what happens next.
          </h1>
          
          <p className="premium-fade-up" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "rgba(245, 245, 245, 0.6)", marginBottom: 48, lineHeight: 1.6, maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontWeight: 300 }}>
            DEFRAG helps you understand what’s happening, notice pressure, and know what to do next. A practical approach to difficult interactions.
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
              Try DEFRAG
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
              See how it works
            </Link>
          </div>
        </div>

        {/* 2. Visual Artifact: The Workspace Preview */}
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
            <div style={{ padding: "32px 40px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }}>
               <div style={{ display: "grid", gap: 32 }}>
                  <div style={{ padding: 32, borderRadius: 24, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                     <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 16 }}>Input</div>
                     <p style={{ color: "rgba(245,245,245,0.8)", fontSize: 15, lineHeight: 1.6 }}>"Every time I bring this up, you just pivot back to what you want to talk about. It feels like my perspective doesn't actually matter."</p>
                  </div>
                  <div style={{ padding: 32, borderRadius: 24, background: "rgba(34, 211, 238, 0.05)", border: "1px solid rgba(34, 211, 238, 0.2)" }}>
                     <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
                        <Zap style={{ width: 14, height: 14, color: "#22d3ee" }} />
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee" }}>Next Move</span>
                     </div>
                     <p style={{ color: "white", fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>"I can see why it feels like I'm pivoting. I want to slow down and make sure I'm actually hearing you before I say anything else."</p>
                  </div>
               </div>

               <div style={{ padding: 32, borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 32 }}>Interpretation</div>
                  <div style={{ display: "grid", gap: 40 }}>
                     <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>High Pressure</div>
                        <p style={{ fontSize: 13, color: "rgba(245,245,245,0.5)", lineHeight: 1.6 }}>Noticeable loss of agency and felt invisibility in the latest interaction.</p>
                     </div>
                     <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#22d3ee", marginBottom: 8 }}>What Changed</div>
                        <p style={{ fontSize: 13, color: "rgba(245,245,245,0.5)", lineHeight: 1.6 }}>Slowing down now prevents the moment from turning into a story.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 3. Features Breakdown: Flat editorial layout */}
        <div style={{ width: "100%", maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 80 }} className="landing-features">
           <div style={{ display: "grid", gap: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22d3ee" }}>01. Understand</div>
              <h3 style={{ fontSize: 18, color: "white", fontWeight: 500, margin: 0 }}>Understand what happened</h3>
              <p style={{ fontSize: 15, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Paste an interaction. DEFRAG shows both sides and what was actually meant, before it repeats.</p>
           </div>
           <div style={{ display: "grid", gap: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b" }}>02. Notice</div>
              <h3 style={{ fontSize: 18, color: "white", fontWeight: 500, margin: 0 }}>Notice what changed</h3>
              <p style={{ fontSize: 15, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Identify the exact moment the pressure shifted, giving you room to breathe and respond clearly.</p>
           </div>
           <div style={{ display: "grid", gap: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)" }}>03. Decide</div>
              <h3 style={{ fontSize: 18, color: "white", fontWeight: 500, margin: 0 }}>Know the next move</h3>
              <p style={{ fontSize: 15, color: "rgba(245,245,245,0.5)", lineHeight: 1.6, margin: 0 }}>Get practical wording and timing suggestions that preserve the relationship and your perspective.</p>
           </div>
        </div>

        <div style={{ marginTop: 120, textAlign: "center" }}>
           <Link href="/login" style={{ fontSize: 16, color: "#22d3ee", textDecoration: "none", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Start your first analysis
              <ArrowRight style={{ width: 16, height: 16 }} />
           </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          div[style*="grid-template-columns: 1fr 360px"] { grid-template-columns: 1fr !important; }
          div[style*="padding: 32px 40px"] { padding: 24px !important; }
          .landing-features { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </AppShell>
  );
}
