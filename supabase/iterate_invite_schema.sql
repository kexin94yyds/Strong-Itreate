create extension if not exists pgcrypto;

create table if not exists public.iterate_beta_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  invite_code text not null unique,
  contact_type text not null check (contact_type in ('email', 'wechat')),
  contact_value text not null,
  contact_hash text not null unique,
  usage_note text not null,
  referral_code text,
  inviter_application_id uuid references public.iterate_beta_applications(id) on delete set null,
  application_status text not null default 'submitted' check (application_status in ('submitted', 'approved', 'rejected')),
  referral_status text not null default 'none' check (referral_status in ('none', 'qualified', 'self_referral', 'duplicate', 'rejected')),
  qualified_at timestamptz,
  ip_hash text,
  user_agent_hash text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists iterate_beta_applications_inviter_idx
  on public.iterate_beta_applications(inviter_application_id);

create index if not exists iterate_beta_applications_referral_code_idx
  on public.iterate_beta_applications(referral_code);

create table if not exists public.iterate_beta_invite_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  invite_code text not null,
  landing_path text not null default '/iterate/index.html',
  ip_hash text,
  user_agent_hash text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists iterate_beta_invite_clicks_code_idx
  on public.iterate_beta_invite_clicks(invite_code);

create or replace function public.iterate_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists iterate_beta_applications_touch_updated_at on public.iterate_beta_applications;

create trigger iterate_beta_applications_touch_updated_at
before update on public.iterate_beta_applications
for each row
execute function public.iterate_touch_updated_at();
