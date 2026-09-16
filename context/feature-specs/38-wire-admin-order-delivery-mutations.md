# 38 — Wire Admin Order Status & Tracking Mutations

## Goal

Enable Update Status, Add/Edit Tracking, and shipment status updates on
`/admin/orders/[id]` via live order + shipment APIs.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## APIs

| UI | Endpoint |
| --- | --- |
| Update Status | `PATCH /admin/orders/{id}/status` `{ status }` |
| Add Tracking | `POST /admin/delivery/shipments` |
| Edit Tracking | `PATCH /admin/delivery/shipments/{orderId}` |
| Save Delivery Details | `PATCH` shipment `status` (`pending` / `out_for_delivery` / `delivered`) |

Order statuses: `pending` · `processing` · `shipped` · `delivered` · `cancelled` · `refunded`

## Modules

```
types/api.ts
lib/api/orders.ts
lib/api/shipments.ts
lib/admin/order-delivery-actions.ts
lib/admin/map-admin-delivery.ts
lib/mocks/admin-delivery-tracking.ts
components/admin/orders/DeliveryTrackingPage.tsx
```

## Out of Scope

- Live carrier deep-links
- Creating orders / packing slip PDF

## Acceptance

1. Can advance order status and see timeline refresh
2. Can create or update tracking (courier + waybill)
3. Visual QA + TypeScript clean
