# 36 — Wire Admin Staff Mutations (Invite / Edit / Revoke)

## Goal

Enable Invite Member, Edit Role, and Revoke/Reactivate on `/admin/access`
via `POST /admin/staff` and `PATCH /admin/staff/{id}` using the interactive
staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/staff.ts                 ← createStaffUser, updateStaffUser
lib/admin/staff-actions.ts       ← invite / updateRole / setActive
lib/admin/map-admin-access.ts    ← include roleIds
components/admin/access/*
app/(admin)/admin/(protected)/access/page.tsx
```

## Behavior

| UI | API |
| --- | --- |
| Invite Member | `POST /admin/staff` — name, email, password (≥8), optional `roleIds` |
| Edit Role | `PATCH /admin/staff/{id}` — `{ roleIds: [selected] }` |
| Revoke | `PATCH` — `{ isActive: false }` |
| Reactivate | `PATCH` — `{ isActive: true }` |

- After success: `revalidatePath("/admin/access")` + client `router.refresh()`
- Invite requires a temporary password (API has no email-invite endpoint)
- Single role select (replaces full assignment set)

## Out of Scope

- Role CRUD / permission editor
- Self-revoke guard (no current-user id in UI yet)
- Email invitation / passwordless invite

## Acceptance

1. Can invite a staff user and see them in the table
2. Can change role and revoke/reactivate
3. Visual QA + TypeScript clean
