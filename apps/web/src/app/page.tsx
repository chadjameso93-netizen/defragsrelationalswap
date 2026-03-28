"use client";

import Link from "next/link";
import { AppShell } from "../components/app-shell";
import { ArrowRight } from "lucide-react";

const offerings = [
  {
    title: "Personal pattern analysis",
    body: "Understand how you tend to process tension, communication, pacing, and recurring pressure across relationships.",
  },
  {
    title: "1:1 interaction analysis",
    body: "Assess a difficult interaction between two people, including where pressure changed, what may be getting misread, and what move makes sense next.",
  },
  {
    title: "1:many and system analysis",
    body: "Assess families, teams, and multi-person systems where communication and emotional pressure move across more than two people.",
  },
  {
    title: "Perspective comparison",
    body: "Compare what each side may be experiencing, protecting, projecting, or misreading instead of reinforcing only one narrator's story.",
  },
  {
    title: "Communication guidance",
    body: "Get wording designed to lower pressure, preserve truth, and increase the chance of being understood clearly.",
  },
  {
    title: "Simulation and timing",
    body: "Explore likely relational reactions before a conversation happens and understand when a moment calls for repair, space, or delay.",
  },
];

const outputs = [
  "what may be happening",
  "how each side may be reading it",
  "where pressure changed",
  "what pattern is forming",
  "what may be getting misread",
  "what to try next",
];

export default function LandingPage() {
  return (
    <AppShell eyebrow="" title="" description="" hideHero={true}>
      <div style={{ display: "grid", gap: 120, padding: "40px 8px 110px" }}>
        <section style={{ maxWidth: 1320, margin: "0 auto", width: "100%", display: "grid", gap: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.08fr) minmax(360px, 0.92fr)", gap: 34, alignItems: "stretch" }} className="hero-grid">
            <div style={{ display: "grid", gap: 24, alignContent: "start", paddingTop: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>
                Relational Intelligence Infrastructure
              </div>
              <h1 className="font-display" style={{ margin: 0, fontSize: "clamp(4.5rem, 9vw, 8.6rem)", lineHeight: 0.82, color: "white", maxWidth: 920 }}>
                Understand what is happening between people before it hardens into damage.
              </h1>
              <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(1.08rem, 1.95vw, 1.32rem)", lineHeight: 1.76, color: "rgba(245,245,245,0.68)", fontWeight: 300 }}>
                Defrag is a relational intelligence platform for understanding conflict, communication breakdown, emotional pressure, timing, and perspective differences across individuals, pairs, families, and teams.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, paddingTop: 8 }}>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "white", color: "#050505", padding: "16px 28px", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                  Open Defrag
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
                <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.12)", padding: "16px 28px", fontWeight: 500, fontSize: 15, textDecoration: "none" }}>
                  See how it works
                </Link>
              </div>
            </div>

            <div style={{ position: "relative", minHeight: 640, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 16% 18%, rgba(159,179,164,0.22), transparent 22%), radial-gradient(circle at 78% 16%, rgba(255,255,255,0.1), transparent 16%), linear-gradient(140deg, rgba(255,255,255,0.05), transparent 45%, rgba(159,179,164,0.05) 70%, transparent 100%)" }} />
              <div style={{ position: "absolute", left: "8%", right: "8%", top: "14%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)" }} />
              <div style={{ position: "absolute", left: "14%", top: "20%", width: "44%", padding: "18px 18px 18px 20px", borderLeft: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.02)", boxShadow: "0 24px 60px rgba(0,0,0,0.28)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)", marginBottom: 10 }}>Signal</div>
                <div style={{ fontSize: 20, lineHeight: 1.4, color: "white" }}>A pause may signal overload, not rejection.</div>
              </div>
              <div style={{ position: "absolute", right: "10%", top: "34%", width: "48%", padding: "18px 18px 18px 20px", borderLeft: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.025)", boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)", marginBottom: 10 }}>Pressure shift</div>
                <div style={{ fontSize: 18, lineHeight: 1.45, color: "rgba(245,245,245,0.92)" }}>Fast pacing can turn clarity into pressure before either side realizes it.</div>
              </div>
              <div style={{ position: "absolute", left: "12%", right: "12%", bottom: "11%", display: "grid", gap: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }} className="hero-mini-grid">
                  {[
                    "perspective",
                    "pressure",
                    "timing",
                  ].map((label) => (
                    <div key={label} style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.12)", color: "rgba(245,245,245,0.86)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {label}
                    </div>
                  ))}
                </div>
                <div style={{ padding: "16px 18px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)", fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.9)" }}>
                  The next move should lower distortion before it adds more meaning.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1320, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "240px minmax(0,1fr)", gap: 34 }} className="section-grid">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
            What Defrag returns
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }} className="outputs-grid">
            {outputs.map((item) => (
              <div key={item} style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 14, lineHeight: 1.58, color: "rgba(245,245,245,0.88)" }}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1320, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", gap: 46 }} className="section-grid">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>Why Defrag exists</div>
          </div>
          <div style={{ display: "grid", gap: 18, maxWidth: 920 }}>
            <p className="font-display" style={{ margin: 0, fontSize: "clamp(2.7rem, 5vw, 4.7rem)", lineHeight: 0.94, color: "white" }}>
              Most people do not need more opinion layered onto a difficult moment. They need clearer structure.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.84, color: "rgba(245,245,245,0.64)" }}>
              People can feel tension, repetition, misalignment, and escalation, but they often cannot identify what activated it, why the same pattern keeps returning, or what next move would actually help. Defrag exists to make those structures visible before confusion becomes distance, silence, or conflict that hardens.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 1320, margin: "0 auto", width: "100%", display: "grid", gap: 30 }}>
          <div style={{ display: "grid", gap: 12, maxWidth: 900 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>What users can access</div>
            <h2 className="font-display" style={{ margin: 0, fontSize: "clamp(2.8rem, 5vw, 4.8rem)", lineHeight: 0.94, color: "white" }}>
              Core relational intelligence capabilities.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }} className="offerings-grid">
            {offerings.map((item, index) => (
              <div key={item.title} style={{ paddingTop: 26, paddingBottom: 30, paddingRight: index % 2 === 0 ? 30 : 0, paddingLeft: index % 2 === 1 ? 30 : 0, borderBottom: "1px solid rgba(255,255,255,0.08)", borderLeft: index % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none", display: "grid", gap: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: "white", lineHeight: 1.34 }}>{item.title}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.82, color: "rgba(245,245,245,0.62)", maxWidth: 540 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .hero-grid, .section-grid, .outputs-grid, .offerings-grid, .hero-mini-grid { grid-template-columns: 1fr !important; }
          .offerings-grid > div { padding-left: 0 !important; padding-right: 0 !important; border-left: none !important; }
        }
      `}</style>
    </AppShell>
  );
}
