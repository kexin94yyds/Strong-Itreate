-- Make Iterate claim issuance idempotent per paid order.
-- Apply with the matching application release: legacy active random tokens
-- remain redeemable until a new status request rotates them.

CREATE TABLE IF NOT EXISTS iterate_claim_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  order_no TEXT NOT NULL,
  license_key TEXT NOT NULL,
  token_nonce TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '5 minutes')
);

ALTER TABLE iterate_claim_tokens
  ADD COLUMN IF NOT EXISTS token_nonce TEXT,
  ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_iterate_claim_tokens_token_hash
  ON iterate_claim_tokens(token_hash);

CREATE INDEX IF NOT EXISTS idx_iterate_claim_tokens_order_no
  ON iterate_claim_tokens(order_no);

CREATE INDEX IF NOT EXISTS idx_iterate_claim_tokens_expires
  ON iterate_claim_tokens(expires_at);

-- Existing deployments may already contain multiple unconsumed tokens.
-- Keep the newest legacy row available for direct redeem; older rows cannot
-- remain active once the single-active-token constraint is introduced.
WITH ranked_active AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY order_no
      ORDER BY created_at DESC, id DESC
    ) AS row_number
  FROM iterate_claim_tokens
  WHERE used_at IS NULL
    AND revoked_at IS NULL
)
UPDATE iterate_claim_tokens AS tokens
SET revoked_at = NOW()
FROM ranked_active AS ranked
WHERE tokens.id = ranked.id
  AND ranked.row_number > 1;

CREATE UNIQUE INDEX IF NOT EXISTS idx_iterate_claim_tokens_one_active_per_order
  ON iterate_claim_tokens(order_no)
  WHERE used_at IS NULL AND revoked_at IS NULL;

ALTER TABLE iterate_claim_tokens ENABLE ROW LEVEL SECURITY;
