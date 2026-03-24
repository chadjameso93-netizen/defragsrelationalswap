import Link from "next/link";

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#f5f5f5",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 780, display: "grid", gap: 20 }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#71717a" }}>
          DEFRAG
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1.05 }}>
          Calm structure for relationship clarity.
        </h1>
        <p style={{ margin: 0, color: "#a1a1aa", lineHeight: 1.7 }}>
          Companion helps you reflect on one moment at a time using a non-diagnostic, uncertainty-aware format.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <Link
            href="/companion"
            style={{ padding: "10px 14px", borderRadius: 10, background: "#f5f5f5", color: "#050505", textDecoration: "none", fontWeight: 600 }}
          >
            Open Companion
          </Link>
          <Link
            href="/account/billing"
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", color: "#f5f5f5", textDecoration: "none" }}
          >
            Billing
          </Link>
          <Link
            href="/world"
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", color: "#f5f5f5", textDecoration: "none" }}
          >
            World alpha
          </Link>
        </div>
      </div>
    </main>
  );
}
