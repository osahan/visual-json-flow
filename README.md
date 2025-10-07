# Visual JSON Flow

A schema‑aware, **workflow‑style** JSON editor for non‑technical users.

Give it a **JSON Schema**, get a **visual canvas** of nodes and lanes that makes structure obvious at a glance — not a wall of form fields.

> MVP status: objects, arrays (as lanes), scalars, and `oneOf` choices; Ajv validation with per‑node badges; Vite demo app.

## 🚀 Live Demo

**[Try the Interactive Demo →](https://osahan.github.io/visual-json-flow)**

Experience Visual JSON Flow in action with our live demo featuring:
- **Interactive Canvas** - Drag and drop nodes to build your JSON structure
- **Real-time Validation** - See validation errors as you type
- **Multiple Views** - Switch between Editor, Schema, and Preview modes
- **Responsive Design** - Works seamlessly on desktop and mobile

## Quickstart

### Local Development
```bash
yarn install
yarn build
yarn dev
```
Open http://localhost:5173

### Deploy Your Own Demo
```bash
# Build and prepare demo files
yarn deploy-demo

# Deploy the 'demo/' directory to any static hosting service
```

## Features

- 🎨 **Visual Workflow Editor** - Drag-and-drop interface for JSON structure
- ✅ **Schema Validation** - Real-time validation with error indicators
- 🔄 **Multiple View Modes** - Editor, Schema view, and JSON preview
- 📱 **Responsive Design** - Works on all device sizes
- 🎯 **TypeScript** - Fully typed for better development experience
- ⚡ **Fast & Lightweight** - Built with Vite and React

## Monorepo Structure

```
packages/
  core/   # Schema compiler + validation engine
  react/  # React components + canvas
apps/
  demo/   # Vite demo application
```

## Development

### Prerequisites
- Node.js 18+
- Yarn 4.0.0 (managed via Corepack)

### Available Scripts
```bash
yarn dev          # Start development server
yarn build        # Build all packages
yarn typecheck    # Run TypeScript checks
yarn deploy-demo  # Build and prepare demo files
yarn preview      # Preview built demo locally
```

### GitHub Pages Deployment

The project includes automatic GitHub Pages deployment:

1. **Enable GitHub Pages** in repository settings
2. **Push to main branch** - deployment happens automatically
3. **Access your demo** at `https://osahan.github.io/visual-json-flow`

See [DEMO_SETUP.md](./DEMO_SETUP.md) for detailed deployment instructions.

## License
MIT © contributors
