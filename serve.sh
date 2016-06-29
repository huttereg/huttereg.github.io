#!/bin/bash

bundle exec jekyll serve --config _config.yml,_config-dev.yml &
browser-sync start --proxy "localhost:4000" --files "_site/*.*" &
wait

