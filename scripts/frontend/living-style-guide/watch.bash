#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching Frontend Living Style Guide"
npm --prefix ../../../frontend/living-style-guide run watch
