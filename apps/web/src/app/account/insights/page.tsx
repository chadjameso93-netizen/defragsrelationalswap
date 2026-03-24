"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createClient } from "@/utils/supabase/client";
import { getSubscription, isSubscriptionActive } from "@/lib/subscription";
import { getRecentInsights, type InsightEntry } from "@/lib/insights";
import { derivePatternSummary, type PatternSummary } from "@/lib/patterns";
import GuidanceNote from "@/components/insights/guidance-note";
import ClarityQuestions from "@/components/insights/clarity-questions";
import { guidancePhrasing } from "@/lib/guidance-rules";
import FirstRun from "@/components/insights/first-run";
import Link from "next/link";
import RequestForm from "@/components/insights/request-form";
import InsightResult from "@/components/insights/insight-result";
import HistoryList from "@/components/insights/history-list";
import PatternSummaryDisplay from "@/components/insights/pattern-summary";
import UpgradePanel from "@/components/insights/upgrade-panel";
import PhrasingSuggestions from "@/components/insights/phrasing-suggestions";
import ConversationPrep from "@/components/insights/conversation-prep";
import PerspectiveNote from "@/components/insights/perspective-note";
import SimulationPreview from "@/components/insights/simulation-preview";
import { PublicPreviewCta } from "@/components/public-preview-cta";
import type { InsightApiResponse, SimulationApiResponse } from "@/types/contracts";

