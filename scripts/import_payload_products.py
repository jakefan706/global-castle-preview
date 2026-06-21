#!/usr/bin/env python3
"""
Payload CMS Product Bulk Importer
Reads Excel + local images → Payload REST API → products in DB

Usage:
  python import_payload_products.py --dry-run         # preview only
  python import_payload_products.py                   # live import
  python import_payload_products.py --skip-images     # skip already-uploaded media
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

import pandas as pd
import requests

# ── Config ────────────────────────────────────────────────────────────────────
PAYLOAD_URL = "http://localhost:3002"
EMAIL = "ivan@cnurbaneco.com"
PASSWORD = "287100"

EXCEL_PATH = "/tmp/import_data/item list ready.xlsx"
IMAGES_BASE = "/tmp/import_data/images"

# Category slug → Payload DB id mapping (from: SELECT id,slug FROM categories)
CATEGORY_MAP = {
    "stainless-steel-bottles": 2,
    "stainless-steel-tumblers": 3,
    "plastic-bottles": 4,
    "plastic-cup-tumbler": 5,
    "aluminum-bottles": 6,
    "ceramic-mugs": 7,
    "glass-bottles-mugs": 8,
    "food-containers": 9,
    "accessories": 10,
    "eco-friendly": 11,
    "tech": 12,
}

# Excel Category column value → category slug
CATEGORY_NAME_MAP = {
    "Stainless Steel Bottles": "stainless-steel-bottles",
    "Stainless Steel Tumblers": "stainless-steel-tumblers",
    "Stainless Steel Tumblers ": "stainless-steel-tumblers",
    "Plastic Bottles": "plastic-bottles",
    "Plastic Cup & Tumbler": "plastic-cup-tumbler",
    "Aluminum Bottles": "aluminum-bottles",
    "Ceramic Mugs": "ceramic-mugs",
    "Glass Bottles & Mugs": "glass-bottles-mugs",
    "Food Containers": "food-containers",
    "Accessories": "accessories",
    "Eco-Friendly": "eco-friendly",
    "TECH": "tech",
}

# Excel Material column → Payload select value
MATERIAL_MAP = {
    "Stainless Steel": "stainless-steel",
    "Aluminum": "aluminum",
    "Plastic": "plastic",
    "Ceramic": "ceramic",
    "Glass": "glass",
    "Other": "other",
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def login(session: requests.Session) -> str:
    r = session.post(f"{PAYLOAD_URL}/api/users/login", json={"email": EMAIL, "password": PASSWORD})
    r.raise_for_status()
    data = r.json()
    token = data.get("token")
    if not token:
        raise RuntimeError(f"Login failed: {data}")
    print(f"[AUTH] Logged in as {data['user']['email']}")
    return token


def build_richtext_bullets(text: str) -> dict:
    """Convert newline-separated text into Payload Lexical rich text with bullet list."""
    if not text or str(text).strip() == "" or str(text).lower() == "nan":
        return None
    
    lines = [l.strip() for l in str(text).split("\n") if l.strip()]
    
    if not lines:
        return None
    
    # Payload Lexical rich text format
    children = []
    for line in lines:
        children.append({
            "type": "listitem",
            "version": 1,
            "value": 1,
            "indent": 0,
            "direction": "ltr",
            "children": [{"type": "text", "text": line, "version": 1}],
        })
    
    return {
        "root": {
            "type": "root",
            "version": 1,
            "indent": 0,
            "direction": "ltr",
            "children": [
                {
                    "type": "list",
                    "listType": "bullet",
                    "version": 1,
                    "indent": 0,
                    "direction": "ltr",
                    "start": 1,
                    "tag": "ul",
                    "children": children,
                }
            ],
        }
    }


def build_richtext_specs(row: pd.Series) -> dict | None:
    """Build Technical Specifications rich text from capacity/size/lid columns."""
    specs = []
    
    def safestr(val):
        if pd.isna(val) or str(val).strip() in ("", "nan", "N/A", "-"):
            return ""
        return str(val).strip()
    
    # Collect capacity (oz + ml)
    oz_val = ""
    ml_val = ""
    for col in row.index:
        c = str(col).lower().strip()
        if "oz" in c or ("capacity" in c and "oz" in c):
            oz_val = safestr(row[col])
        if "ml" in c or ("capacity" in c and "ml" in c):
            ml_val = safestr(row[col])
        if c == "capacity\noz":
            oz_val = safestr(row[col])
        if c == "capacity\nml":
            ml_val = safestr(row[col])
    
    cap_parts = []
    if oz_val:
        cap_parts.append(f"{oz_val}oz")
    if ml_val:
        cap_parts.append(f"{ml_val}ml")
    if cap_parts:
        specs.append(f"Capacity: {' / '.join(cap_parts)}")
    
    # Collect size W x L x H
    size_w = size_l = size_h = ""
    for col in row.index:
        c = str(col).lower().strip()
        val = safestr(row[col])
        if c == "size w":
            size_w = val
        elif c == "size l":
            size_l = val
        elif c == "size h":
            size_h = val
    
    size_parts = [v for v in [size_w, size_l, size_h] if v]
    if size_parts:
        specs.append(f"Size (W × L × H): {' × '.join(size_parts)}")
    
    # Lid
    for col in row.index:
        if "lid" in str(col).lower():
            val = safestr(row[col])
            if val:
                specs.append(f"Lid Type: {val}")
                break
    
    # Material (from Material column)
    for col in row.index:
        if str(col).strip().lower() == "material" or str(col).strip().lower() == "material ":
            val = safestr(row[col])
            if val:
                specs.append(f"Material: {val}")
                break
    
    if not specs:
        return None
    
    para_children = []
    for i, spec in enumerate(specs):
        if i > 0:
            para_children.append({"type": "linebreak", "version": 1})
        para_children.append({"type": "text", "text": spec, "version": 1})
    
    return {
        "root": {
            "type": "root",
            "version": 1,
            "indent": 0,
            "direction": "ltr",
            "children": [
                {
                    "type": "paragraph",
                    "version": 1,
                    "indent": 0,
                    "direction": "ltr",
                    "children": para_children,
                    "textFormat": 0,
                }
            ],
        }
    }


def upload_image(session: requests.Session, token: str, image_path: Path, dry_run: bool) -> int | None:
    """Upload a single image to Payload media collection. Returns media ID."""
    if dry_run:
        print(f"  [DRY] Would upload: {image_path.name}")
        return None
    
    if not image_path.exists():
        print(f"  [WARN] Image not found: {image_path}")
        return None
    
    mime = "image/jpeg"
    if image_path.suffix.lower() == ".png":
        mime = "image/png"
    elif image_path.suffix.lower() == ".webp":
        mime = "image/webp"
    
    with open(image_path, "rb") as f:
        r = session.post(
            f"{PAYLOAD_URL}/api/media",
            headers={"Authorization": f"JWT {token}"},
            files={"file": (image_path.name, f, mime)},
            data={"alt": image_path.stem},
        )
    
    if r.status_code in (200, 201):
        media_id = r.json().get("doc", {}).get("id") or r.json().get("id")
        print(f"  [OK] Uploaded {image_path.name} → media ID {media_id}")
        return media_id
    else:
        print(f"  [ERR] Upload failed ({r.status_code}): {image_path.name} — {r.text[:200]}")
        return None


def find_product_images(item_number: str) -> list[Path]:
    """Find all images for a product by item number, sorted (main first)."""
    base = Path(IMAGES_BASE)
    found = []
    
    # Search all subdirectories
    for img_dir in base.rglob(item_number):
        if img_dir.is_dir():
            imgs = sorted([
                f for f in img_dir.iterdir()
                if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp") and not f.name.startswith(".")
            ])
            found.extend(imgs)
    
    # If not found by exact dir name, try prefix match
    if not found:
        for img_dir in base.rglob("*"):
            if img_dir.is_dir() and img_dir.name.upper() == item_number.upper():
                imgs = sorted([
                    f for f in img_dir.iterdir()
                    if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp") and not f.name.startswith(".")
                ])
                found.extend(imgs)
    
    # Sort: files ending in -1 first
    def sort_key(p):
        stem = p.stem
        if stem.endswith("-1") or stem.endswith("_1") or stem[-1] == "1":
            return (0, stem)
        return (1, stem)
    
    found.sort(key=sort_key)
    return found


def check_existing_product(session: requests.Session, token: str, item_number: str) -> int | None:
    """Check if product with itemNumber already exists, return ID if so."""
    r = session.get(
        f"{PAYLOAD_URL}/api/products",
        headers={"Authorization": f"JWT {token}"},
        params={"where[itemNumber][equals]": item_number, "limit": 1},
    )
    if r.status_code == 200:
        docs = r.json().get("docs", [])
        if docs:
            return docs[0]["id"]
    return None


def import_product(session: requests.Session, token: str, row: pd.Series, dry_run: bool) -> bool:
    """Import a single product row. Returns True on success."""
    
    # ── Extract fields ─────────────────────────────────────────────────────
    def get(col_options, default=""):
        for col in col_options:
            for c in row.index:
                # Match both exact and stripped column names
                if str(c).strip().lower() == col.strip().lower() or str(c).lower() == col.lower():
                    val = row[c]
                    if pd.notna(val) and str(val).strip() not in ("", "nan"):
                        return str(val).strip()
        return default
    
    name = get(["Name", "Product Name", "name"])
    item_number = get(["Item Number", "ItemNumber", "Item No", "SKU", "Model", "Item", "Item "])
    category_raw = get(["Category", "category", "Catagory", "catagory"])
    material_raw = get(["Material", "material", "Material "])
    moq = get(["MOQ", "Min Order", "Min. Order", "customizeMOQ"])
    features_raw = get(["Features", "features", "Description", "description"])
    
    if not name or not item_number:
        print(f"[SKIP] Missing name or item number: name='{name}' item='{item_number}'")
        return False
    
    print(f"\n{'='*60}")
    print(f"[PRODUCT] {item_number} — {name}")
    
    # ── Category ───────────────────────────────────────────────────────────
    cat_slug = CATEGORY_NAME_MAP.get(category_raw, "")
    category_id = CATEGORY_MAP.get(cat_slug)
    if not category_id:
        # Try partial match
        for k, v in CATEGORY_NAME_MAP.items():
            if category_raw.lower() in k.lower() or k.lower() in category_raw.lower():
                cat_slug = v
                category_id = CATEGORY_MAP.get(cat_slug)
                break
    
    if not category_id:
        print(f"  [WARN] Unknown category: '{category_raw}', defaulting to Stainless Steel Tumblers (3)")
        category_id = 3
    else:
        print(f"  Category: {category_raw} → ID {category_id}")
    
    # ── Material ───────────────────────────────────────────────────────────
    material = MATERIAL_MAP.get(material_raw, "stainless-steel")
    
    # ── Rich Text ─────────────────────────────────────────────────────────
    features_rt = build_richtext_bullets(features_raw)
    specs_rt = build_richtext_specs(row)
    
    # ── Images ─────────────────────────────────────────────────────────────
    images = find_product_images(item_number)
    print(f"  Images found: {len(images)}")
    for img in images:
        print(f"    {img}")
    
    if dry_run:
        print(f"  [DRY] Would create product: name='{name}' itemNumber='{item_number}'")
        print(f"  [DRY] Features lines: {len(features_raw.splitlines()) if features_raw else 0}")
        print(f"  [DRY] Images to upload: {len(images)}")
        return True
    
    # ── Check existing ─────────────────────────────────────────────────────
    existing_id = check_existing_product(session, token, item_number)
    if existing_id:
        print(f"  [SKIP] Product {item_number} already exists (ID {existing_id}), skipping")
        return True
    
    # ── Upload images ──────────────────────────────────────────────────────
    main_image_id = None
    gallery_ids = []
    
    for i, img_path in enumerate(images):
        media_id = upload_image(session, token, img_path, dry_run=False)
        if media_id:
            if i == 0:
                main_image_id = media_id
            else:
                gallery_ids.append(media_id)
        time.sleep(0.3)  # be gentle
    
    if not main_image_id:
        print(f"  [WARN] No main image uploaded for {item_number}")
    
    # ── Build payload ──────────────────────────────────────────────────────
    product_data = {
        "name": name,
        "itemNumber": item_number,
        "category": category_id,
        "material": material,
        "isPublished": True,
        "featured": False,
        "classic": False,
        "newArrival": False,
    }
    
    if moq:
        product_data["customizeMOQ"] = moq
    
    if main_image_id:
        product_data["mainImage"] = main_image_id
    
    if gallery_ids:
        product_data["gallery"] = [{"image": gid} for gid in gallery_ids]
    
    if features_rt:
        product_data["description"] = features_rt
    
    if specs_rt:
        product_data["specifications"] = specs_rt
    
    # ── Create product ─────────────────────────────────────────────────────
    r = session.post(
        f"{PAYLOAD_URL}/api/products",
        headers={
            "Authorization": f"JWT {token}",
            "Content-Type": "application/json",
        },
        json=product_data,
    )
    
    if r.status_code in (200, 201):
        prod_id = r.json().get("doc", {}).get("id") or r.json().get("id")
        print(f"  [OK] Created product ID {prod_id} — {item_number}: {name}")
        return True
    else:
        print(f"  [ERR] Failed to create {item_number} ({r.status_code}): {r.text[:300]}")
        return False


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Preview without making changes")
    parser.add_argument("--limit", type=int, default=0, help="Only process first N rows")
    parser.add_argument("--item", type=str, default="", help="Only process one item number")
    args = parser.parse_args()
    
    dry_run = args.dry_run
    if dry_run:
        print("[MODE] DRY RUN — no changes will be made\n")
    
    # Load Excel
    df = pd.read_excel(EXCEL_PATH)
    df = df.dropna(how="all")  # drop empty rows
    print(f"[EXCEL] Loaded {len(df)} rows, columns: {list(df.columns)}")
    
    if args.limit:
        df = df.head(args.limit)
        print(f"[LIMIT] Processing first {args.limit} rows only")
    
    if args.item:
        mask = df.apply(lambda r: any(str(r[c]).strip().upper() == args.item.upper() 
                                       for c in df.columns if "item" in str(c).lower() or "number" in str(c).lower() or "sku" in str(c).lower()), axis=1)
        df = df[mask]
        print(f"[FILTER] Filtered to item: {args.item} ({len(df)} rows)")
    
    # Auth
    session = requests.Session()
    token = login(session)
    
    # Process
    success = 0
    failed = 0
    skipped = 0
    
    for idx, row in df.iterrows():
        try:
            ok = import_product(session, token, row, dry_run)
            if ok:
                success += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"[EXCEPTION] Row {idx}: {e}")
            import traceback
            traceback.print_exc()
            failed += 1
        
        time.sleep(0.5)  # rate limit
    
    print(f"\n{'='*60}")
    print(f"[DONE] Success: {success} | Skipped: {skipped} | Failed: {failed}")
    print(f"Total rows processed: {len(df)}")


if __name__ == "__main__":
    main()
