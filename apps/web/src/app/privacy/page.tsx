import { AppShell } from "../../components/app-shell";

const sections = [
  {
    title: "Data used for the service",
    body: "DEFRAG uses account information, subscription state, and the guidance inputs you provide in order to deliver the website product and any connected MCP or ChatGPT service flows.",
  },
  {
    title: "Canonical account owner",
    body: "defrag.app is the canonical owner of your account relationship. Integration surfaces may receive scoped access through DEFRAG-owned auth flows, but account state and billing remain on the main site.",
  },
  {
    title: "Billing and payment data",
    body: "Checkout and billing portal flows are routed through DEFRAG-owned billing surfaces. Payment processing is handled through Stripe-backed flows on the canonical website.",
  },
  {
    title: "Security and access",
    body: "Access to protected DEFRAG capabilities is controlled through DEFRAG-owned authentication, signed tokens where applicable, and plan-based entitlement checks tied to canonical account state.",
  },
];

export default function PrivacyPage() {
  return (
    <AppShell
      eyebrow="Privacy"
      title="Privacy stays attached to the canonical DEFRAG account."
      description="The website on defrag.app remains the trust and policy surface for account access, billing, and integration-linked usage."
      accent="var(--color-accent)"
    >
      <section
        style={{
          display: "grid",
          gap: 18,
          padding: 22,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        {sections.map((section) => (
          <div key={section.title} style={{ display: "grid", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>{section.title}</h2>
            <p style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
              {section.body}
            </p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
