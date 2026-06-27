-- ============================================================
-- ANVIL — Supabase Schema
-- Paste this entire file into Supabase → SQL Editor → Run
-- ============================================================

-- MEMBERS
create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  track text not null,
  year text not null,
  bio text,
  github text,
  linkedin text,
  created_at timestamptz default now()
);

-- PROJECTS
create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  codename text not null,
  status text not null default 'active' check (status in ('active','paused','complete')),
  track text not null,
  lead text not null,
  description text not null,
  created_at timestamptz default now()
);

-- PROJECT LOGS
create table project_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade not null,
  author text not null,
  entry text not null,
  tag text not null default 'update'
    check (tag in ('kickoff','update','milestone','blocker','fix','note')),
  created_at timestamptz default now()
);

-- FORGE IDEAS
create table forge_ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  affiliation text,
  tags text[] default '{}',
  description text not null,
  contact text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table members enable row level security;
alter table projects enable row level security;
alter table project_logs enable row level security;
alter table forge_ideas enable row level security;

-- Members: public read
create policy "Public read members"
  on members for select using (true);

-- Projects: public read
create policy "Public read projects"
  on projects for select using (true);

-- Project logs: public read
create policy "Public read logs"
  on project_logs for select using (true);

-- Project logs: authenticated users can insert
create policy "Auth insert logs"
  on project_logs for insert
  with check (auth.role() = 'authenticated');

-- Forge ideas: public can insert (submissions from anyone)
create policy "Public insert forge"
  on forge_ideas for insert
  with check (true);

-- Forge ideas: public can only read approved
create policy "Public read approved forge"
  on forge_ideas for select
  using (approved = true);

-- ============================================================
-- REALTIME — enable for live log updates
-- ============================================================
alter publication supabase_realtime add table project_logs;

-- ============================================================
-- SEED DATA — replace with your real info
-- ============================================================
insert into members (name, role, track, year, bio) values
  ('Pranay Kamble', 'Founder & President', 'Robotics / Embedded Systems', '2nd Year',
   'Founded ANVIL at RBU. Interested in autonomous systems, combat robotics, and the hardware-software intersection.');

insert into projects (name, codename, status, track, lead, description) values
  ('Antweight Combat Robot — Mk.1', 'IRONJAW', 'active', 'Robowars',
   'Pranay Kamble',
   'First antweight (150g) combat robot for Robowars competitions. Wedge-lifter hybrid chassis with brushless drive system.');

insert into project_logs (project_id, author, entry, tag)
  select id, 'Pranay Kamble',
    'Club officially formed. IRONJAW selected as first project. Beginning design phase — chassis geometry under discussion.',
    'kickoff'
  from projects where codename = 'IRONJAW';
