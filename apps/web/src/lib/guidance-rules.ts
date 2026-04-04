export const guidancePhrasing = {
  soften: (text: string) => {
    return text
      .replace(/the system detected/gi, "it seems that")
      .replace(/they are/gi, "they may be feeling")
      .replace(/you are/gi, "you may be experiencing")
      .replace(/you should/gi, "it may help to")
      .replace(/this proves/gi, "this suggests")
      .replace(/pattern identified/gi, "a recurring theme")
      .replace(/traumatized|wounded|disordered|avoidant|narcissistic/gi, "experiencing a complex moment")
      .replace(/diagnosis|clinical|treatment|therapy/gi, "reflection")
      .replace(/proves that/gi, "may suggest that")
      .replace(/always/gi, "at times")
      .replace(/never/gi, "rarely");
  },
  suggestionPrefixes: [
    "This may help",
    "It may be easier if",
    "One way to make this clearer could be",
    "They may be needing",
  ],
  clarityPrompts: [
    "What feels hardest here?",
    "What usually happens next?",
    "What response are you most worried about?",
    "What would feel like a good outcome?",
    "Who else is affected?",
    "What may need more space before this is discussed?",
  ],
  phrasingSuggestions: [
    { original: "You always ignore me", better: "I feel a bit unheard when we don't connect after work." },
    { original: "You need to change", better: "It would mean a lot to me if we could try a different way of handling this." },
    { original: "Why are you like this?", better: "I'm trying to understand what this moment feels like for you." },
    { original: "Everyone is frustrated", better: "I've been feeling some tension in how we're all relating lately." },
  ],
  conversationPrep: [
    "Find a calm moment when neither of you is rushed.",
    "Start with how you're feeling, rather than what they're doing.",
    "Be clear about what you need, but leave space for their side too.",
    "If things feel tense, it's okay to take a break and come back later.",
    "In larger groups, keep the focus on how we all relate together.",
  ],
  otherSideGuidance: [
    "They may need a little more space than usual for a new perspective to settle.",
    "This may land differently than intended if shared while energy is still high.",
    "A soft opening may help them feel it's safe to stay in the conversation.",
    "They may respond more openly if they feel their own core need is being held too.",
    "What feels like resistance may actually be a need for more time to process.",
    "In larger groups, some may need more time to feel it's safe to share their view.",
  ],
  simpleWaysToBegin: [
    { label: "A simple way to begin", text: "I’ve been thinking about how we [action] and I’d like to understand it better with you." },
    { label: "Finding a moment together", text: "It would mean a lot to me if we could find a moment to look at this together, when you’re ready." },
    { label: "Opening it up to everyone", text: "I'd like to talk about how we're all doing together, when everyone has a moment." }
  ]
};

export const guidanceSafetyDisclaimer = "These insights are grounded in general relational principles and are intended for self-reflection. They are not a substitute for professional care, crisis support, or direct knowledge of your situation.";