export default function InsightsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [view, setView] = useState<"empty" | "form" | "result">("empty");
  const [result, setResult] = useState<InsightApiResponse | null>(null);
  const [history, setHistory] = useState<InsightEntry[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | undefined>();
  const [patternSummary, setPatternSummary] = useState<PatternSummary | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [simulation, setSimulation] = useState<SimulationApiResponse | null>(null);
  const [activeRequest, setActiveRequest] = useState("");
  const profileName =
    profile?.display_name ||
    (typeof user?.user_metadata?.display_name === "string" ? user.user_metadata.display_name : null) ||
    user?.email ||
    "";

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUser(user);

      const subscription = await getSubscription();
      const active = isSubscriptionActive(subscription);
      setIsPaid(active);

      const insights = await getRecentInsights(user.id);
      setProfile(
        typeof user.user_metadata?.display_name === "string"
          ? { display_name: user.user_metadata.display_name }
          : null,
      );
      setHistory(insights);
      setPatternSummary(derivePatternSummary(insights));

      if (insights.length > 0) {
        setResult(insights[0].response);
        setActiveHistoryId(insights[0].id);
        setActiveRequest(insights[0].prompt ?? insights[0].response.insight.what_may_be_happening);
        setDetailsOpen(false);
        setView("result");
      } else {
        setView("empty");
      }

      setLoading(false);
    }
    init();
  }, [router, supabase]);

  const refreshHistory = async () => {
    const insights = await getRecentInsights(user.id);
    setHistory(insights);
    setPatternSummary(derivePatternSummary(insights));
  };

  const handleHistorySelect = (entry: InsightEntry) => {
    setResult(entry.response);
    setActiveHistoryId(entry.id);
    setActiveRequest(entry.prompt ?? entry.response.insight.what_may_be_happening);
    setSimulation(null);
    setDetailsOpen(false);
    setView("result");
  };

  const handleFirstRunComplete = async (data: { what: string; who: string; difficult: string }) => {
    // We'll use a temporary state or just call the same logic as RequestForm would
    // But since FirstRun is a separate component, let's keep it simple.
    // For now, let's just use RequestForm's logic by proxying through it or duplicating the minimal fetch.
    setLoading(true);
    try {
      const payload = {
        user: { id: user.id, name: profileName, data_confidence: "partial" },
        user_request: `Analysis of interaction with ${data.who}. ${data.difficult ? `Core difficulty: ${data.difficult}` : ""}`,
        requested_mode: "insight",
        recent_events: [{ timestamp: new Date().toISOString(), type: "interaction", description: data.what }]
      };
      const { fetchInsight } = await import("@/lib/api");
      const { saveInsight } = await import("@/lib/insights");
      const result = await fetchInsight(payload as any);
      await saveInsight(user.id, payload as any, result);
      setResult(result);
      setActiveHistoryId(undefined);
      setActiveRequest(payload.user_request);
      setSimulation(null);
      setDetailsOpen(false);
      setView("result");
      refreshHistory();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunSimulation = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const { fetchSimulation } = await import("@/lib/api");
      const payload = { request: activeRequest };
      const simResult = await fetchSimulation(payload as any);
      setSimulation(simResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppShell
        eyebrow="Insight Studio"
        title="Look a little closer."
        description="Saved insights, simulations, and calmer reframes for one moment at a time."
        accent="#d9c49f"
      >
        <div style={{ color: "#71717a", fontSize: 14 }}>Loading insight workspace…</div>
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell
        eyebrow="Insight Studio"
        title="Look a little closer."
        description="Preview the studio flow, saved insight format, and analysis rhythm here. Sign in when you want your own saved insights, simulations, and billing-aware access."
        accent="#d9c49f"
      >
        <div style={{ display: "grid", gap: 22 }}>
          <PublicPreviewCta
            title="Insight Studio can be explored before it starts saving."
            description="You can inspect the studio structure and insight quality here. Authentication turns the preview into your own archive, simulation history, and follow-up workspace."
            primaryLabel="Sign in for saved insights"
            secondaryLabel="Open billing"
            secondaryHref="/account/billing"
          />

          <section className="insight-preview-hero" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, padding: 22, borderRadius: 26, border: "1px solid rgba(255,255,255,0.08)", background: "radial-gradient(circle at top left, rgba(217,196,159,0.16), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))" }}>
            <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d9c49f" }}>Studio posture</p>
              <p style={{ margin: 0, fontSize: 26, lineHeight: 1.18, color: "#f5f5f5", maxWidth: 520 }}>
                One moment, one closer insight, one move that feels human-sized.
              </p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "rgba(245,245,245,0.68)", maxWidth: 520 }}>
                The surface stays spare on purpose: enough structure to steady the moment, not enough to turn it into performance.
              </p>
            </div>

            <div className="insight-preview-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, alignSelf: "end" }}>
              {[
                ["Insights saved", "Preview"],
                ["Access", "Upgrade aware"],
                ["Current mode", "Archive view"],
              ].map(([label, value]) => (
                <div key={label} style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8d8d95" }}>{label}</div>
                  <div style={{ marginTop: 8, color: "#f5f5f5", fontSize: 16 }}>{value}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="insight-preview-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 28, alignItems: "start" }}>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 12, padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
                <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>Lead insight</p>
                <p style={{ margin: 0, fontSize: 20, lineHeight: 1.45, color: "#f5f5f5", fontWeight: 500 }}>
                  This looks less like a lack of care and more like two people trying to repair while still protecting themselves from a repeat of the last rupture.
                </p>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#71717a" }}>
                  Studio keeps the interpretation specific, softens the phrasing, and narrows the next step so the guidance stays usable.
                </p>
              </div>

              <FirstRun onComplete={() => router.push("/login")} />

              <div style={{ display: "grid", gap: 10 }}>
                {[
                  "Look for the smallest true description before you explain meaning.",
                  "If repair already happened once, acknowledge that before adding new content.",
                  "A ten-minute container may work better than trying to resolve the whole pattern.",
                ].map((item, index) => (
                  <div key={item} style={{ display: "grid", gap: 4, padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>
                      Option {index + 1}
                    </p>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#d4d4d8" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/login" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 18px", borderRadius: 999, background: "#f5f5f5", color: "#050505", textDecoration: "none", fontWeight: 700 }}>
                  Sign in to save insights
                </Link>
              </div>
            </div>

            <aside className="insight-preview-rail" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: 28, display: "grid", gap: 12 }}>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>Archive preview</p>
              {[
                "The text that stayed with me after the call",
                "What made the family dinner feel heavier than it sounded",
                "Why the apology did not land as repair",
              ].map((title, index) => (
                <div key={title} style={{ padding: 14, borderRadius: 16, border: index === 0 ? "1px solid rgba(217,196,159,0.42)" : "1px solid rgba(255,255,255,0.06)", background: index === 0 ? "rgba(217,196,159,0.08)" : "rgba(255,255,255,0.02)", display: "grid", gap: 6 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: index === 0 ? "#d9c49f" : "#71717a" }}>Saved insight</div>
                  <div style={{ color: "#f5f5f5", lineHeight: 1.55, fontSize: 14 }}>{title}</div>
                </div>
              ))}
            </aside>
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) {
            .insight-preview-grid {
              grid-template-columns: 1fr !important;
            }

            .insight-preview-rail {
              border-left: 0 !important;
              border-top: 1px solid rgba(255,255,255,0.08);
              padding-left: 0 !important;
              padding-top: 20px;
            }
          }

          @media (max-width: 720px) {
            .insight-preview-metrics {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </AppShell>
    );
  }

  // Awareness line variants
  const awarenessVariants = [
    "This may land more easily with a softer start right now.",
    "This may be a slightly sensitive moment to bring this up.",
    "A steadier approach may help this come across more clearly right now."
  ];
  // Deterministic rotation: changes every minute
  const variantIndex = Math.floor(Date.now() / 60000) % awarenessVariants.length;
  const awarenessLine = awarenessVariants[variantIndex];

  return (
    <AppShell
      eyebrow="Insight Studio"
      title="Look a little closer."
      description="Bring one moment into focus and keep the insight grounded, specific, and usable when the real conversation begins."
      accent="#d9c49f"
    >
    <div style={{ display: "grid", gap: 22 }}>
      <section
        className="insight-hero"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          padding: 22,
          borderRadius: 26,
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "radial-gradient(circle at top left, rgba(217,196,159,0.16), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
        }}
      >
        <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d9c49f" }}>
            Studio posture
          </p>
          <p style={{ margin: 0, fontSize: 26, lineHeight: 1.18, color: "#f5f5f5", maxWidth: 520 }}>
            Study the moment, keep the tone soft, and leave with one move you can actually make.
          </p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "rgba(245,245,245,0.68)", maxWidth: 520 }}>
            Insight Studio is strongest when the slice is small: one exchange, one rupture, one confusing aftertaste.
          </p>
        </div>

        <div
          className="insight-hero-metrics"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 12,
            alignSelf: "end",
          }}
        >
          {[
            ["Insights saved", String(history.length)],
            ["Access", isPaid ? "Enabled" : "Upgrade"],
            ["Current mode", view === "result" ? "Result" : view === "form" ? "Drafting" : "Starter"],
          ].map(([label, value]) => (
            <div key={label} style={{ padding: 14, borderRadius: 16, background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8d8d95" }}>{label}</div>
              <div style={{ marginTop: 8, color: "#f5f5f5", fontSize: 16 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

    <div className="insight-workspace" style={{ display: "grid", gridTemplateColumns: history.length > 0 ? "minmax(0, 1fr) 320px" : "minmax(0, 1fr)", gap: 32, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 28 }}>
        {(isPaid && (view === "result" || view === "form")) && (
          <div style={{ marginBottom: 2 }}>
            <div style={{ fontSize: 13, color: "#f5c98b", background: "rgba(255, 220, 120, 0.07)", borderRadius: 8, padding: "7px 14px", fontWeight: 500, maxWidth: 420, lineHeight: 1.5 }}>
              {awarenessLine}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            ["Access", isPaid ? "Full insights enabled" : "Upgrade required for full insights"],
            ["History", history.length > 0 ? `${history.length} saved insights` : "No saved insights yet"],
            ["Mode", view === "result" ? "Result" : view === "form" ? "Drafting" : "Starter state"],
          ].map(([label, value]) => (
            <div key={label} style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", padding: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>{label}</div>
              <div style={{ marginTop: 8, color: "#f5f5f5", fontSize: 15 }}>{value}</div>
            </div>
          ))}
        </div>

        {view === "empty" && isPaid && (
          <div style={{ padding: 20, borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", maxWidth: 560 }}>
            <p style={{ margin: 0, fontSize: 14, color: "#f5f5f5", fontWeight: 500 }}>
              A good place to begin
            </p>
            <p style={{ margin: 0, marginTop: 6, fontSize: 14, color: "#71717a", lineHeight: 1.7 }}>
              Start with a recent moment that felt unclear, tense, or unfinished. You can keep it simple.
            </p>
          </div>
        )}

        {!isPaid && (
          <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
            <UpgradePanel />
            <p style={{ margin: 0, fontSize: 13, color: "#71717a", lineHeight: 1.6 }}>
              Access helps you look at situations more clearly and from more than one perspective.
            </p>
          </div>
        )}

        {patternSummary && <PatternSummaryDisplay summary={patternSummary} />}

        {view === "empty" && isPaid && (
          <FirstRun onComplete={handleFirstRunComplete} />
        )}

        {view === "form" && isPaid && (
          <RequestForm
            userId={user.id}
            userName={profileName}
            onSubmit={async (res, request) => {
              const { saveInsight } = await import("@/lib/insights");
              await saveInsight(user.id, { user_request: request }, res);
              setResult(res);
              setActiveHistoryId(undefined);
              setActiveRequest(request);
              setSimulation(null);
              setDetailsOpen(false);
              setView("result");
              refreshHistory();
            }}
            onCancel={() => setView("empty")}
          />
        )}

        {view === "result" && result && (
          <>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ display: "grid", gap: 12, padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#71717a" }}>
                  Lead insight
                </p>
                <p style={{ margin: 0, fontSize: 20, lineHeight: 1.45, color: "#f5f5f5", fontWeight: 500 }}>
                  {guidancePhrasing.soften(result.insight.what_may_be_happening)}
                </p>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#71717a" }}>
                  {guidancePhrasing.soften(result.insight.what_it_may_be_causing)}
                </p>
              </div>

              <div style={{ display: "grid", gap: 12, padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <p style={{ margin: 0, fontSize: 14, color: "#f5f5f5", fontWeight: 500 }}>
                  This may be easier if…
                </p>
                <div style={{ display: "grid", gap: 10 }}>
                  {result.insight.what_to_try_next.slice(0, 3).map((item, index) => (
                    <div key={index} style={{ display: "grid", gap: 4, padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#71717a" }}>
                        Option {index + 1}
                      </p>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#d4d4d8" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {!detailsOpen && (
                <>
                  <ClarityQuestions />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 12 }}>
                    <PhrasingSuggestions />
                    <ConversationPrep />
                  </div>
                  <div style={{ marginTop: 24 }}>
                    <PerspectiveNote />
                  </div>
                  <GuidanceNote />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => setDetailsOpen((value) => !value)}
                      style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#e4e4e7", borderRadius: 999, padding: "10px 18px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                    >
                      {detailsOpen ? "Close fuller view" : "Open fuller view"}
                      <span style={{ opacity: 0.5 }}>{detailsOpen ? "↑" : "↓"}</span>
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 12, color: "#71717a" }}>Helpful?</span>
                      <button 
                        style={{ background: "transparent", border: "none", color: "#a1a1aa", fontSize: 12, cursor: "pointer", padding: "4px 8px" }}
                        onClick={() => {}}
                      >
                        Yes
                      </button>
                      <button 
                        style={{ background: "transparent", border: "none", color: "#a1a1aa", fontSize: 12, cursor: "pointer", padding: "4px 8px" }}
                        onClick={() => {}}
                      >
                        Not yet
                      </button>
                    </div>
                  </div>
                </>
              )}

              {detailsOpen && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => setDetailsOpen((value) => !value)}
                    style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#e4e4e7", borderRadius: 999, padding: "10px 18px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    {detailsOpen ? "Close fuller view" : "Open fuller view"}
                    <span style={{ opacity: 0.5 }}>{detailsOpen ? "↑" : "↓"}</span>
                  </button>
                </div>
              )}

              {detailsOpen && (
                <InsightResult
                  result={result}
                  request={activeRequest}
                  onReset={() => {
                    if (isPaid) {
                      setResult(null);
                      setActiveHistoryId(undefined);
                      setSimulation(null);
                      setDetailsOpen(false);
                      setView("form");
                    } else {
                      router.push("/account/billing");
                    }
                  }}
                />
              )}
            </div>

            <button
              style={{
                margin: "16px 0 0 0",
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.1)",
                background: loading ? "rgba(255,255,255,0.04)" : "transparent",
                color: "#e4e4e7",
                fontSize: 13,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.6 : 1
              }}
              onClick={handleRunSimulation}
              disabled={loading}
            >
              {loading ? "Looking at how this may land…" : "Preview how this may land"}
            </button>
            <SimulationPreview simulation={simulation} />
          </>
        )}
      </div>

      {history.length > 0 && (
        <aside className="insight-history-rail" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: 28, height: "100%" }}>
          <HistoryList 
            insights={history} 
            onSelect={handleHistorySelect}
            activeId={activeHistoryId}
          />
        </aside>
      )}
    </div>
    </div>
    <style>{`
      @media (max-width: 860px) {
        .insight-workspace {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }

        .insight-history-rail {
          border-left: 0 !important;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-left: 0 !important;
          padding-top: 20px;
        }
      }

      @media (max-width: 720px) {
        .insight-hero {
          padding: 18px !important;
          border-radius: 20px !important;
        }

        .insight-hero-metrics {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
    </AppShell>
  );
}
