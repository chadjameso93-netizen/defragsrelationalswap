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
      eyebrow="System State"
      title="Connection lost."
      description="The application encountered an unexpected interruption. We have secured your session."
      accent="rgba(245, 245, 245, 0.45)"
    >
      <div style={{ maxWidth: 640, marginTop: 48, display: "grid", gap: 32 }}>
        <p style={{ margin: 0, color: "rgba(245, 245, 245, 0.6)", fontSize: 18, lineHeight: 1.6, fontWeight: 300 }}>
          You can attempt to restore the connection or return to the home screen. If this persists, the servers may be handling an update.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
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
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
          >
            <RotateCcw style={{ width: 18, height: 18 }} />
            Attempt Restore
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
            Return Home
          </a>
        </div>
      </div>
    </AppShell>
  );
}
