#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Frontend JavaScript Component Library node_modules"
rm -rfv ../../../frontend/js-component-library/node_modules

echo "🔧  Installing Frontend JavaScript Component Library"
npm --prefix ../../../frontend/js-component-library install
