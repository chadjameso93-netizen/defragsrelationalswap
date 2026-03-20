"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getSubscription, isSubscriptionActive } from "@/lib/subscription";
import { getRecentInsights, type InsightEntry } from "@/lib/insights";
import { derivePatternSummary, type PatternSummary } from "@/lib/patterns";
import GuidanceNote from "@/components/insights/guidance-note";
import ClarityQuestions from "@/components/insights/clarity-questions";
import { guidancePhrasing } from "@/lib/guidance-rules";
import FirstRun from "@/components/insights/first-run";
import RequestForm from "@/components/insights/request-form";
import InsightResult from "@/components/insights/insight-result";
import HistoryList from "@/components/insights/history-list";
import PatternSummaryDisplay from "@/components/insights/pattern-summary";
import UpgradePanel from "@/components/insights/upgrade-panel";
import PhrasingSuggestions from "@/components/insights/phrasing-suggestions";
import ConversationPrep from "@/components/insights/conversation-prep";
import PerspectiveNote from "@/components/insights/perspective-note";
import type { InsightApiResponse } from "@/types/contracts";

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

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const subscription = await getSubscription();
      const active = isSubscriptionActive(subscription);
      setIsPaid(active);

      const [{ data: profile }, insights] = await Promise.all([
        supabase.from("profiles").select("display_name").eq("id", user.id).single(),
        getRecentInsights()
      ]);

      setProfile(profile);
      setHistory(insights);
      setPatternSummary(derivePatternSummary(insights));

      if (insights.length > 0) {
        setResult(insights[0].response);
        setActiveHistoryId(insights[0].id);
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
    const insights = await getRecentInsights();
    setHistory(insights);
    setPatternSummary(derivePatternSummary(insights));
  };

  const handleHistorySelect = (entry: InsightEntry) => {
    setResult(entry.response);
    setActiveHistoryId(entry.id);
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
        user: { id: user.id, name: profile?.display_name || user.email, data_confidence: "partial" },
        user_request: `Analysis of interaction with ${data.who}. ${data.difficult ? `Core difficulty: ${data.difficult}` : ""}`,
        requested_mode: "insight",
        recent_events: [{ timestamp: new Date().toISOString(), type: "interaction", description: data.what }]
      };
      const { fetchInsight } = await import("@/lib/api");
      const { saveInsight } = await import("@/lib/insights");
      const result = await fetchInsight(payload as any);
      await saveInsight(user.id, payload as any, result);
      setResult(result);
      setDetailsOpen(false);
      setView("result");
      refreshHistory();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return <div style={{ color: "#71717a", fontSize: 14 }}>Loading...</div>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: history.length > 0 ? "1fr 300px" : "1fr", gap: 48, alignItems: "start" }}>
      <div style={{ display: "grid", gap: 32 }}>
        <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            Look a little closer
          </h1>
          <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.7 }}>
            Bring a situation into view and understand how it may be experienced from more than one side.
          </p>
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
          <div style={{ display: "grid", gap: 10, maxWidth: 560 }}>
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
            userName={profile?.display_name || user.email}
            onSubmit={(res) => {
              setResult(res);
              setDetailsOpen(false);
              setView("result");
              refreshHistory();
            }}
            onCancel={() => setView("empty")}
          />
        )}

        {view === "result" && result && (
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "grid", gap: 12, padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#71717a" }}>
                First read
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
                onReset={() => {
                  if (isPaid) {
                    setResult(null);
                    setActiveHistoryId(undefined);
                    setDetailsOpen(false);
                    setView("form");
                  } else {
                    router.push("/account/billing");
                  }
                }}
              />
            )}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <aside style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: 48, height: "100%" }}>
          <HistoryList 
            insights={history} 
            onSelect={handleHistorySelect}
            activeId={activeHistoryId}
          />
        </aside>
      )}
    </div>
  );
}
