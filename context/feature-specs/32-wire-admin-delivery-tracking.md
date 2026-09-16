# 32 — Wire Admin Delivery Tracking to Live API

## Goal

Replace mock delivery data on `/admin/orders/[id]` with live `GET /admin/orders/{id}`
(+ optional `GET /admin/delivery/shipments/{orderId}`) via staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
lib/api/orders.ts              ← getOrderById (existing)
lib/api/shipments.ts           ← getShipmentByOrderId (404 → null)
lib/admin/map-admin-delivery.ts
lib/admin/load-admin-delivery.ts
components/admin/orders/DeliveryTrackingPage.tsx
app/(admin)/admin/(protected)/orders/[id]/page.tsx
```

## Behavior

- Customer / method / address from order (+ nested customer / deliveryAddress)
- Tracking card from shipment when present; else placeholders for pickup / unshipped
- Timeline derived from order `status` (pending → delivered); cancelled/refunded labeled
- 404 → Next.js `notFound()`
- Mutations (Update Status / Add Tracking / Save) remain mock for this unit

## Acceptance

1. Manage from orders list opens live detail for that order id
2. Pickup order `#AFW-906` renders without crashing (no shipment)
3. Visual QA + TypeScript clean
