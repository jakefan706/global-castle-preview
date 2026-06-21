# Global Castle Main Domain Routing Handoff

Date: 2026-05-18
Prepared for: continue main site development in a new session

## Current outcome

The server and DNS are now intentionally split like this:

- `cnurbaneco.com` serves the old legacy site
- `legacy.cnurbaneco.com` serves the same old legacy site
- `www.cnurbaneco.com` permanently redirects to `https://cnurbaneco.com`
- `staging.cnurbaneco.com` serves the new Next.js site under active development

This was done on purpose so the main domain stays stable while the new site continues to be built on `staging`.

## Server

- Server IP: `178.104.6.190`
- SSH user: `root`
- SSH command:

```bash
ssh -i /Users/abcd/.ssh/id_ed25519 root@178.104.6.190
```

Important:

- the SSH key is passphrase-protected
- if non-interactive SSH suddenly fails with `read_passphrase: can't open /dev/tty`, load it first:

```bash
ssh-add --apple-load-keychain /Users/abcd/.ssh/id_ed25519
```

## Cloudflare / DNS status

Cloudflare is already configured and should stay this way for now:

- `A` `cnurbaneco.com` -> `178.104.6.190` `Proxied`
- `CNAME` `www` -> `cnurbaneco.com` `Proxied`
- `A` `legacy` -> `178.104.6.190` `Proxied`
- `A` `staging` -> `178.104.6.190` `Proxied`

Cloudflare SSL mode:

- `Full (strict)` is already enabled

Do not change DNS again just to continue staging work.

## Nginx layout now in production

Enabled sites:

- `/etc/nginx/sites-available/legacy-catalog`
- `/etc/nginx/sites-available/global-castle-staging`

Symlinks:

- `/etc/nginx/sites-enabled/legacy-catalog`
- `/etc/nginx/sites-enabled/global-castle-staging`

### Legacy site config

File:

- `/etc/nginx/sites-available/legacy-catalog`

Current behavior:

- HTTPS `cnurbaneco.com` and `legacy.cnurbaneco.com` both serve:
  - `/var/www/legacy-catalog`
- HTTPS `www.cnurbaneco.com` returns:
  - `301 https://cnurbaneco.com$request_uri`
- HTTP for all three routes to HTTPS first

### Staging config

File:

- `/etc/nginx/sites-available/global-castle-staging`

Current behavior:

- `staging.cnurbaneco.com` reverse proxies to:
  - `http://127.0.0.1:3002`

Systemd service:

- `global-castle-staging.service`

App path:

- `/var/www/global-castle-app`

## SSL certificate status

The old legacy cert was expanded and now covers:

- `cnurbaneco.com`
- `legacy.cnurbaneco.com`
- `www.cnurbaneco.com`

Certificate path:

- `/etc/letsencrypt/live/legacy.cnurbaneco.com/fullchain.pem`
- `/etc/letsencrypt/live/legacy.cnurbaneco.com/privkey.pem`

The staging certificate remains separate:

- `/etc/letsencrypt/live/staging.cnurbaneco.com/fullchain.pem`
- `/etc/letsencrypt/live/staging.cnurbaneco.com/privkey.pem`

This means `Full (strict)` is now valid for:

- `cnurbaneco.com`
- `www.cnurbaneco.com`
- `legacy.cnurbaneco.com`
- `staging.cnurbaneco.com`

## Verified live behavior

Verified after Nginx reload and certificate update:

- `https://cnurbaneco.com` -> `200`, old legacy site
- `https://legacy.cnurbaneco.com` -> `200`, same old legacy site
- `https://www.cnurbaneco.com` -> `301` to `https://cnurbaneco.com/`
- `https://staging.cnurbaneco.com` -> `200`, new Next.js site

## Staging deploy workflow

Continue using server-first testing.
All meaningful frontend/CMS changes should be deployed to `staging` and verified there.

Known-good deploy flow:

```bash
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env*' \
  --exclude 'media' \
  --exclude '.codex' \
  --exclude '.playwright-cli' \
  /Users/abcd/Vibecoding/website/global-castle/ \
  root@178.104.6.190:/var/www/global-castle-app/

ssh -i /Users/abcd/.ssh/id_ed25519 root@178.104.6.190 '
  cd /var/www/global-castle-app &&
  pnpm install --frozen-lockfile &&
  pnpm build &&
  mkdir -p .next/standalone/.next &&
  ln -sfn /var/www/global-castle-app/public .next/standalone/public &&
  ln -sfn /var/www/global-castle-app/media .next/standalone/media &&
  ln -sfn /var/www/global-castle-app/.next/static .next/standalone/.next/static &&
  systemctl restart global-castle-staging.service &&
  systemctl is-active global-castle-staging.service
'
```

Do not skip the standalone symlink repair step.

## Current development rule

Until the new main site is approved:

- keep building on `https://staging.cnurbaneco.com`
- keep `cnurbaneco.com` on the old site
- do not point the main domain at staging

## When the new site is ready for main domain cutover

The final switch should be done in Nginx on the server, not in DNS.

Recommended final move:

1. keep `staging.cnurbaneco.com` available for continued QA if desired
2. move `cnurbaneco.com` and `www.cnurbaneco.com` from the legacy site to the new app
3. optionally keep `legacy.cnurbaneco.com` on the old static site forever

In other words:

- no DNS change should be required for final cutover
- only Nginx routing needs to change

## Practical next step for the next session

The next session should focus on:

- continuing main site development on `staging`
- keeping all acceptance checks on the server version, not local-only
- avoiding accidental edits to the legacy Nginx route unless the goal is final production cutover

## Related local handoff files

- `/Users/abcd/Vibecoding/website/global-castle/260513-handoff.md`
- `/Users/abcd/Vibecoding/website/global-castle/DEPLOY-SSH-HANDOFF.md`

## Suggested next prompt

Use this in the next session:

```text
Read /Users/abcd/Vibecoding/website/global-castle/260518-main-domain-routing-handoff.md and /Users/abcd/Vibecoding/website/global-castle/DEPLOY-SSH-HANDOFF.md first. We are continuing main site development on staging only. Main domain cnurbaneco.com must stay on the legacy site for now. Deploy changes directly to staging and verify on the server, not just locally.
```
