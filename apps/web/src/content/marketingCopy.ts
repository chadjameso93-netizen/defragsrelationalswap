export interface HeroCopy {
  kicker: string;
  title: string;
  description: string;
  quietNote: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface OutputVisibilityCopy {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface CoreValueCopy {
  kicker: string;
  title: string;
  description: string;
  coreValueBullets: string[];
  productOfferingTitle: string;
  productOfferingBullets: string[];
  capabilitiesTitle: string;
  capabilities: string[];
}

export interface UseCasesCopy {
  kicker: string;
  title: string;
  intro: string;
  cases: string[];
}

export interface HowItWorksCopy {
  kicker: string;
  title: string;
  intro: string;
  steps: Array<{ label: string; body: string }>;
}

export interface ProductSystemCopy {
  kicker: string;
  title: string;
  intro: string;
  systemBullets: string[];
}

export interface AboutCopy {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{ title: string; body: string }>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClosingCtaCopy {
  kicker: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface MarketingCopy {
  hero: HeroCopy;
  outputVisibility: OutputVisibilityCopy;
  coreValue: CoreValueCopy;
  useCases: UseCasesCopy;
  howItWorks: HowItWorksCopy;
  productSystem: ProductSystemCopy;
  about: AboutCopy;
  faq: FaqItem[];
  closingCta: ClosingCtaCopy;
}

export const marketingCopy: MarketingCopy = {
  hero: {
    kicker: "Relational intelligence for real life",
    title: "The tool you reach for before replying.",
    description:
      "See why it felt one way to you — and another way to them.",
    quietNote: "Plain-language guidance • anti-stigma framing • built for real conversations",
    primaryCtaLabel: "Open Defrag",
    primaryCtaHref: "/enter",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "/studio#how-it-works",
  },
  outputVisibility: {
    kicker: "What Defrag actually gives you",
    title: "Clear reads you can use right away.",
    description:
      "You get concrete guidance for one real moment, not generic advice.",
    bullets: [
      "What may have gone wrong in the interaction.",
      "How each side may be reading the same moment differently.",
      "A grounded next step in words you can actually use.",
    ],
  },
  coreValue: {
    kicker: "For the moments you do not want to get wrong",
    title: "What Defrag helps you do",
    description:
      "Defrag helps you slow down, read the dynamic, and respond with more clarity before things escalate.",
    coreValueBullets: [
      "Name what happened without blame language.",
      "Compare your interpretation with what the other person may have heard.",
      "Choose a next move that protects the relationship and your boundaries.",
    ],
    productOfferingTitle: "Why Defrag feels different",
    productOfferingBullets: [
      "Built for everyday communication, not just crisis moments.",
      "Anti-stigma language that stays concrete and respectful.",
      "Focused outputs for one conversation at a time.",
    ],
    capabilitiesTitle: "Built for moments like these",
    capabilities: [
      "A text thread that suddenly felt tense",
      "A family conversation you do not want to mishandle",
      "A partner exchange where both people feel misunderstood",
      "A work interaction where tone and intent got crossed",
      "A recurring pattern you want to interrupt earlier",
    ],
  },
  useCases: {
    kicker: "How Defrag works",
    title: "One product. Multiple layers of clarity.",
    intro: "Use Defrag before you reply, when the next sentence could either calm things down or make them worse.",
    cases: [
      "Layer 1: Clarify what happened and where it turned.",
      "Layer 2: Compare perspectives so you can see both sides of the moment.",
      "Layer 3: Choose one practical next step and wording path.",
      "Layer 4: Return later and track patterns over time.",
    ],
  },
  howItWorks: {
    kicker: "How it works",
    title: "Simple flow. Real-world decisions.",
    intro:
      "Defrag is designed to keep you oriented: bring the moment, review the read, then leave with one next move.",
    steps: [
      {
        label: "Bring the moment",
        body: "Share what happened in plain language, with enough context to understand the interaction.",
      },
      {
        label: "See both sides",
        body: "Review how it likely landed for you and how it may have landed for them.",
      },
      {
        label: "Choose your next move",
        body: "Leave with wording and action guidance you can use in your next message or conversation.",
      },
    ],
  },
  productSystem: {
    kicker: "Product clarity",
    title: "One voice from preview to workspace.",
    intro:
      "Public pages and product flows use the same plain-language framing so you always know what to do next.",
    systemBullets: [
      "Marketing CTAs: Learn more and See how it works.",
      "Account CTAs: Sign in and Create account.",
      "Product CTAs: Open Defrag and Open workspace.",
    ],
  },
  about: {
    eyebrow: "About Defrag",
    title: "Defrag helps you handle hard conversations before they spiral.",
    description:
      "We built Defrag for everyday communication moments where clarity matters more than speed.",
    sections: [
      {
        title: "What Defrag does",
        body: "Defrag helps you understand what happened, how it may have landed on both sides, and what to do next.",
      },
      {
        title: "How Defrag reads a moment",
        body: "You bring the exchange and context. Defrag returns a plain-language read of where tension rose, where meaning split, and what response is most likely to help.",
      },
      {
        title: "What the workspace returns",
        body: "The workspace returns practical guidance: what may have been misread, what each person may need, and a grounded next move.",
      },
      {
        title: "Who it is built for",
        body: "People navigating family, partnership, friendship, and work conversations where one response can change the direction of the relationship.",
      },
      {
        title: "What it is not",
        body: "Defrag is not therapy, diagnosis, or crisis care. It is a communication clarity tool for better everyday relational decisions.",
      },
    ],
  },
  faq: [
    {
      question: "Is Defrag therapy or diagnosis?",
      answer:
        "No. Defrag is a communication clarity tool. It does not provide diagnosis or replace professional support.",
    },
    {
      question: "Who is Defrag for?",
      answer:
        "Anyone trying to respond better in high-stakes personal or professional conversations.",
    },
    {
      question: "What do I get after a field read?",
      answer:
        "You get a plain-language breakdown of what happened, how it may have landed on each side, and one concrete next step.",
    },
  ],
  closingCta: {
    kicker: "Ready when you are",
    title: "Bring one moment. Leave with a clearer next step.",
    description: "Open Defrag before your next reply and move forward with steadier language.",
    primaryCtaLabel: "Open Defrag",
    primaryCtaHref: "/enter",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "/studio#how-it-works",
  },
};
