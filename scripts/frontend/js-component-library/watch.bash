#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching Frontend JavaScript Component Library"
export NODE_ENV="watch"
npm --prefix ../../../frontend/js-component-library run watch
