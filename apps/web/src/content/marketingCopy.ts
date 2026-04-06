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
    kicker: "Defrag Studio",
    title: "See what is happening between people.",
    description:
      "Defrag turns difficult relationship moments into calm, plain-language field reads so you can decide what to do next with steadiness.",
    quietNote: "Built for emotional safety • plain-language first • desktop + mobile",
    primaryCtaLabel: "Open Defrag",
    primaryCtaHref: "/enter",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "/studio#how-it-works",
  },
  outputVisibility: {
    kicker: "Output visibility",
    title: "Readable outputs you can actually use.",
    description:
      "Defrag returns structured outputs that make live dynamics easier to understand before you act.",
    bullets: [
      "What may be happening between each person in the moment.",
      "Where pressure changed and what may be getting misread.",
      "One grounded next move in language you can use immediately.",
    ],
  },
  coreValue: {
    kicker: "Core value",
    title: "Relational intelligence without shame language.",
    description:
      "Defrag helps people get clearer without reducing anyone to a label. The system is anti-stigma, plain-language, and designed to protect dignity.",
    coreValueBullets: [
      "Calm framing over escalation.",
      "Perspective comparison instead of one-sided certainty.",
      "Actionable next steps over generic advice.",
    ],
    productOfferingTitle: "Product offering",
    productOfferingBullets: [
      "Studio flow for baseline, live field reading, and next step planning.",
      "Structured workspace outputs built for one conversation at a time.",
      "Consistent access path from public pages into the app.",
    ],
    capabilitiesTitle: "Capabilities",
    capabilities: [
      "Personal pattern analysis",
      "1:1 interaction analysis",
      "Multi-person system analysis",
      "Perspective comparison",
      "Structured next-step guidance",
    ],
  },
  useCases: {
    kicker: "Use cases",
    title: "Built for real moments, not abstract theory.",
    intro: "Use Defrag when a conversation matters and you need clarity before your next move.",
    cases: [
      "Family conflict where care is present but communication is strained.",
      "Partnership moments where both people feel misunderstood.",
      "Team interactions where pressure shifts are hard to name.",
      "Recurring dynamics where one pattern keeps replaying.",
    ],
  },
  howItWorks: {
    kicker: "How it works",
    title: "From baseline to live field in one coherent rhythm.",
    intro:
      "The product flow is designed to reduce noise: establish context, read the interaction, then leave with one clear step.",
    steps: [
      {
        label: "Baseline",
        body: "Start with a short baseline so Defrag can read how pressure may land for you.",
      },
      {
        label: "Field read",
        body: "Open one live relationship moment and compare how each side may be reading it.",
      },
      {
        label: "Next move",
        body: "Leave with one concrete next step that protects dignity and lowers distortion.",
      },
    ],
  },
  productSystem: {
    kicker: "Product system",
    title: "One product language across public, studio, and workspace.",
    intro:
      "Defrag keeps the same tone and structure across touchpoints so people can stay oriented from preview to action.",
    systemBullets: [
      "Consistent CTA language across public pages.",
      "Reusable marketing sections powered by one copy source.",
      "No changes to billing behavior or workspace logic in this release.",
    ],
  },
  about: {
    eyebrow: "About Defrag",
    title: "Defrag is a relational reasoning system for difficult interactions.",
    description:
      "We help people make high-pressure moments readable so better decisions are more possible.",
    sections: [
      {
        title: "What Defrag does",
        body: "Defrag turns a difficult interaction into structured relational analysis. It helps you understand what may be happening, how each side may be reading the moment, where pressure changed, and what move makes sense next.",
      },
      {
        title: "How the system reads a moment",
        body: "You bring the exchange, the people involved, and the context that matters. Defrag evaluates the interaction, compares perspective, reads pressure and timing, and returns a clearer view of the dynamic instead of only reflecting one narrator's story.",
      },
      {
        title: "What the workspace returns",
        body: "The workspace returns structured outputs such as what may be happening, what may be getting misread, where pressure changed, what pattern is forming, and what wording or next step is most likely to help.",
      },
      {
        title: "Who it is built for",
        body: "Defrag can be used for one person's recurring patterns, two-person interactions, family systems, team systems, and broader relational structures where tension and communication move across more than one participant.",
      },
      {
        title: "What it is not",
        body: "Defrag is not diagnosis, not generic advice, and not a replacement for professional support. It is a relational intelligence system built to make difficult interactions more readable and better decisions more possible.",
      },
    ],
  },
  faq: [
    {
      question: "Is Defrag therapy or diagnosis?",
      answer:
        "No. Defrag is a relational intelligence tool for clarity and next-step planning. It does not provide diagnosis or replace professional support.",
    },
    {
      question: "Who is Defrag for?",
      answer:
        "People navigating difficult family, partnership, or team dynamics who want plain-language insight before they act.",
    },
    {
      question: "What do I get after a field read?",
      answer:
        "You get a structured read of what may be happening, where pressure changed, and one grounded next move.",
    },
  ],
  closingCta: {
    kicker: "Start when you are ready",
    title: "Open one relationship moment clearly.",
    description: "Step into the studio flow and leave with a calmer next move.",
    primaryCtaLabel: "Open Defrag",
    primaryCtaHref: "/enter",
    secondaryCtaLabel: "See how it works",
    secondaryCtaHref: "/studio#how-it-works",
  },
};
