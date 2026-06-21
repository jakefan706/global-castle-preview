# Global Castle Handoff

Date: 2026-05-13
Branch: `codex/site-build`
Latest known commit on branch: `2ebec88` `refresh products interactions and restructure solutions support model`

## Current focus

The current round centered on:

- stabilizing `staging.cnurbaneco.com`
- fixing frontend asset serving after standalone deploys
- fixing Payload CMS `Products` collection behavior
- adding explicit `Classic` / `New` product flags for CMS + frontend badge display

## What was completed

### 1. Frontend product interactions already in place

Products page behavior currently includes:

- product image hover swaps to scene image
- hover shows `Request a Sample`
- clicking the CTA goes to inquiry/contact flow with product info filled in
- clicking the image/card area goes to the product detail page
- `Customize MOQ` label was changed to `Min. Order`
- products hero copy and CTA were updated earlier in this branch

Relevant file:

- [src/app/(frontend)/products/ProductsGrid.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/products/ProductsGrid.tsx)

### 2. CMS `Products` schema was restored from temporary debug state

`src/collections/Products.ts` had previously been left in a minimal debugging form.
It is now back to a fuller working schema with:

- `name`
- `itemNumber`
- `description`
- `customizeMOQ` labeled as `Min. Order`
- `mainImage`
- `gallery`
- `category`
- `applications`
- `material`
- `priceRange`
- `specifications`
- `featured`
- `classic`
- `newArrival`

Relevant file:

- [src/collections/Products.ts](/Users/abcd/Vibecoding/website/global-castle/src/collections/Products.ts)

### 3. Explicit `Classic` / `New` support added

CMS side:

- added checkbox `classic`
- kept checkbox `newArrival`

Frontend side:

- badge logic now supports multiple badges instead of a single badge
- `New` renders orange
- `CLASSIC` renders deep blue
- both can display at the same time
- legacy/fallback sample data was updated to the new structure

Relevant files:

- [src/collections/Products.ts](/Users/abcd/Vibecoding/website/global-castle/src/collections/Products.ts)
- [src/lib/products.ts](/Users/abcd/Vibecoding/website/global-castle/src/lib/products.ts)
- [src/app/(frontend)/products/ProductsGrid.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/products/ProductsGrid.tsx)

### 4. CMS `Products` blank page root cause was found and fixed on staging

Symptom:

- opening `Products` in Payload admin gave a blank/empty page
- creating a new product also failed

Root cause:

- staging code expected DB column `products.classic`
- staging PostgreSQL table did not yet have that column
- Payload admin list query crashed with:
  - `column products.classic does not exist`

Server-side fix already applied:

```sql
alter table products add column if not exists classic boolean default false;
update products set classic = false where classic is null;
```

After that:

- `/admin/collections/products` recovered
- `/admin/collections/products/create` recovered

## Staging deployment incident and fix

There was also a separate staging outage where the frontend rendered as mostly bare HTML.

Root cause:

- service runs from `.next/standalone/server.js`
- after rebuild, `.next/standalone` did not have access to:
  - `public`
  - `.next/static`
- result:
  - CSS 404
  - images 404
  - page appeared visually broken

Fix already applied on server:

```bash
cd /var/www/global-castle-app
mkdir -p .next/standalone/.next
ln -sfn /var/www/global-castle-app/public .next/standalone/public
ln -sfn /var/www/global-castle-app/.next/static .next/standalone/.next/static
systemctl restart global-castle-staging.service
```

This is documented now in:

- [DEPLOY-SSH-HANDOFF.md](/Users/abcd/Vibecoding/website/global-castle/DEPLOY-SSH-HANDOFF.md)

## Current server / staging info

Staging URL:

- `https://staging.cnurbaneco.com`

SSH:

```bash
ssh -i /Users/abcd/.ssh/id_ed25519 root@178.104.6.190
```

App directory:

- `/var/www/global-castle-app`

Systemd service:

- `global-castle-staging.service`

Environment file:

- `/var/www/global-castle-app/.env.production`

Production DB currently used by staging:

- database: `global_castle_prod`
- user in env: `global_castle_app`

## Important current local file changes

Files directly touched in this debugging/fix round:

- [src/collections/Products.ts](/Users/abcd/Vibecoding/website/global-castle/src/collections/Products.ts)
- [src/lib/products.ts](/Users/abcd/Vibecoding/website/global-castle/src/lib/products.ts)
- [src/app/(frontend)/products/ProductsGrid.tsx](/Users/abcd/Vibecoding/website/global-castle/src/app/(frontend)/products/ProductsGrid.tsx)
- [DEPLOY-SSH-HANDOFF.md](/Users/abcd/Vibecoding/website/global-castle/DEPLOY-SSH-HANDOFF.md)

Other unrelated working tree changes also exist and were not cleaned up.
Do not revert them casually.

## Known constraints / cautions

### 1. Payload schema changes require DB sync on staging

If adding a field to a collection config, do not assume staging DB will update itself.
Check the real table columns and patch/migrate as needed.

For `Products`, current staging already needed a manual DB patch for:

- `classic boolean default false`

### 2. Standalone deploy requires static/public linkage

If deploying by rebuilding and restarting only:

```bash
npm run build
systemctl restart global-castle-staging.service
```

that is not sufficient for this app.
The symlink step for `.next/standalone/public` and `.next/standalone/.next/static` must remain in the deployment flow.

### 3. Staging admin credentials are not the old local seed credentials

The old handoff mentioned:

- `sales@cnurbaneco.com / Si287100`

That still works locally, but staging rejected it during this round.
Do not assume staging admin login uses the same credentials.

## Good next steps

If continuing in a new thread, likely useful next actions are:

1. Continue testing CMS flows for:
   - product create
   - product edit
   - media selection/upload
   - category/applications relations
2. Add a durable deployment script so standalone static symlinks are recreated automatically.
3. Add a lightweight DB migration checklist or SQL patch note for future Payload schema changes.
4. Optionally improve the visual stacking/order of product badges when both `New` and `CLASSIC` are enabled.

## Suggested next prompt

```text
Continue work in /Users/abcd/Vibecoding/website/global-castle on branch codex/site-build.
Read /Users/abcd/Vibecoding/website/global-castle/260513-handoff.md first.
Then help me continue testing the Payload CMS backend, especially Products create/edit/media flows on staging.
```
