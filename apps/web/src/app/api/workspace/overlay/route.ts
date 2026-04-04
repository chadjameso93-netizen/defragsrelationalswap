import { NextRequest, NextResponse } from "next/server";

type OverlayRequest = {
  message?: string;
  mode?: "baseline" | "family" | "compare";
};

function buildOverlay(message: string, mode: OverlayRequest["mode"]) {
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
  const body = (await req.json().catch(() => ({}))) as OverlayRequest;
  const mode = body.mode ?? "baseline";
  const message = (body.message ?? "").trim();

  return NextResponse.json(buildOverlay(message, mode));
}
