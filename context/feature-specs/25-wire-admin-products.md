# 25 — Wire Admin Products List to Live API

## Goal

Replace mock rows on `/admin/products` with live `GET /admin/products` (+ category
names from `GET /admin/categories/tree`), authenticated via the interactive staff
session cookies from spec 23.

## Auth

- Use `marketplaceFetch` with `auth: "session"` → `getInteractiveStaffAccessToken()`
- Do **not** use env machine credentials for this UI path

## Components / modules

```
lib/api/client.ts                 ← auth: "session" | "machine" | boolean
lib/admin/map-admin-product.ts    ← ApiProduct → AdminProductRow
lib/admin/load-admin-products.ts  ← server loader
components/admin/products/ProductsPage.tsx  ← accepts initialRows
app/(admin)/admin/(protected)/products/page.tsx  ← server fetch
```

## Behavior

- Real pagination totals from loaded set (client filter/paginate for this unit)
- Default origin filter: **All** (live catalog includes Ghana)
- Category filter options derived from loaded rows
- Empty / error states if API fails (no silent Figma mock fallback)

## Out of Scope

- Server-side query params for every filter (client filter OK for small catalog)
- Live product detail / form mutations

## Acceptance

1. Logged-in staff see seeded staging products on `/admin/products`
2. Filters/search work against live rows
3. Visual QA logged
