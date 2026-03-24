import type {
  BillingPlan,
  CompanionEvaluationRubric,
  CompanionStructuredSynthesis,
  SubscriptionState,
} from "../../../../packages/core/src";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
        };
        Insert: {
          id: string;
          display_name?: string | null;
        };
        Update: {
          id?: string;
          display_name?: string | null;
        };
        Relationships: [];
      };
      billing_accounts: {
        Row: {
          user_id: string;
          stripe_customer_id: string | null;
          current_plan: BillingPlan;
          subscription_state: SubscriptionState;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          stripe_customer_id?: string | null;
          current_plan?: BillingPlan;
          subscription_state?: SubscriptionState;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          stripe_customer_id?: string | null;
          current_plan?: BillingPlan;
          subscription_state?: SubscriptionState;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: number;
          user_id: string;
          stripe_subscription_id: string;
          plan: BillingPlan;
          state: SubscriptionState;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          stripe_subscription_id: string;
          plan: BillingPlan;
          state: SubscriptionState;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          stripe_subscription_id?: string;
          plan?: BillingPlan;
          state?: SubscriptionState;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      processed_webhook_events: {
        Row: {
          event_id: string;
          processed_at: string;
        };
        Insert: {
          event_id: string;
          processed_at?: string;
        };
        Update: {
          event_id?: string;
          processed_at?: string;
        };
        Relationships: [];
      };
      companion_threads: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      companion_insights: {
        Row: {
          id: string;
          user_id: string;
          thread_id: string;
          what_happened: string;
          your_side: string;
          their_side: string;
          what_changed: string;
          next_move: string;
          what_this_is_based_on: Json;
          synthesis: CompanionStructuredSynthesis | null;
          confidence: number;
          evaluation: CompanionEvaluationRubric | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          thread_id: string;
          what_happened: string;
          your_side: string;
          their_side: string;
          what_changed: string;
          next_move: string;
          what_this_is_based_on: Json;
          synthesis?: CompanionStructuredSynthesis | null;
          confidence?: number;
          evaluation?: CompanionEvaluationRubric | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          thread_id?: string;
          what_happened?: string;
          your_side?: string;
          their_side?: string;
          what_changed?: string;
          next_move?: string;
          what_this_is_based_on?: Json;
          synthesis?: CompanionStructuredSynthesis | null;
          confidence?: number;
          evaluation?: CompanionEvaluationRubric | null;
          created_at?: string;
        };
        Relationships: [];
      };
      companion_follow_up_actions: {
        Row: {
          id: string;
          insight_id: string;
          action_type: string;
          label: string;
          payload: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          insight_id: string;
          action_type: string;
          label: string;
          payload?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          insight_id?: string;
          action_type?: string;
          label?: string;
          payload?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
