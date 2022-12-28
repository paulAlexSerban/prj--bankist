#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Frontend Static Website node_modules"
rm -rfv ../../../frontend/static-landing/node_modules
echo "🔧  Installing Frontend Static Website"
npm --prefix ../../../frontend/static-landing install
