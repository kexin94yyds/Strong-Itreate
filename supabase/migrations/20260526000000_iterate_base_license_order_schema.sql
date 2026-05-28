-- Baseline guard for Iterate license/order tables.
--
-- This migration is intentionally ordered before the 20260527 incremental
-- payment migrations. It makes fresh/staging environments reproducible while
-- staying idempotent for production databases where these tables already exist.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.iterate_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key TEXT NOT NULL UNIQUE,
  order_id TEXT,
  email TEXT NOT NULL DEFAULT '',
  plan_id TEXT NOT NULL DEFAULT '',
  plan_name TEXT NOT NULL DEFAULT '',
  license_type TEXT NOT NULL DEFAULT 'permanent',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

ALTER TABLE public.iterate_licenses
  ADD COLUMN IF NOT EXISTS license_key TEXT,
  ADD COLUMN IF NOT EXISTS order_id TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS plan_id TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS plan_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS license_type TEXT NOT NULL DEFAULT 'permanent',
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS idx_iterate_licenses_license_key
  ON public.iterate_licenses(license_key)
  WHERE license_key IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_iterate_licenses_order_id
  ON public.iterate_licenses(order_id)
  WHERE order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_iterate_licenses_email
  ON public.iterate_licenses(email);

CREATE INDEX IF NOT EXISTS idx_iterate_licenses_status
  ON public.iterate_licenses(status);

CREATE INDEX IF NOT EXISTS idx_iterate_licenses_expires_at
  ON public.iterate_licenses(expires_at);

ALTER TABLE public.iterate_licenses ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.iterate_licenses FROM anon, authenticated;

CREATE TABLE IF NOT EXISTS public.iterate_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL DEFAULT '',
  payment_method TEXT NOT NULL DEFAULT 'wechat',
  amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  plan_id TEXT NOT NULL DEFAULT '',
  plan_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'success',
  license_id UUID,
  license_key TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.iterate_orders
  ADD COLUMN IF NOT EXISTS order_id TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'wechat',
  ADD COLUMN IF NOT EXISTS amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS plan_id TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS plan_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'success',
  ADD COLUMN IF NOT EXISTS license_id UUID,
  ADD COLUMN IF NOT EXISTS license_key TEXT,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS idx_iterate_orders_order_id
  ON public.iterate_orders(order_id)
  WHERE order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_iterate_orders_email
  ON public.iterate_orders(email);

CREATE INDEX IF NOT EXISTS idx_iterate_orders_status
  ON public.iterate_orders(status);

CREATE INDEX IF NOT EXISTS idx_iterate_orders_payment_method
  ON public.iterate_orders(payment_method);

CREATE INDEX IF NOT EXISTS idx_iterate_orders_paid_at
  ON public.iterate_orders(paid_at DESC);

ALTER TABLE public.iterate_orders ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.iterate_orders FROM anon, authenticated;
