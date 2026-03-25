import Link from "next/link";

export default function UpgradePanel() {
  return (
    <section
      style={{
        display: "grid",
        gap: 12,
        padding: 20,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background:
          "linear-gradient(180deg, var(--color-surface-hover) 0%, rgba(255,255,255,0.015) 100%)",
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
          Upgrade for deeper insights
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--color-text-primary)" }}>
          Paid access unlocks stored insight history, multi-angle guidance, and the fuller reflection flow.
        </p>
      </div>
      <Link
        href="/account/billing"
        style={{
          width: "fit-content",
          textDecoration: "none",
          color: "var(--color-bg)",
          background: "#f4f4f5",
          borderRadius: "var(--radius-pill)",
          padding: "10px 16px",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Open billing
      </Link>
    </section>
  );
}
