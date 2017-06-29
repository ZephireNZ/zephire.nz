#!/bin/bash

GIT_HASH=$(git rev-parse --short=10 HEAD)

bundler install
bundle exec jekyll build
gcloud app deploy --version "$GIT_HASH" --no-promote _app.yaml $@
