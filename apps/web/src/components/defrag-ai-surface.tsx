"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight, Clock3, MessageSquareText, Send, Sparkles, TriangleAlert, Waves } from "lucide-react";

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
    content:
      "Describe the interaction as clearly as you can. Defrag will help you understand what may be happening, how each side may be reading it, where the pressure changed, and what move makes sense next.",
  },
  {
    id: "m2",
    role: "user",
    content:
      "I sent a direct message after a tense call, and now they have gone quiet. I am not sure if I pushed too hard or if they are avoiding the issue.",
  },
];

const starterInsights: InsightCard[] = [
  {
    title: "What may be happening",
    body: "This reads less like rejection and more like overload. The silence may be a pause under pressure rather than a final answer.",
  },
  {
    title: "Where the pressure changed",
    body: "The interaction appears to have moved faster than the other person could process. Slowing the pace now may keep the moment from hardening into distance.",
  },
  {
    title: "What to try next",
    body: "Acknowledge the tension first. Then make the next move smaller, clearer, and easier to respond to.",
  },
];

const starterSimulation: SimulationStep[] = [
  {
    label: "Primary wording",
    text: "I think that last message may have landed with more pressure than I meant. No need to respond quickly.",
  },
  {
    label: "Alternative wording",
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
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1480,
          padding:
            "max(16px, env(safe-area-inset-top)) 16px max(24px, calc(env(safe-area-inset-bottom) + 16px))",
          display: "grid",
          gap: 24,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            paddingBottom: 18,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.42)",
              }}
            >
              Defrag Workspace
            </div>
            <h1 style={{ fontSize: 16, fontWeight: 500, margin: 0, color: "white" }}>
              Relational intelligence session
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <HeaderPill icon={<Clock3 style={{ width: 12, height: 12 }} />} label="Timing: slow" />
            <HeaderPill icon={<TriangleAlert style={{ width: 12, height: 12 }} />} label="Pressure: high" />
          </div>
        </header>

        <div
          style={{ display: "grid", gridTemplateColumns: "240px minmax(0,1fr) 340px", gap: 24 }}
          className="surface-grid"
        >
          <aside className="left-rail" style={{ display: "grid", gap: 28, alignContent: "start" }}>
            <RailTitle icon={<Waves style={{ width: 14, height: 14 }} />} label="Session state" />
            <StatusItem label="Pressure" value={pressureLevel} />
            <StatusItem label="Timing" value={timingWindow} />
            <StatusItem label="Next move" value={nextMove} />
            <div style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gap: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.35)" }}>
                What this session returns
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(245,245,245,0.6)" }}>
                Structured outputs such as what may be happening, where pressure changed, what may be getting misread, and what to try next.
              </div>
            </div>
          </aside>

          <main style={{ minWidth: 0 }}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                minHeight: "72vh",
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
              }}
            >
              <div style={{ padding: "20px 22px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,245,245,0.4)",
                    marginBottom: 6,
                  }}
                >
                  Interaction analysis
                </div>
                <div style={{ fontSize: 14, color: "rgba(245,245,245,0.75)", lineHeight: 1.6, maxWidth: 760 }}>
                  Bring in a difficult interaction, message, or exchange. Defrag will help you read the moment more clearly before confusion turns into damage.
                </div>
              </div>

              <div style={{ padding: "22px", overflowY: "auto" }}>
                <div style={{ maxWidth: 780, margin: "0 auto", display: "grid", gap: 22 }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        alignSelf: message.role === "assistant" ? "flex-start" : "flex-end",
                        maxWidth: "92%",
                      }}
                    >
                      <div
                        style={{
                          marginBottom: 8,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(245,245,245,0.3)",
                          textAlign: message.role === "assistant" ? "left" : "right",
                        }}
                      >
                        {message.role === "assistant" ? "Defrag" : "You"}
                      </div>
                      <div
                        style={{
                          padding: "18px 18px",
                          background:
                            message.role === "assistant" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          fontSize: 15,
                          lineHeight: 1.72,
                          color: "white",
                        }}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  position: "sticky",
                  bottom: 0,
                  background: "rgba(5,5,5,0.96)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ maxWidth: 780, margin: "0 auto", position: "relative" }}>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Describe the interaction clearly..."
                    style={{
                      width: "100%",
                      minHeight: 96,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(0,0,0,0.2)",
                      padding: "16px 60px 16px 16px",
                      color: "white",
                      fontSize: 15,
                      lineHeight: 1.6,
                      resize: "none",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      width: 42,
                      height: 42,
                      border: "none",
                      background: "white",
                      color: "#050505",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    aria-label="Send message"
                  >
                    <Send style={{ width: 18, height: 18 }} />
                  </button>
                </div>
              </div>
            </div>
          </main>

          <aside className="right-rail" style={{ display: "grid", gap: 28, alignContent: "start" }}>
            <section style={{ display: "grid", gap: 18 }}>
              <RailTitle icon={<Sparkles style={{ width: 14, height: 14 }} />} label="Structured outputs" />
              <div style={{ display: "grid", gap: 18 }}>
                {starterInsights.map((insight) => (
                  <InsightBlock key={insight.title} title={insight.title} body={insight.body} />
                ))}
              </div>
            </section>

            <section style={{ display: "grid", gap: 18 }}>
              <RailTitle icon={<MessageSquareText style={{ width: 14, height: 14 }} />} label="Suggested wording" />
              <div style={{ display: "grid", gap: 14 }}>
                {starterSimulation.map((sim) => (
                  <div
                    key={sim.label}
                    style={{ padding: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,245,245,0.35)",
                        marginBottom: 8,
                      }}
                    >
                      {sim.label}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(245,245,245,0.92)" }}>{sim.text}</div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ paddingTop: 4 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(245,245,245,0.55)", fontSize: 12 }}>
                <ArrowUpRight style={{ width: 14, height: 14 }} />
                Defrag compares perspective, pressure, and timing before suggesting a next move.
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
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "rgba(245,245,245,0.48)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "6px 10px",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

function RailTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(245,245,245,0.42)",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(245,245,245,0.4)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 400, color: "white" }}>{value}</div>
    </div>
  );
}

function InsightBlock({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ paddingLeft: 14, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(245,245,245,0.7)" }}>{body}</div>
    </div>
  );
}
