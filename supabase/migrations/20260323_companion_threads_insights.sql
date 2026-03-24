-- Companion thread + insight persistence scaffold.

create table if not exists public.companion_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companion_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  thread_id uuid not null references public.companion_threads(id) on delete cascade,
  what_happened text not null,
  your_side text not null,
  their_side text not null,
  what_changed text not null,
  next_move text not null,
  what_this_is_based_on jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.companion_follow_up_actions (
  id uuid primary key default gen_random_uuid(),
  insight_id uuid not null references public.companion_insights(id) on delete cascade,
  action_type text not null,
  label text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists companion_threads_user_id_idx on public.companion_threads(user_id);
create index if not exists companion_insights_thread_id_idx on public.companion_insights(thread_id);
create index if not exists companion_follow_up_actions_insight_id_idx on public.companion_follow_up_actions(insight_id);

alter table public.companion_threads enable row level security;
alter table public.companion_insights enable row level security;
alter table public.companion_follow_up_actions enable row level security;

do $$ begin
  create policy "companion_threads_select_own" on public.companion_threads
    for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "companion_insights_select_own" on public.companion_insights
    for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
