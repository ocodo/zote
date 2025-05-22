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

# Check if gh-pages branch exists
git fetch $REMOTE
if ! git show-ref --verify --quiet refs/heads/$GH_PAGES_BRANCH; then
  echo "The branch '$GH_PAGES_BRANCH' does not exist. Creating it."
  # Create the gh-pages branch from main (or master)
  git checkout --orphan $GH_PAGES_BRANCH
  git reset --hard
  git push $REMOTE $GH_PAGES_BRANCH
  git checkout main
else
  echo "Branch '$GH_PAGES_BRANCH' already exists."
fi

# Create a Git worktree for the gh-pages branch
git worktree add $BUILD_DIR $GH_PAGES_BRANCH

# Build the Vite project
echo "Building the Vite project..."
npm run build

# Copy the contents of dist to the worktree
echo "Copying build files to $BUILD_DIR..."
cp -r $BUILD_DIR/* $BUILD_DIR/

# Change directory to the worktree
cd $BUILD_DIR

# Commit and push the changes
echo "Committing changes to $GH_PAGES_BRANCH..."
git add .
git commit -m "Deploy to gh-pages "
git push $REMOTE $GH_PAGES_BRANCH

# Return to the main branch
cd $PROJECT_ROOT
git worktree remove $BUILD_DIR

echo "Deployment successful!"
