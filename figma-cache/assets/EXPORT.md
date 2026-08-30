# Figma Asset Export Runbook

**Start here when MCP rate limits have reset.** This is the only approved way to obtain
logo and icon files for this project.

## Do not use workarounds

- **Do not** crop icons or the logo from frame screenshots (`figma-cache/.../screenshot.png`)
- **Do not** use Lucide, emoji, or hand-drawn SVG for brand assets listed in `manifest.json`
- **Do not** paste placeholder circles or text badges for the logo

Every asset must be exported from its Figma node via MCP `get_screenshot`.

## Blocker (2026-08-30)

Export was **not completed** this session. Figma MCP returned:

> You've reached the Figma MCP tool call limit on the Starter plan.

All 13 shell assets remain `pending` in `manifest.json`. Components already reference the
target paths under `public/` — they will show broken images until export completes.

**Resolution:** Retry in a new session (daily limit reset) or upgrade the Figma MCP plan.

## Quick start (next session)

```bash
# 1. See what's left
python3 figma-cache/fetch-assets.py pending

# 2. Get the next asset to export
python3 figma-cache/fetch-assets.py next
```

For each pending asset:

1. Call Figma MCP **`get_screenshot`** with:
   - `fileKey`: `TRHpdrWtpLm06UPtgHYDgB`
   - `nodeId`: from manifest (e.g. `16:3` for logo)
2. Copy the returned asset URL (format: `https://www.figma.com/api/mcp/asset/<uuid>.png`)
3. Download into the repo:
   ```bash
   python3 figma-cache/fetch-assets.py apply logo "https://www.figma.com/api/mcp/asset/....png"
   ```
4. Repeat until `fetch-assets.py pending` shows 0 remaining
5. Verify in browser (`pnpm dev`) — logo and header/footer icons should render
6. Log visual QA pass in `context/progress-tracker.md`

## Export order (recommended)

Export the logo first (most visible), then header icons, then footer social, then auth/account:

| # | Slug | Node ID | Output path |
| --- | --- | --- | --- |
| 1 | `logo` | `16:3` | `public/brand/logo.png` |
| 2 | `icon-search` | `2:211` | `public/icons/header/search.png` |
| 3 | `icon-chevron-down` | `2:197` | `public/icons/header/chevron-down.png` |
| 4 | `icon-flag-canada` | `2:216` | `public/icons/header/flag-canada.png` |
| 5 | `icon-location` | `2:224` | `public/icons/header/location.png` |
| 6 | `icon-user` | `2:230` | `public/icons/header/user.png` |
| 7 | `icon-cart` | `2:233` | `public/icons/header/cart.png` |
| 8 | `icon-social-facebook` | `18:80` | `public/icons/social/facebook.png` |
| 9 | `icon-social-instagram` | `18:83` | `public/icons/social/instagram.png` |
| 10 | `icon-social-twitter` | `18:86` | `public/icons/social/twitter.png` |
| 11 | `icon-auth-apple` | `31:1250` | `public/icons/auth/apple.png` |
| 12 | `icon-auth-google` | `31:1255` | `public/icons/auth/google.png` |
| 13 | `icon-logout` | `29:544` | `public/icons/account/logout.png` |
| 14 | `hero-background` | `2:9` | `public/images/hero/background.jpg` |

Full metadata (dimensions, aliases, component usage): `manifest.json` and `context/design-assets.md`.

## After all exports

1. Set `exportedAt` in `figma-cache/assets/manifest.json` (or run `fetch-assets.py finalize` if added)
2. Clear `exportBlocker` in manifest when all assets are `exported`
3. Re-run spec 00 visual QA in Cursor browser
4. Continue with spec 01 (homepage hero)

## MCP call budget tip

Each asset = 1 `get_screenshot` call. Batch 3–5 per session if limits are tight; manifest tracks progress between sessions.
