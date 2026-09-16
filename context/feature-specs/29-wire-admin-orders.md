# 29 — Wire Admin Orders List to Live API

## Goal

Replace mock rows on `/admin/orders` with live `GET /admin/orders` via interactive
staff session. Tab counts and search filter against loaded orders.

## Auth

- `marketplaceFetch(..., { auth: "session" })`
- Do **not** use env machine credentials for this UI path

## Modules

```
types/api.ts                      ← ApiOrder, ApiOrderItem, ApiPayment, …
lib/api/orders.ts                 ← listOrders, getOrderById
lib/admin/map-admin-order.ts
lib/admin/load-admin-orders.ts
components/admin/orders/OrdersPage.tsx
app/(admin)/admin/(protected)/orders/page.tsx
```

## Behavior

- Map API `status` → fulfillment tabs (pending / processing / shipped / delivered / cancelled)
- Map `paymentStatus` → Paid / Pending / Failed
- Items summary from nested `items[].variant.product.name` × quantity
- Customer from `customer.firstName` + `lastName`
- Active Delivery Shipments: from orders that include `shipment` (empty state if none)
- No silent Figma mock fallback on API failure

## Out of Scope

- Delivery tracking detail live wiring (spec later)
- Order status mutations from the list
- Financials / customers screens

## Acceptance

1. Logged-in staff see staging orders on `/admin/orders`
2. Tabs/search work against live rows
3. Visual QA + TypeScript clean
