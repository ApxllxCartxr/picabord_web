#!/usr/bin/env bash
# Sample script to pull the image from GHCR and restart a pi-based container.
# Requires SSH access and docker installed on the target pi
# Usage: ./scripts/deploy-to-pi.sh pi_user@pi_host ghcr.io/thatdeveloperoverthere/picabord-web:latest

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <ssh_target> <image_tag>"
  exit 1
fi

SSH_TARGET="$1"
IMAGE_TAG="$2"

# This example assumes the pi has docker and docker-compose; adapt as needed
ssh ${SSH_TARGET} <<EOF
  echo "Pulling image ${IMAGE_TAG} on remote host"
  docker pull ${IMAGE_TAG}
  docker stop picabord || true
  docker rm picabord || true
  docker run -d --name picabord -p 3000:3000 --restart unless-stopped ${IMAGE_TAG}
  echo "Deployed ${IMAGE_TAG}"
EOF

echo "Deployment complete to ${SSH_TARGET}" 
