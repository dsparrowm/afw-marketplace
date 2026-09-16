# 42 — Wire Customer Auth (Login / Signup)

## Goal

Replace mock localStorage customer auth with live staging APIs:

- `POST /auth/customer/login`
- `POST /auth/customer/signup`
- `POST /auth/customer/refresh`
- `POST /auth/customer/logout`

## Session model

HTTP-only cookies (mirror staff pattern):

| Cookie | Purpose |
| --- | --- |
| `afw_cust_at` | Access JWT |
| `afw_cust_rt` | Refresh token |
| `afw_cust_profile` | Display profile JSON (id/email/name/type) — API JWT has only `sub` |

Server Actions own login/signup/logout/session read. Tokens never go to client JS.

`marketplaceFetch(..., { auth: "customer" })` uses the customer access cookie for
future `/public/cart`, addresses, wishlist calls.

## Mapping

| UI | API |
| --- | --- |
| Personal account | `accountType: "retail"` |
| Business account | `accountType: "wholesale"` + business fields |
| Full name | Split → `firstName` / `lastName` on signup |

## Modules

```
types/api.ts
lib/api/customer-auth.ts
lib/auth/customer-session-cookies.ts
lib/auth/customer-session.ts
lib/auth/customer-auth-actions.ts
lib/auth/auth-context.tsx
lib/api/client.ts
context/backend-api.md
context/backend-openapi.json
```

## Out of Scope

- Google OAuth
- Password reset UI
- Live order history (no `GET /public/orders` yet)
- Cart / addresses / wishlist live wiring (follow-up)

## Acceptance

1. Signup creates a staging customer and lands in `/account/orders`
2. Logout clears cookies; account routes redirect to login
3. Login with the same credentials restores the session
4. Visual QA + TypeScript clean
