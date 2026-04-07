import { ClosingScene, LegalTextScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const sections = [
  {
    number: "01",
    title: "Using Defrag",
    body: "Defrag helps you think through difficult interactions more clearly. It is not emergency support, legal advice, medical advice, or a substitute for licensed care.",
  },
  {
    number: "02",
    title: "Accounts",
    body: "You are responsible for keeping your sign-in method secure and for using your account in a lawful and respectful way.",
  },
  {
    number: "03",
    title: "Plans and billing",
    body: "If you choose a paid plan, billing and subscription changes are handled through Defrag and our payment provider.",
  },
  {
    number: "04",
    title: "Acceptable use",
    body: "You may not misuse the product, interfere with the service, try to bypass access controls, or use Defrag in a way that harms others or breaks the law.",
  },
];

export default function TermsPage() {
  return (
    <PublicPageShell eyebrow="Terms" title="Terms should be straightforward." description="These terms explain the core rules for using Defrag, keeping your account secure, and managing paid access.">
      <LegalTextScene sections={sections} />
      <ClosingScene
        title="Need policy details before signing up?"
        body="Review privacy and terms pages as part of every new account flow."
        primaryCta={{ href: "/privacy", label: "Read privacy" }}
      />
    </PublicPageShell>
  );
}
