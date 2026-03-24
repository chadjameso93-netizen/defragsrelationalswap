import { useState } from "react";
import type { InsightApiResponse } from "@/types/contracts";
import { fetchInsight } from "@/lib/api";

interface RequestFormProps {
  userId: string;
  userName: string;
  onSubmit: (response: InsightApiResponse) => void;
  onCancel: () => void;
}

export default function RequestForm({ userId, userName, onSubmit, onCancel }: RequestFormProps) {
  const [request, setRequest] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 640 }}>
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
              onSubmit(response);
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy || request.trim().length === 0}
        >
          {busy ? "Reading…" : "Generate read"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
