# 34 — Wire Admin Store Settings

## Goal

Load and save Store Details on `/admin/settings` via `GET/PATCH /admin/settings`
using the interactive staff session.

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/settings.ts
lib/admin/map-admin-settings.ts
lib/admin/load-admin-settings.ts
lib/admin/settings-actions.ts
components/admin/settings/StoreDetailsPanel.tsx
components/admin/settings/SettingsPage.tsx
app/(admin)/admin/(protected)/settings/page.tsx
```

## Mapping

| Form field | API |
| --- | --- |
| Store Name | `businessName` |
| Contact Email | `businessEmail` |
| Phone Number | `businessPhone` |
| Business Address | composed from `addressLine*` / city / province / postal / country; save as `addressLine1` (+ keep other parts when present) |
| Store URL / Currency / Timezone | UI-only (not in API) — retained for Figma layout, not patched |

## Out of Scope

- Taxes CRUD, shipping zones, notifications, legal
- Payments panel live wiring (follow-up)

## Acceptance

1. Store Details prefills from staging settings
2. Save Changes PATCHes and reflects success/error
3. Visual QA + TypeScript clean
