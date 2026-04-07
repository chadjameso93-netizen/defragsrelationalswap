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
    <PublicPageShell eyebrow="Privacy" title="Privacy should be clear and easy to understand." description="This page explains what Defrag uses, why it uses it, and how your account stays protected.">
      <LegalTextScene sections={sections} />
      <ClosingScene
        title="Questions about privacy?"
        body="Review terms or contact support before using the workspace with sensitive scenarios."
        primaryCta={{ href: "/terms", label: "Read terms" }}
      />
    </PublicPageShell>
  );
}
