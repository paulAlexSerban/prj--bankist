#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "📦  Package Frontend Nginx"
mkdir -p ../package/static-app
cp -rfv ../frontend/static-app/dist/* ../package/static-app