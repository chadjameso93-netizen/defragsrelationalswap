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
      accent="#22d3ee"
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
