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
echo "Checking if '$GH_PAGES_BRANCH' exists..."

git fetch $REMOTE

# Check if gh-pages exists locally
if git show-ref --verify --quiet refs/heads/$GH_PAGES_BRANCH; then
  echo "Local branch '$GH_PAGES_BRANCH' exists. Deleting it..."
  git branch -D $GH_PAGES_BRANCH
fi

# Check if gh-pages exists remotely
if git show-ref --verify --quiet refs/remotes/$REMOTE/$GH_PAGES_BRANCH; then
  echo "Remote branch '$GH_PAGES_BRANCH' exists. Deleting it..."
  git push $REMOTE --delete $GH_PAGES_BRANCH
fi

# Create the gh-pages branch from main (or master)
echo "Creating the '$GH_PAGES_BRANCH' branch from main..."
git checkout main
git pull $REMOTE main  # Ensure you're up to date with main
git checkout --orphan $GH_PAGES_BRANCH
git reset --hard

# Push the new gh-pages branch to the remote and set upstream
git push --set-upstream $REMOTE $GH_PAGES_BRANCH

# Create a Git worktree for the gh-pages branch
echo "Creating a Git worktree for '$GH_PAGES_BRANCH'..."
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
git commit -m "Deploy to gh-pages"
git push $REMOTE $GH_PAGES_BRANCH

# Return to the main branch
cd $PROJECT_ROOT
git worktree remove $BUILD_DIR

echo "Deployment successful!"
