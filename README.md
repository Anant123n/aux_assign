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

## Run the application locally

### Prerequisites

Install the following before starting:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) version 20.19+ or 22.12+
- npm, which is included with Node.js

Confirm that the required tools are available:

```bash
git --version
node --version
npm --version
```

### 1. Clone the repository

```bash
git clone https://github.com/Anant123n/aux_assign.git
```

### 2. Open the application directory

The React application is inside the `aux_assigns` folder:

```bash
cd aux_assign/aux_assigns
```

### 3. Install dependencies

```bash
npm install
```

This installs React, Redux Toolkit, React-Redux, Lucide icons, Vite, and the other development dependencies listed in `package.json`.

### 4. Start the development server

```bash
npm run dev
```

Vite will print a local address in the terminal, normally:

```text
http://localhost:5173/
```

Open that address in a browser. Changes made to the source files will refresh the page automatically.

### 5. Stop the development server

Return to the terminal and press `Ctrl+C`.

## Create and preview a production build

Build the optimized application:

```bash
npm run build
```

The generated production files will be written to the `dist` directory. Preview that build locally with:

```bash
npm run preview
```

Open the URL printed by Vite, normally `http://localhost:4173/`. Press `Ctrl+C` when finished.

## Quality checks

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Configuration and saved data

- No environment variables or API keys are required.
- Dashboard data is initially loaded from `src/data/dashboard.json`.
- Widget additions and visibility changes are saved in the browser's `localStorage`.
- Use the reset button in the dashboard header to restore the default widgets.

## Troubleshooting

- If `npm install` reports an unsupported engine, upgrade Node.js to a supported version and run the command again.
- If port `5173` is already in use, Vite will normally select another available port; open the exact URL printed in the terminal.
- If saved widgets appear outdated, use the dashboard reset button or clear this site's browser storage.
- If dependencies become inconsistent, remove `node_modules`, then run `npm install` again. Do not delete `package-lock.json` unless dependency versions intentionally need to change.

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
