# 33 — Wire Admin Dashboard Overview

## Goal

Replace mock overview metrics/tables on `/admin` with live `GET /admin/dashboard`
(+ active product count from `GET /admin/products`) via staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/dashboard.ts
lib/admin/map-admin-overview.ts
lib/admin/load-admin-overview.ts
components/admin/overview/OverviewDashboard.tsx
app/(admin)/admin/(protected)/page.tsx
```

## Mapping

| UI | Source |
| --- | --- |
| Today's Sales | `today.revenue` |
| Today's Orders | `today.orderCount` (+ pending among recent) |
| Active Products | `GET /admin/products` meta total (status active) |
| Low Stock Alerts | `lowStock.count` |
| Orders needing attention | `recentOrders` filtered to pending/processing / unpaid |
| Low stock table | `lowStock.items` |
| Recent sales | `recentOrders` (items line from type/method when line items absent) |

Profile greeting remains local mock (no `/admin/staff/me` endpoint).

## Out of Scope

- Export Daily Summary
- Yesterday % comparison (not in API)
- Farm-sourced detail copy

## Acceptance

1. `/admin` shows live revenue/orders/low-stock/recent order from staging
2. Empty sections render empty states, not Figma mocks
3. Visual QA + TypeScript clean
