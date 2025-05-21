#!/bin/bash

# Set up the environment with fnm (Fast Node Manager)
eval $(/home/jason/.local/share/fnm/fnm env --shell bash)

# Run the Vite development server
$(which npx) vite --port 2615 --host 0.0.0.0
