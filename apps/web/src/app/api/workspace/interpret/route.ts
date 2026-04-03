import { NextRequest, NextResponse } from "next/server";

type WorkspaceRequest = {
  message?: string;
  participants?: Array<{
    id: string;
    name: string;
    role?: string;
  }>;
};

function buildParticipants(input: WorkspaceRequest) {
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

function buildResponse(message: string, participants: ReturnType<typeof buildParticipants>) {
  const lower = message.toLowerCase();
  const mentionsFamily = /mom|mother|dad|father|sister|brother|family/.test(lower);
  const mentionsConflict = /fight|argue|conflict|upset|hurt|tension|pull away|misunderstood/.test(lower);

  const summary = mentionsConflict
    ? "This looks like a moment where both people may care about the relationship, but may be reacting in ways that make each other harder to hear."
    : "This looks like a situation where more clarity about what each person means and needs may help."

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
          x: index === 0 ? 0.33 : 0.67,
          y: 0.5,
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

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as WorkspaceRequest;
  const message = (body.message ?? "").trim();

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const participants = buildParticipants(body);
  return NextResponse.json(buildResponse(message, participants));
}
