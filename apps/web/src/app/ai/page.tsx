"use client";

import { useState } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<any>(null);

  async function run() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setState(data);
  }

  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      <h1>Defrag AI</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe a situation"
        style={{ width: "100%", height: 100 }}
      />

      <button onClick={run}>Analyze</button>

      {state && (
        <div style={{ marginTop: 24 }}>
          <h3>You</h3>
          <p>{state.synthesis.you}</p>

          <h3>Them</h3>
          <p>{state.synthesis.them}</p>

          <h3>Dynamic</h3>
          <p>{state.synthesis.dynamic}</p>

          <h3>Timing</h3>
          <p>{state.synthesis.timing}</p>

          <h3>Graph</h3>
          <div style={{ border: "1px solid #333", padding: 16 }}>
            {state.field.nodes.join(" ↔ ")} ({state.field.edge.valence})
          </div>
        </div>
      )}
    </div>
  );
}
