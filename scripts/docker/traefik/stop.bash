#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo " 🛑  🐳  STOP Traefik Proxy docker containers"
docker compose --env-file ../../../config.env \
  --file ../../../docker/docker-compose.traefik-proxy.yml \
  down --volumes --rmi all
