export const DEFRAG_GOLDEN_PROMPTS = {
  direct: [
    {
      prompt: "Use DEFRAG to help me figure out what may be happening after a missed callback and tell me what to try next.",
      expectedTool: "get_dynamics_guidance",
      expectedOutcome: "Dynamics guidance returns a concise summary, next move, timing signal, and grounded uncertainty.",
    },
    {
      prompt: "Generate a DEFRAG relationship insight about a criticism-defensiveness loop.",
      expectedTool: "generate_relationship_insight",
      expectedOutcome: "Insight tool returns structured relationship framing plus three next steps without diagnosis or fixed labels.",
    },
    {
      prompt: "Interpret this world signal in DEFRAG and tell me the repair window.",
      expectedTool: "interpret_world_signal",
      expectedOutcome: "World tool returns pattern, pressure level, repair window, and next moves.",
    },
    {
      prompt: "What does my DEFRAG plan include right now?",
      expectedTool: "get_account_entitlements",
      expectedOutcome: "Entitlement tool returns current plan, status, and entitlement flags.",
    },
  ],
  indirect: [
    {
      prompt: "I need a calmer summary of what may be happening with us before I text them back.",
      expectedTool: "get_dynamics_guidance",
      expectedOutcome: "Dynamics tool is preferred over insight because the user wants immediate moment guidance.",
    },
    {
      prompt: "Can you turn this relationship situation into a short insight I can review later?",
      expectedTool: "generate_relationship_insight",
      expectedOutcome: "Insight tool is preferred because the user asks for a durable, reviewable summary.",
    },
    {
      prompt: "I mapped the scene already. Which part of the field is carrying the most charge?",
      expectedTool: "interpret_world_signal",
      expectedOutcome: "World tool is preferred because the prompt is about scene interpretation, not a conversation reply.",
    },
    {
      prompt: "Show me whether my current DEFRAG tier covers Insights yet.",
      expectedTool: "get_account_entitlements",
      expectedOutcome: "Entitlement tool returns plan and studio access status.",
    },
  ],
  redirect: [
    {
      prompt: "Upgrade my DEFRAG account.",
      expectedTool: "begin_upgrade_checkout",
      expectedOutcome: "Redirect tool returns checkout CTA on defrag.app.",
    },
    {
      prompt: "Take me to my DEFRAG billing portal.",
      expectedTool: "open_billing_portal",
      expectedOutcome: "Redirect tool returns billing portal CTA on defrag.app.",
    },
    {
      prompt: "I need to manage my DEFRAG subscription, not get more guidance.",
      expectedTool: "open_billing_portal",
      expectedOutcome: "Billing portal redirect is preferred over account entitlements because the user intent is management.",
    },
  ],
  ambiguous: [
    {
      prompt: "I need help deciding what to say next after a tense exchange.",
      expectedTool: "get_dynamics_guidance",
      expectedOutcome: "Dynamics is preferred because the user is asking for the next move, not a durable artifact.",
    },
    {
      prompt: "Help me understand whether this means they are avoidant, and tell me what to do next.",
      expectedTool: "get_dynamics_guidance",
      expectedOutcome: "Dynamics should reframe away from fixed labels and return grounded next-step guidance.",
    },
    {
      prompt: "I want something I can save and revisit after this conversation settles.",
      expectedTool: "generate_relationship_insight",
      expectedOutcome: "Insight is preferred because the user wants a structured artifact rather than live coaching.",
    },
    {
      prompt: "Can DEFRAG tell me whether I should upgrade for better insight tools?",
      expectedTool: "get_account_entitlements",
      expectedOutcome: "Entitlement check is preferred before any billing redirect.",
    },
  ],
  negative: [
    {
      prompt: "Write a generic poem about spring.",
      expectedTool: null,
      expectedOutcome: "No DEFRAG tool should be used.",
    },
    {
      prompt: "Debug my Next.js image optimization config.",
      expectedTool: null,
      expectedOutcome: "No DEFRAG tool should be used.",
    },
    {
      prompt: "Tell me the capital of Belgium.",
      expectedTool: null,
      expectedOutcome: "No DEFRAG tool should be used.",
    },
    {
      prompt: "Draft a meal plan for four days.",
      expectedTool: null,
      expectedOutcome: "No DEFRAG tool should be used.",
    },
    {
      prompt: "Summarize the plot of Dune.",
      expectedTool: null,
      expectedOutcome: "No DEFRAG tool should be used.",
    },
  ],
} as const;
