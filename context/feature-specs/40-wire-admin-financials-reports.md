# 40 — Wire Admin Financials from Sales Reports

## Goal

Replace mock Financials metrics and revenue chart on `/admin/financials` with live
`GET /admin/reports/sales` data. Wire Download Ledger to
`GET /admin/reports/sales/export`.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Mapping

| UI | Source |
| --- | --- |
| Metric cards | Aggregates from sales periods (revenue, orders, retail, wholesale) |
| Revenue chart | Monthly `groupBy=month` YTD bars (pad empty months) |
| Recent activity | Daily sales periods as Sale rows (no receipt links — no txn API) |
| Payout history | Empty state (no payout API) |
| Download Ledger | Proxy CSV from `/admin/reports/sales/export` |

## Modules

```
types/api.ts
lib/api/reports.ts
lib/admin/map-admin-financials.ts
lib/admin/load-admin-financials.ts
app/(admin)/admin/(protected)/financials/export/route.ts
components/admin/financials/*
```

## Out of Scope

- Transaction receipt live wiring (no list/detail txn endpoints)
- Expenses / net profit / pending payouts (not in reports API)

## Acceptance

1. Financials shows live revenue/orders for staging
2. Chart reflects monthly sales (even if sparse)
3. Download Ledger returns CSV
4. Visual QA + TypeScript clean
