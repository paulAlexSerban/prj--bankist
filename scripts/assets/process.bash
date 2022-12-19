#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🔍  Process Asset Files"
export NODE_ENV=$1
npm --prefix ../../assets run process