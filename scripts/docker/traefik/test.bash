#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🧪  TEST Traefik Proxy container"
bash ../../../docker/test/check-docker-container.bash traefik-proxy
