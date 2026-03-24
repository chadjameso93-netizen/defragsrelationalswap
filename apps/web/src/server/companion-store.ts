import type { CompanionEvaluationRubric, CompanionOutputContract, CompanionStructuredSynthesis } from "../../../../packages/core/src";
import { createAdminClient } from "../utils/supabase/admin";
import type { Json } from "../types/supabase";

export type FollowUpActionType =
  | "show_evidence"
  | "rephrase"
  | "practice_conversation";

export interface FollowUpActionInput {
  type: FollowUpActionType;
  label: string;
  payload?: Record<string, unknown>;
}

export interface FollowUpActionRecord extends FollowUpActionInput {
  id: string;
  insightId: string;
  createdAt: string;
}

export interface CompanionThreadRecord {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
}

export interface CompanionInsightRecord {
  id: string;
  threadId: string;
  createdAt: string;
  confidence: number;
  synthesis: CompanionStructuredSynthesis | null;
  evaluation: CompanionEvaluationRubric | null;
  contract: CompanionOutputContract;
}

const insightSelect =
  "id,thread_id,created_at,confidence,synthesis,evaluation,what_happened,your_side,their_side,what_changed,next_move,what_this_is_based_on";

function asStringArray(value: Json): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function asRecord(value: Json | null): Record<string, unknown> {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    return {};
  }

  return value as Record<string, unknown>;
}

function asFollowUpActionType(value: string): FollowUpActionType {
  if (value === "show_evidence" || value === "rephrase" || value === "practice_conversation") {
    return value;
  }

  return "show_evidence";
}

export async function listThreadsForUser(userId: string): Promise<CompanionThreadRecord[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companion_threads")
    .select("id,user_id,title,created_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    createdAt: row.created_at,
  }));
}

export async function listRecentActionsForUser(userId: string): Promise<FollowUpActionRecord[]> {
  const supabase = createAdminClient();

  const { data: insights, error: insightsError } = await supabase
    .from("companion_insights")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (insightsError) {
    throw insightsError;
  }

  const insightIds = (insights ?? []).map((item) => item.id);
  if (insightIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("companion_follow_up_actions")
    .select("id,insight_id,action_type,label,payload,created_at")
    .in("insight_id", insightIds)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    insightId: row.insight_id,
    type: asFollowUpActionType(row.action_type),
    label: row.label,
    payload: asRecord(row.payload),
    createdAt: row.created_at,
  }));
}

export async function createThread(userId: string, title: string): Promise<CompanionThreadRecord> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companion_threads")
    .insert({
      user_id: userId,
      title,
    })
    .select("id,user_id,title,created_at")
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    createdAt: data.created_at,
  };
}

export async function listInsightsForThread(userId: string, threadId: string): Promise<CompanionInsightRecord[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companion_insights")
    .select(insightSelect)
    .eq("user_id", userId)
    .eq("thread_id", threadId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    threadId: row.thread_id,
    createdAt: row.created_at,
    confidence: row.confidence ?? 0.5,
    synthesis: row.synthesis ?? null,
    evaluation: row.evaluation ?? null,
    contract: {
      whatHappened: row.what_happened,
      yourSide: row.your_side,
      theirSide: row.their_side,
      whatChanged: row.what_changed,
      nextMove: row.next_move,
      whatThisIsBasedOn: asStringArray(row.what_this_is_based_on),
    },
  }));
}

export async function listRecentInsightsForUser(userId: string): Promise<CompanionInsightRecord[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companion_insights")
    .select(insightSelect)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    threadId: row.thread_id,
    createdAt: row.created_at,
    confidence: row.confidence ?? 0.5,
    synthesis: row.synthesis ?? null,
    evaluation: row.evaluation ?? null,
    contract: {
      whatHappened: row.what_happened,
      yourSide: row.your_side,
      theirSide: row.their_side,
      whatChanged: row.what_changed,
      nextMove: row.next_move,
      whatThisIsBasedOn: asStringArray(row.what_this_is_based_on),
    },
  }));
}

export async function getInsightById(userId: string, insightId: string): Promise<CompanionInsightRecord | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companion_insights")
    .select(insightSelect)
    .eq("user_id", userId)
    .eq("id", insightId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    threadId: data.thread_id,
    createdAt: data.created_at,
    confidence: data.confidence ?? 0.5,
    synthesis: data.synthesis ?? null,
    evaluation: data.evaluation ?? null,
    contract: {
      whatHappened: data.what_happened,
      yourSide: data.your_side,
      theirSide: data.their_side,
      whatChanged: data.what_changed,
      nextMove: data.next_move,
      whatThisIsBasedOn: asStringArray(data.what_this_is_based_on),
    },
  };
}

export async function listActionsForInsight(insightId: string): Promise<FollowUpActionRecord[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companion_follow_up_actions")
    .select("id,insight_id,action_type,label,payload,created_at")
    .eq("insight_id", insightId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    insightId: row.insight_id,
    type: asFollowUpActionType(row.action_type),
    label: row.label,
    payload: asRecord(row.payload),
    createdAt: row.created_at,
  }));
}

export async function createInsightForThread(
  userId: string,
  threadId: string,
  contract: CompanionOutputContract,
  synthesis: CompanionStructuredSynthesis,
  evaluation: CompanionEvaluationRubric,
  actions: FollowUpActionInput[],
): Promise<CompanionInsightRecord> {
  const supabase = createAdminClient();

  const { data: insightData, error: insightError } = await supabase
    .from("companion_insights")
    .insert({
      user_id: userId,
      thread_id: threadId,
      confidence: synthesis.confidence,
      synthesis,
      evaluation,
      what_happened: contract.whatHappened,
      your_side: contract.yourSide,
      their_side: contract.theirSide,
      what_changed: contract.whatChanged,
      next_move: contract.nextMove,
      what_this_is_based_on: contract.whatThisIsBasedOn,
    })
    .select("id,thread_id,created_at")
    .single();

  if (insightError) {
    throw insightError;
  }

  if (actions.length > 0) {
    const { error: actionsError } = await supabase.from("companion_follow_up_actions").insert(
      actions.map((action) => ({
        insight_id: insightData.id,
        action_type: action.type,
        label: action.label,
        payload: (action.payload ?? {}) as Json,
      })),
    );

    if (actionsError) {
      throw actionsError;
    }
  }

  return {
    id: insightData.id,
    threadId: insightData.thread_id,
    createdAt: insightData.created_at,
    confidence: synthesis.confidence,
    synthesis,
    evaluation,
    contract,
  };
}
