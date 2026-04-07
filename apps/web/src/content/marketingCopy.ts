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
  items: Array<{ title: string; body: string }>;
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
  steps: Array<{ label: string; body: string }>;
}

export interface ProofBlockCopy {
  kicker: string;
  title: string;
  happenedLabel: string;
  happenedBody: string;
  readsLabel: string;
  readsYou: string;
  readsThem: string;
  nextMoveLabel: string;
  nextMoveBody: string;
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
  proofBlock: ProofBlockCopy;
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
    quietNote: "Quiet clarity for loaded conversations",
    primaryCtaLabel: "Open Defrag",
    primaryCtaHref: "/enter",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "/studio#how-it-works",
  },
  outputVisibility: {
    kicker: "What you get",
    title: "Three clear reads in one pass.",
    items: [
      {
        title: "What went wrong",
        body: "Pinpoint the turn without blame language.",
      },
      {
        title: "How it landed",
        body: "See your intent beside their likely read.",
      },
      {
        title: "What to do next",
        body: "Leave with wording you can actually send.",
      },
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
    title: "Simple flow. Better decisions.",
    steps: [
      {
        label: "Bring the moment",
        body: "Drop in the exchange that needs a steadier reply.",
      },
      {
        label: "See the read",
        body: "Review what likely happened for you and for them.",
      },
      {
        label: "Leave with a next move",
        body: "Take one practical step you can use immediately.",
      },
    ],
  },
  proofBlock: {
    kicker: "Interaction preview",
    title: "A compact read that changes the next line.",
    happenedLabel: "What happened",
    happenedBody: "A conversation turned tense after a short reply.",
    readsLabel: "What each side may be reading",
    readsYou: "You were trying to stay steady.",
    readsThem: "They may have felt distance.",
    nextMoveLabel: "Next move",
    nextMoveBody: "Lead with acknowledgment before explanation.",
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
    kicker: "Final step",
    title: "Bring one moment. Leave with a clearer next step.",
    description: "Start with one exchange and leave with language you trust.",
    primaryCtaLabel: "Open Defrag",
    primaryCtaHref: "/enter",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "/studio#how-it-works",
  },
};
