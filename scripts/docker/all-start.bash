#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🟢  START ALL 🐳  Docker conatiners "
docker-compose --env-file ../../config.env \
  --file ../../docker/docker-compose.traefik-proxy.yml \
  --file ../../docker/docker-compose.static-app.yml \
  up --detach --build
