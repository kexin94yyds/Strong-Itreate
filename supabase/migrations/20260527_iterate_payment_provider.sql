-- Persist the provider and server-priced checkout metadata used when polling
-- QR-code payments. Apply after 20260527_iterate_verified_email_recovery.sql.

ALTER TABLE iterate_payment_access
  ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'wechat',
  ADD COLUMN IF NOT EXISTS plan_id TEXT,
  ADD COLUMN IF NOT EXISTS amount_cents INTEGER,
  ADD COLUMN IF NOT EXISTS coupon_code TEXT NOT NULL DEFAULT '';

ALTER TABLE iterate_orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'wechat';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'iterate_payment_access_payment_method_check'
  ) THEN
    ALTER TABLE iterate_payment_access
      ADD CONSTRAINT iterate_payment_access_payment_method_check
      CHECK (payment_method IN ('wechat', 'alipay'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'iterate_orders_payment_method_check'
  ) THEN
    ALTER TABLE iterate_orders
      ADD CONSTRAINT iterate_orders_payment_method_check
      CHECK (payment_method IN ('wechat', 'alipay'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_iterate_payment_access_method
  ON iterate_payment_access(payment_method);
