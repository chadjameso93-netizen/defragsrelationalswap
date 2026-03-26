import { NextResponse } from "next/server";
import { buildState } from "@/lib/workbench/build-state";
import { createClient } from "@/utils/supabase/server";
import { getAuthenticatedUserOrNull } from "@/server/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const message = body.message || "";

  const state = buildState(message);

  const user = await getAuthenticatedUserOrNull();

  if (user) {
    const supabase = await createClient();

    await supabase.from("workbench_runs").insert({
      user_id: user.userId,
      prompt_text: message,
      state_json: state,
    });
  }

  return NextResponse.json(state);
}
