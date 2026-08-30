# AFW Marketplace Agent Instructions

## Scope

This repository is the public-facing AFW Marketplace storefront — a Next.js application
for browsing African food products, managing a cart, checking out, and accessing a
customer account area.

Design reference lives in Figma and is cached locally under `figma-cache/`.

## Read First

Before implementing or making architectural decisions, read the following files in order:

1. `context/project-overview.md` — product goals, route map, and scope
2. `context/architecture.md` — stack, folder structure, boundaries, and invariants
3. `context/ui-context.md` — brand, tokens, typography, and layout conventions
4. `context/design-assets.md` — Figma logos and icons (node IDs, paths, export workflow)
5. `context/code-standards.md` — implementation rules and naming conventions
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes architecture, scope, or standards documented in the context
files, update the relevant file before continuing.

## Design Reference

- Figma file: [AFW-Marketplace (Storefront canvas)](https://www.figma.com/design/TRHpdrWtpLm06UPtgHYDgB/AFW-Marketplace?node-id=0-1)
- Local cache: `figma-cache/manifest.json` — frame node IDs, build order, section breakdown
- Per-frame assets: `figma-cache/storefront/<slug>/` — `meta.json`, `metadata.xml`, screenshots
- Icons and logos manifest: `figma-cache/assets/manifest.json` — export to `public/` via `fetch-assets.py`
- **Asset export runbook (read when MCP limit resets):** `figma-cache/assets/EXPORT.md`
- Design asset reference: `context/design-assets.md`
- Fetch pending design context: `python3 figma-cache/cache.py pending`
- Fetch pending icon/logo exports: `python3 figma-cache/fetch-assets.py pending`

When implementing a screen, read the matching feature spec in `context/feature-specs/`
and cross-reference the cached Figma metadata or screenshot for that frame.

If Figma design context (`design-context.tsx`) is not yet cached for a section, use
`metadata.xml` and screenshots as the reference until the Figma MCP fetch completes.

**Icons and logos:** export each asset from its Figma node via MCP `get_screenshot` — never
crop from screenshots. If `manifest.json` → `exportBlocker.status` is `blocked`, follow
`figma-cache/assets/EXPORT.md` before marking shell visual QA complete.

## Workflow

Build the storefront incrementally using the spec-driven workflow in `context/`.
Always implement against those docs and avoid inferring behavior that is not defined there.

If the Figma design and the docs conflict, record the mismatch as an open question in
`context/progress-tracker.md` before implementing.

## Scoping Rules

- Work on one feature unit at a time: one page section, one shared component, or one route
- Prefer small, verifiable increments over large changes
- Do not combine unrelated pages or component groups in a single implementation step
- A feature unit is complete when it renders correctly with mock or backend-aligned data
  end to end
- Large Figma frames (e.g. Homepage) must be built section-by-section per the manifest

## Current Feature Areas

See `figma-cache/manifest.json` → `buildOrder` and `context/feature-specs/` for the
full incremental plan. Phase 1 focuses on the desktop shopping flow:

1. Shared shell (announcement bar, header, footer)
2. Homepage sections
3. Shop catalog and product detail
4. Cart, checkout, and order confirmation
5. Mobile variants
6. Auth and account dashboard

## Handling Missing Requirements

- Do not invent behavior not defined in the context files or Figma cache
- If a requirement is ambiguous, add it to `context/progress-tracker.md` as an open
  question and resolve it before implementing
- If the design implies a feature not in `context/project-overview.md`, update the
  overview before coding the feature

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui primitives
- `figma-cache/*` — design cache (update only when refreshing Figma exports)
- Any third-party library internals

## Keeping Docs in Sync

Update the relevant context file whenever implementation produces a decision:

- New component boundaries or folder structure → `context/architecture.md`
- New color tokens, component patterns, or layout rules → `context/ui-context.md`
- New coding conventions or naming decisions → `context/code-standards.md`
- Feature progress or decisions → `context/progress-tracker.md`
- Frame/section completion → update status in `figma-cache/manifest.json`

## Before Moving to the Next Unit

1. The current unit renders correctly end to end with mock or backend-aligned data
2. No invariant defined in `context/architecture.md` was violated
3. `context/progress-tracker.md` reflects the completed work
4. TypeScript validation passes for the touched area
5. No hardcoded hex values were introduced unless captured in `context/ui-context.md`
6. No TODO comments were left in production code paths
7. **Visual QA is complete** — see Visual QA workflow below

## Visual QA (required after every implementation)

After each feature unit, verify the result in a **real environment** before starting the next unit.
Do not mark a unit complete until visual QA passes or known gaps are recorded in
`context/progress-tracker.md`.

Visual QA means one of:

### UI / layout work → Cursor browser

1. Ensure the dev server is running (`pnpm dev` → http://localhost:3000)
2. **Open the Cursor browser** and navigate to the implemented route
3. Compare the live page against the Figma reference (cached screenshot in
   `figma-cache/storefront/<slug>/screenshot.png` or the Figma file)
4. Check layout, spacing, copy, colors, interactive states, and responsive behavior
5. Fix mismatches before moving on; log the pass in `context/progress-tracker.md`

Side-by-side comparison: Cursor browser (implementation) vs Figma screenshot or Figma
desktop app. Metadata XML alone is not sufficient for sign-off.

### API / data integration work → live integration check

1. Exercise the real API path (or proxy route) end to end — not just types compiling
2. Confirm request/response shapes match the backend contract
3. Verify UI states: loading, empty, error, and success with real or staging data
4. Confirm mutations invalidate/refetch the right queries and the UI updates seamlessly

### Reference sources (supporting, not a substitute for browser/API QA)

1. `figma-cache/storefront/<slug>/screenshot.png` — design comparison target
2. `figma-cache/storefront/<slug>/sections/<section>.xml` — copy and structure
3. Figma MCP `get_design_context` when cached for the section

### QA checklist (UI)

- [ ] Opened in Cursor browser at the correct route
- [ ] Layout matches Figma (spacing, alignment, max-width 1440px, gutters)
- [ ] Copy matches Figma metadata
- [ ] Colors and typography match design intent
- [ ] Interactive states work (hover, nav, cart badge, forms)
- [ ] No console errors or broken network requests on the page

### QA checklist (API)

- [ ] Endpoint returns expected data in dev/staging
- [ ] UI renders real data without manual hacks
- [ ] Error and empty states handled
- [ ] Loading states shown during fetch

### Recording results

Log each QA pass in `context/progress-tracker.md` under **Visual QA Log**:

```
#### Spec NN — <name> (YYYY-MM-DD)
- Method: Cursor browser @ http://localhost:3000/... OR API integration @ /api/...
- Figma reference: figma-cache/... screenshot (node IDs)
- Pass: ...
- Gaps fixed: ...
- Deferred: ... (with reason)
```

If the Cursor browser is unavailable in the session, ask the user to confirm the visual
pass or retry QA when browser tools are connected. Do not skip QA silently.
