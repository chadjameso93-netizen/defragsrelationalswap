-- Insight Studio persistence for signed-in users.

create table if not exists public.insight_reads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text,
  response jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists insight_reads_user_id_idx on public.insight_reads(user_id, created_at desc);

alter table public.insight_reads enable row level security;

do $$ begin
  create policy "insight_reads_select_own" on public.insight_reads
    for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "insight_reads_insert_own" on public.insight_reads
    for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "insight_reads_delete_own" on public.insight_reads
    for delete using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
