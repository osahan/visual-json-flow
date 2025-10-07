# GitHub Pages Setup for Visual JSON Flow

## Overview

I've successfully set up your Visual JSON Flow project for GitHub Pages deployment. Here's what has been configured:

## 🎯 What's Been Added

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- **Automatic deployment** on push to `main` branch
- **Builds the project** using Yarn 4.0.0
- **Deploys to GitHub Pages** using the `peaceiris/actions-gh-pages` action
- **Publishes from `demo/` directory** for clean URL structure

### 2. Landing Page (`index.html`)
- **Beautiful landing page** with gradient background
- **Call-to-action button** linking to the demo
- **Feature highlights** and project description
- **Responsive design** that works on all devices

### 3. Deployment Script (`scripts/deploy-demo.sh`)
- **Automated build and deployment** script
- **Copies built files** to `demo/` directory
- **Includes landing page** in demo directory
- **Easy to run** with `yarn deploy-demo`

### 4. Updated Configuration
- **Added deployment scripts** to `package.json`
- **Updated `.gitignore`** to exclude generated `demo/` directory
- **Created comprehensive documentation** in `DEMO_SETUP.md`

## 🚀 How to Deploy

### Option 1: Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Select "GitHub Actions" as the source

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment setup"
   git push origin main
   ```

3. **Check deployment:**
   - Go to Actions tab to see deployment progress
   - Your demo will be live at: `https://yourusername.github.io/visual-json-flow`

### Option 2: Manual Deployment

1. **Run the deployment script:**
   ```bash
   yarn deploy-demo
   ```

2. **Deploy the `demo/` directory:**
   - Upload contents to any static hosting service
   - Or use the GitHub Pages interface to upload files

## 📁 File Structure

```
visual-json-flow/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── scripts/deploy-demo.sh        # Deployment script
├── index.html                    # Landing page
├── demo/                        # Generated demo files (ignored by git)
├── apps/demo/                   # Source demo application
└── packages/                    # Core packages
```

## 🎨 Demo Features

Your live demo will showcase:

- **Visual JSON Editor:** Interactive canvas with drag-and-drop nodes
- **Schema Validation:** Real-time validation with error indicators  
- **Multiple Views:** Editor, Schema view, and Preview
- **Responsive Design:** Works on desktop and mobile
- **Professional Landing Page:** Clean, modern design

## 🔧 Customization

### Changing the Demo Content
- Edit `apps/demo/src/schema.json` for different schemas
- Update `apps/demo/src/data.json` for sample data
- Modify `apps/demo/src/App.tsx` for UI changes

### Styling
- Main styles: `packages/react/src/styles.css`
- Component styles: `packages/react/src/styles/design-system.css`
- Landing page: `index.html` (inline styles)

### Deployment Settings
- Edit `.github/workflows/deploy.yml` for different deployment options
- Modify `scripts/deploy-demo.sh` for custom build steps

## 🐛 Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed
- Run `corepack enable` if you get Yarn version errors
- Clear `node_modules` and reinstall if needed

### Deployment Issues
- Check GitHub Actions logs for errors
- Ensure Pages is enabled in repository settings
- Verify the workflow file is in the correct location

### Local Testing
```bash
# Test the build
yarn build

# Test deployment script
yarn deploy-demo

# Preview locally
yarn preview
```

## 📋 Next Steps

1. **Commit and push** the changes to your repository
2. **Enable GitHub Pages** in repository settings
3. **Wait for deployment** to complete (check Actions tab)
4. **Share your live demo** with the world!

## 🌐 Expected URLs

- **Main site:** `https://yourusername.github.io/visual-json-flow`
- **Demo directly:** `https://yourusername.github.io/visual-json-flow/demo/`

The setup is now complete and ready for deployment! 🎉
