-- ═══════════════════════════════════════════════════════════
-- Portfolio guestbook — run this once in Supabase → SQL Editor
-- (safe to re-run). Then copy Project URL + anon key into Vercel
-- as SUPABASE_URL and SUPABASE_ANON_KEY and redeploy.
-- ═══════════════════════════════════════════════════════════

create table if not exists public.guestbook (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 80),
  message    text not null check (char_length(message) between 3 and 280),
  created_at timestamptz not null default now()
);

-- Row Level Security: anyone can read and add notes, nobody can edit or delete them
alter table public.guestbook enable row level security;

drop policy if exists "guestbook is public" on public.guestbook;
create policy "guestbook is public"
  on public.guestbook for select
  to anon, authenticated
  using (true);

drop policy if exists "anyone can leave a note" on public.guestbook;
create policy "anyone can leave a note"
  on public.guestbook for insert
  to anon, authenticated
  with check (true);

-- Live updates: new notes drop onto everyone's wall in real time
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'guestbook'
  ) then
    alter publication supabase_realtime add table public.guestbook;
  end if;
end $$;
