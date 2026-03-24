import Link from "next/link";

export default function UpgradePanel() {
  return (
    <section
      style={{
        display: "grid",
        gap: 12,
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71717a" }}>
          Upgrade for deeper insights
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#f5f5f5" }}>
          Paid access unlocks stored insight history, multi-angle guidance, and the fuller reflection flow.
        </p>
      </div>
      <Link
        href="/account/billing"
        style={{
          width: "fit-content",
          textDecoration: "none",
          color: "#050505",
          background: "#f4f4f5",
          borderRadius: 999,
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
