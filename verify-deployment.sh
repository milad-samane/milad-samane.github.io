#!/bin/bash

# #region agent log
LOG_PATH="/home/milad/projects/personal/milad-samane.github.io/.cursor/debug.log"
log() {
  echo "$(date +%s)000|$1" >> "$LOG_PATH" 2>/dev/null || true
}
# #endregion

# #region agent log
log '{"location":"verify-deployment.sh:start","message":"Deployment verification started","data":{},"hypothesisId":"K","timestamp":'$(date +%s000)',"sessionId":"debug-session","runId":"verification"}'
# #endregion

echo "=== GitHub Pages Deployment Verification ==="
echo ""

# Check if workflow is committed
WORKFLOW_IN_GIT=$(git ls-files .github/workflows/deploy.yml 2>/dev/null | wc -l)
# #region agent log
log '{"location":"verify-deployment.sh:git-check","message":"Workflow git status","data":{"workflowInGit":'$WORKFLOW_IN_GIT'},"hypothesisId":"F","timestamp":'$(date +%s000)',"sessionId":"debug-session","runId":"verification"}'
# #endregion

if [ "$WORKFLOW_IN_GIT" -eq 0 ]; then
  echo "❌ Workflow file is NOT committed to git"
  echo "   → Run: git add .github/workflows/deploy.yml vite.config.ts"
  echo "   → Then: git commit -m 'Add GitHub Pages deployment'"
  echo "   → Then: git push origin main"
  echo ""
else
  echo "✓ Workflow file is committed"
  echo ""
fi

# Check if files exist
echo "File Status:"
if [ -f "dist/public/index.html" ]; then
  echo "  ✓ dist/public/index.html exists"
else
  echo "  ❌ dist/public/index.html NOT found (build needed)"
fi

if [ -f "dist/public/.nojekyll" ]; then
  echo "  ✓ dist/public/.nojekyll exists"
else
  echo "  ⚠ dist/public/.nojekyll NOT found (will be created during build)"
fi

if [ -f "dist/public/404.html" ]; then
  echo "  ✓ dist/public/404.html exists"
else
  echo "  ⚠ dist/public/404.html NOT found (will be created during build)"
fi

echo ""
echo "=== Next Steps ==="
echo ""
echo "1. Commit and push the workflow:"
echo "   git add .github/workflows/deploy.yml vite.config.ts"
echo "   git commit -m 'Add GitHub Pages deployment workflow'"
echo "   git push origin main"
echo ""
echo "2. Enable GitHub Pages in repository settings:"
echo "   https://github.com/milad-samane/milad-samane.github.io/settings/pages"
echo "   → Source: Select 'GitHub Actions'"
echo "   → Click 'Save'"
echo ""
echo "3. Check the Actions tab:"
echo "   https://github.com/milad-samane/milad-samane.github.io/actions"
echo "   → Wait for workflow to complete"
echo ""
echo "4. Visit your site:"
echo "   https://milad-samane.github.io"
echo ""

# #region agent log
log '{"location":"verify-deployment.sh:complete","message":"Verification complete","data":{"workflowInGit":'$WORKFLOW_IN_GIT'},"hypothesisId":"K","timestamp":'$(date +%s000)',"sessionId":"debug-session","runId":"verification"}'
# #endregion

