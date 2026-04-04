"use client";

import { useEffect } from "react";
import { AppShell } from "../components/app-shell";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppShell
      eyebrow="Session recovery"
      title="This session needs to be reloaded."
      description="Defrag hit an interruption before the analysis finished. Your workspace state is safe, and you can restore the session or return home."
      accent="rgba(245, 245, 245, 0.45)"
    >
      <div style={{ maxWidth: 760, marginTop: 48, display: "grid", gap: 36 }}>
        <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.6)", fontSize: 18, lineHeight: 1.68, fontWeight: 300 }}>
          Most interruptions are temporary. Reload the session to continue, or return to the home screen and reopen the workspace when you are ready.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => reset()}
            style={{
              appearance: "none",
              border: 0,
              background: "white",
              color: "#050505",
              padding: "16px 32px",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <RotateCcw style={{ width: 18, height: 18 }} />
            Reload session
          </button>
          <a
            href="/"
            style={{
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "white",
              padding: "16px 32px",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ArrowLeft style={{ width: 18, height: 18 }} />
            Return home
          </a>
        </div>
      </div>
    </AppShell>
  );
}
