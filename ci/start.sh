#!/bin/sh

# Ensures current folder is NOT the ci folder.
CURRENT_FOLDER=$(basename "$PWD")

if [ "$CURRENT_FOLDER" = "ci" ]; then
    cd ..
fi

npm run dev -- --open
