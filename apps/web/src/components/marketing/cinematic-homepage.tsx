import { marketingCopy } from "../../content/marketingCopy";
import { ClosingCtaSection } from "./ClosingCtaSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { OutputVisibilitySection } from "./OutputVisibilitySection";
import { ProofBlockSection } from "./ProofBlockSection";
import { PublicMarketingShell } from "./public-marketing-shell";

export function CinematicHomepage() {
  return (
    <PublicMarketingShell>
      <HeroSection copy={marketingCopy.hero} />
      <OutputVisibilitySection copy={marketingCopy.outputVisibility} />
      <HowItWorksSection copy={marketingCopy.howItWorks} />
      <ProofBlockSection copy={marketingCopy.proofBlock} />
      <ClosingCtaSection copy={marketingCopy.closingCta} />
    </PublicMarketingShell>
  );
}
