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
    body: "Assess a difficult interaction between two people, including where the pressure changed, what may be getting misread, and what move makes sense next.",
  },
  {
    title: "1:many and group dynamics",
    body: "Assess families, teams, and multi-person systems where tension, communication, and emotional pressure move across more than two people.",
  },
  {
    title: "Perspective comparison",
    body: "Compare what each side may be experiencing, protecting, projecting, or misreading instead of reinforcing only one narrator's view.",
  },
  {
    title: "Communication guidance",
    body: "Get wording that is designed to lower pressure, preserve truth, and increase the chance of being understood.",
  },
  {
    title: "Simulation and timing",
    body: "Explore likely relational reactions before a conversation happens and understand when a moment calls for repair, spacing, or delay.",
  },
];

const signals = [
  "what changed the pressure",
  "how each side may be reading it",
  "what pattern is forming",
];

const slips = [
  "A pause may signal overload, not rejection.",
  "Fast pacing can turn clarity into pressure.",
  "The next move should lower distortion before it adds more meaning.",
];

export default function LandingPage() {
  return (
    <AppShell eyebrow="" title="" description="" hideHero={true}>
      <div style={{ display: "grid", gap: 128, paddingTop: 76, paddingBottom: 110, paddingLeft: 16, paddingRight: 16 }}>
        <section style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "grid", gap: 34 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(340px, 470px)", gap: 42, alignItems: "stretch" }} className="hero-grid">
            <div style={{ display: "grid", gap: 28, alignContent: "start", paddingRight: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>
                Relational Intelligence Infrastructure
              </div>
              <h1 className="font-display" style={{ margin: 0, fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 0.86, color: "white", maxWidth: 880 }}>
                See the interaction before it hardens into the story.
              </h1>
              <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(1.1rem, 2vw, 1.34rem)", lineHeight: 1.76, color: "rgba(245,245,245,0.68)", fontWeight: 300 }}>
                Defrag is a relational intelligence platform for understanding conflict, communication breakdown, emotional pressure, timing, and perspective differences across individuals, pairs, families, and teams.
              </p>
              <p style={{ margin: 0, maxWidth: 760, fontSize: 16, lineHeight: 1.82, color: "rgba(245,245,245,0.54)" }}>
                It helps people understand what may be happening, how each side may be reading the moment, where pressure changed, what pattern is forming, and what move makes sense next.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 }}>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "white", color: "#050505", padding: "16px 28px", borderRadius: 14, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
                  Open Defrag
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
                <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", color: "white", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 28px", borderRadius: 14, fontWeight: 500, fontSize: 16, textDecoration: "none" }}>
                  See how it works
                </Link>
              </div>
            </div>

            <div style={{ position: "relative", minHeight: 560, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 18% 24%, rgba(159,179,164,0.2), transparent 24%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.08), transparent 22%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%)" }} />
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
              <div style={{ position: "absolute", left: "18%", top: "28%", width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", opacity: 0.5 }} />
              <div style={{ position: "absolute", right: "14%", top: "22%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", opacity: 0.34 }} />
              <div style={{ position: "absolute", left: "12%", right: "12%", bottom: "13%", display: "grid", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
                  {signals.map((signal) => (
                    <div key={signal} style={{ padding: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.18)", fontSize: 12, lineHeight: 1.55, color: "rgba(245,245,245,0.86)" }}>
                      {signal}
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {slips.map((slip, index) => (
                    <div key={slip} style={{ width: `${84 - index * 10}%`, marginLeft: index === 2 ? "auto" : 0, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", boxShadow: "0 16px 30px rgba(0,0,0,0.24)", fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.92)" }}>
                      {slip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "240px minmax(0,1fr)", gap: 34, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.08)" }} className="signals-grid">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
            What Defrag returns
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }} className="signals-list-grid">
            {[
              "what may be happening",
              "how each side may be reading it",
              "where pressure changed",
              "what pattern is forming",
              "what may be getting misread",
              "what to try next",
            ].map((item) => (
              <div key={item} style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 14, lineHeight: 1.55, color: "rgba(245,245,245,0.88)" }}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", gap: 52 }} className="section-grid">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>Why Defrag exists</div>
          </div>
          <div style={{ display: "grid", gap: 22, maxWidth: 880 }}>
            <p className="font-display" style={{ margin: 0, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.0, color: "white" }}>
              Most people do not need more interpretation layered on top of pressure. They need clearer structure.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.84, color: "rgba(245,245,245,0.64)" }}>
              People can feel tension, repetition, misalignment, and escalation, but they often cannot identify what activated it, why the same pattern keeps returning, or what next move would actually help. Defrag exists to make those structures visible before confusion becomes damage.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "grid", gap: 34 }}>
          <div style={{ display: "grid", gap: 12, maxWidth: 900 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>What users can access</div>
            <h2 className="font-display" style={{ margin: 0, fontSize: "clamp(2.5rem, 5vw, 4.1rem)", lineHeight: 0.98, color: "white" }}>
              Core relational intelligence capabilities.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }} className="offerings-grid">
            {offerings.map((item, index) => (
              <div key={item.title} style={{ paddingTop: 26, paddingBottom: 28, paddingRight: index % 2 === 0 ? 28 : 0, paddingLeft: index % 2 === 1 ? 28 : 0, borderBottom: "1px solid rgba(255,255,255,0.08)", borderLeft: index % 2 === 1 ? "1px solid rgba(255,255,255,0.08)" : "none", display: "grid", gap: 12 }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: "white", lineHeight: 1.38 }}>{item.title}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: "rgba(245,245,245,0.62)", maxWidth: 540 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", gap: 52 }} className="section-grid">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>How the AI works</div>
          </div>
          <div style={{ display: "grid", gap: 22, maxWidth: 880 }}>
            <p className="font-display" style={{ margin: 0, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.0, color: "white" }}>
              Defrag does not answer from prompt text alone. It reads the situation.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.84, color: "rgba(245,245,245,0.64)" }}>
              It reasons from the current message, the people involved, relational context, timing and activation conditions, recurring interaction patterns, and communication pressure signals. That allows the system to assess not just what was said, but how each side may be interpreting the moment and what response is most likely to help next.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .hero-grid, .section-grid, .signals-grid, .signals-list-grid, .offerings-grid {
            grid-template-columns: 1fr !important;
          }
          .offerings-grid > div {
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-left: none !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
