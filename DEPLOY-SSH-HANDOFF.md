# Main Site Deployment SSH Handoff

Date: 2026-05-12
Prepared for: main site deployment handoff

## Server summary

- Server IP: `178.104.6.190`
- SSH user: `root`
- OS hostname: `ubuntu-4gb-nbg1-1`
- Nginx version: `nginx/1.24.0 (Ubuntu)`

## SSH access

### Recommended direct command

```bash
ssh -i /Users/abcd/.ssh/id_ed25519 root@178.104.6.190
```

This key was verified to work.

### Key files on this Mac

- Private key: `/Users/abcd/.ssh/id_ed25519`
- Public key: `/Users/abcd/.ssh/id_ed25519.pub`

### Notes

- Current `~/.ssh/config` only contains an unrelated alias called `dmit`.
- There is no named SSH alias yet for this Hetzner server.
- For the next operator, the safest method is to use the full command above.

## Current server web layout

### Existing web directories

```text
/var/www/html
/var/www/legacy-catalog
```

### Existing deployed legacy site

- Live URL: `https://legacy.cnurbaneco.com/`
- Root path: `/var/www/legacy-catalog`

### Current enabled Nginx site

Only this site is currently enabled:

```text
/etc/nginx/sites-available/legacy-catalog
```

Its symlink target in `sites-enabled` resolves to:

```text
/etc/nginx/sites-available/legacy-catalog
```

## Existing Nginx config already in production

Main file:

- `/etc/nginx/sites-available/legacy-catalog`

Backup file:

- `/etc/nginx/sites-available/legacy-catalog.bak-20260511`

Certbot SSL is already in place for:

- `legacy.cnurbaneco.com`

Certificate paths used by current config:

- `/etc/letsencrypt/live/legacy.cnurbaneco.com/fullchain.pem`
- `/etc/letsencrypt/live/legacy.cnurbaneco.com/privkey.pem`

## Main site local source path

Main site project directory on this Mac:

- `/Users/abcd/Vibecoding/website/global-castle`

Useful local files:

- `/Users/abcd/Vibecoding/website/global-castle/package.json`
- `/Users/abcd/Vibecoding/website/global-castle/next.config.ts`
- `/Users/abcd/Vibecoding/website/global-castle/public`
- `/Users/abcd/Vibecoding/website/global-castle/src`

## Recommended deployment structure for the main site

Because the legacy subsite is already running separately, the clean approach is:

### Main site

- domain: main production domain for `cnurbaneco.com`
- recommended server root:
  - `/var/www/global-castle`

### Legacy site

- domain: `legacy.cnurbaneco.com`
- current root:
  - `/var/www/legacy-catalog`

This keeps:

- main site independent
- legacy catalog independent
- Nginx configs clean and easier to maintain

## Suggested server paths for the next operator

### Create main site directory

```bash
mkdir -p /var/www/global-castle
```

### Suggested deployment user path if building directly on server

If needed, temporary uploads or archives can be placed under:

```bash
/root
```

But final published files should live in:

```bash
/var/www/global-castle
```

## Suggested deployment workflow

### Option A: static export if the project is exported as static files

Upload built output into:

```bash
/var/www/global-castle
```

Then create a dedicated Nginx site config for the main domain.

### Option B: Next.js app with Node runtime

If the main site is deployed as a running Next.js app:

- keep source under a directory such as:
  - `/var/www/global-castle-app`
- run the app with `pnpm` or `npm`
- place Nginx in front as reverse proxy

Because I have not deployed the main site yet in this document, the next operator should inspect:

- `package.json`
- whether this project is meant for static export or live Next.js runtime

## Current staging deployment notes

- Active app path: `/var/www/global-castle-app`
- Active service: `global-castle-staging.service`
- Runtime mode: Next.js `output: 'standalone'`
- Service start command:

```bash
/usr/bin/node /var/www/global-castle-app/.next/standalone/server.js
```

### Important standalone caveat

For this project, `npm run build` alone is not enough when the service starts from `.next/standalone/server.js`.

After each build, `.next/standalone` must also be able to see:

- `/var/www/global-castle-app/public`
- `/var/www/global-castle-app/.next/static`

If these are missing, the site may render as mostly unstyled HTML and images/CSS will 404.

### Safe post-build fix

Run this after every deploy build on the server:

```bash
cd /var/www/global-castle-app
mkdir -p .next/standalone/.next
ln -sfn /var/www/global-castle-app/public .next/standalone/public
ln -sfn /var/www/global-castle-app/.next/static .next/standalone/.next/static
systemctl restart global-castle-staging.service
```

### Quick verification

```bash
curl -I http://127.0.0.1:3002/_next/static/chunks/0l8-54ytolywm.css -H 'Host: staging.cnurbaneco.com'
curl -I http://127.0.0.1:3002/images/logo-teal.png -H 'Host: staging.cnurbaneco.com'
```

Both should return `200`.

## Useful server inspection commands

### Login

```bash
ssh -i /Users/abcd/.ssh/id_ed25519 root@178.104.6.190
```

### Check current web roots

```bash
ls -la /var/www
```

### Check active Nginx config

```bash
readlink -f /etc/nginx/sites-enabled/*
```

### Open current legacy config

```bash
sed -n '1,220p' /etc/nginx/sites-available/legacy-catalog
```

### Test Nginx syntax

```bash
nginx -t
```

### Reload Nginx

```bash
systemctl reload nginx
```

## Recommended handoff note for the next operator

The next operator should first determine:

1. whether `/Users/abcd/Vibecoding/website/global-castle` is intended to be:
   - static export
   - or a live Next.js runtime
2. what main domain will be bound to the main site
3. whether SSL should be issued now for the main domain

Only after that should they create:

- `/var/www/global-castle` or `/var/www/global-castle-app`
- a new Nginx config for the main domain

## One-line quick start

```bash
ssh -i /Users/abcd/.ssh/id_ed25519 root@178.104.6.190
```
