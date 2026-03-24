-- Add reasoning state fields to companion insights.

alter table if exists public.companion_insights
  add column if not exists synthesis jsonb,
  add column if not exists confidence numeric(4,3) not null default 0.5;
