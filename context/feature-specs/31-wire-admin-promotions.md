# 31 — Wire Admin Promotions to Live API

## Goal

Replace mock rows/metrics on `/admin/promotions` with live `GET /admin/promotions`
via interactive staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/promotions.ts
lib/admin/map-admin-promotion.ts
lib/admin/load-admin-promotions.ts
components/admin/promotions/PromotionsPage.tsx
app/(admin)/admin/(protected)/promotions/page.tsx
```

## Behavior

- Status derived from `startsAt` / `endsAt` vs now: scheduled / active / expired
- Type label from `discountType` (percentage / fixed / free_shipping)
- Discount display: `15% Off`, `$5.00 Off`, or `Free Delivery`
- Name from `code` (API has no separate name field)
- Metrics: active count + total redemptions (`usageCount`); promo revenue unknown → "—"
- No silent Figma mock fallback

## Out of Scope

- Create / edit / delete mutations from UI
- Product bundle / BOGO types (not in API)

## Acceptance

1. Logged-in staff see staging promotions on `/admin/promotions`
2. Tabs filter by derived status
3. Visual QA + TypeScript clean
