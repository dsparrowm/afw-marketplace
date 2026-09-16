# 35 — Wire Admin Access (Staff & Roles)

## Goal

Replace mock team members and role cards on `/admin/access` with live
`GET /admin/staff` and `GET /admin/staff/roles` via interactive staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/staff.ts
lib/admin/map-admin-access.ts
lib/admin/load-admin-access.ts
components/admin/access/AccessPage.tsx
components/admin/access/AccessRolesDefinition.tsx
components/admin/access/MemberStatusBadge.tsx
app/(admin)/admin/(protected)/access/page.tsx
```

## Mapping

| UI | API |
| --- | --- |
| Name / Email | `name` / `email` |
| Role | joined `roles[].role.name` (or "—") |
| Last Active | "—" (API has no last-login field) |
| Status | `isActive` → Active / Inactive |
| Role cards | live roles; description from permission key summary |

## Out of Scope

- Invite Member (`POST /admin/staff`)
- Edit Role / Revoke (`PATCH /admin/staff/{id}`)
- Role CRUD / permissions editor

## Acceptance

1. Logged-in staff see staging users on `/admin/access`
2. Roles Definition reflects live roles (e.g. Full Admin)
3. Visual QA + TypeScript clean
