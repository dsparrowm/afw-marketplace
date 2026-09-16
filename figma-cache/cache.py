#!/usr/bin/env python3
"""Extract per-frame metadata from cached Figma XML and manage incremental fetches.

Supports Storefront (`figma-cache/storefront/`) and Admin (`figma-cache/admin/`) canvases.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

CACHE_ROOT = Path(__file__).resolve().parent
MANIFEST = CACHE_ROOT / "manifest.json"
STOREFRONT_METADATA_XML = CACHE_ROOT / "storefront" / "metadata.xml"
ADMIN_METADATA_XML = CACHE_ROOT / "admin" / "metadata.xml"


def load_manifest() -> dict:
    return json.loads(MANIFEST.read_text())


def extract_frame_xml(node_id: str, xml: str) -> str | None:
    """Extract a frame subtree by node id from the metadata XML."""
    tag_pattern = re.compile(
        rf'<frame id="{re.escape(node_id)}"[^>]*/?>',
        re.IGNORECASE,
    )
    match = tag_pattern.search(xml)
    if not match:
        return None

    tag = match.group(0)
    if tag.endswith("/>"):
        return tag

    start = match.start()
    depth = 0
    i = match.start()
    while i < len(xml):
        if xml[i : i + 7] == "<frame ":
            tag_end = xml.find(">", i)
            if tag_end == -1:
                return None
            if xml[tag_end - 1] == "/":
                i = tag_end + 1
                continue
            depth += 1
            i = tag_end + 1
            continue
        if xml[i : i + 8] == "</frame>":
            depth -= 1
            if depth == 0:
                return xml[start : i + 8]
            i += 8
            continue
        i += 1
    return None


def write_frame_metadata(
    canvas: str,
    slug: str,
    frame: dict,
    xml: str | None,
) -> None:
    frame_dir = CACHE_ROOT / canvas / slug
    frame_dir.mkdir(parents=True, exist_ok=True)

    meta = {k: v for k, v in frame.items() if k != "sections"}
    meta["slug"] = slug
    meta["canvas"] = canvas
    meta_path = frame_dir / "meta.json"
    meta_path.write_text(json.dumps(meta, indent=2) + "\n")

    if xml:
        subtree = extract_frame_xml(frame["nodeId"], xml)
        if subtree:
            (frame_dir / "metadata.xml").write_text(subtree + "\n")

    sections = frame.get("sections", [])
    if sections and xml:
        sections_dir = frame_dir / "sections"
        sections_dir.mkdir(exist_ok=True)
        for section in sections:
            section_meta = {
                **section,
                "parentSlug": slug,
                "parentNodeId": frame["nodeId"],
                "canvas": canvas,
            }
            (sections_dir / f"{section['slug']}.json").write_text(
                json.dumps(section_meta, indent=2) + "\n"
            )
            section_xml = extract_frame_xml(section["nodeId"], xml)
            if section_xml:
                (sections_dir / f"{section['slug']}.xml").write_text(
                    section_xml + "\n"
                )


def list_pending_for_canvas(
    canvas: str,
    frames: dict,
) -> list[dict]:
    """Return frames/sections missing metadata.xml, screenshot, or design-context."""
    pending: list[dict] = []

    for slug, frame in frames.items():
        frame_dir = CACHE_ROOT / canvas / slug
        meta_xml = frame_dir / "metadata.xml"
        screenshot = frame_dir / "screenshot.png"
        design_ctx = frame_dir / "design-context.tsx"

        if not meta_xml.exists():
            pending.append(
                {
                    "type": "metadata",
                    "canvas": canvas,
                    "slug": slug,
                    "nodeId": frame["nodeId"],
                    "name": frame["name"],
                }
            )
        if not screenshot.exists():
            pending.append(
                {
                    "type": "screenshot",
                    "canvas": canvas,
                    "slug": slug,
                    "nodeId": frame["nodeId"],
                    "name": frame["name"],
                }
            )
        if not design_ctx.exists():
            pending.append(
                {
                    "type": "design-context",
                    "canvas": canvas,
                    "slug": slug,
                    "nodeId": frame["nodeId"],
                    "name": frame["name"],
                }
            )

        for section in frame.get("sections", []):
            section_path = frame_dir / "sections" / f"{section['slug']}.tsx"
            if not section_path.exists():
                pending.append(
                    {
                        "type": "section",
                        "canvas": canvas,
                        "slug": slug,
                        "sectionSlug": section["slug"],
                        "nodeId": section["nodeId"],
                        "name": section["name"],
                    }
                )

    return pending


def list_pending_design_context() -> list[dict]:
    """Storefront-compatible pending list (design-context only)."""
    manifest = load_manifest()
    pending: list[dict] = []

    for slug, frame in manifest["frames"].items():
        frame_dir = CACHE_ROOT / "storefront" / slug
        if not (frame_dir / "design-context.tsx").exists():
            pending.append(
                {
                    "type": "frame",
                    "slug": slug,
                    "nodeId": frame["nodeId"],
                    "name": frame["name"],
                }
            )

        for section in frame.get("sections", []):
            section_path = frame_dir / "sections" / f"{section['slug']}.tsx"
            if not section_path.exists():
                pending.append(
                    {
                        "type": "section",
                        "slug": slug,
                        "sectionSlug": section["slug"],
                        "nodeId": section["nodeId"],
                        "name": section["name"],
                    }
                )

    return pending


def list_pending_admin() -> list[dict]:
    manifest = load_manifest()
    return list_pending_for_canvas("admin", manifest.get("adminFrames", {}))


def main() -> None:
    command = sys.argv[1] if len(sys.argv) > 1 else "extract"
    scope = sys.argv[2] if len(sys.argv) > 2 else "all"

    if command == "extract":
        manifest = load_manifest()
        count = 0
        if scope in ("all", "storefront"):
            xml = (
                STOREFRONT_METADATA_XML.read_text()
                if STOREFRONT_METADATA_XML.exists()
                else None
            )
            if xml:
                for slug, frame in manifest["frames"].items():
                    write_frame_metadata("storefront", slug, frame, xml)
                    count += 1
            else:
                print("warn: storefront/metadata.xml missing — skipped storefront extract")
        if scope in ("all", "admin"):
            xml = (
                ADMIN_METADATA_XML.read_text()
                if ADMIN_METADATA_XML.exists()
                else None
            )
            for slug, frame in manifest.get("adminFrames", {}).items():
                write_frame_metadata("admin", slug, frame, xml)
                count += 1
            if not xml:
                print(
                    "warn: admin/metadata.xml missing — wrote meta.json only; "
                    "fetch page metadata when MCP limit resets"
                )
        print(f"Extracted / refreshed metadata for {count} frames (scope={scope})")

    elif command == "pending":
        if scope in ("all", "storefront"):
            pending = list_pending_design_context()
            print("=== storefront design-context ===")
            for item in pending:
                if item["type"] == "frame":
                    print(f"frame  {item['slug']:25} {item['nodeId']:8} {item['name']}")
                else:
                    print(
                        f"section {item['slug']}/{item['sectionSlug']:20} "
                        f"{item['nodeId']:8} {item['name']}"
                    )
            print(f"{len(pending)} storefront items pending\n")
        if scope in ("all", "admin"):
            pending = list_pending_admin()
            print("=== admin cache ===")
            for item in pending:
                extra = (
                    f"/{item['sectionSlug']}"
                    if item["type"] == "section"
                    else ""
                )
                print(
                    f"{item['type']:15} {item['slug']}{extra:30} "
                    f"{item['nodeId']:8} {item['name']}"
                )
            print(f"{len(pending)} admin items pending")

    elif command == "next":
        target = scope if scope in ("storefront", "admin") else "admin"
        if target == "admin":
            pending = list_pending_admin()
        else:
            pending = list_pending_design_context()
        if not pending:
            print(f"All {target} cache items complete.")
            return
        item = pending[0]
        print(json.dumps(item, indent=2))
        print(
            f"\nFetch with Figma MCP:"
            f"\n  fileKey: TRHpdrWtpLm06UPtgHYDgB"
            f"\n  nodeId:  {item['nodeId']}"
            f"\n  tools:   get_metadata (page 71:2 or frame) / get_screenshot"
        )

    else:
        print(f"Unknown command: {command}")
        print("Usage: cache.py [extract|pending|next] [all|storefront|admin]")
        sys.exit(1)


if __name__ == "__main__":
    main()
