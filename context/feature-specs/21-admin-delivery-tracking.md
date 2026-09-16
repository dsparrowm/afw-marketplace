# 21 — Admin Delivery Tracking

## Goal

Build the staff Order Delivery Tracking screen matching Figma frame `delivery-tracking`
(`79:348`). Wire from Orders list **Manage** → `/admin/orders/[id]`.

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `79:348` | `figma-cache/admin/delivery-tracking/` |
| Main | `79:380` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/delivery-tracking/screenshot.png` |

## Route

`/admin/orders/[id]` — uses Figma mock delivery for visual QA (Order #AFW-10482).

## Components

```
components/admin/orders/
  DeliveryTrackingPage.tsx

lib/mocks/admin-delivery-tracking.ts
```

## UI

- Breadcrumb: Orders / AFW-10482 / Delivery
- Title + subtitle + Track Shipment (orange)
- Three info cards: Customer Details, Delivery Method, Shipping Address
- Courier Dispatch & Live Tracking: status badge, carrier/waybill/dispatched, timeline
  (Pending → Processing → Shipped → Delivered)
- Actions: Update Status · Add Tracking · Save Delivery Details

## Acceptance

1. Page matches Figma copy/structure; Visual QA logged
2. TypeScript clean; mock-only (no live logistics API)
