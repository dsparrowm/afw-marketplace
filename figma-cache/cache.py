#!/usr/bin/env python3
"""Extract per-frame metadata from the cached Figma XML and manage incremental fetches."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

CACHE_ROOT = Path(__file__).resolve().parent
MANIFEST = CACHE_ROOT / "manifest.json"
METADATA_XML = CACHE_ROOT / "storefront" / "metadata.xml"


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


def write_frame_metadata(slug: str, frame: dict, xml: str) -> None:
    frame_dir = CACHE_ROOT / "storefront" / slug
    frame_dir.mkdir(parents=True, exist_ok=True)

    meta = {k: v for k, v in frame.items() if k != "sections"}
    meta["slug"] = slug
    meta_path = frame_dir / "meta.json"
    meta_path.write_text(json.dumps(meta, indent=2) + "\n")

    subtree = extract_frame_xml(frame["nodeId"], xml)
    if subtree:
        (frame_dir / "metadata.xml").write_text(subtree + "\n")

    sections = frame.get("sections", [])
    if sections:
        sections_dir = frame_dir / "sections"
        sections_dir.mkdir(exist_ok=True)
        for section in sections:
            section_meta = {**section, "parentSlug": slug, "parentNodeId": frame["nodeId"]}
            (sections_dir / f"{section['slug']}.json").write_text(
                json.dumps(section_meta, indent=2) + "\n"
            )
            section_xml = extract_frame_xml(section["nodeId"], xml)
            if section_xml:
                (sections_dir / f"{section['slug']}.xml").write_text(section_xml + "\n")


def list_pending_design_context() -> list[dict]:
    """Return frames/sections missing design-context.tsx."""
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


def main() -> None:
    command = sys.argv[1] if len(sys.argv) > 1 else "extract"

    if command == "extract":
        manifest = load_manifest()
        xml = METADATA_XML.read_text()
        for slug, frame in manifest["frames"].items():
            write_frame_metadata(slug, frame, xml)
        print(f"Extracted metadata for {len(manifest['frames'])} frames")

    elif command == "pending":
        pending = list_pending_design_context()
        for item in pending:
            if item["type"] == "frame":
                print(f"frame  {item['slug']:25} {item['nodeId']:8} {item['name']}")
            else:
                print(
                    f"section {item['slug']}/{item['sectionSlug']:20} "
                    f"{item['nodeId']:8} {item['name']}"
                )
        print(f"\n{len(pending)} items pending design-context fetch")

    elif command == "next":
        pending = list_pending_design_context()
        if not pending:
            print("All design contexts cached.")
            return
        item = pending[0]
        print(json.dumps(item, indent=2))
        print(
            f"\nFetch with Figma MCP get_design_context:"
            f"\n  fileKey: TRHpdrWtpLm06UPtgHYDgB"
            f"\n  nodeId:  {item['nodeId']}"
        )

    else:
        print(f"Unknown command: {command}")
        print("Usage: cache.py [extract|pending|next]")
        sys.exit(1)


if __name__ == "__main__":
    main()
