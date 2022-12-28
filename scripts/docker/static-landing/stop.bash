#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo " 🛑  🐳  STOP Static Landing Service docker containers"
docker compose --env-file ../../../config.env \
  --file ../../../docker/docker-compose.static-landing.yml \
  down --volumes --rmi all
