#!/usr/bin/env python3
"""Download Figma-exported icons and logos into public/ from MCP asset URLs."""

from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

CACHE_ROOT = Path(__file__).resolve().parent
ASSETS_MANIFEST = CACHE_ROOT / "assets" / "manifest.json"
REPO_ROOT = CACHE_ROOT.parent


def load_assets() -> dict:
    return json.loads(ASSETS_MANIFEST.read_text())


def save_assets(data: dict) -> None:
    ASSETS_MANIFEST.write_text(json.dumps(data, indent=2) + "\n")


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(url, headers={"User-Agent": "afw-marketplace/1.0"})
    with urllib.request.urlopen(request) as response:
        data = response.read()
    if len(data) < 100:
        raise RuntimeError(f"Download too small ({len(data)} bytes) — URL may have expired")
    dest.write_bytes(data)
    print(f"saved {dest.relative_to(REPO_ROOT)} ({len(data)} bytes)")


def apply(slug: str, url: str) -> None:
    data = load_assets()
    asset = next((a for a in data["assets"] if a["slug"] == slug), None)
    if not asset:
        print(f"Unknown asset slug: {slug}")
        sys.exit(1)
    dest = REPO_ROOT / asset["path"]
    download(url, dest)
    asset["status"] = "exported"
    asset["sourceUrl"] = url
    save_assets(data)


def pending() -> None:
    data = load_assets()
    pending_assets = [a for a in data["assets"] if a.get("status") != "exported"]
    for asset in pending_assets:
        print(
            f"{asset['slug']:25} {asset['nodeId']:8} -> {asset['path']}"
        )
    print(f"\n{len(pending_assets)} assets pending export")
    print("\nFor each asset, run Figma MCP get_screenshot:")
    print(f"  fileKey: {data['fileKey']}")
    print("  nodeId:  <from list above>")
    print("Then: python3 figma-cache/fetch-assets.py apply <slug> <image_url>")


def status() -> None:
    data = load_assets()
    exported = [a for a in data["assets"] if a.get("status") == "exported"]
    pending_assets = [a for a in data["assets"] if a.get("status") != "exported"]
    blocker = data.get("exportBlocker", {})
    print(f"Exported: {len(exported)}/{len(data['assets'])}")
    if blocker:
        print(
            f"Blocker: {blocker.get('status', 'none')} — {blocker.get('reason', '')}"
        )
        if blocker.get("retryInstructions"):
            print(f"Runbook: {blocker['retryInstructions']}")
    if pending_assets:
        print("\nPending:")
        for asset in pending_assets:
            print(f"  {asset['slug']} ({asset['nodeId']})")


def finalize() -> None:
    data = load_assets()
    pending_assets = [a for a in data["assets"] if a.get("status") != "exported"]
    if pending_assets:
        print(f"Cannot finalize: {len(pending_assets)} assets still pending")
        sys.exit(1)
    from datetime import date

    data["exportedAt"] = date.today().isoformat()
    data.pop("exportBlocker", None)
    save_assets(data)
    print("All assets exported. exportBlocker cleared.")


def next_asset() -> None:
    data = load_assets()
    pending_assets = [a for a in data["assets"] if a.get("status") != "exported"]
    if not pending_assets:
        print("All assets exported.")
        return
    asset = pending_assets[0]
    print(json.dumps(asset, indent=2))
    print(f"\nFigma MCP get_screenshot nodeId: {asset['nodeId']}")


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: fetch-assets.py [pending|next|status|finalize|apply <slug> <url>]")
        sys.exit(1)

    command = sys.argv[1]
    if command == "pending":
        pending()
    elif command == "status":
        status()
    elif command == "finalize":
        finalize()
    elif command == "next":
        next_asset()
    elif command == "apply":
        if len(sys.argv) != 4:
            print("Usage: fetch-assets.py apply <slug> <mcp-asset-url>")
            sys.exit(1)
        apply(sys.argv[2], sys.argv[3])
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()
