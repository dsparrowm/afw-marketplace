# 26 — Wire Admin Product Detail to Live API

## Goal

Replace the Figma mock on `/admin/products/[id]` with live
`GET /admin/products/{id}` (+ category tree + variant price tiers), using the
interactive staff session.

## Modules

```
lib/admin/map-admin-product-detail.ts
lib/admin/load-admin-product-detail.ts
app/(admin)/admin/(protected)/products/[id]/page.tsx
```

## Behavior

- 404 → Next.js `notFound()`
- Status badge from product status (Published / Hidden / Draft)
- Stock badge from variant quantity + thresholds
- Warehouse / dimensions / shipping class show "—" when API has no fields
- Edit Product still opens mock form (mutations deferred)

## Acceptance

1. Clicking a live list row opens matching detail (name, SKU, stock, price)
2. TypeScript clean; Visual QA logged
