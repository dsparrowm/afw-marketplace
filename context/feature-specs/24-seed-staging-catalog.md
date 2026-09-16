# 24 — Seed Staging Catalog

## Goal

Populate staging marketplace categories and products so storefront API reads
(`GET /admin/products`, `GET /admin/categories/tree`) return real catalog data.

## Approach

- Idempotent Node script: `scripts/seed-staging-catalog.mjs`
- Auth: env staff credentials → `POST /auth/login`
- Creates Figma-aligned root categories (homepage slugs) when missing
- Creates featured products + default variant + wholesale price tier when missing

## Run

```bash
node scripts/seed-staging-catalog.mjs
```

Requires `.env.local` with `MARKETPLACE_API_BASE_URL`, `MARKETPLACE_STAFF_EMAIL`,
`MARKETPLACE_STAFF_PASSWORD`.

## Acceptance

1. Script completes without error; re-run is a no-op for existing slugs
2. `GET /admin/products?status=active` returns seeded rows
3. Storefront `/shop` can render API products (fallback still available)
4. Progress tracker updated
