# 41 — Self-Revoke Guard on Team & Access

## Goal

Prevent the signed-in staff user from revoking their own access on
`/admin/access` (UI + server action).

## Auth / identity

- Decode interactive access JWT (`afw_staff_at`) for `sub` (staff id) and
  optional `email`
- Match against `GET /admin/staff` rows by id, then email fallback

## Behavior

| Surface | Rule |
| --- | --- |
| Team table | Current user: no Revoke control (label “You”); Edit Role still allowed |
| `setStaffActiveAction` | Reject `isActive: false` when `staffId` is the session user |

## Modules

```
lib/admin/staff-session.ts      ← getInteractiveStaffIdentity()
lib/admin/load-admin-access.ts  ← currentStaffId
lib/admin/staff-actions.ts      ← server-side guard
components/admin/access/*
context/feature-specs/41-admin-self-revoke-guard.md
```

## Out of Scope

- Blocking Edit Role on self
- Catalog hygiene / settings leftovers

## Acceptance

1. Signed-in row shows no Revoke
2. Direct server action revoke of self returns an error
3. Other members can still be revoked
4. Visual QA + TypeScript clean
