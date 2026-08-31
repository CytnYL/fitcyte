-- FytCyte Phase 1 schema: profiles, role-specific details, portfolio items.
-- Paste this whole file into Supabase Studio -> SQL Editor -> New query -> Run.

create extension if not exists "pgcrypto";

-- ============================================================
-- profiles: one row per user, created automatically at signup
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  user_type text not null check (user_type in ('model', 'photographer')),
  display_name text not null check (char_length(display_name) between 2 and 60),
  bio text check (bio is null or char_length(bio) <= 1000),
  city text check (city is null or char_length(city) <= 100),
  region text check (region is null or char_length(region) <= 100),
  country text check (country is null or char_length(country) <= 100),
  avatar_path text,
  age_confirmed boolean not null default false,
  age_confirmed_at timestamptz,
  -- Not used yet. Reserved so real ID verification can be added later
  -- (e.g. a Phase-N `identity_verifications` table) without touching
  -- this column or any code that already reads it.
  verification_status text not null default 'self_attested'
    check (verification_status in ('self_attested', 'pending', 'verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Belt-and-suspenders: a profile (and therefore an account) can only
  -- exist if age was explicitly confirmed. See handle_new_user() below —
  -- if age_confirmed isn't true, the INSERT fails and the whole signup
  -- transaction (including the auth.users row) rolls back.
  constraint profiles_age_confirmed_required check (age_confirmed = true)
);

comment on table public.profiles is 'One row per user. Created by handle_new_user() at signup time.';

-- ============================================================
-- model_profiles / photographer_profiles: optional role-specific detail
-- ============================================================
create table public.model_profiles (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  height_cm smallint check (height_cm is null or height_cm between 100 and 230),
  experience_level text check (
    experience_level is null or experience_level in ('new', 'some_experience', 'experienced', 'professional')
  ),
  style_tags text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table public.photographer_profiles (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  studio_name text check (studio_name is null or char_length(studio_name) <= 100),
  years_experience smallint check (years_experience is null or years_experience between 0 and 80),
  specialties text[] not null default '{}',
  website_url text check (website_url is null or char_length(website_url) <= 300),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- portfolio_items: images shown on a profile
-- ============================================================
create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  storage_path text not null,
  caption text check (caption is null or char_length(caption) <= 300),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index portfolio_items_profile_id_idx on public.portfolio_items (profile_id);

-- ============================================================
-- updated_at housekeeping
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger model_profiles_set_updated_at
  before update on public.model_profiles
  for each row execute function public.set_updated_at();

create trigger photographer_profiles_set_updated_at
  before update on public.photographer_profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- Auto-create a profile row when someone signs up.
-- Reads the metadata passed via supabase.auth.signUp({ options: { data } }).
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, user_type, display_name, age_confirmed, age_confirmed_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'user_type', 'model'),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data ->> 'age_confirmed')::boolean, false),
    case
      when (new.raw_user_meta_data ->> 'age_confirmed')::boolean then now()
      else null
    end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.model_profiles enable row level security;
alter table public.photographer_profiles enable row level security;
alter table public.portfolio_items enable row level security;

-- profiles: readable by anyone (this is a public portfolio showcase — city/
-- region only, never an exact address). Only the owner can update their own
-- row. No insert policy: rows are only ever created by the SECURITY DEFINER
-- trigger above, never directly by a client.
create policy "profiles_select_all" on public.profiles
  for select using (true);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- model_profiles: readable by anyone; only the owning model can write, and
-- only if their profile is actually typed 'model'.
create policy "model_profiles_select_all" on public.model_profiles
  for select using (true);

create policy "model_profiles_insert_own" on public.model_profiles
  for insert with check (
    auth.uid() = profile_id
    and exists (select 1 from public.profiles p where p.id = profile_id and p.user_type = 'model')
  );

create policy "model_profiles_update_own" on public.model_profiles
  for update using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

create policy "model_profiles_delete_own" on public.model_profiles
  for delete using (auth.uid() = profile_id);

-- photographer_profiles: same pattern.
create policy "photographer_profiles_select_all" on public.photographer_profiles
  for select using (true);

create policy "photographer_profiles_insert_own" on public.photographer_profiles
  for insert with check (
    auth.uid() = profile_id
    and exists (select 1 from public.profiles p where p.id = profile_id and p.user_type = 'photographer')
  );

create policy "photographer_profiles_update_own" on public.photographer_profiles
  for update using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

create policy "photographer_profiles_delete_own" on public.photographer_profiles
  for delete using (auth.uid() = profile_id);

-- portfolio_items: readable by anyone; only the owning profile can write.
create policy "portfolio_items_select_all" on public.portfolio_items
  for select using (true);

create policy "portfolio_items_insert_own" on public.portfolio_items
  for insert with check (auth.uid() = profile_id);

create policy "portfolio_items_update_own" on public.portfolio_items
  for update using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

create policy "portfolio_items_delete_own" on public.portfolio_items
  for delete using (auth.uid() = profile_id);
