# 30 — Wire Admin Customers to Live API

## Goal

Replace mock rows/metrics on `/admin/customers` with live `GET /admin/customers`
(+ order aggregates from `GET /admin/orders`) via interactive staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts                         ← ApiCustomer (+ address summary)
lib/api/customers.ts                 ← listCustomers, getCustomerById
lib/admin/map-admin-customer.ts
lib/admin/load-admin-customers.ts
components/admin/customers/CustomersPage.tsx
app/(admin)/admin/(protected)/customers/page.tsx
```

## Behavior

- Table from live customers; orders / spent / last order joined from orders list
- Location from customer detail `addresses[0]` when present, else "—"
- Status: `erasedAt` or zero orders → inactive; else active
- Metrics computed from loaded set (total, new this month, repeat %, AOV)
- Client search + pagination; no silent Figma mock fallback

## Out of Scope

- Customer detail route / PATCH mutations
- Export List CSV

## Acceptance

1. Logged-in staff see staging customers on `/admin/customers`
2. Search/pagination work; metrics reflect live counts
3. Visual QA + TypeScript clean
