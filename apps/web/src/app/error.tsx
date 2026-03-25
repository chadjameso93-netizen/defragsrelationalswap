"use client";

import { useEffect } from "react";
import { AppShell } from "../components/app-shell";

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
      accent="var(--color-text-muted)"
    >
      <div
        className="premium-fade-up premium-panel"
        data-delay="2"
        style={{
          padding: 32,
          borderRadius: "var(--radius-lg)",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          maxWidth: 620,
          display: "grid",
          gap: 16,
        }}
      >
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          You can attempt to restore the connection or return to the home screen. If this persists, the servers may be handling an update.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button
            onClick={() => reset()}
            style={{
              appearance: "none",
              border: "1px solid var(--color-border)",
              background: "var(--color-text-primary)",
              color: "var(--color-bg)",
              padding: "10px 16px",
              borderRadius: "var(--radius-pill)",
              fontSize: 13,
              letterSpacing: "0.06em",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Attempt Restore
          </button>
          <a
            href="/"
            style={{
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              padding: "10px 16px",
              borderRadius: "var(--radius-pill)",
              fontSize: 13,
              letterSpacing: "0.06em",
              fontWeight: 500,
              display: "inline-block",
            }}
          >
            Return Home
          </a>
        </div>
      </div>
    </AppShell>
  );
}
