# CNAPP Dashboard

A responsive, data-driven cloud security dashboard built for the frontend trainee assignment. Categories and widgets are defined in JSON, while Redux Toolkit manages widget visibility, custom widgets, search, filters, and UI state. Dashboard changes persist in `localStorage`.

## Features

- Dynamic category and widget rendering from `src/data/dashboard.json`
- Redux Toolkit state management with local persistence
- Add custom widgets with a name and text
- Remove widgets directly from a card
- Enable or disable any widget from the category drawer
- Search across every active widget
- Responsive desktop, tablet, and mobile layout
- Accessible controls, keyboard focus states, and reduced-motion support

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

## Project structure

```text
src/
  components/       Dashboard UI and widget drawer
  data/             JSON dashboard configuration
  store/            Redux slice and store configuration
  utils/            Safe localStorage helpers
  App.jsx            Dashboard composition
  index.css          Responsive visual system
```
