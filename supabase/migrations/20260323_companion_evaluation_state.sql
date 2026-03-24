-- Add narrative evaluation rubric storage.

alter table if exists public.companion_insights
  add column if not exists evaluation jsonb;
