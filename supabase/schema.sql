-- Run in Supabase SQL editor.

create table if not exists public.projects (
  id text primary key,
  title text not null,
  status text not null,
  summary text not null,
  tags text[] not null default '{}',
  flow jsonb not null default '[]',
  link text,
  sort_order int not null default 0
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 200),
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- Anyone can read projects
create policy "projects are public" on public.projects for select to anon, authenticated using (true);

-- Anonymous users may ONLY insert messages (no select/update/delete)
create policy "anon can insert messages" on public.messages for insert to anon with check (true);

insert into public.projects (id, title, status, summary, tags, flow, sort_order) values
('ux-accessibility-auditor','UI/UX Accessibility Auditor','In progress',
 'Upload a screenshot or audit a live page and get issues ranked by impact, with plain-language fixes. Rule-based checks catch what is certain; a trained model flags visual problems rules can’t see.',
 '{React,TensorFlow,Playwright,WCAG}',
 '[{"name":"Rules","detail":"axe-core, contrast and tap-target checks"},{"name":"Model","detail":"CNN trained on auto-labelled UI screens"},{"name":"Explain","detail":"LLM turns findings into fixes"}]',0)
on conflict (id) do nothing;
