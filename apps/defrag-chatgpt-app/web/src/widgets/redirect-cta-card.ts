import { renderWidgetPage } from "./base";

export function renderRedirectCtaCard() {
  return renderWidgetPage({
    kicker: "Billing",
    title: "Continue on defrag.app",
    summary: "Checkout and billing management stay canonical on DEFRAG’s website.",
    bullets: [
      "Use at most one upgrade CTA inline.",
      "Do not recreate the billing UI inside ChatGPT.",
    ],
    actions: [
      { label: "Open Billing", url: "https://defrag.app/account/billing" },
    ],
  });
}

