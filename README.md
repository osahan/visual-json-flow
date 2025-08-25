# Visual JSON Flow

A schema‑aware, **workflow‑style** JSON editor for non‑technical users.

Give it a **JSON Schema**, get a **visual canvas** of nodes and lanes that makes structure obvious at a glance — not a wall of form fields.

> MVP status: objects, arrays (as lanes), scalars, and `oneOf` choices; Ajv validation with per‑node badges; Vite demo app.

## Quickstart
```bash
yarn install
yarn build
yarn dev
```
Open http://localhost:5173

## Monorepo layout
```
packages/
  core/   # schema compiler + validation
  react/  # canvas + nodes
apps/
  demo/   # Vite playground
```

## License
MIT © contributors
