#!/bin/bash -x

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

# Step 1: Check if 'gh-pages' branch exists remotely
echo "[DEBUG] Step 1: Checking if '$GH_PAGES_BRANCH' exists remotely..."
git fetch $REMOTE
if git show-ref --verify --quiet refs/remotes/$REMOTE/$GH_PAGES_BRANCH; then
  echo "[DEBUG] Remote branch '$GH_PAGES_BRANCH' found. Deleting remote branch..."
  git push $REMOTE --delete $GH_PAGES_BRANCH
else
  echo "[DEBUG] Remote branch '$GH_PAGES_BRANCH' not found. Skipping deletion."
fi
echo "[DEBUG] Step 1 complete."
read -p "Continue to Step 2... Press Enter."

# Step 2: Check if 'gh-pages' branch exists locally
echo "[DEBUG] Step 2: Checking if '$GH_PAGES_BRANCH' exists locally..."
if git show-ref --verify --quiet refs/heads/$GH_PAGES_BRANCH; then
  echo "[DEBUG] Local branch '$GH_PAGES_BRANCH' found. Deleting local branch..."
  git branch -D $GH_PAGES_BRANCH
else
  echo "[DEBUG] Local branch '$GH_PAGES_BRANCH' not found. Skipping deletion."
fi
echo "[DEBUG] Step 2 complete."
read -p "Continue to Step 3... Press Enter."

# Step 3: Switch to main branch and update it
echo "[DEBUG] Step 3: Switching to 'main' branch..."
git checkout main
git pull $REMOTE main  # Ensure you're up to date with main
echo "[DEBUG] Switched to 'main' and pulled latest changes."
echo "[DEBUG] Step 3 complete."
read -p "Continue to Step 4... Press Enter."

# Step 4: Create 'gh-pages' branch from main
echo "[DEBUG] Step 4: Creating the '$GH_PAGES_BRANCH' branch from 'main'..."
git checkout --orphan $GH_PAGES_BRANCH
git reset --hard
echo "[DEBUG] '$GH_PAGES_BRANCH' branch created from 'main'."
echo "[DEBUG] Step 4 complete."
read -p "Continue to Step 5... Press Enter."

# Step 5: Make an initial commit on 'gh-pages'
echo "[DEBUG] Step 5: Making an initial commit on '$GH_PAGES_BRANCH'..."
touch README.md  # Placeholder file, can be replaced with any file
git add README.md
git commit -m "Initial commit for gh-pages"
echo "[DEBUG] Initial commit made on '$GH_PAGES_BRANCH'."
echo "[DEBUG] Step 5 complete."
read -p "Continue to Step 6... Press Enter."

# Step 6: Push the new 'gh-pages' branch to remote
echo "[DEBUG] Step 6: Pushing '$GH_PAGES_BRANCH' to remote..."
git push --set-upstream $REMOTE $GH_PAGES_BRANCH
echo "[DEBUG] '$GH_PAGES_BRANCH' successfully pushed to remote."
echo "[DEBUG] Step 6 complete."
read -p "Continue to Step 7... Press Enter."

# Step 7: Create a Git worktree for 'gh-pages'
echo "[DEBUG] Step 7: Creating a Git worktree for '$GH_PAGES_BRANCH'..."
git worktree add $BUILD_DIR $GH_PAGES_BRANCH
echo "[DEBUG] Git worktree created for '$GH_PAGES_BRANCH'."
echo "[DEBUG] Step 7 complete."
read -p "Continue to Step 8... Press Enter."

# Step 8: Build the Vite project
echo "[DEBUG] Step 8: Building the Vite project..."
npm run build
echo "[DEBUG] Vite project build completed."
echo "[DEBUG] Step 8 complete."
read -p "Continue to Step 9... Press Enter."

# Step 9: Copy build files to the worktree
echo "[DEBUG] Step 9: Copying build files to '$BUILD_DIR'..."
cp -r $BUILD_DIR/* $BUILD_DIR/
echo "[DEBUG] Build files copied."
echo "[DEBUG] Step 9 complete."
read -p "Continue to Step 10... Press Enter."

# Step 10: Commit and push the changes to 'gh-pages'
echo "[DEBUG] Step 10: Committing changes to '$GH_PAGES_BRANCH'..."
cd $BUILD_DIR
git add .
git commit -m "Deploy to gh-pages"
git push $REMOTE $GH_PAGES_BRANCH
echo "[DEBUG] Changes committed and pushed to '$GH_PAGES_BRANCH'."
echo "[DEBUG] Step 10 complete."
read -p "Continue to Step 11... Press Enter."

# Step 11: Clean up worktree
echo "[DEBUG] Step 11: Cleaning up the worktree..."
cd $PROJECT_ROOT
git worktree remove $BUILD_DIR
echo "[DEBUG] Worktree removed."
echo "[DEBUG] Step 11 complete."

echo "[DEBUG] Deployment successful!"
