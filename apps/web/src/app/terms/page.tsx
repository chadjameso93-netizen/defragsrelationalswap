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
      accent="#d8c49f"
    >
      <section
        style={{
          display: "grid",
          gap: 18,
          padding: 22,
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        {sections.map((section) => (
          <div key={section.title} style={{ display: "grid", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>{section.title}</h2>
            <p style={{ margin: 0, color: "rgba(245,245,245,0.72)", lineHeight: 1.8 }}>
              {section.body}
            </p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
