# Multi-stage Dockerfile for Next.js optimized for Raspberry Pi (arm64/armv7) and amd64
# Builder: build the Next.js app with node 20
FROM node:20-slim AS builder

# disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package*.json ./
# Copy lockfile if present to allow reproducible installs
COPY package-lock.json ./

# Install dependencies (dev deps required for building)
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the app (disable Turbopack for Docker builds - use webpack instead)
ENV TURBOPACK=0
RUN npm run build

# Final image for running the app
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
# Use the same port used by next: default 3000, allow overriding at runtime
ENV PORT=3000

# Copy minimal necessary files from builder
COPY --from=builder /app/package*.json ./
# Add curl for healthcheck and other network checks
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*
# Only install production dependencies in the final runtime image to reduce size
RUN npm ci --omit=dev
# Copy standalone build output (includes all dependencies)
COPY --from=builder /app/.next/standalone ./
# NOTE: We copy the static assets and public files
COPY --from=builder /app/.next/static ./.next/static
# If your app uses a public folder, copy it too
COPY --from=builder /app/public ./public
# Copy content directory for MDX blog posts
COPY --from=builder /app/content ./content

# Expose port
EXPOSE ${PORT}
# Create a non-root user to run the Node process (improves security on public hosts)
LABEL org.opencontainers.image.authors="ThatDeveloperOverThere"
LABEL org.opencontainers.image.licenses="MIT"

# Add healthcheck for orchestrators (e.g., docker-compose)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -fsS http://localhost:${PORT}/ || exit 1

RUN groupadd -r nextgroup && useradd -r -g nextgroup -s /usr/sbin/nologin -d /app nextuser
RUN chown -R nextuser:nextgroup /app
USER nextuser

# Start the app using the standalone server
CMD ["node", "server.js"]
