import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";

export default async function AppHomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="app-shell">
      <style>{`
        /* ===== DEFRAG PREMIUM APP DASHBOARD ===== */
        .app-shell {
          min-height: 100vh;
          background:
            radial-gradient(1200px 680px at 15% 8%, rgba(214, 195, 161, 0.11), transparent 62%),
            radial-gradient(900px 600px at 85% 45%, rgba(108, 99, 255, 0.07), transparent 58%),
            radial-gradient(1100px 720px at 50% 92%, rgba(214, 195, 161, 0.06), transparent 66%),
            linear-gradient(162deg, #080808 0%, #0a0a0a 42%, #050505 100%);
          color: #f5f2ec;
          position: relative;
          padding: clamp(20px, 3.5vw, 48px) clamp(18px, 4vw, 56px) 80px;
        }

        /* Ambient grid overlay */
        .app-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(245, 242, 236, 0.014) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.014) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .app-content {
          width: min(1320px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          gap: 32px;
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .app-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .app-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #f5f2ec;
        }

        .app-logo-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(214, 195, 161, 0.9), rgba(214, 195, 161, 0.5));
          box-shadow: 0 0 24px rgba(214, 195, 161, 0.4);
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .app-logo-text {
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          opacity: 0.85;
        }

        .app-user {
          font-size: 14px;
          color: rgba(245, 242, 236, 0.68);
        }

        .app-hero {
          padding: clamp(32px, 5vw, 64px) 0;
          text-align: left;
        }

        .app-kicker {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.48);
          font-weight: 600;
          margin-bottom: 16px;
        }

        .app-title {
          font-size: clamp(2.8rem, 6vw, 5.2rem);
          line-height: 0.94;
          letter-spacing: -0.04em;
          font-family: var(--font-display), serif;
          font-weight: 400;
          margin: 0 0 20px 0;
          max-width: 18ch;
        }

        .app-subtitle {
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.64;
          color: rgba(245, 242, 236, 0.72);
          max-width: 680px;
          margin-bottom: 32px;
        }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
          gap: 22px;
          margin-top: 48px;
        }

        .app-card {
          border: 1px solid rgba(255, 255, 255, 0.09);
          background:
            linear-gradient(168deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.02) 100%),
            rgba(12, 12, 12, 0.64);
          backdrop-filter: blur(18px);
          border-radius: 16px;
          padding: clamp(28px, 4vw, 40px);
          display: grid;
          gap: 16px;
          align-content: start;
          position: relative;
          overflow: hidden;
          transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(165deg, rgba(255, 255, 255, 0.12), transparent 48%, rgba(214, 195, 161, 0.1));
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
          pointer-events: none;
        }

        .app-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 64px rgba(214, 195, 161, 0.16), 0 20px 52px rgba(0, 0, 0, 0.42);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .app-card:hover::before {
          opacity: 0.8;
        }

        .app-card-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.44);
          font-weight: 600;
        }

        .app-card-title {
          font-size: clamp(21px, 3vw, 26px);
          line-height: 1.18;
          letter-spacing: -0.02em;
          font-family: var(--font-display), serif;
          font-weight: 400;
          margin: 0;
        }

        .app-card-desc {
          font-size: 15px;
          line-height: 1.68;
          color: rgba(245, 242, 236, 0.66);
        }

        .app-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          justify-self: start;
          margin-top: 8px;
        }

        .app-card-link-primary {
          background: rgba(255, 255, 255, 0.06);
          color: #f5f2ec;
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(10px);
        }

        .app-card-link-primary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.24);
          transform: translateY(-2px);
        }

        .app-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .app-highlight {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.025);
          border-radius: 14px;
          padding: 20px;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(245, 242, 236, 0.7);
        }

        .app-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(214, 195, 161, 0.14) 50%,
            transparent 100%
          );
          margin: 48px 0;
        }

        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .app-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="app-content">
        <header className="app-header">
          <Link href="/studio" className="app-logo">
            <div className="app-logo-dot" />
            <span className="app-logo-text">DEFRAG studio home</span>
          </Link>
          <div className="app-user">{user.email}</div>
        </header>

        <div className="app-hero">
          <div className="app-kicker">Welcome Back</div>
          <h1 className="app-title">Continue inside the premium DEFRAG flow.</h1>
          <p className="app-subtitle">
            Move from baseline intake into the relationship workspace, then manage
            plans and billing from the same signed-in product surface.
          </p>
        </div>

        <div className="app-grid">
          <div className="app-card">
            <span className="app-card-label">Workspace</span>
            <h3 className="app-card-title">Live field</h3>
            <p className="app-card-desc">
              Open the premium workspace with chat, live field, and guided views.
            </p>
            <Link href="/workspace" className="app-card-link app-card-link-primary">
              Open workspace
            </Link>
          </div>

          <div className="app-card">
            <span className="app-card-label">Baseline</span>
            <h3 className="app-card-title">Intake</h3>
            <p className="app-card-desc">
              Generate or revisit the baseline that feeds the relationship workspace.
            </p>
            <Link href="/intake" className="app-card-link app-card-link-primary">
              Open intake
            </Link>
          </div>

          <div className="app-card">
            <span className="app-card-label">Billing</span>
            <h3 className="app-card-title">Plans</h3>
            <p className="app-card-desc">
              Upgrade, manage your subscription, or open the billing portal.
            </p>
            <Link href="/billing" className="app-card-link app-card-link-primary">
              Open billing
            </Link>
          </div>
        </div>

        <div className="app-divider" />

        <div className="app-highlights">
          <div className="app-highlight">
            Baseline intake and first profile summary
          </div>
          <div className="app-highlight">
            Desktop and mobile relationship workspace
          </div>
          <div className="app-highlight">
            Live billing portal and Stripe checkout
          </div>
          <div className="app-highlight">
            Canonical premium entry flow on the preview branch
          </div>
        </div>
      </div>
    </main>
  );
}
