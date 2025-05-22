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
echo "[DEBUG] Deleting remote gh-pages branch (if it exists)..."
git push $REMOTE --delete $GH_PAGES_BRANCH || true  # Ignore if remote branch doesn't exist

echo "[DEBUG] Deleting local gh-pages branch (if it exists)..."
git branch -D $GH_PAGES_BRANCH || true  # Ignore if local branch doesn't exist

# Build the Vite project
echo "[DEBUG] Building the Vite project..."
npx vite build

# Create a temporary directory for the dist folder (using mktemp)
TEMP_DIST_DIR="$(mktemp -d ../zote-ghpages-dist-XXXXX)"
echo "[DEBUG] Created temporary directory for dist: $TEMP_DIST_DIR"

# Copy the contents of dist to the temporary directory
echo "[DEBUG] Copying build files to temporary directory..."
cp -r $BUILD_DIR/* $TEMP_DIST_DIR/

# Create the gh-pages branch from main
echo "[DEBUG] Creating new '$GH_PAGES_BRANCH' branch from main..."
git checkout main
git pull $REMOTE main  # Ensure you're up to date with main
git checkout -b $GH_PAGES_BRANCH

# Copy the contents of the temporary directory to the Git root
echo "[DEBUG] Copying files from temporary directory to repository root..."
cp -r $TEMP_DIST_DIR/* $PROJECT_ROOT/

# Commit and push the changes
echo "[DEBUG] Committing changes to '$GH_PAGES_BRANCH'..."
git add .
git commit -m "Deploy to gh-pages"
git push --set-upstream $REMOTE $GH_PAGES_BRANCH

# Switch back to the main branch
echo "[DEBUG] Switching back to 'main' branch..."
git checkout main

# Leave the local gh-pages for inspection (will be deleted on subsequent deploys)
echo "[DEBUG] Local gh-pages branch left for inspection."

# Clean up: remove the temporary directory
echo "[DEBUG] Cleaning up temporary directory..."
rm -rf $TEMP_DIST_DIR

echo "[DEBUG] Deployment successful!"
