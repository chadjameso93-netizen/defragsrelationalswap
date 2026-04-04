import { useState } from "react";
import type { InsightApiResponse } from "@/types/contracts";
import { fetchInsight } from "@/lib/api";

interface RequestFormProps {
  userId: string;
  userName: string;
  onSubmit: (response: InsightApiResponse, request: string) => void;
  onCancel: () => void;
}

export default function RequestForm({ userId, userName, onSubmit, onCancel }: RequestFormProps) {
  const [request, setRequest] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 640 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-primary)", fontWeight: 600 }}>Describe the moment</p>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          Write the smallest useful slice of the interaction. One moment works better than a whole relationship summary.
        </p>
      </div>
      <textarea
        value={request}
        onChange={(event) => setRequest(event.target.value)}
        placeholder="Describe the moment you want to understand a little more clearly."
        style={{
          minHeight: 140,
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          padding: 16,
        }}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              const response = await fetchInsight({ userId, userName, request });
              onSubmit(response, request);
            } catch (err) {
              setError("Network interruption or server failure. Please try again.");
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy || request.trim().length === 0}
          style={{
            padding: "12px 16px",
            borderRadius: "var(--radius-pill)",
            border: 0,
            background: "var(--color-text-primary)",
            color: "var(--color-bg)",
            fontWeight: 700,
            cursor: busy ? "default" : "pointer",
          }}
        >
          {busy ? "Working…" : "Generate insight"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "12px 16px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--color-border-hover)",
            background: "transparent",
            color: "var(--color-text-primary)",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
      {error && (
        <div style={{ color: "var(--color-accent)", fontSize: 13, marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
}
