import { AppShell } from "../../components/app-shell";

const sections = [
  {
    number: "01",
    title: "What we collect",
    body: "Defrag uses the information you provide, your account details, and your plan status to keep your workspace running and deliver the product experience.",
  },
  {
    number: "02",
    title: "How we use it",
    body: "We use your information to support sign-in, save your workspace, deliver insights, and keep your account working as expected.",
  },
  {
    number: "03",
    title: "Billing",
    body: "Payments and subscription changes are handled through Defrag and our payment provider. Billing details are used only to process and manage your plan.",
  },
  {
    number: "04",
    title: "Security and control",
    body: "We use authentication, access controls, and plan checks to protect your account. You control what you choose to keep, use, and share.",
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
      <div style={{ maxWidth: 1120, display: "grid", gridTemplateColumns: "220px minmax(0,1fr)", gap: 48 }} className="privacy-grid">
        <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,245,0.38)" }}>
            What this page explains
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.72, color: "rgba(245,245,245,0.52)" }}>
            What Defrag uses to run the product, why that information matters, and how access stays controlled.
          </p>
        </aside>

        <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {sections.map((section) => (
            <div key={section.title} style={{ display: "grid", gridTemplateColumns: "70px minmax(0,1fr)", gap: 16, paddingTop: 22, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "rgba(245,245,245,0.3)", fontWeight: 600, letterSpacing: "0.1em" }}>{section.number}</div>
              <div style={{ display: "grid", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 500, color: "white", lineHeight: 1.08 }}>
                  {section.title}
                </h2>
                <p style={{ margin: 0, color: "rgba(245,245,245,0.64)", lineHeight: 1.8, fontSize: 16, fontWeight: 300, maxWidth: 760 }}>
                  {section.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .privacy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  );
}
