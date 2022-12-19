#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🧪  Test Frontend Living Style Guide"
npm --prefix ../../../frontend/living-style-guide run test
