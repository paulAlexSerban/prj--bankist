#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

# echo "🏗️  BUILD Static Website content"
# bash frontend-static-build.bash development

echo "🟢  START 🐳  Docker Nginx server conatiner "
docker-compose --env-file ../../../config.env \
  --file ../../../docker/docker-compose.traefik-proxy.yml \
  --file ../../../docker/docker-compose.static-landing.yml \
  up --detach --build