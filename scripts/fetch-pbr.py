#!/usr/bin/env python3
"""Download CC0 Poly Haven PBR textures, HDRI, and glTF prop packs."""

from __future__ import annotations

import json
import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CTX = ssl.create_default_context()
UA = {"User-Agent": "kabile-savaslari/1.0"}


def get_json(url: str):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60, context=CTX) as response:
        return json.loads(response.read().decode())


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 64:
        print(f"skip {dest.relative_to(ROOT)}")
        return
    print(f"get  {url.split('/')[-1]} -> {dest.relative_to(ROOT)}")
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=120, context=CTX) as response:
        dest.write_bytes(response.read())


def pick_map(files: dict, *names: str) -> str | None:
    for name in names:
        block = files.get(name)
        if not isinstance(block, dict):
            continue
        res = block.get("1k") or block.get("2k")
        if isinstance(res, dict) and "jpg" in res:
            return res["jpg"]["url"]
    return None


def fetch_texture(asset_id: str, folder: str) -> None:
    files = get_json(f"https://api.polyhaven.com/files/{asset_id}")
    dest = ROOT / "public" / "pbr" / folder
    mapping = {
        "diff.jpg": pick_map(files, "Diffuse", "diff"),
        "nor.jpg": pick_map(files, "nor_gl", "nor_dx"),
        "rough.jpg": pick_map(files, "Rough", "rough"),
    }
    for name, url in mapping.items():
        if not url:
            raise SystemExit(f"missing {name} for {asset_id}")
        download(url, dest / name)


def fetch_hdri(asset_id: str, dest_name: str) -> None:
    files = get_json(f"https://api.polyhaven.com/files/{asset_id}")
    url = files["hdri"]["1k"]["hdr"]["url"]
    download(url, ROOT / "public" / "hdri" / dest_name)


def collect_jpg_urls(files: dict) -> dict[str, str]:
    found: dict[str, str] = {}
    for block in files.values():
        if not isinstance(block, dict):
            continue
        res = block.get("1k") or {}
        jpg = res.get("jpg") if isinstance(res, dict) else None
        if isinstance(jpg, dict) and jpg.get("url"):
            found[jpg["url"].rsplit("/", 1)[-1]] = jpg["url"]
    return found


def fetch_gltf(asset_id: str, folder: str) -> None:
    files = get_json(f"https://api.polyhaven.com/files/{asset_id}")
    gltf_url = files["gltf"]["1k"]["gltf"]["url"]
    dest_dir = ROOT / "public" / "models" / folder
    dest_gltf = dest_dir / f"{folder}.gltf"
    download(gltf_url, dest_gltf)
    data = json.loads(dest_gltf.read_text())
    base = gltf_url.rsplit("/", 1)[0]
    jpgs = collect_jpg_urls(files)
    for buffer in data.get("buffers", []):
        uri = buffer.get("uri")
        if uri and not uri.startswith("data:"):
            download(f"{base}/{uri}", dest_dir / uri)
    for image in data.get("images", []):
        uri = image.get("uri")
        if not uri or uri.startswith("data:"):
            continue
        name = uri.rsplit("/", 1)[-1]
        url = jpgs.get(name)
        if not url:
            raise SystemExit(f"no jpg for {asset_id} {name}")
        download(url, dest_dir / uri)


def main() -> None:
    textures = {
        "castle_brick_01": "stone",
        "medieval_wall_02": "wall",
        "clay_roof_tiles_02": "roof",
        "oak_wood_planks": "wood",
        "plastered_wall_04": "plaster",
        "cobblestone_floor_04": "cobble",
        "forest_ground_05": "ground",
        "wooden_barrel": "barrel",
        "medieval_wood": "beam",
    }
    for asset_id, folder in textures.items():
        fetch_texture(asset_id, folder)

    fetch_hdri("courtyard", "courtyard.hdr")

    models = {
        "cannon_01": "cannon",
        "Lantern_01": "lantern",
        "CheeseBox_01": "crate",
        "boulder_01": "boulder",
        "barrel_stove": "stove",
        "WoodenTable_01": "table",
    }
    for asset_id, folder in models.items():
        fetch_gltf(asset_id, folder)
    print("done")


if __name__ == "__main__":
    main()
