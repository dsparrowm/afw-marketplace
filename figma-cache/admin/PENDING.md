# Admin Figma cache — pending fetches

Page: **Admin** (`71:2`)  
File: [AFW-Marketplace](https://www.figma.com/design/TRHpdrWtpLm06UPtgHYDgB/AFW-Marketplace?node-id=71-2)

## Done

- [x] Frame index (13 frames, node IDs, sizes) in `manifest.json` → `adminFrames`
- [x] Per-frame `meta.json` under `figma-cache/admin/<slug>/`
- [x] Section map for every frame (`sidebar` + `main`) → `sections/*.json`
- [x] All 13 frame screenshots → `admin/<slug>/screenshot.png` (user upload 2026-09-08)
- [x] Page `metadata.xml` (2026-09-10) — full Admin canvas from `get_metadata` on `71:2`
- [x] Per-frame + per-section `metadata.xml` extracted via `cache.py extract admin` (13 frames, 26 sections)
- [x] `cache.py` supports `extract|pending|next admin`

### Section node IDs

| Slug | sidebar | main |
|------|---------|------|
| overview | `72:9` | `72:54` |
| products | `72:204` | `72:249` |
| inventory | `72:401` | `72:446` |
| orders-and-delivery | `72:579` | `72:624` |
| financials | `72:790` | `72:835` |
| promotions | `72:1239` | `72:1296` |
| customers | `72:1409` | `72:1466` |
| access | `72:1590` | `72:1647` |
| settings | `72:1735` | `72:1792` |
| product-detail-admin | `78:60` | `79:39` |
| add-edit-product-form | `78:138` | `79:178` |
| delivery-tracking | `78:248` | `79:380` |
| transaction-receipt | `78:303` | `79:514` |

## Still pending — design-context

`get_design_context` hit Starter MCP rate limit again immediately after the successful metadata fetch (2026-09-10).

When quota resets, fetch sections (prefer `main`, plus one shared `sidebar`):

```
get_design_context
  fileKey: TRHpdrWtpLm06UPtgHYDgB
  nodeId:  <section nodeId>
  skillNames: resource:figma-design-to-code
  clientLanguages: typescript
  clientFrameworks: react,next
  excludeScreenshot: true   # screenshots already cached
```

Save code to:
- Shared sidebar (once): `admin/overview/sections/sidebar.tsx` (or `admin/_shared/sidebar.tsx`)
- Each main: `admin/<slug>/sections/main.tsx`
- Optional full frame: `admin/<slug>/design-context.tsx`

Priority order: overview main → products main → shared sidebar → remaining mains.

## Status check

```bash
python3 figma-cache/cache.py pending admin
python3 figma-cache/cache.py next admin
```
