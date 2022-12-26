#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑 Cleaning Frontend Static Website"
rm -rfv ../../../frontend/static-app/dist
echo "🏗️ Building Frontend Static Website "

bash ../js-component-library/transpile.bash $1
bash ../living-style-guide/compile.bash $1

export NODE_ENV=$1

npm --prefix ../../../frontend/static-app run build