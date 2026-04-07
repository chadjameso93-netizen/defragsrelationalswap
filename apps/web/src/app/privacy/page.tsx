import { ClosingScene, LegalTextScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const scenes = [
  {
    title: "What we collect",
    body: "We collect the information required to run your account and deliver your workspace experience: sign-in details, product activity, and plan state.",
  },
  {
    title: "How we use it",
    body: "We use this information to authenticate access, save your ongoing work, generate product outputs, and keep core account functionality stable.",
  },
  {
    title: "Billing information",
    body: "Paid subscriptions are processed through Defrag and our payment providers. Billing data is used for subscription operations, invoices, and account changes.",
  },
  {
    title: "Security and control",
    body: "We apply authentication, access controls, and operational safeguards to reduce misuse. You control what you enter, keep, and share inside your account.",
  },
];

export default function PrivacyPage() {
  return (
    <AppShell
      eyebrow="Privacy"
      title="Privacy should be clear and easy to understand."
      description="This page explains what Defrag uses, why it uses it, and how your account stays protected."
      accent="var(--color-accent)"
    >
      <section style={{ maxWidth: 1120, display: "grid", gridTemplateColumns: "220px minmax(0,1fr)", gap: 48 }} className="privacy-grid" aria-labelledby="privacy-section-heading">
        <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
            What this page explains
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.52)" }}>
            What Defrag uses to run the product, why that information matters, and how access stays controlled.
          </p>
        </aside>

        <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }} role="list" aria-label="Privacy sections">
          <h2 id="privacy-section-heading" style={{ position: "absolute", left: "-9999px" }}>Privacy sections</h2>
          {sections.map((section) => (
            <article key={section.title} role="listitem" style={{ display: "grid", gridTemplateColumns: "20px 70px minmax(0,1fr)", gap: 16, paddingTop: 22, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.36)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }} aria-hidden="true">P</div>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.3)", fontWeight: 600, letterSpacing: "0.1em" }}>{section.number}</div>
              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 500, color: "white", lineHeight: 1.08 }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", lineHeight: 1.8, fontSize: 16, fontWeight: 300, maxWidth: 760 }}>
                  {section.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .privacy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
