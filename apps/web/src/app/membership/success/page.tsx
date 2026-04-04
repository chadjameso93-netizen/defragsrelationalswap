import Link from "next/link";

export default function MembershipSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#f5f2ec", display: "grid", placeItems: "center", padding: 22 }}>
      <style>{`
        .success-card { width:min(760px, 100%); border:1px solid rgba(255,255,255,0.08); background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)); padding:28px; display:grid; gap:18px; }
        .success-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(245,242,236,0.42); }
        .success-title { font-size:46px; line-height:0.96; font-family:var(--font-display), serif; }
        .success-muted { color:rgba(245,242,236,0.62); line-height:1.72; }
        .success-btn { display:inline-flex; align-items:center; justify-content:center; text-decoration:none; padding:13px 16px; font-weight:600; }
        .success-btn.primary { background:#f5f2ec; color:#050505; }
        .success-btn.secondary { border:1px solid rgba(255,255,255,0.1); color:#f5f2ec; }
      `}</style>

      <section className="success-card">
        <div className="success-kicker">Membership active</div>
        <div className="success-title">You’re ready to continue</div>
        <div className="success-muted">
          This page can become the Stripe success redirect target. From here, users can either complete their baseline intake first or move straight into the relationship workspace.
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="success-btn primary" href="/intake">Continue to intake</Link>
          <Link className="success-btn secondary" href="/workspace/final">Open workspace</Link>
          <Link className="success-btn secondary" href="/workspace/mobile">Open mobile workspace</Link>
        </div>
      </section>
    </main>
  );
}
