# Legacy Product Import Handoff

Use this workflow when a future AI needs to batch upload new products to the legacy catalog on the Germany server.

## Canonical Workflow

Always use the script below. Do not hand-edit `data.json` or `listing-data.json` unless the script is broken and you have explicitly reported the blocker.

- Script: `/Users/abcd/Vibecoding/website/global-castle/scripts/import_legacy_products.py`
- Legacy server: `root@178.104.6.190`
- SSH key: `/Users/abcd/.ssh/id_ed25519`
- Legacy site root: `/var/www/legacy-catalog`

## Expected Inputs

The import assumes:

- An Excel file with at least these columns:
  - `Catagory`
  - `Item`
  - `Name`
  - `Features`
  - `Material`
  - `Lid`
  - `Capacity oz`
  - `Capacity ml`
  - `Size W`
  - `Size L`
  - `Size H`
- A products root directory where each product has its own folder of images.

The script intentionally ignores the `Picture` column in the sheet.

## Hard Rules Baked Into The Script

- Folder lookup is driven by `Item`
- Images are sorted by filename
- `-1` is the default main image
- All images are converted/compressed to JPEG before upload
- The maximum image edge is capped at `1800px`
- Product description is assembled from:
  - `Features`
  - `Material`
  - `Lid`
  - `Capacity oz/ml`
  - `Size W/L/H`
- Category mappings are fixed:
  - `Stainless Steel Tumblers` -> `Steel / Tumbler`
  - `Stainless Steel Bottles` -> `Steel / Vacuum Bottle`
  - `Plastic Cup & Tumbler` -> `Plastic / Tumbler`
- The script writes `uploaded_at`
- The legacy list page sorts by `uploaded_at` descending, so newest uploads appear first

## Required Run Order

1. Run a dry run first.
2. Read the output carefully.
3. If there are no missing folders, category blockers, or image errors, run the real import.
4. After import, spot-check a few products online.

## Dry Run Command

```bash
python3 /Users/abcd/Vibecoding/website/global-castle/scripts/import_legacy_products.py \
  --xlsx "/Users/abcd/Vibecoding/website/item list ready.xlsx" \
  --products-root "/Users/abcd/Vibecoding/website/products" \
  --dry-run
```

## Real Import Command

```bash
python3 /Users/abcd/Vibecoding/website/global-castle/scripts/import_legacy_products.py \
  --xlsx "/Users/abcd/Vibecoding/website/item list ready.xlsx" \
  --products-root "/Users/abcd/Vibecoding/website/products"
```

## If A Different Sheet Is Used

Only change:

- `--xlsx`
- `--products-root` if the image root moved

Do not change script logic unless the data format itself changed.

## Validation Checklist

After a real import:

- Confirm the script reports `Remote import complete`
- Confirm a few new image URLs return `200`
- Confirm a few product codes exist in `https://legacy.cnurbaneco.com/listing-data.json`
- Confirm the latest uploaded products appear first on the list page

## Failure Policy

If dry run fails:

- Stop
- Report the exact missing product codes or category issues
- Do not guess
- Do not manually patch server JSON as a shortcut

If real import partially fails after image upload:

- Re-run the same command after explaining what failed
- The script is designed to be idempotent for the same product codes
