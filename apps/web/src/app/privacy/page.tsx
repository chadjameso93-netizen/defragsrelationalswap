import { AppShell } from "../../components/app-shell";

const sections = [
  {
    title: "What we collect",
    body: "Defrag uses the information you provide, your account details, and your plan status to keep your workspace running and deliver the product experience.",
  },
  {
    title: "How we use it",
    body: "We use your information to support sign-in, save your workspace, deliver insights, and keep your account working as expected.",
  },
  {
    title: "Billing",
    body: "Payments and subscription changes are handled through Defrag and our payment provider. Billing details are used only to process and manage your plan.",
  },
  {
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
      accent="#22d3ee"
    >
      <div style={{ maxWidth: 760, display: "grid", gap: 48 }}>
        {sections.map((section, i) => (
          <div key={section.title} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "rgba(245,245,245,0.3)", fontWeight: 500 }}>{String(i + 1).padStart(2, "0")}</span>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "white" }}>{section.title}</h2>
            </div>
            <p style={{ margin: 0, paddingLeft: 32, color: "rgba(245,245,245,0.65)", lineHeight: 1.8, fontSize: 16, fontWeight: 300 }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
