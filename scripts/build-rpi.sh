#!/usr/bin/env bash
# Build & push multi-arch images for Raspberry Pi + amd64
# Usage: ./scripts/build-rpi.sh [TAG] [PLATFORMS]

set -euo pipefail
TAG=${1:-ghcr.io/thatdeveloperoverthere/picabord-web:latest}
PLATFORMS=${2:-linux/arm64/v8}

# Ensure a builder is created
docker buildx create --use --driver docker-container --name picabord-builder || true

echo "Building ${TAG} for ${PLATFORMS}"
docker buildx build --platform ${PLATFORMS} -t ${TAG} --push .

echo "Build pushed: ${TAG}"
