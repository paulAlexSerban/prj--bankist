#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🔍  Compile Frontend JavaScript Component Library"
export NODE_ENV=$1
npm --prefix ../../../frontend/js-component-library run transpile