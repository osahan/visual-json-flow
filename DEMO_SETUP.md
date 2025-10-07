# Visual JSON Flow - Demo Setup

This document explains how to set up and deploy the Visual JSON Flow demo to GitHub Pages.

## Project Structure

```
visual-json-flow/
├── apps/demo/           # Vite demo application
├── packages/           # Core and React packages
├── .github/workflows/  # GitHub Actions for deployment
├── demo/              # Built demo files (generated)
└── index.html         # Landing page
```

## Local Development

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start development server:**
   ```bash
   yarn dev
   ```
   Opens at http://localhost:5173

3. **Build for production:**
   ```bash
   yarn build
   ```

## GitHub Pages Deployment

### Automatic Deployment

The project is configured with GitHub Actions to automatically deploy to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Check deployment:**
   - Go to the "Actions" tab in your repository
   - Wait for the "Deploy to GitHub Pages" workflow to complete
   - Your demo will be available at: `https://yourusername.github.io/visual-json-flow`

### Manual Deployment

If you prefer to deploy manually:

1. **Run the deployment script:**
   ```bash
   ./scripts/deploy-demo.sh
   ```

2. **Deploy the `demo/` directory:**
   - Use any static hosting service
   - Or upload the contents of `demo/` to your web server

## Demo Features

The live demo showcases:

- **Visual JSON Editor:** Interactive canvas with drag-and-drop nodes
- **Schema Validation:** Real-time validation with error indicators
- **Multiple Views:** Editor, Schema view, and Preview
- **Responsive Design:** Works on desktop and mobile devices

## Customization

### Adding Custom Schemas

1. Edit `apps/demo/src/schema.json`
2. Update `apps/demo/src/data.json` with sample data
3. Rebuild and redeploy

### Styling

- Main styles: `packages/react/src/styles.css`
- Component styles: `packages/react/src/styles/design-system.css`

## Troubleshooting

### Build Issues

- Ensure you're using the correct Node.js version (18+)
- Run `corepack enable` if you get Yarn version errors
- Clear node_modules and reinstall if you encounter dependency issues

### Deployment Issues

- Check GitHub Actions logs for error details
- Ensure the repository has Pages enabled
- Verify the workflow file is in `.github/workflows/`

## Support

For issues or questions:
- Check the main README.md
- Review the GitHub Actions logs
- Open an issue in the repository
