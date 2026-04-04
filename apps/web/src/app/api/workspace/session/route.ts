import { NextRequest, NextResponse } from "next/server";

type SessionRequest = {
  message?: string;
  participants?: Array<{
    id: string;
    name: string;
    role?: string;
  }>;
  overlayMode?: "baseline" | "family" | "compare";
};

function buildParticipants(input: SessionRequest) {
  const base = input.participants?.length
    ? input.participants
    : [
        { id: "self", name: "You", role: "self" },
        { id: "other", name: "Other person", role: "other" },
      ];

  return base.map((participant, index) => ({
    id: participant.id,
    name: participant.name,
    role: participant.role ?? (index === 0 ? "self" : "other"),
    current_state: {
      state_label: index === 0 ? "activated" : "guarded",
      expression: index === 0 ? "trying to be understood" : "protecting themselves",
      openness: index === 0 ? 0.46 : 0.31,
      steadiness: index === 0 ? 0.38 : 0.42,
    },
  }));
}

function buildWorkspace(message: string, participants: ReturnType<typeof buildParticipants>) {
  const lower = message.toLowerCase();
  const mentionsFamily = /mom|mother|dad|father|sister|brother|family/.test(lower);
  const mentionsConflict = /fight|argue|conflict|upset|hurt|tension|pull away|misunderstood/.test(lower);

  const summary = mentionsConflict
    ? "This looks like a moment where both people may care about the relationship, but may be reacting in ways that make each other harder to hear."
    : "This looks like a situation where more clarity about what each person means and needs may help.";

  return {
    assistant_message: {
      title: "What may be happening",
      body: summary,
      next_steps: [
        "Slow the exchange down and stay close to what is actually happening right now.",
        "Say what you are hoping for before describing what feels hard.",
        "Keep the next step small enough that the other person can hear it without feeling overwhelmed.",
      ],
    },
    field_update: {
      thread: {
        id: "thread_main",
        title: mentionsFamily ? "Family dynamic" : "Relationship dynamic",
        summary,
      },
      participants,
      dynamics: [
        {
          id: "dynamic_main",
          from: participants[0]?.id ?? "self",
          to: participants[1]?.id ?? "other",
          type: mentionsConflict ? "misunderstanding" : "unclear_expectation",
          intensity: mentionsConflict ? 0.74 : 0.48,
          description: mentionsConflict
            ? "Both sides may be reacting to what something means, not just to what is being said."
            : "This may be more about clarity and timing than about major harm.",
          opening_level: mentionsConflict ? 0.33 : 0.55,
        },
      ],
      field_state: {
        overall_state: mentionsConflict ? "strained" : "unclear",
        dominant_pattern: mentionsConflict
          ? "hurt -> react -> feel more missed"
          : "unclear meaning -> mixed signals -> hesitation",
        readiness_for_repair: mentionsConflict ? 0.41 : 0.58,
      },
      branch_suggestions: [
        { id: "other-side", label: "See from the other side", type: "perspective" },
        { id: "calmer-way", label: "A calmer way to say it", type: "phrasing" },
        ...(mentionsFamily ? [{ id: "family-view", label: "Family view", type: "family" }] : []),
      ],
      visual_state: {
        nodes: participants.map((participant, index) => ({
          id: participant.id,
          label: participant.name,
          role: participant.role,
          x: index === 0 ? 0.33 : index === 1 ? 0.67 : 0.5,
          y: index < 2 ? 0.5 : 0.27,
          size: index === 0 ? 1.12 : 1,
          state: participant.current_state.state_label,
          pulse: index === 0 ? 0.72 : 0.51,
        })),
        edges: [
          {
            from: participants[0]?.id ?? "self",
            to: participants[1]?.id ?? "other",
            weight: mentionsConflict ? 0.81 : 0.52,
            state: mentionsConflict ? "strained" : "unclear",
            animation: mentionsConflict ? "tension-wave" : "soft-pulse",
          },
        ],
      },
    },
    ui_actions: {
      open_branch_threads: mentionsFamily
        ? [{ id: "family-view", label: "Family view" }]
        : [{ id: "other-side", label: "See from the other side" }],
      focus_node_ids: participants.map((participant) => participant.id),
      camera_mode: "fit-active-dynamics",
    },
  };
}

function buildBranch(branchId: string, message: string) {
  switch (branchId) {
    case "other-side":
      return {
        title: "See from the other side",
        body: "The other person may not be reacting to your intent. They may be reacting to what the moment feels like to them. If they already feel guarded, even a reasonable point may land as criticism.",
        suggestions: [
          "Start with what you want to understand, not only what you want to correct.",
          "Name that you are trying to make things clearer, not start another argument.",
          "Keep the first sentence simple so the other person does not have to defend themselves immediately.",
        ],
      };
    case "calmer-way":
      return {
        title: "A calmer way to say it",
        body: "You may get further by describing your experience without deciding the other person’s intent for them.",
        suggestions: [
          "I want to talk about something that keeps feeling hard between us, and I want to do it in a better way.",
          "I’m not trying to blame you. I’m trying to explain what has been hard for me to say clearly.",
          "Can we slow this down a little so we don’t end up in the same place again?",
        ],
      };
    case "family-view":
      return {
        title: "Family view",
        body: "This may be bigger than one conversation. The same pattern may already have a place in the family, and each person may be stepping into a familiar role without meaning to.",
        suggestions: [
          "Notice who becomes the pursuer, who pulls back, and who tries to keep the peace.",
          "Look for what keeps repeating rather than deciding who is the problem.",
          "Ask what would change if one person responded a little differently this time.",
        ],
      };
    default:
      return {
        title: "Focused view",
        body: message || "This branch helps open one side of the situation without losing the main thread.",
        suggestions: ["Stay close to what is actually happening.", "Keep the next move small and clear."],
      };
  }
}

function buildOverlay(mode: SessionRequest["overlayMode"]) {
  switch (mode) {
    case "family":
      return {
        title: "Family overlay",
        body: "This may be touching an older family pattern, not just the current moment. Each person may be stepping into a familiar role without meaning to.",
        cards: [
          {
            label: "What may be repeating",
            value: "One person tries to make things clear, another closes up, and everyone leaves feeling more alone.",
          },
          {
            label: "What could help",
            value: "Slow the pace, keep the first point small, and do not try to solve the whole family pattern in one conversation.",
          },
        ],
      };
    case "compare":
      return {
        title: "Two-person overlay",
        body: "This view helps show how two people may hear the same moment very differently.",
        cards: [
          {
            label: "You may be seeking",
            value: "clarity, honesty, and some sign that the other person understands the weight of the moment.",
          },
          {
            label: "They may be seeking",
            value: "space, safety, and a slower pace before they can really take in what you mean.",
          },
        ],
      };
    case "baseline":
    default:
      return {
        title: "Baseline overlay",
        body: "This view translates each person’s usual way of reacting, coping, and relating into plain language.",
        cards: [
          {
            label: "When you feel hurt",
            value: "you may move toward the issue quickly because clarity feels better than uncertainty.",
          },
          {
            label: "When the other side feels hurt",
            value: "they may become quieter, more careful, or harder to reach before they can respond clearly.",
          },
        ],
      };
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as SessionRequest;
  const message = (body.message ?? "").trim();

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const participants = buildParticipants(body);
  const workspace = buildWorkspace(message, participants);
  const firstBranchId = workspace.field_update.branch_suggestions[0]?.id ?? "other-side";

  return NextResponse.json({
    workspace,
    branch: buildBranch(firstBranchId, message),
    overlay: buildOverlay(body.overlayMode ?? "baseline"),
  });
}
