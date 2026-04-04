import { NextRequest, NextResponse } from "next/server";
import { generateBaselineDesignWithProvider, type BaselineDesignInput } from "@/server/baseline-generator";

type ApiResponse = {
  ok: boolean;
  inputObject: BaselineDesignInput;
  baselineObject: unknown;
  provider: string;
  model: string;
  warning?: string;
};

function normalizeInput(body: any): BaselineDesignInput {
  return {
    name: typeof body?.name === "string" ? body.name.trim() : undefined,
    dob: typeof body?.dob === "string" ? body.dob.trim() : "",
    birth_time: typeof body?.birth_time === "string" ? body.birth_time.trim() : undefined,
    birth_place: typeof body?.birth_place === "string" ? body.birth_place.trim() : undefined,
    current_location:
      typeof body?.current_location === "string" ? body.current_location.trim() : undefined,
    context: typeof body?.context === "string" ? body.context.trim() : undefined,
    symbolic_inputs:
      body?.symbolic_inputs && typeof body.symbolic_inputs === "object"
        ? body.symbolic_inputs
        : {},
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const input = normalizeInput(body);

  if (!input.dob) {
    return NextResponse.json({ error: "Missing dob" }, { status: 400 });
  }

  try {
    const baseline = await generateBaselineDesignWithProvider(input, {
      provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.DEFRAG_OPENAI_MODEL,
      enableModelGeneration: process.env.DEFRAG_REASONING_PROVIDER === "openai",
    });

    const response: ApiResponse = {
      ok: true,
      inputObject: input,
      baselineObject: baseline,
      provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
      model: process.env.DEFRAG_OPENAI_MODEL || "gpt-4.1-mini",
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        inputObject: input,
        baselineObject: null,
        provider: process.env.DEFRAG_REASONING_PROVIDER === "openai" ? "openai" : "heuristic",
        model: process.env.DEFRAG_OPENAI_MODEL || "gpt-4.1-mini",
        warning: error instanceof Error ? error.message : "Baseline generation failed.",
      },
      { status: 500 },
    );
  }
}
