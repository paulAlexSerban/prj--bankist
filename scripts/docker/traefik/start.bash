#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🟢  START 🐳  Docker Traefik Proxy conatiner "
docker-compose --env-file ../../../config.env \
  --file ../../../docker/docker-compose.traefik-proxy.yml \
  up --detach --build
