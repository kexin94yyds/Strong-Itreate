-- Verified-email access for Iterate payment status and recovery.
-- The application uses the service-role backend only; no public RLS policies
-- are introduced for these secret-bearing tables.

CREATE TABLE IF NOT EXISTS iterate_email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  code_expires_at TIMESTAMPTZ NOT NULL,
  verified_at TIMESTAMPTZ,
  verification_token_hash TEXT UNIQUE,
  token_expires_at TIMESTAMPTZ,
  consumed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iterate_email_verifications_email_created
  ON iterate_email_verifications(email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_iterate_email_verifications_token_hash
  ON iterate_email_verifications(verification_token_hash);

ALTER TABLE iterate_email_verifications ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS iterate_payment_access (
  order_no TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  access_token_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_iterate_payment_access_token_hash
  ON iterate_payment_access(access_token_hash);

CREATE INDEX IF NOT EXISTS idx_iterate_payment_access_email
  ON iterate_payment_access(email);

ALTER TABLE iterate_payment_access ENABLE ROW LEVEL SECURITY;
