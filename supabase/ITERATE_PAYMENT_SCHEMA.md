# Iterate Payment Schema

This document records the local schema contract required by
`server/aliyun-fc-iterate-routes.js`.

## Apply Order

For a fresh database or staging restore, apply migrations in this order:

1. `supabase/migrations/20260526000000_iterate_base_license_order_schema.sql`
2. `supabase/migrations/20260527_iterate_claim_token_idempotency.sql`
3. `supabase/migrations/20260527_iterate_verified_email_recovery.sql`
4. `supabase/migrations/20260527_iterate_payment_provider.sql`

The baseline guard is idempotent. It exists because the repository previously
had incremental payment migrations without the original `iterate_orders` and
`iterate_licenses` table definitions.

## `public.iterate_licenses`

The backend writes one license row after a provider payment is confirmed.

Required columns:

| Column | Type | Used by |
| --- | --- | --- |
| `id` | `uuid` | selected after insert and stored on `iterate_orders.license_id` |
| `license_key` | `text` | activation validation and claim redemption |
| `order_id` | `text` | idempotent lookup by provider order number |
| `email` | `text` | support/recovery metadata |
| `plan_id` | `text` | plan metadata |
| `plan_name` | `text` | plan metadata |
| `license_type` | `text` | activation response |
| `status` | `text` | activation response and revocation check |
| `created_at` | `timestamptz` | issue timestamp |
| `expires_at` | `timestamptz` | trial expiration check |

Indexes:

- Unique `license_key`
- Unique non-null `order_id`
- Lookup indexes on `email`, `status`, and `expires_at`

## `public.iterate_orders`

The backend writes one order row after a provider payment is confirmed. It also
uses this table to recover an already-issued license.

Required columns:

| Column | Type | Used by |
| --- | --- | --- |
| `id` | `uuid` | local row identity |
| `order_id` | `text` | provider order number and primary lookup key |
| `email` | `text` | verified-email recovery binding |
| `payment_method` | `text` | channel recovery and provider status routing |
| `amount` | `numeric(10,2)` | paid amount in CNY |
| `plan_id` | `text` | plan metadata |
| `plan_name` | `text` | plan metadata |
| `status` | `text` | order fulfillment state |
| `license_id` | `uuid` | associated `iterate_licenses.id` |
| `license_key` | `text` | recovery lookup |
| `paid_at` | `timestamptz` | provider success timestamp |
| `created_at` | `timestamptz` | local audit timestamp |
| `updated_at` | `timestamptz` | local audit timestamp |

Indexes:

- Unique non-null `order_id`
- Lookup indexes on `email`, `status`, `payment_method`, and `paid_at`

## Access Model

These tables contain license and buyer metadata. They are service-role backend
tables only:

- RLS is enabled.
- `anon` and `authenticated` privileges are revoked.
- No public RLS policies are added by these migrations.

## Production Gate

Before applying the incremental payment migrations to production, confirm the
current production `iterate_orders` and `iterate_licenses` definitions are
compatible with this contract. If existing production data violates the new
unique indexes, stop and reconcile the data before continuing.
