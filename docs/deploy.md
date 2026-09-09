# Deploying to a VPS (static, behind nginx)

The site builds to a fully static `out/` folder (`output: "export"` in
`next.config.ts`), so the VPS just serves files — no Node process to keep alive,
nothing to crash. Node is only needed at **build** time.

Target in this guide: `https://shinpuru-nihongo.xerzack.web.id`
Repo: `https://github.com/dandymau28/shinpuru-nihongo`

---

## 0. One-time: push the code to GitHub (from your machine)

```bash
git push -u origin main
```

(The `origin` remote and `main` branch are already set up.)

---

## 1. VPS prerequisites

SSH into the VPS, then:

```bash
# git + nginx (skip whichever you already have)
sudo apt update
sudo apt install -y git nginx

# Node 20 (build tool only)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v20.x

# firewall
sudo ufw allow 'Nginx Full'   # opens 80 + 443
sudo ufw allow OpenSSH
sudo ufw enable
```

## 2. Get the code and build

```bash
sudo mkdir -p /var/www/shinpuru-nihongo
sudo chown -R "$USER":"$USER" /var/www/shinpuru-nihongo

git clone https://github.com/dandymau28/shinpuru-nihongo.git /var/www/shinpuru-nihongo
cd /var/www/shinpuru-nihongo

npm ci
npm run build      # → /var/www/shinpuru-nihongo/out
```

## 3. DNS

At whatever manages DNS for `xerzack.web.id`, add:

| Type | Name                | Value              | TTL  |
|------|---------------------|--------------------|------|
| A    | `shinpuru-nihongo`  | `<your VPS IPv4>`  | 3600 |

(Add an `AAAA` record too if the VPS has a public IPv6.)

Check it resolves before continuing:

```bash
dig +short shinpuru-nihongo.xerzack.web.id
```

## 4. nginx server block

```bash
sudo nano /etc/nginx/sites-available/shinpuru-nihongo
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name shinpuru-nihongo.xerzack.web.id;

    root /var/www/shinpuru-nihongo/out;
    index index.html;

    # Next static export produces /planner.html, /day/6.html, etc.
    location / {
        try_files $uri $uri.html $uri/index.html /404.html;
    }

    error_page 404 /404.html;

    # Immutable, content-hashed build assets
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json
               image/svg+xml application/manifest+json;
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/shinpuru-nihongo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Test over plain HTTP: `http://shinpuru-nihongo.xerzack.web.id` should load.

## 5. HTTPS with Certbot

```bash
sudo certbot --nginx -d shinpuru-nihongo.xerzack.web.id
```

Certbot edits the server block to add the `443` listener + HTTP→HTTPS redirect,
and installs a renewal timer. Verify renewal works:

```bash
sudo certbot renew --dry-run
```

Done — `https://shinpuru-nihongo.xerzack.web.id` is live.

---

## Redeploying after a change

```bash
cd /var/www/shinpuru-nihongo
./deploy.sh          # git pull + npm ci + npm run build
```

No nginx reload needed — it serves the freshly rebuilt `out/` directly.

### Optional: auto-deploy on push (GitHub Actions)

Add a deploy key or SSH secret and a workflow that SSHes in and runs
`cd /var/www/shinpuru-nihongo && ./deploy.sh`. Not required — `./deploy.sh` by
hand is fine for a solo project.

---

## Notes

- **Apache instead of nginx?** Point a `<VirtualHost>` `DocumentRoot` at
  `/var/www/shinpuru-nihongo/out`, enable `mod_rewrite`, and add
  `FallbackResource /404.html` (or rewrite rules mapping `/x` → `/x.html`).
  Then `sudo certbot --apache -d shinpuru-nihongo.xerzack.web.id`.
- **Low-RAM VPS (≤1 GB):** `npm run build` can OOM. Build locally and copy `out/`
  up with `rsync -az --delete out/ user@vps:/var/www/shinpuru-nihongo/out/`, or
  add swap: `sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile &&
  sudo mkswap /swapfile && sudo swapon /swapfile`.
- All learner progress lives in each visitor's browser `localStorage`; there is
  no database or backup to run on the server.
