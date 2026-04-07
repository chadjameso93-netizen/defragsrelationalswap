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
    <PublicPageShell
      eyebrow="Privacy"
      title="Privacy should be clear and easy to understand."
      description="This page explains what Defrag uses, why it uses it, and how your account stays protected."
    >
      <section className="public-card public-legal-grid" style={{ padding: "1.25rem" }}>
        {scenes.map((section, index) => (
          <article key={section.title} className="public-legal-row">
            <p className="public-eyebrow" style={{ marginTop: "0.3rem" }}>P{index + 1}</p>
            <div className="public-stack-sm">
              <h2 className="public-title-sm">{section.title}</h2>
              <p className="public-body public-muted">{section.body}</p>
            </div>
          </article>
        ))}
      </section>
    </PublicPageShell>
  );
}
