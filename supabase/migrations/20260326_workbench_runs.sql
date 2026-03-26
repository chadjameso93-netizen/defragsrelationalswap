create table if not exists workbench_runs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  prompt_text text not null,
  state_json jsonb not null,
  created_at timestamp with time zone default now()
);

alter table workbench_runs enable row level security;

drop policy if exists "Users can view own workbench runs" on workbench_runs;
create policy "Users can view own workbench runs" on workbench_runs
  for select using (auth.uid()::text = user_id or user_id like 'preview-user-%');

drop policy if exists "Users can insert own workbench runs" on workbench_runs;
create policy "Users can insert own workbench runs" on workbench_runs
  for insert with check (auth.uid()::text = user_id or user_id like 'preview-user-%');

create index if not exists idx_workbench_runs_user_id_created_at on workbench_runs(user_id, created_at desc);
