# Global Castle Handoff

## Current branch

- Branch: `codex/site-build`
- Latest commit on branch: `7bc8641` `home page improvement`

## Preview

- Run:

```bash
cd /Users/abcd/Vibecoding/website/global-castle
pnpm dev
```

- Frontend: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Recent homepage work

Main files changed in this round:

- [src/app/(frontend)/components/homepage/homepage-data.ts](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/components/homepage/homepage-data.ts)
- [src/app/(frontend)/components/homepage/TrustSection.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/components/homepage/TrustSection.tsx)
- [src/app/globals.css](/Users/abcd/Vibecoding/website/global-castle/src/app/globals.css)

What was done:

- `Global Compliance & Safety Standards` updated to use custom files in `public/images/compliance-icons/`
- Certification icons are now arranged in 2 rows of 5
- Current order:
  - Row 1: `FDA`, `Cup Fork`, `LFGB`, `BPA Free`, `GRS`
  - Row 2: `Recyclable`, `ISO 9001`, `BSCI`, `Sedex`, `FSC`
- Certification icon hover animation was removed completely
- `Trusted by Industry Leaders` switched to new customer logos from `public/images/partners/`
- Partner logos are now set up as a single-row auto-scrolling marquee
- Scrollbars are hidden for the partner marquee

## Assets added / replaced

- New certification icons:
  - `public/images/compliance-icons/*`
- New partner logos:
  - `public/images/partners/customer1.svg` to `customer9.svg/png/webp/jpg`
- Old partner placeholder files are currently deleted in working tree:
  - `public/images/partners/partner-1.png` to `partner-8.png`

## Important current state

- WhatsApp links currently point to:
  - `https://wa.me/8618969038198`
- Relevant files:
  - [src/app/(frontend)/components/Footer.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/components/Footer.tsx)
  - [src/app/(frontend)/components/homepage/ContactSection.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/components/homepage/ContactSection.tsx)

## Known follow-up

- User said: `Nunito Sans` should be used globally
- This has NOT been done yet
- Current global font still uses `Plus Jakarta Sans` in:
  - [src/app/globals.css](/Users/abcd/Vibecoding/website/global-castle/src/app/globals.css)
  - [src/app/(frontend)/layout.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/layout.tsx)

## Working tree notes

Current unstaged changes include:

- Modified:
  - `src/app/(frontend)/components/homepage/TrustSection.tsx`
  - `src/app/(frontend)/components/homepage/homepage-data.ts`
  - `src/app/globals.css`
- New:
  - `public/images/compliance-icons/`
  - `public/images/partners/customer*`
  - `docs/compliance-icon-sources.md`
  - `.codex/`
- Deleted:
  - old `public/images/partners/partner-*.png`

## Suggested next prompt

Use this if starting a new Codex thread:

```text
Continue work in /Users/abcd/Vibecoding/website/global-castle on branch codex/site-build.
Read /Users/abcd/Vibecoding/website/global-castle/260511-handoff.md first.
Start by checking the homepage certification block and partner marquee in the browser, then switch the site-wide font to Nunito Sans.
```
