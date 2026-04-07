import { ClosingScene, LegalTextScene } from "../../components/public/primitives";
import { PublicPageShell } from "../../components/public/page-shell";

const scenes = [
  {
    title: "Using Defrag",
    body: "Defrag supports clearer communication in difficult moments. It is not emergency support, legal advice, medical advice, or a replacement for licensed care.",
  },
  {
    title: "Account responsibility",
    body: "You are responsible for account security and lawful use. Keep your sign-in credentials protected and use the service in good faith.",
  },
  {
    title: "Plans and billing",
    body: "If you subscribe to a paid plan, billing operations and subscription changes are handled through Defrag and our payment infrastructure.",
  },
  {
    title: "Acceptable use",
    body: "You may not misuse the product, attempt to bypass controls, disrupt service integrity, or use Defrag for activity that harms others or violates law.",
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
