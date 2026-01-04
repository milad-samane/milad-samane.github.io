# GitHub Pages 404 Troubleshooting Guide

## Quick Checklist

1. ✅ **Workflow file is committed** - Verified: `.github/workflows/deploy.yml` is in git
2. ✅ **vite.config.ts is committed** - Verified: File is in git
3. ⚠️ **Check GitHub Pages Settings** - Go to: https://github.com/milad-samane/milad-samane.github.io/settings/pages
4. ⚠️ **Check GitHub Actions** - Go to: https://github.com/milad-samane/milad-samane.github.io/actions

## Step-by-Step Troubleshooting

### Step 1: Verify GitHub Pages Configuration

1. Go to: https://github.com/milad-samane/milad-samane.github.io/settings/pages
2. Under "Source", check what is selected:
   - ✅ **Should be**: "GitHub Actions" 
   - ❌ **If it says**: "Deploy from a branch" → Change it to "GitHub Actions" and click Save

### Step 2: Check GitHub Actions Workflow

1. Go to: https://github.com/milad-samane/milad-samane.github.io/actions
2. Look for "Deploy to GitHub Pages" workflow
3. Check the status:
   - ✅ **Green checkmark** = Success (wait 1-2 minutes for Pages to update)
   - ❌ **Red X** = Failed (click on it to see error logs)
   - ⏳ **Yellow circle** = Running (wait for it to complete)
   - ❓ **No workflow visible** = Workflow hasn't run yet

### Step 3: If Workflow Failed

1. Click on the failed workflow run
2. Expand the "Build" job
3. Look for error messages, especially in:
   - "Build" step
   - "Verify build output" step
4. Common errors:
   - **"index.html not found"** → Build failed, check build logs
   - **"pnpm: command not found"** → pnpm setup issue
   - **Permission errors** → Check repository settings

### Step 4: Manual Workflow Trigger

If the workflow hasn't run automatically:

1. Go to: https://github.com/milad-samane/milad-samane.github.io/actions
2. Click "Deploy to GitHub Pages" in the left sidebar
3. Click "Run workflow" button (top right)
4. Select "main" branch
5. Click "Run workflow"
6. Wait for it to complete

### Step 5: Verify Build Output

The workflow includes a "Verify build output" step that checks for:
- ✅ `dist/public/index.html` (required)
- ✅ `dist/public/.nojekyll` (should be created)
- ✅ `dist/public/404.html` (should be created)

If any of these are missing, check the build logs.

## Common Issues and Solutions

### Issue: "GitHub Actions" option not available in Pages settings

**Solution**: 
- Make sure the workflow file (`.github/workflows/deploy.yml`) is committed and pushed
- Wait a few minutes after pushing
- Refresh the settings page

### Issue: Workflow runs but site still shows 404

**Solution**:
- Wait 1-2 minutes after workflow completes (GitHub Pages needs time to update)
- Clear browser cache or try incognito mode
- Check if the workflow actually succeeded (green checkmark)

### Issue: Workflow fails with "index.html not found"

**Solution**:
- Check the build logs to see why the build failed
- Verify `vite.config.ts` has the correct `outDir` setting
- Make sure `client/index.html` exists

### Issue: Site works but client-side routing doesn't work

**Solution**:
- Verify `404.html` was created (check workflow logs)
- The build plugin should create this automatically
- If missing, the workflow will show a warning but continue

## Still Having Issues?

If none of the above solutions work:

1. Share the error message from the GitHub Actions logs
2. Check the "Verify build output" step logs
3. Verify the workflow file content matches what's in the repository

## Expected Workflow Behavior

When working correctly:
1. Push to `main` branch triggers workflow
2. Workflow builds the site using `pnpm run build:gh-pages`
3. Build creates `dist/public/index.html`, `.nojekyll`, and `404.html`
4. Workflow verifies the files exist
5. Workflow uploads to GitHub Pages
6. Workflow deploys to GitHub Pages
7. Site is live at https://milad-samane.github.io within 1-2 minutes

