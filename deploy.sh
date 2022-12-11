#!/bin/bash

CHANGES=$(git status --porcelain 2>/dev/null | wc -l)

if [ $CHANGES -gt 0 ]; then
    VERSION=$(date '+dev-%Y%m%d%H%M%S')
else
    VERSION=$(git rev-parse --short=10 HEAD)
fi

echo "Building..."
npm run build
echo "Deploying $VERSION"
gcloud app deploy --version "$VERSION" --no-promote app.yaml $@
