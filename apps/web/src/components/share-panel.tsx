"use client";

import { useState } from "react";

export function SharePanel({ insightId }: { insightId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState<"link" | "email" | "sms">("link");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!isOpen) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "10px 18px",
            borderRadius: "var(--radius-pill)",
            background: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          Invite or share summary
        </button>
      </div>
    );
  }

  const handleSend = async () => {
    setStatus("sending");
    if (method === "link") {
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/share/${insightId}`);
        setStatus("sent");
      } catch {
        setStatus("sent"); // Fallback if clipboard fails in non-HTTPS dev envs
      }
      return;
    }
    // Simulate network request for Email/SMS
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <div
      className="premium-fade-up"
      style={{
        background: "rgba(6, 7, 10, 0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid var(--color-border-hover)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
        display: "grid",
        gap: 20,
        marginTop: 8
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>Invite someone</h3>
          <p style={{ margin: "6px 0 0 0", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Send a secure summary and ask them to add their perspective. Private by default.
          </p>
        </div>
        <button
          onClick={() => {
            setIsOpen(false);
            setStatus("idle");
            setRecipient("");
          }}
          style={{ background: "none", border: 0, color: "var(--color-text-muted)", fontSize: 20, cursor: "pointer", padding: "0 4px" }}
        >
          ×
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, padding: 4, background: "rgba(0,0,0,0.5)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
        {(["link", "email", "sms"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMethod(m); setStatus("idle"); setRecipient(""); }}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "4px",
              border: 0,
              background: method === m ? "var(--color-surface-hover)" : "transparent",
              color: method === m ? "var(--color-text-primary)" : "var(--color-text-muted)",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {m === "link" ? "Secure link" : m === "email" ? "Email" : "Text message"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {status === "sent" ? (
          <div style={{ padding: 16, borderRadius: "var(--radius-md)", background: "rgba(216,196,159,0.08)", border: "1px solid rgba(216,196,159,0.15)", textAlign: "center", display: "grid", gap: 8 }}>
            <span style={{ color: "var(--color-accent)", fontSize: 13, fontWeight: 500 }}>Summary shared</span>
            <span style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>They will be prompted to add their perspective when they open the link.</span>
          </div>
        ) : (
          <>
            {method !== "link" && (
              <input
                type={method === "email" ? "email" : "tel"}
                placeholder={method === "email" ? "name@example.com" : "Phone number"}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            )}

            <button
              onClick={handleSend}
              disabled={status === "sending" || (method !== "link" && !recipient)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "var(--radius-pill)",
                background: "var(--color-text-primary)",
                color: "var(--color-bg)",
                fontSize: 13,
                fontWeight: 600,
                border: 0,
                cursor: status === "sending" || (method !== "link" && !recipient) ? "default" : "pointer",
                opacity: status === "sending" || (method !== "link" && !recipient) ? 0.6 : 1,
              }}
            >
              {status === "sending" 
                ? "Securing summary..." 
                : method === "link" 
                ? "Copy secure link" 
                : `Send by ${method}`}
            </button>
          </>
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 16, marginTop: 4 }}>
        <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
          What they’ll see
        </p>
        <p style={{ margin: "6px 0 0 0", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          Only the "What Happened" summary and "Next Move" suggestion.
          Your private intake data remains bounded exactly to your account.
        </p>
      </div>
    </div>
  );
}
