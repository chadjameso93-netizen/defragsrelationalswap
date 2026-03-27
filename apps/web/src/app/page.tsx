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
      <div style={{ display: "grid", gap: 112, paddingTop: 64, paddingBottom: 96, paddingLeft: 16, paddingRight: 16 }}>
        <section style={{ maxWidth: 1220, width: "100%", margin: "0 auto", display: "grid", gap: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 420px)", gap: 48, alignItems: "end" }} className="hero-grid">
            <div style={{ display: "grid", gap: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>
                Relational Intelligence Infrastructure
              </div>
              <h1 style={{ margin: 0, fontSize: "clamp(3rem, 8vw, 6.2rem)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 0.94, color: "white" }}>
                Understand what is happening between people.
              </h1>
              <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.7, color: "rgba(245,245,245,0.66)", fontWeight: 300 }}>
                Defrag is a relational intelligence platform for understanding conflict, communication breakdown, emotional pressure, timing, and perspective differences across individuals, pairs, families, and teams.
              </p>
              <p style={{ margin: 0, maxWidth: 760, fontSize: 16, lineHeight: 1.7, color: "rgba(245,245,245,0.52)" }}>
                It helps people see what may be happening, how each side may be reading the moment, where pressure changed, what pattern is forming, and what move makes sense next.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 }}>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "white", color: "#050505", padding: "16px 28px", borderRadius: 14, fontWeight: 600, fontSize: 16, textDecoration: "none" }}>
                  Open Defrag
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
                <Link href="/dynamics" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", color: "white", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 28px", borderRadius: 14, fontWeight: 500, fontSize: 16, textDecoration: "none" }}>
                  See how it works
                </Link>
              </div>
            </div>

            <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: 28 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 18 }}>
                What Defrag returns
              </div>
              <div style={{ display: "grid", gap: 14 }}>
                {outputs.map((item) => (
                  <div key={item} style={{ paddingLeft: 14, borderLeft: "1px solid rgba(255,255,255,0.1)", fontSize: 15, color: "rgba(245,245,245,0.9)", lineHeight: 1.5 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1220, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", gap: 48 }} className="section-grid">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22d3ee" }}>Why Defrag exists</div>
          </div>
          <div style={{ display: "grid", gap: 22 }}>
            <p style={{ margin: 0, fontSize: 28, lineHeight: 1.45, color: "white", fontWeight: 400, letterSpacing: "-0.02em" }}>
              People do not only need answers. They need help seeing what is happening inside relationship systems while it is happening.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: "rgba(245,245,245,0.64)" }}>
              Most people can feel tension, repetition, misalignment, and escalation, but they often cannot identify what activated it, why the same pattern keeps returning, or what next move would actually help. Defrag exists to make those structures visible.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 1220, width: "100%", margin: "0 auto", display: "grid", gap: 36 }}>
          <div style={{ display: "grid", gap: 12, maxWidth: 840 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22d3ee" }}>What users can access</div>
            <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.04em", color: "white" }}>
              Core relational intelligence capabilities.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }} className="offerings-grid">
            {offerings.map((item) => (
              <div key={item.title} style={{ padding: 24, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "grid", gap: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "white", lineHeight: 1.35 }}>{item.title}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,245,0.62)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 1220, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", gap: 48 }} className="section-grid">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22d3ee" }}>How the AI works</div>
          </div>
          <div style={{ display: "grid", gap: 22 }}>
            <p style={{ margin: 0, fontSize: 28, lineHeight: 1.45, color: "white", fontWeight: 400, letterSpacing: "-0.02em" }}>
              Defrag does not answer from prompt text alone. It operates as a relational reasoning system.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: "rgba(245,245,245,0.64)" }}>
              It reasons from the current message, the people involved, relational context, timing and activation conditions, recurring interaction patterns, and communication pressure signals. That allows the system to assess not just what was said, but how each side may be interpreting the moment and what response is most likely to help next.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 1220, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "280px minmax(0,1fr)", gap: 48 }} className="section-grid">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22d3ee" }}>1:1 and 1:many</div>
          </div>
          <div style={{ display: "grid", gap: 22 }}>
            <p style={{ margin: 0, fontSize: 28, lineHeight: 1.45, color: "white", fontWeight: 400, letterSpacing: "-0.02em" }}>
              Defrag is built for one person, two-person dynamics, and multi-person systems.
            </p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: "rgba(245,245,245,0.64)" }}>
              It can be used to assess one person's recurring patterns, one-to-one relational dynamics, family systems, team systems, and wider networks where communication, tension, and emotional pressure move across multiple participants. It is designed to compare the interaction from all sides available, not only one narrator's story.
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .hero-grid, .section-grid, .offerings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
