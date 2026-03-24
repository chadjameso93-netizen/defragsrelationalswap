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

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 640 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 12, color: "#f5f5f5", fontWeight: 600 }}>Describe the moment</p>
        <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", lineHeight: 1.6 }}>
          Write the smallest useful slice of the interaction. One moment works better than a whole relationship summary.
        </p>
      </div>
      <textarea
        value={request}
        onChange={(event) => setRequest(event.target.value)}
        placeholder="Describe the moment you want to understand a little more clearly."
        style={{
          minHeight: 140,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          color: "#f5f5f5",
          padding: 16,
        }}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={async () => {
            setBusy(true);
            try {
              const response = await fetchInsight({ userId, userName, request });
              onSubmit(response, request);
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy || request.trim().length === 0}
          style={{
            padding: "12px 16px",
            borderRadius: 999,
            border: 0,
            background: "#f5f5f5",
            color: "#050505",
            fontWeight: 700,
            cursor: busy ? "default" : "pointer",
          }}
        >
          {busy ? "Reading…" : "Generate read"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "transparent",
            color: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
