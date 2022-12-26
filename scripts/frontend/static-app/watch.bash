#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching Frontend Static Website"
npm --prefix ../../../frontend/static-app run watch
