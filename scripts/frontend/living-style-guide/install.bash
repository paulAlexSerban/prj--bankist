#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Frontend Nginx node_modules"
rm -rfv ../../../frontend/living-style-guide/node_modules

echo "🔧  Installing Frontend Living Style Guide"
npm --prefix ../../../frontend/living-style-guide install
