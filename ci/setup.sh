#!/bin/sh

# Ensures current folder is NOT the ci folder.
CURRENT_FOLDER=$(basename "$PWD")

if [ "$CURRENT_FOLDER" = "ci" ]; then
    cd ..
fi

kubectl create clusterrolebinding default-view --clusterrole=view --serviceaccount=default:default
