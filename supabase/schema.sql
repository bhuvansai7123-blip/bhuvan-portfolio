-- Run this once in Supabase SQL Editor (Project > SQL Editor > New query)

create extension if not exists "pgcrypto";

create table profile (
  id text primary key default 'main',
  name text default 'Bhuvan Sai',
  title text default 'Computer Science Engineering Student',
  intro text,
  about text,
  career_goals text,
  email text,
  github_url text,
  linkedin_url text,
  avatar_url text,
  resume_url text,
  updated_at timestamptz default now()
);
insert into profile (id) values ('main') on conflict do nothing;

create table education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text not null,
  start_year text,
  end_year text,
  grade text,
  description text,
  logo_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level text,
  percentage int,
  description text,
  icon_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  tech text,
  category text,
  github_url text,
  demo_url text,
  image_url text,
  screenshots jsonb default '[]',
  start_date text,
  end_date text,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  org text,
  issue_date text,
  credential_id text,
  credential_url text,
  image_url text,
  pdf_url text,
  description text,
  skills text,
  created_at timestamptz default now()
);

create table achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date text,
  organization text,
  image_url text,
  certificate_url text,
  external_link text,
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

alter table profile enable row level security;
alter table education enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table certificates enable row level security;
alter table achievements enable row level security;
alter table messages enable row level security;

create policy "public read profile" on profile for select using (true);
create policy "public read education" on education for select using (true);
create policy "public read skills" on skills for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read certificates" on certificates for select using (true);
create policy "public read achievements" on achievements for select using (true);

create policy "admin write profile" on profile for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write education" on education for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write skills" on skills for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write certificates" on certificates for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write achievements" on achievements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "anyone can send message" on messages for insert with check (true);
create policy "admin read messages" on messages for select using (auth.role() = 'authenticated');
create policy "admin delete messages" on messages for delete using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read portfolio files" on storage.objects
  for select using (bucket_id = 'portfolio');
create policy "admin upload portfolio files" on storage.objects
  for insert with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "admin update portfolio files" on storage.objects
  for update using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "admin delete portfolio files" on storage.objects
  for delete using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
