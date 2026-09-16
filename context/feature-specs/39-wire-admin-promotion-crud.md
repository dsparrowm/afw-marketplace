# 39 — Wire Admin Promotion CRUD

## Goal

Enable Create, Edit, and Delete on `/admin/promotions` via
`POST/PATCH/DELETE /admin/promotions` using the interactive staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/promotions.ts
lib/admin/promotion-actions.ts
lib/admin/map-admin-promotion.ts
lib/mocks/admin-promotions.ts
components/admin/promotions/*
```

## Behavior

| UI | API |
| --- | --- |
| Create Promotion | `POST /admin/promotions` |
| Edit (pencil) | `PATCH /admin/promotions/{id}` |
| More → Delete | `DELETE /admin/promotions/{id}` |

Form fields (store-wide only): code, discount type, discount value, start/end dates, optional usage limit.

`free_shipping` sends `discountValue: 0`. Category/product scope pickers out of scope.

## Acceptance

1. Can create a promotion and see it in the table
2. Can edit and delete
3. Visual QA + TypeScript clean
