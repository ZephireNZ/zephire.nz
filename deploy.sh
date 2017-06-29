#!/bin/bash

GIT_HASH=$(git rev-parse --short=10 HEAD)

bundler install
gcloud app deploy --version "$GIT_HASH" --no-promote app.yaml
