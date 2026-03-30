"use client";

import { useState } from "react";

type ApiResponse = {
  ok: boolean;
  requestObject: unknown;
  synthesisObject: unknown;
  userFacingResponse: string;
  model: string;
  provider: string;
  warning?: string;
};

export default function TestChatPage() {
  const [message, setMessage] = useState(
    "I want to talk to my mom tonight, but I think it might turn into another fight.",
  );
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const res = await fetch("/api/test-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = (await res.json()) as ApiResponse;
      setResult(data);
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
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 20 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Defrag test chat (live)
          </div>
          <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1 }}>
            Structured AI chat
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", maxWidth: 800 }}>
            This uses OpenAI structured outputs if configured, otherwise falls back to a local deterministic model.
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            style={{
              width: "100%",
              background: "#0f0f0f",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              padding: 14,
              resize: "vertical",
              fontSize: 15,
              lineHeight: 1.5,
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
              {loading ? "Running..." : "Run structured analysis"}
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
              <h2 style={{ marginTop: 0 }}>User-facing response</h2>
              <div style={{ lineHeight: 1.7 }}>{result.userFacingResponse}</div>
              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>
                model: {result.model} | provider: {result.provider}
              </div>
              {result.warning && (
                <div style={{ marginTop: 8, color: "#ffb3b3" }}>{result.warning}</div>
              )}
            </section>

            <section
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                padding: 16,
              }}
            >
              <h2 style={{ marginTop: 0 }}>Request object</h2>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(result.requestObject, null, 2)}
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
              <h2 style={{ marginTop: 0 }}>Synthesis object</h2>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(result.synthesisObject, null, 2)}
              </pre>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
