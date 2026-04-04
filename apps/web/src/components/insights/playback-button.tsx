import React from "react";

interface PlaybackButtonProps {
  text?: string;
  onClick?: () => void;
}

export default function PlaybackButton({ text = "Hear this", onClick }: PlaybackButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-accent)",
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: 0.01,
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.03)",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
        outline: "none",
        minWidth: 90,
        margin: "0 0 0 2px"
      }}
      aria-label={text}
      tabIndex={0}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
        <circle cx="9" cy="9" r="8.5" stroke="var(--color-accent)" strokeOpacity="0.5" />
        <polygon points="7,6 13,9 7,12" fill="var(--color-accent)" />
      </svg>
      {text}
    </button>
  );
}

