"use client";

import { useEffect, useState } from "react";
import type {
  DynamicsEvaluationRubric,
  DynamicsOutputContract,
  DynamicsStructuredSynthesis,
  Entitlements,
} from "../../../../packages/core/src";
import { DynamicsV1Shell } from "./dynamics-v1-shell";
import { LiveRelationalField } from "./live-relational-field";

interface ThreadRecord {
  id: string;
  title: string;
}

interface InsightRecord {
  id: string;
  contract: DynamicsOutputContract;
  createdAt: string;
  synthesis?: DynamicsStructuredSynthesis | null;
  evaluation?: DynamicsEvaluationRubric | null;
}

interface ActionRecord {
  type: "show_evidence" | "rephrase" | "practice_conversation";
  label: string;
}

interface DynamicsWorkspaceProps {
  initialThreads: ThreadRecord[];
  entitlements: Entitlements;
}

export function DynamicsWorkspace({ initialThreads, entitlements }: DynamicsWorkspaceProps) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>(initialThreads[0]?.id);
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<DynamicsOutputContract | null>(null);
  const [latestInsightId, setLatestInsightId] = useState<string | null>(null);
  const [insights, setInsights] = useState<InsightRecord[]>([]);
  const [actions, setActions] = useState<ActionRecord[]>([]);
  const [actionResult, setActionResult] = useState<{ title: string; lines: string[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);

  useEffect(() => {
    async function loadThreadInsights() {
      if (!activeThreadId) {
        setInsights([]);
        setResult(null);
        setLatestInsightId(null);
        setActions([]);
        setActionResult(null);
        return;
      }

      setLoadingThread(true);
      const response = await fetch(`/api/dynamics/insights?threadId=${activeThreadId}`);
      const body = (await response.json()) as { insights?: InsightRecord[] };
      const loaded = body.insights ?? [];
      setInsights(loaded);
      
      if (loaded[0]) {
        setLatestInsightId(loaded[0].id);
        setResult(loaded[0].contract);
        setActions([]);
        setActionResult(null);
      } else {
        setLatestInsightId(null);
        setResult(null);
        setActions([]);
        setActionResult(null);
      }
      setLoadingThread(false);
    }

    loadThreadInsights();
  }, [activeThreadId]);

  const activeInsight = insights.find((insight) => insight.id === latestInsightId) ?? null;
  const suggestedTitle = situation.trim().slice(0, 42) || "Live Interaction";

  return (
    <div 
      className="defrag-ai-environment premium-fade-up" 
      data-delay="1"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 120px)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg)",
        display: "grid",
        gridTemplateColumns: "1fr",
      }}
    >
      {/* Background Layer: Live Relational Field */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}>
        <LiveRelationalField preview={false} />
      </div>

      {/* Foreground Layer: Interaction & Intelligence Overlays */}
      <div 
        style={{ 
          position: "relative", 
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "minmax(320px, 400px) minmax(0, 1fr)",
          gap: 24,
          padding: 24,
          height: "100%",
          alignItems: "start"
        }}
      >
        {/* Left Control Panel: Intake & History */}
        <div style={{ display: "grid", gap: 16 }}>
          <div 
            style={{ 
              background: "rgba(6, 7, 10, 0.75)", 
              backdropFilter: "blur(20px)", 
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--color-border-hover)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
              display: "grid",
              gap: 20
            }}
          >
            <div>
              <p style={{ margin: "0 0 6px 0", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)" }}>Sequence Interface</p>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>Trace a relational sequence</h2>
              <p style={{ margin: "6px 0 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>Submit the exchange. DEFRAG AI will extract the architectural pattern and update the live field.</p>
            </div>

            <textarea
              value={situation}
              onChange={(event) => setSituation(event.target.value)}
              rows={4}
              placeholder="Detail the point of tension or shift in tone..."
              style={{ 
                width: "100%", 
                borderRadius: "var(--radius-md)", 
                padding: 16, 
                background: "rgba(0,0,0,0.4)", 
                border: "1px solid var(--color-border)", 
                color: "var(--color-text-primary)", 
                fontSize: 14,
                lineHeight: 1.6,
                resize: "none",
                outline: "none",
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.2)",
                fontFamily: "inherit",
              }}
            />

            <button
              type="button"
              disabled={busy || !situation.trim()}
              onClick={async () => {
                setBusy(true);
                setError(null);
                try {
                  const response = await fetch("/api/dynamics/insights", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      threadId: activeThreadId,
                      threadTitle: suggestedTitle,
                      situation,
                      recentEvents: [situation],
                    }),
                  });

                  const body = (await response.json()) as { error?: string; insight?: InsightRecord; threadId?: string; actions?: ActionRecord[] };

                  if (!response.ok || !body.insight) throw new Error(body.error ?? "Failed to synthesize sequence");

                  if (!activeThreadId && body.threadId) {
                    setThreads((prev) => [{ id: body.threadId!, title: suggestedTitle }, ...prev]);
                    setActiveThreadId(body.threadId);
                  }

                  setLatestInsightId(body.insight.id);
                  setResult(body.insight.contract);
                  setInsights((prev) => [body.insight!, ...prev]);
                  setActions(body.actions ?? []);
                  setActionResult(null);
                  setSituation("");
                  setViewHistory(false);
                } catch (err) {
                  setError(String(err));
                } finally {
                  setBusy(false);
                }
              }}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: "var(--radius-pill)",
                border: 0,
                background: situation.trim() ? "var(--color-text-primary)" : "var(--color-surface-hover)",
                color: situation.trim() ? "var(--color-bg)" : "var(--color-text-muted)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                cursor: situation.trim() ? "pointer" : "default",
                transition: "all 0.2s ease"
              }}
            >
              {busy ? "Synthesizing Field State..." : "Compute Field State"}
            </button>

            {error && (
              <div style={{ padding: 12, borderRadius: "var(--radius-md)", background: "rgba(180,50,50,0.1)", border: "1px solid rgba(180,50,50,0.2)", color: "#fca5a5", fontSize: 12, lineHeight: 1.5 }}>
                {error}
              </div>
            )}
          </div>

          <div 
            style={{ 
              background: "rgba(6, 7, 10, 0.4)", 
              backdropFilter: "blur(12px)", 
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Session History</span>
              <button 
                onClick={() => setViewHistory(!viewHistory)}
                style={{ fontSize: 11, background: "none", border: 0, color: "var(--color-accent)", cursor: "pointer", letterSpacing: "0.1em" }}
              >
                {viewHistory ? "HIDE" : "VIEW ALL"}
              </button>
            </div>

            <button
              onClick={() => {
                setActiveThreadId(undefined);
                setSituation("");
                setResult(null);
                setActions([]);
                setViewHistory(false);
              }}
              style={{ width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px dashed var(--color-border)", background: "transparent", color: "var(--color-text-secondary)", fontSize: 13, cursor: "pointer", marginBottom: 12 }}
            >
              + Initialize New Trace
            </button>

            {viewHistory && (
              <div style={{ display: "grid", gap: 6, maxHeight: 300, overflowY: "auto", paddingRight: 4 }}>
                {threads.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveThreadId(t.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: t.id === activeThreadId ? "1px solid var(--color-accent)" : "1px solid transparent",
                      background: t.id === activeThreadId ? "rgba(216,196,159,0.08)" : "var(--color-surface)",
                      color: t.id === activeThreadId ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      fontSize: 13,
                      lineHeight: 1.5,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Output Area: Insight Overlays & Simulations */}
        <div style={{ display: "grid", gap: 20, alignContent: "start", height: "100%", overflowY: "auto", paddingBottom: 60 }}>
          {loadingThread && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: "var(--color-text-muted)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Restoring Context...
            </div>
          )}

          {!loadingThread && result && (
            <div className="premium-fade-up">
              <DynamicsV1Shell
                contract={result}
                entitlements={entitlements}
                synthesis={activeInsight?.synthesis ?? null}
                evaluation={activeInsight?.evaluation ?? null}
              />
            </div>
          )}

          {!loadingThread && actions.length > 0 && latestInsightId && (
            <div 
              className="premium-fade-up"
              style={{ 
                background: "rgba(6, 7, 10, 0.8)", 
                backdropFilter: "blur(24px)", 
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--color-border-hover)",
                borderRadius: "var(--radius-lg)",
                padding: 24,
                display: "grid",
                gap: 16
              }}
            >
              <div>
                <span style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)" }}>Simulations</span>
                <p style={{ margin: "6px 0 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>Stress-test responses or refine structural phasing before returning to the live dynamic.</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {actions.map((act) => (
                  <button
                    key={act.type}
                    onClick={async () => {
                      const res = await fetch("/api/dynamics/actions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ insightId: latestInsightId, actionType: act.type }),
                      });
                      const data = await res.json();
                      if (data.result) setActionResult(data.result);
                    }}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--color-surface-hover)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {act.label}
                  </button>
                ))}
              </div>

              {actionResult && (
                <div style={{ margin: "16px 0 0 0", paddingTop: 16, borderTop: "1px solid var(--color-border)" }}>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{actionResult.title}</h4>
                  <ul style={{ margin: 0, paddingLeft: 16, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.7, display: "grid", gap: 8 }}>
                    {actionResult.lines.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!loadingThread && !result && !busy && (
            <div style={{ 
              height: "100%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              flexDirection: "column",
              gap: 12,
              opacity: 0.5
            }}>
              <div style={{ width: 1, height: 40, background: "var(--color-border-hover)" }} />
              <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", textAlign: "center" }}>
                Live Field Standing By<br/>Awaiting Interaction Data
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .defrag-ai-environment > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
