import { AppShell } from "../../components/app-shell";

const sections = [
  {
    title: "Use of the service",
    body: "DEFRAG provides interpretive guidance and account-linked product features. It is not emergency support, legal advice, medical advice, or a substitute for licensed clinical care.",
  },
  {
    title: "Accounts and access",
    body: "Your DEFRAG account is the canonical access point for website and integration-linked usage. You are responsible for maintaining the security of your sign-in credentials and any linked sessions.",
  },
  {
    title: "Subscriptions and billing",
    body: "All subscription, checkout, upgrade, and billing-portal actions are owned by DEFRAG on defrag.app. Third-party integration surfaces may initiate redirects, but they do not become billing owners.",
  },
  {
    title: "Acceptable use",
    body: "You may not misuse the product, attempt to bypass authentication or entitlements, interfere with service operation, or use DEFRAG in ways that violate applicable law or the rights of others.",
  },
];

export default function TermsPage() {
  return (
    <AppShell
      eyebrow="Terms"
      title="Terms that keep ownership and responsibility clear."
      description="The public website remains the owner of account, billing, and legal responsibility. Integration surfaces extend DEFRAG but do not replace the canonical product relationship."
      accent="rgba(245, 245, 245, 0.5)"
    >
      <div style={{ maxWidth: 720, display: "grid", gap: 64 }}>
        {sections.map((section, i) => (
          <div key={section.title} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ fontSize: 12, color: "rgba(245,245,245,0.3)", fontWeight: 500 }}>{String(i + 1).padStart(2, "0")}</span>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "white" }}>{section.title}</h2>
            </div>
            <p style={{ margin: 0, paddingLeft: 36, color: "rgba(245,245,245,0.65)", lineHeight: 1.8, fontSize: 16, fontWeight: 300 }}>
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
