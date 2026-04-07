import { ClosingScene, LegalTextScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

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
