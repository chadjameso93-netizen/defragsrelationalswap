"use client";

import { useState } from "react";

type ApiResponse = {
  ok: boolean;
  inputObject: unknown;
  baselineObject: any;
  provider: string;
  model: string;
  warning?: string;
};

const DEFAULT_INPUT = {
  name: "Test User",
  dob: "1993-07-26",
  birth_time: "20:00",
  birth_place: "Upland, CA",
  current_location: "Rancho Cucamonga, CA",
  context: "Trying to understand baseline design and how I work best under pressure.",
  symbolic_inputs: {
    astrology: {
      sun: "Leo",
      moon: "Scorpio",
      rising: "Aquarius",
    },
    human_design: {
      type: "Projector",
      authority: "Emotional",
      profile: "3/5",
    },
    gene_keys: {
      life_work: "31",
      evolution: "41",
      purpose: "28",
    },
    numerology: {
      life_path: "9",
    },
    i_ching: {},
  },
};

export default function TestBaselinePage() {
  const [payload, setPayload] = useState(JSON.stringify(DEFAULT_INPUT, null, 2));
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const parsed = JSON.parse(payload);

      const res = await fetch("/api/test-baseline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = (await res.json()) as ApiResponse;
      setResult(data);
    } catch (error) {
      setResult({
        ok: false,
        inputObject: null,
        baselineObject: null,
        provider: "unknown",
        model: "unknown",
        warning: error instanceof Error ? error.message : "Invalid JSON input.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "32px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gap: 20 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Defrag test baseline (live)
          </div>
          <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1 }}>
            Structured baseline generator
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", maxWidth: 900 }}>
            This tests the first DEFRAG baseline design contract using the shared reasoning pattern.
            It uses OpenAI structured outputs if configured, otherwise falls back to a local baseline.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            padding: 16,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows={22}
            style={{
              width: "100%",
              background: "#0f0f0f",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: 14,
              resize: "vertical",
              fontSize: 14,
              lineHeight: 1.5,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          />

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={run}
              disabled={loading}
              style={{
                background: "white",
                color: "#050505",
                border: 0,
                padding: "12px 18px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {loading ? "Running..." : "Run baseline generation"}
            </button>
          </div>
        </div>

        {result && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <section
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                padding: 16,
              }}
            >
              <h2 style={{ marginTop: 0 }}>Readable baseline</h2>
              {result.baselineObject?.baseline ? (
                <div style={{ display: "grid", gap: 14, lineHeight: 1.7 }}>
                  <div>
                    <strong>Core design</strong>
                    <div>{result.baselineObject.baseline.core_design}</div>
                  </div>
                  <div>
                    <strong>One clear next step</strong>
                    <div>{result.baselineObject.baseline.one_clear_next_step}</div>
                  </div>
                  <div>
                    <strong>Practical guidance</strong>
                    <ul>
                      {result.baselineObject.baseline.practical_guidance?.map((item: string) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>
                    model: {result.model} | provider: {result.provider}
                  </div>
                  {result.warning && <div style={{ color: "#ffb3b3" }}>{result.warning}</div>}
                </div>
              ) : (
                <div style={{ color: "#ffb3b3" }}>{result.warning || "No baseline returned."}</div>
              )}
            </section>

            <section
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                padding: 16,
              }}
            >
              <h2 style={{ marginTop: 0 }}>Input object</h2>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(result.inputObject, null, 2)}
              </pre>
            </section>

            <section
              style={{
                gridColumn: "1 / -1",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                padding: 16,
              }}
            >
              <h2 style={{ marginTop: 0 }}>Baseline object</h2>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(result.baselineObject, null, 2)}
              </pre>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
