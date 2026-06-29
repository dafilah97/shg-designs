-- ============================================================
-- SHG Designs — Supabase Schema
-- Run this in the Supabase SQL Editor to bootstrap your database
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────
-- PROJECTS TABLE
-- ─────────────────────────────
create table if not exists public.projects (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  description     text not null,
  thumbnail_url   text,
  live_url        text,
  case_study_url  text,
  technologies    text[]  not null default '{}',
  category        text    not null default 'Website',
  featured        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at
  before update on public.projects
  for each row execute procedure update_updated_at_column();

-- ─────────────────────────────
-- SITE CONTENT TABLE
-- ─────────────────────────────
create table if not exists public.site_content (
  id          uuid primary key default uuid_generate_v4(),
  key         text unique not null,
  value       text not null default '',
  updated_at  timestamptz not null default now()
);

create trigger site_content_updated_at
  before update on public.site_content
  for each row execute procedure update_updated_at_column();

-- Seed default content
insert into public.site_content (key, value) values
  ('hero_headline',    'Build Your Digital Empire'),
  ('hero_subtext',     'SHG Designs delivers the complete digital infrastructure your business needs — from blazing-fast websites to seamless payment systems, all under one roof.'),
  ('hero_cta_label',   'Request a Quote'),
  ('about_tagline',    'Who We Are'),
  ('about_body',       'SHG Designs is the digital infrastructure division of Sesigo Hive Group — a collective of builders, designers, and strategists obsessed with helping African businesses own their digital presence fully.'),
  ('contact_email',    'hello@shgdesigns.co.bw'),
  ('contact_phone',    '+267 71 234 567'),
  ('contact_address',  'Gaborone, Botswana'),
  ('whatsapp_number',  '26771234567'),
  ('price_website',    'BWP 1,500'),
  ('price_domain',     'BWP 150 / year'),
  ('price_email',      'BWP 50 / mailbox/month'),
  ('price_payment',    'BWP 2,500 once-off'),
  ('price_cms',        'BWP 3,000'),
  ('social_instagram', ''),
  ('social_facebook',  ''),
  ('social_linkedin',  ''),
  ('social_twitter',   '')
on conflict (key) do nothing;

-- ─────────────────────────────
-- CLIENT REQUESTS TABLE
-- ─────────────────────────────
create table if not exists public.client_requests (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  service     text not null,
  budget      text,
  timeline    text,
  message     text,
  status      text not null default 'new'
                check (status in ('new', 'in_progress', 'completed', 'archived')),
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────

-- Projects: public read, authenticated write
alter table public.projects enable row level security;

create policy "Public can read projects"
  on public.projects for select using (true);

create policy "Authenticated users can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects"
  on public.projects for delete
  using (auth.role() = 'authenticated');

-- Site content: public read, authenticated write
alter table public.site_content enable row level security;

create policy "Public can read site content"
  on public.site_content for select using (true);

create policy "Authenticated users can upsert site content"
  on public.site_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Client requests: anyone can insert, only authenticated can read/update
alter table public.client_requests enable row level security;

create policy "Anyone can submit a request"
  on public.client_requests for insert
  with check (true);

create policy "Authenticated users can read requests"
  on public.client_requests for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update request status"
  on public.client_requests for update
  using (auth.role() = 'authenticated');

-- ─────────────────────────────
-- STORAGE BUCKET
-- ─────────────────────────────
-- Run in Supabase Dashboard > Storage > New bucket
-- Bucket name: shg-assets
-- Public: true
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif, image/svg+xml
