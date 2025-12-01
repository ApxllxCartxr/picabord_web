# Raspberry Pi Hosting (Docker / GHCR) — optional

This guide documents how to build, push, and run the PICABORD Next.js app on Raspberry Pi devices using Docker. Note: the project defaults to Vercel hosting and Docker/GHCR CI is disabled by default; use the instructions here only for manual or legacy deployments.

## Overview
The repository provides a multi-arch Dockerfile and GitHub Actions workflow to build and publish images for arm64 and amd64. The images are pushed to GitHub Container Registry (GHCR) by the CI workflow. If you need armv7 (legacy Pi models), you can build it locally or add a CI job to your workflow to produce that artifact manually.

## Local Build & Test
You can build the multi-arch image locally using Docker Buildx and QEMU:

```bash
# Create a builder (if you haven't)
docker buildx create --use
# Build for Raspberry Pi 64-bit (arm64/v8) and push the image (or remove --push to build locally)
docker buildx build --platform linux/arm64/v8 -t ghcr.io/thatdeveloperoverthere/picabord-web:latest --push .
```

If you prefer to test directly on a single Raspberry Pi device, build for the pi architecture only:

```bash
# For a Raspberry Pi 64-bit OS (arm64 v8)
docker buildx build --platform linux/arm64/v8 -t picabord:local --load .
# For Raspberry Pi OS 32-bit (armv7) (optional - manual build):
docker buildx build --platform linux/arm/v7 -t picabord:local --load .

# Run the image on the Pi
docker run -d -p 3000:3000 --restart=unless-stopped -e NODE_ENV=production picabord:local
```

## GitHub Actions CI

A workflow (`.github/workflows/deploy.yml`) is included that sets up QEMU and Buildx, then builds and pushes a multi-arch image to GHCR (ghcr.io/${{ github.repository }}). The workflow includes a pre-check step that validates the build and runs optional lint/tests, and then tags the image with `latest` and the commit SHA.

### GHCR Access & Permissions
- The workflow logs in with the default `GITHUB_TOKEN`. This token will be able to publish to the repo's packages in most cases managed in the same organization. For cross-repo or fork builds, you may need to use a PAT with `read:packages` and `write:packages` permissions.
- If you want the images to be public, set the image visibility to 'public' in the package's settings in GHCR.
- To pull the image from another host, a user will authenticate with `docker login ghcr.io` and use a PAT, or set up ephemeral `GITHUB_TOKEN` access via Actions.

If you prefer to publish to Docker Hub, replace the `Login to GHCR` step with the Docker login action and use Docker Hub credentials in Secrets.


> Note: By default, the workflow triggers on push to the `main` branch. Change `on.push.branches` to match your main deployment branch if you e.g. use `production` or `deploy`.

## Run on Raspberry Pi (Docker)
Once the image is published to GHCR (or built locally), run it on your Raspberry Pi:

```bash
# Example using GHCR image
docker run -d --name picabord -p 3000:3000 --restart unless-stopped -e NODE_ENV=production ghcr.io/thatdeveloperoverthere/picabord-web:latest

# Or using local connect to docker-host on pi
docker run -d --name picabord -p 3000:3000 --restart unless-stopped -e NODE_ENV=production picabord:local
```

Open http://raspberry-pi-ip:3000.

## Docker Compose
A sample compose file is included: `docker-compose.rpi.yml`. It demonstrates resource limits and a lightweight health check.

## Tips
- Raspberry Pis have limited RAM — keep memory usage small. If your app has heavy memory usage, prefer 64-bit OS (arm64) on Pi 4/5.
- When building for multiple architectures in CI, memory limits can cause Node to fail during `npm ci`. If you see OOM errors, increase build memory or set `NODE_OPTIONS=--max_old_space_size=512` in CI or in your Dockerfile build args.
- Use swap files or host-level cgroups to limit memory if necessary.
- Some npm packages (native deps) may require cross-compiling; ensure you build on match-arch to avoid runtime issues.
- For more reliable builds, set up `NODE_OPTIONS=--max_old_space_size=512` during build if memory issues occur in CI.

- If your Next.js site is static-only (no server-side or API routes), prefer exporting and serving with nginx to reduce runtime memory and CPU usage. Example Dockerfile:

```dockerfile
FROM nginx:alpine
COPY out/ /usr/share/nginx/html
EXPOSE 80
```

Then:

```bash
npm run build
npm run export  # Ensure next export is appropriate for your site
docker build -f Dockerfile.static -t picabord-static:local .
```

## Troubleshooting
- If you see an architecture mismatch error when running an image, build specifically for the Pi's architecture with the `--platform` option and use `--load` to load the correct binary into your Docker daemon.

- If you previously saw an `ERESOLVE` issue in CI about `framer-motion` requiring `react^18` while the project used `react@19`, we've implemented the recommended long-term solution: the project now uses `react@^18` / `react-dom@^18`. If you still encounter peer conflict issues after updating your lockfile, re-run `npm install` locally to update the lockfile and then retry in CI.


If you need help adapting this workflow further or publishing to Docker Hub instead of GHCR, say the word and I can update the workflow and docs.

### Optional: Systemd Unit Example
If you prefer to run the container at boot via systemd, here's a sample unit file to place at `/etc/systemd/system/picabord.service`:

```ini
[Unit]
Description=Picabord Container
After=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker run --rm --name picabord -p 3000:3000 ghcr.io/thatdeveloperoverthere/picabord-web:latest
ExecStop=/usr/bin/docker stop picabord

[Install]
WantedBy=multi-user.target
```