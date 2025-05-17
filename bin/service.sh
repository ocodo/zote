#!/bin/bash

eval $(/home/jason/.local/share/fnm/fnm env --shell bash)

$(which npx) next -p 9880 -H 0.0.0.0
