# 13 — Admin Orders & Delivery

## Goal

Build the staff Orders & Delivery screen matching Figma frame `orders-and-delivery` (`72:578`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:578` | `figma-cache/admin/orders-and-delivery/` |
| Main | `72:624` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/orders-and-delivery/screenshot.png` |

## Components

```
components/admin/orders/
  OrdersPage.tsx
  OrdersHeader.tsx
  OrdersTabs.tsx
  OrdersTable.tsx
  ShipmentsPanel.tsx
  OrderFulfillmentBadge.tsx
  ShipmentStatusBadge.tsx

lib/mocks/admin-orders.ts
```

## UI

- Header + search + date range chip (“Sept 1 - Sept 30”)
- Underline tabs: All Orders (48), Pending (8), Processing (12), Shipped (14), Delivered (12), Cancelled (2)
- Orders table: Order #, Customer, Items, Total, Payment, Fulfillment, Date, Manage
- Active Delivery Shipments panel (3 carriers)

## Data

- Mock orders + shipments from `main.xml`. Default tab **All Orders** (table shows mixed statuses).

## Acceptance

1. `/admin/orders` matches Figma structure/copy; nav active; Visual QA logged
