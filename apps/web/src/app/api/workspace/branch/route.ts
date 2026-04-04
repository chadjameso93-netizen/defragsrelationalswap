import { NextRequest, NextResponse } from "next/server";

type BranchRequest = {
  branchId?: string;
  message?: string;
};

function branchResponse(branchId: string, message: string) {
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
        suggestions: [
          "Stay close to what is actually happening.",
          "Keep the next move small and clear.",
        ],
      };
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as BranchRequest;
  const branchId = (body.branchId ?? "").trim();

  if (!branchId) {
    return NextResponse.json({ error: "Missing branchId" }, { status: 400 });
  }

  return NextResponse.json(branchResponse(branchId, (body.message ?? "").trim()));
}
