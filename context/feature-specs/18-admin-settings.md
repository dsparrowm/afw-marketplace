# 18 — Admin Settings

## Goal

Build the staff Settings screen matching Figma frame `settings` (`72:1734`), with Store Details as the primary panel.

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:1734` | `figma-cache/admin/settings/` |
| Main | `72:1792` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/settings/screenshot.png` |

## Components

```
components/admin/settings/
  SettingsPage.tsx
  SettingsHeader.tsx
  SettingsNav.tsx
  StoreDetailsPanel.tsx
  SettingsPlaceholderPanel.tsx

lib/mocks/admin-settings.ts
```

## UI

- Page header
- Secondary nav (240px): Store Details, Payments, Shipping, Taxes, Notifications, Legal
- Store Details form fields from Figma + Save Changes
- Other sections: placeholder copy until designed further

## Acceptance

1. `/admin/settings` matches Store Details Figma; Settings nav active; Visual QA logged
