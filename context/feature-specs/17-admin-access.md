# 17 — Admin Access (Team & Access)

## Goal

Build the staff Team & Access screen matching Figma frame `access` (`72:1589`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:1589` | `figma-cache/admin/access/` |
| Main | `72:1647` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/access/screenshot.png` |

## Components

```
components/admin/access/
  AccessPage.tsx
  AccessHeader.tsx
  TeamMembersTable.tsx
  MemberStatusBadge.tsx
  AccessRolesDefinition.tsx

lib/mocks/admin-access.ts
```

## UI

- Header “Team & Access” + Invite Member
- Team members table (Edit Role / Revoke)
- Access Roles Definition card (Owner / Admin / Manager / Staff)

## Acceptance

1. `/admin/access` matches Figma copy; Visual QA logged
