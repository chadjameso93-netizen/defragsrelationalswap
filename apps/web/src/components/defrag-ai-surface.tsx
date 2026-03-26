"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  MessageSquareText,
  Send,
  Share2,
  Sparkles,
  TriangleAlert,
  Waves,
} from "lucide-react";

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
      "Tell me what happened. I’ll help you understand the pressure, the pattern, and what to do next.",
  },
  {
    id: "m2",
    role: "user",
    content:
      "I sent a direct message after a tense call, and now they’ve gone quiet. I’m not sure if I pushed too hard or if they’re avoiding the issue.",
  },
];

const starterInsights: InsightCard[] = [
  {
    title: "What happened",
    body:
      "This looks less like rejection and more like overload. The silence may be a pause under pressure, not a final answer.",
  },
  {
    title: "What changed",
    body:
      "The interaction moved faster than the other person could process. Slowing down now prevents the moment from turning into a story.",
  },
  {
    title: "Next move",
    body:
      "Acknowledge the tension first. Then make the next step small, specific, and easy to respond to.",
  },
];

const starterSimulation: SimulationStep[] = [
  {
    label: "Next move",
    text: "I know that last message may have landed with more pressure than I meant. No need to respond quickly.",
  },
  {
    label: "Alternative",
    text: "I want to slow this down. If you’re open, we can come back to it when there’s more room.",
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
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#050505", color: "#f5f5f5" }}>
      <AmbientBackground />

      <div style={{ position: "relative", margin: "0 auto", display: "flex", minHeight: "100vh", maxWidth: 1600, flexDirection: "column", padding: "24px" }}>
        <header style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ height: 36, width: 36, borderRadius: 10, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(20px)" }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.5)" }}>
                DEFRAG
              </div>
              <h1 style={{ fontSize: 16, fontWeight: 500, color: "white", margin: 0 }}>
                Console
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
             <button style={{ borderRadius: 9999, border: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "8px 16px", fontSize: 13, color: "white", cursor: "pointer" }}>Share</button>
             <button style={{ borderRadius: 9999, border: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "8px 16px", fontSize: 13, color: "white", cursor: "pointer" }}>Invite</button>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0, 1fr) 380px", gap: 32, flex: 1 }} className="surface-grid">
          {/* Left Rail: Status Indicators */}
          <aside className="left-rail">
            <div style={{ display: "grid", gap: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
                <Waves style={{ width: 14, height: 14 }} />
                Session Status
              </div>
              
              <div style={{ display: "grid", gap: 24 }}>
                <StatusItem label="Pressure" value={pressureLevel} />
                <StatusItem label="Timing" value={timingWindow} />
                <StatusItem label="Next Move" value={nextMove} />
              </div>

              <div style={{ marginTop: 24 }}>
                 <div style={{ marginBottom: 16, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.3)" }}>
                   Timeline Visualization
                 </div>
                 <div style={{ height: 280, borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: "20%", top: "25%", width: 80, height: 80, borderRadius: "50%", background: "rgba(34, 211, 238, 0.05)", filter: "blur(20px)" }} />
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100">
                      <path d="M10 50 Q 30 20 50 50 T 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    </svg>
                 </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area: Analysis Workspace */}
          <main style={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr auto", borderRadius: 32, border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.04)", backdropFilter: "blur(40px)", overflow: "hidden", minHeight: "78vh" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 4 }}>Conversation Analysis</div>
                    <div style={{ fontSize: 14, color: "rgba(245, 245, 245, 0.8)" }}>Determine what happened before the moment turns into a story.</div>
                 </div>
                 <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(245, 245, 245, 0.4)" }}>
                       <Clock3 style={{ width: 12, height: 12 }} /> Slow
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(245, 245, 245, 0.4)" }}>
                       <TriangleAlert style={{ width: 12, height: 12 }} /> High
                    </div>
                 </div>
              </div>

              <div style={{ padding: "32px", overflowY: "auto" }}>
                <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 32 }}>
                  {messages.map((message) => (
                    <div key={message.id} style={{ alignSelf: message.role === "assistant" ? "flex-start" : "flex-end", maxWidth: "85%" }}>
                      <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.3)", textAlign: message.role === "assistant" ? "left" : "right" }}>
                        {message.role === "assistant" ? "DEFRAG" : "You"}
                      </div>
                      <div style={{ 
                        padding: "20px 24px", 
                        borderRadius: message.role === "assistant" ? "24px 24px 24px 4px" : "24px 24px 4px 24px",
                        background: message.role === "assistant" ? "rgba(255,255,255,0.05)" : "rgba(34, 211, 238, 0.1)",
                        border: message.role === "assistant" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(34, 211, 238, 0.2)",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "white"
                      }}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "24px 32px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                 <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
                    <textarea 
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Paste the conversation..."
                      style={{ 
                        width: "100%", 
                        minHeight: 100, 
                        borderRadius: 20, 
                        border: "1px solid rgba(255,255,255,0.1)", 
                        background: "rgba(0,0,0,0.2)", 
                        padding: "16px 60px 16px 20px",
                        color: "white",
                        fontSize: 15,
                        resize: "none",
                        outline: "none"
                      }}
                    />
                    <button 
                      onClick={sendMessage}
                      style={{ position: "absolute", right: 12, bottom: 12, width: 40, height: 40, borderRadius: "50%", border: "none", background: "white", color: "#050505", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                      <Send style={{ width: 18, height: 18 }} />
                    </button>
                 </div>
              </div>
            </div>
          </main>

          {/* Right Rail: Insights & Suggestions */}
          <aside className="right-rail">
            <div style={{ display: "grid", gap: 32 }}>
               <section>
                 <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
                    <Sparkles style={{ width: 14, height: 14 }} />
                    Pattern Recognition
                 </div>
                 <div style={{ display: "grid", gap: 32 }}>
                    {starterInsights.map(insight => (
                      <div key={insight.title} style={{ paddingLeft: 16, borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                         <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8 }}>{insight.title}</div>
                         <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(245, 245, 245, 0.7)" }}>{insight.body}</div>
                      </div>
                    ))}
                 </div>
               </section>

               <section>
                 <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)" }}>
                    <MessageSquareText style={{ width: 14, height: 14 }} />
                    Next-Move Simulation
                 </div>
                 <div style={{ display: "grid", gap: 24 }}>
                    {starterSimulation.map((sim, i) => (
                      <div key={i} style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)", padding: 20, cursor: "pointer" }}>
                         <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.3)", marginBottom: 10 }}>{sim.label}</div>
                         <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245, 245, 245, 0.9)" }}>{sim.text}</div>
                      </div>
                    ))}
                 </div>
               </section>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .surface-grid {
            grid-template-columns: 1fr !important;
          }
          .left-rail, .right-rail {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245, 245, 245, 0.4)", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 400, color: "white" }}>{value}</div>
    </div>
  );
}

function AmbientBackground(): React.JSX.Element {
  return (
    <div style={{ pointerEvents: "none", position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", left: "-10%", top: "-10%", height: "34rem", width: "34rem", borderRadius: "50%", background: "rgba(34, 211, 238, 0.05)", filter: "blur(120px)" }} />
      <div style={{ position: "absolute", right: "-12%", top: "8%", height: "30rem", width: "30rem", borderRadius: "50%", background: "rgba(79, 70, 229, 0.04)", filter: "blur(120px)" }} />
    </div>
  );
}
