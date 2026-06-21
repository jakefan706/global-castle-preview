# Compliance Icon Sources

This note tracks which compliance icons were downloaded for homepage and certification-wall work, plus important usage constraints.

## Downloaded Assets

- `public/images/compliance-icons/ce-mark.png`
  - Source: European Commission CE marking download package
  - URL used: `https://single-market-economy.ec.europa.eu/document/download/8182d932-9e7d-401b-8b9b-70f1a8fe5a5e_en?filename=ce_marking+-+vector+and+bitmap+images.zip&prefLang=fr`
  - Note: CE marking is a conformity mark, not a third-party certification badge.

- `public/images/compliance-icons/food-contact-eu.svg`
  - Source: Wikimedia Commons file redirect
  - URL used: `https://commons.wikimedia.org/wiki/Special:FilePath/EU_food_contact_material_symbol.svg`
  - Note: This is the glass-and-fork symbol used for food contact materials.

- `public/images/compliance-icons/recyclable-mobius.svg`
  - Source: Wikimedia Commons file redirect
  - URL used: `https://commons.wikimedia.org/wiki/Special:FilePath/Recycling%20symbol.svg`
  - Note: General recycling symbol only. Do not imply a product is broadly recyclable unless that claim is supported.

## Attempted But Not Saved

- `BPA Free` SVG from SVG Repo
  - Attempted URL: `https://www.svgrepo.com/download/10023713/bpa-free-containers.svg`
  - Result: blocked by Vercel security checkpoint instead of returning the SVG file
  - Recommendation: either source a verified open-license BPA-free icon later or design a neutral in-house badge

## Restricted / Verify Before Use

These marks are often trademark-controlled, certification-controlled, or only allowed for certified/audited organizations and approved claims:

- `FDA`
- `LFGB`
- `BSCI` / `amfori BSCI`
- `Sedex` / `SMETA`
- `FSC`
- `GRS`
- `ISO 9001`
- `SGS`
- `TUV`
- `Intertek`

Recommended rule:

- Use official logos only if the company actually holds the relevant certification, audit, or test support claim.
- Follow the issuing body's brand and trademark guidelines before placing the logo on public-facing website pages.
- When authorization is unclear, prefer neutral text badges such as `FDA Compliant Materials`, `LFGB Tested`, or `Tested by Third-Party Labs` instead of copying official brand marks.

## Existing Repo Files

The repo already contains raster certification images in:

- `public/images/certifications/`

Those files were not re-verified for license, trademark permission, or claim accuracy during this download pass.
