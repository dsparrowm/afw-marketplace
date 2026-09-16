# 23 — Admin Staff Auth Gate

## Goal

Protect `/admin/*` with an interactive staff session. Staff sign in via
`POST /auth/login`; tokens stay in HTTP-only cookies (never client JS).

## Decision (resolves open question)

| Concern | Choice |
| --- | --- |
| Browser session | HTTP-only cookies `afw_staff_at` (access) + `afw_staff_rt` (refresh) |
| Gate | Next.js `middleware.ts` redirects unauthenticated `/admin/*` → `/admin/login` |
| Machine catalog auth | Keep `lib/api/staff-auth.ts` (env credentials) for server-side catalog reads — separate from UI session |
| Tokens in browser JS | Never — cookies only; future admin API proxies use cookie → Bearer on server |

## Routes

- `/admin/login` — staff login (no sidebar shell)
- All other `/admin/*` — require session cookies

## Components / modules

```
lib/admin/staff-session.ts      ← cookie helpers + login/refresh/logout against API
app/middleware.ts                 ← /admin gate
app/(admin)/admin/login/page.tsx
components/admin/AdminLoginForm.tsx
app/(admin)/admin/(protected)/layout.tsx  ← AdminShell
```

## Acceptance

1. Unauthenticated visit to `/admin` redirects to `/admin/login?returnUrl=…`
2. Valid staging credentials set cookies and land on return URL
3. Log out clears cookies and returns to `/admin/login`
4. TypeScript clean; Visual QA logged
