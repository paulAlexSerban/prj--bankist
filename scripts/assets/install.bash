#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning ./assets/node_modules"
rm -rfv ../../assets/node_modules

echo "🔧  Installing Assets"
npm --prefix ../../assets install
