create extension if not exists pgcrypto;

create table if not exists public.license_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  provider text not null default 'manual',
  external_order_id text not null unique,
  buyer_email text,
  product_sku text not null,
  license_type text not null check (license_type in ('day1', 'day7', 'permanent')),
  license_key text not null,
  payment_status text not null default 'paid' check (payment_status in ('created', 'paid', 'failed', 'refunded')),
  delivery_status text not null default 'issued' check (delivery_status in ('pending', 'issued', 'failed')),
  issued_at timestamptz not null default now(),
  provider_payload jsonb not null default '{}'::jsonb
);

create index if not exists license_orders_buyer_email_idx
  on public.license_orders (buyer_email);

create index if not exists license_orders_created_at_idx
  on public.license_orders (created_at desc);

drop trigger if exists license_orders_touch_updated_at on public.license_orders;

create trigger license_orders_touch_updated_at
before update on public.license_orders
for each row
execute function public.iterate_touch_updated_at();

alter table public.license_orders enable row level security;

revoke all on public.license_orders from anon, authenticated;
