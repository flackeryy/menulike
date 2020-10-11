#!/usr/bin/env sh
./docker/install.sh
CI=true BROWSER=none yarn start
