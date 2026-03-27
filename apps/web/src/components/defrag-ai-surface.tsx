"use client";

import React, { useMemo, useState } from "react";
import { Clock3, MessageSquareText, Send, Sparkles, TriangleAlert, Waves } from "lucide-react";

type InsightCard = {
  title: string;
  body: string;
};

type SimulationStep = {
  label: string;
  text: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterMessages: Message[] = [
  {
    id: "m1",
    role: "assistant",
    content: "Tell me what happened. I will help you understand the pressure, the pattern, and what to do next.",
  },
  {
    id: "m2",
    role: "user",
    content: "I sent a direct message after a tense call, and now they have gone quiet. I am not sure if I pushed too hard or if they are avoiding the issue.",
  },
];

const starterInsights: InsightCard[] = [
  {
    title: "What may be happening",
    body: "This looks less like rejection and more like overload. The silence may be a pause under pressure, not a final answer.",
  },
  {
    title: "What it may be causing",
    body: "The interaction moved faster than the other person could process. Slowing down now may keep the moment from hardening into distance.",
  },
  {
    title: "What to try next",
    body: "Acknowledge the tension first. Then make the next step small, specific, and easy to respond to.",
  },
];

const starterSimulation: SimulationStep[] = [
  {
    label: "Next move",
    text: "I know that last message may have landed with more pressure than I meant. No need to respond quickly.",
  },
  {
    label: "Alternative",
    text: "I want to slow this down. If you are open, we can come back to it when there is more room.",
  },
];

export default function DefragAISurface(): React.JSX.Element {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [draft, setDraft] = useState("");

  const pressureLevel = useMemo(() => "High", []);
  const timingWindow = useMemo(() => "Slow down", []);
  const nextMove = useMemo(() => "Acknowledge first", []);

  function sendMessage(): void {
    const value = draft.trim();
    if (!value) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        role: "user",
        content: value,
      },
    ]);
    setDraft("");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050505", color: "#f5f5f5" }}>
      <div style={{ margin: "0 auto", maxWidth: 1440, padding: "max(16px, env(safe-area-inset-top)) 16px max(24px, calc(env(safe-area-inset-bottom) + 16px))", display: "grid", gap: 24 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,245,245,0.45)", marginBottom: 4 }}>
              Defrag
            </div>
            <h1 style={{ fontSize: 16, fontWeight: 500, margin: 0, color: "white" }}>Workspace</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <HeaderPill icon={<Clock3 style={{ width: 12, height: 12 }} />} label="Slow" />
            <HeaderPill icon={<TriangleAlert style={{ width: 12, height: 12 }} />} label="High" />
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "240px minmax(0,1fr) 320px", gap: 24 }} className="surface-grid">
          <aside className="left-rail" style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <RailTitle icon={<Waves style={{ width: 14, height: 14 }} />} label="Session" />
            <StatusItem label="Pressure" value={pressureLevel} />
            <StatusItem label="Timing" value={timingWindow} />
            <StatusItem label="Next move" value={nextMove} />
          </aside>

          <main style={{ minWidth: 0 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", minHeight: "70vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
              <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 6 }}>
                  Interaction review
                </div>
                <div style={{ fontSize: 14, color: "rgba(245,245,245,0.75)", lineHeight: 1.5 }}>
                  Describe the exchange. Defrag will help you understand what may be happening and what to do next.
                </div>
              </div>

              <div style={{ padding: "20px", overflowY: "auto" }}>
                <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 20 }}>
                  {messages.map((message) => (
                    <div key={message.id} style={{ alignSelf: message.role === "assistant" ? "flex-start" : "flex-end", maxWidth: "92%" }}>
                      <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,245,245,0.3)", textAlign: message.role === "assistant" ? "left" : "right" }}>
                        {message.role === "assistant" ? "Defrag" : "You"}
                      </div>
                      <div style={{ padding: "16px 18px", background: message.role === "assistant" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 15, lineHeight: 1.65, color: "white" }}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", position: "sticky", bottom: 0, background: "rgba(5,5,5,0.96)", backdropFilter: "blur(8px)" }}>
                <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Describe the exchange..."
                    style={{ width: "100%", minHeight: 88, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)", padding: "14px 56px 14px 16px", color: "white", fontSize: 15, resize: "none", outline: "none" }}
                  />
                  <button onClick={sendMessage} style={{ position: "absolute", right: 10, bottom: 10, width: 40, height: 40, border: "none", background: "white", color: "#050505", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Send style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              </div>
            </div>
          </main>

          <aside className="right-rail" style={{ display: "grid", gap: 28, alignContent: "start" }}>
            <section>
              <RailTitle icon={<Sparkles style={{ width: 14, height: 14 }} />} label="Insight" />
              <div style={{ display: "grid", gap: 20 }}>
                {starterInsights.map((insight) => (
                  <InsightBlock key={insight.title} title={insight.title} body={insight.body} />
                ))}
              </div>
            </section>

            <section>
              <RailTitle icon={<MessageSquareText style={{ width: 14, height: 14 }} />} label="Suggested wording" />
              <div style={{ display: "grid", gap: 16 }}>
                {starterSimulation.map((sim) => (
                  <div key={sim.label} style={{ padding: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,245,245,0.3)", marginBottom: 8 }}>{sim.label}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,245,245,0.9)" }}>{sim.text}</div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .surface-grid { grid-template-columns: 1fr !important; }
          .left-rail, .right-rail { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function HeaderPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(245,245,245,0.45)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 10px" }}>{icon}{label}</div>;
}

function RailTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.42)" }}>{icon}{label}</div>;
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.4)", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 400, color: "white" }}>{value}</div>
    </div>
  );
}

function InsightBlock({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ paddingLeft: 14, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(245,245,245,0.7)" }}>{body}</div>
    </div>
  );
}
