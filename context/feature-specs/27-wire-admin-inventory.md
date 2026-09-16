# 27 — Wire Admin Inventory to Live API

## Goal

Replace mock inventory rows on `/admin/inventory` with live product/variant stock
from `GET /admin/products` (interactive staff session). Tab counts derived from
loaded rows.

## Modules

```
lib/admin/map-admin-inventory.ts
lib/admin/load-admin-inventory.ts
components/admin/inventory/InventoryPage.tsx
app/(admin)/admin/(protected)/inventory/page.tsx
```

## Behavior

- One row per product (primary/active variant)
- Status from stock vs lowStockThreshold
- Tabs: All / In Stock / Low Stock / Out of Stock with live counts
- Lagos Port banner remains mock UI (no shipment API yet)
- Restock → `/admin/products/[id]` (detail); stock mutation deferred

## Acceptance

1. Logged-in staff see seeded staging SKUs/stock on `/admin/inventory`
2. Tab filters and search work against live rows
3. Visual QA logged
