# Prompt For Future AI

Use `/Users/abcd/Vibecoding/website/global-castle/scripts/import_legacy_products.py` and follow `/Users/abcd/Vibecoding/website/global-castle/docs/legacy-product-import-handoff.md`.

Task:

1. Read the handoff file first.
2. Run the import script in `--dry-run` mode against the provided Excel sheet and products image root.
3. If dry run reports no blockers, run the real import.
4. Do not manually edit `data.json` or `listing-data.json` unless the script fails and you clearly explain why.
5. After import, verify:
   - a few uploaded images return `200`
   - a few imported product codes appear in `listing-data.json`
   - newest uploaded products appear first on the legacy product list page
6. Summarize:
   - how many products were imported
   - any skipped or blocked items
   - which sample product codes were verified

Use these default paths unless the user gives different ones:

- Excel: `/Users/abcd/Vibecoding/website/item list ready.xlsx`
- Images root: `/Users/abcd/Vibecoding/website/products`
- SSH key: `/Users/abcd/.ssh/id_ed25519`
- Legacy server: `root@178.104.6.190`
