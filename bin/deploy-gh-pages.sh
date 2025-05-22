#!/bin/bash

# Exit on error
set -e

# Get the root directory of the project (where package.json is located)
PROJECT_ROOT="$(git rev-parse --show-toplevel)"

# The directory where the dist folder is
BUILD_DIR="$PROJECT_ROOT/dist"
# The branch to deploy to
GH_PAGES_BRANCH="gh-pages"
# The name of the remote (e.g., "origin")
REMOTE="origin"

# Delete the gh-pages branch both locally and remotely if it exists
git push $REMOTE --delete $GH_PAGES_BRANCH || true  # Ignore if remote branch doesn't exist
git branch -D $GH_PAGES_BRANCH || true  # Ignore if local branch doesn't exist

# Build the Vite project
git checkout main
npm install
npx vite build
# Create a temporary directory for the dist folder (using mktemp)
TEMP_DIST_DIR="$(mktemp -d ../zote-ghpages-dist-XXXXX)"
# Copy the contents of dist to the temporary directory

mv -v $BUILD_DIR $TEMP_DIST_DIR

# Create the gh-pages branch from main
git checkout --orphan $GH_PAGES_BRANCH
git rm -rf .
# Copy the contents of the temporary directory to the Git root
cp -r $TEMP_DIST_DIR/dist/* $PROJECT_ROOT/
# Commit and push the changes
git add .
git commit -m "Deploy to gh-pages"
git push --set-upstream $REMOTE $GH_PAGES_BRANCH

# Switch back to the main branch
git checkout main

# Leave the local gh-pages for inspection (will be deleted on subsequent deploys)
# Clean up: remove the temporary directory

echo "Remove at will: $TEMP_DIST_DIR"
echo "- gh-pages branch will be removed on next deploy"


