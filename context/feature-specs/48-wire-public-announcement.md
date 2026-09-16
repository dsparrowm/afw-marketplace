# 48 — Wire Storefront Announcement to `/public/announcement`

## Goal

Load the shell announcement marquee from the public storefront API:

- `GET /public/announcement` → `{ text: string | null }`

## Behavior

| API `text` | UI |
| --- | --- |
| Non-empty string | Use as marquee message(s) — split on ` • ` / `|` / newlines when multiple segments |
| `null` / empty / fetch error | Fall back to `siteConfig.announcements` (Figma static copy) |

- Fetch on the server in the announcement bar (no auth)
- Keep GSAP marquee client behavior unchanged
- Do not invent hero-slides / weekly-deals in this unit (staging returns `[]`)

## Out of Scope

- Admin UI to edit `announcementText` (PATCH settings DTO may omit it)
- Free-shipping threshold from admin settings
- Hero slides / weekly deals

## Acceptance

1. With staging `text: null`, bar still shows Figma fallback messages
2. When API returns text, bar shows that copy (verified by unit mapping / temporary override if needed)
3. Visual QA + TypeScript clean
