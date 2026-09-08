# vite-start-antd

[![CI](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml/badge.svg)](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, agent-ready React 19 boilerplate and upgrade canary testbed powered by Vite, Ant Design v6, TailwindCSS v4, TanStack Router, and Vitest Browser mode.

## Overview

This project serves two primary purposes:

1. **Clean Starter Template**: A lean, minimal starter template with strict TypeScript types, pure Ant Design layouts, and file-based routing.
2. **Upgrade Canary Testbed**: A built-in regression detection matrix designed to catch breaking changes, timing issues, or style conflicts early when updating core dependencies (React 19, Ant Design v6, TailwindCSS v4, TanStack Router).

## Key Highlights

- **Single Source of Truth (SSOT) Styling**: Design tokens are defined in `src/global.css` via TailwindCSS v4 `@theme` (`--color-primary`). `src/theme.ts` dynamically extracts CSS variables and bridges them to Ant Design design tokens (`token.colorPrimary`, `components.Layout.headerBg`).
- **Natural CSS Specificity**: Tailwind utilities are scoped under `#root` in `src/global.css`, giving them natural specificity over Ant Design without requiring `!important` modifiers or inline `style` attributes.
- **Dedicated Canary Route (`/canary`)**: A standalone testbed verifying high-fragility integration points:
  - SSOT Token Bridge computed style consistency
  - Dayjs and DatePicker internationalization (`zhTW`)
  - Form validation under React 19
  - Feedback portals and modals (`App.useApp()`)
  - TanStack Router search params synchronization with Table pagination
- **Real Chromium Browser Tests**: End-to-end component and route testing powered by `@vitest/browser-playwright`, asserting true layout visibility and computed styles.

## Tech Stack

- **Framework**: React 19 + Vite
- **UI & Styling**: Ant Design v6 + TailwindCSS v4
- **Routing**: TanStack Router (file-based routing)
- **Language**: TypeScript (strict mode, native compiler)
- **Testing**: Vitest with headless Chromium browser mode (`@vitest/browser-playwright`)
- **Code Quality**: ESLint (`strictTypeChecked`, `stylisticTypeChecked`), Prettier, Knip

## Quick Start

The required Node.js version is specified in the `engines` field of `package.json`.

```bash
# 1. Install dependencies
npm ci

# 2. Setup browser test environment (one-time)
npm run test:setup

# 3. (Optional) Create local environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

## Available Scripts

| Command                  | Description                                                                                            |
| :----------------------- | :----------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Start local Vite development server                                                                    |
| `npm run build`          | Build production bundle                                                                                |
| `npm run preview`        | Locally preview production build                                                                       |
| `npm run check`          | Run unified verification gate (`typecheck`, `lint`, `format:check`, `check:deadcode`, `test`, `build`) |
| `npm run typecheck`      | Run TypeScript strict compiler check (`tsc -b`)                                                        |
| `npm run lint`           | Run ESLint strict checks                                                                               |
| `npm run lint:fix`       | Automatically fix ESLint issues                                                                        |
| `npm run format`         | Format all files with Prettier                                                                         |
| `npm run format:check`   | Validate file formatting with Prettier                                                                 |
| `npm run check:deadcode` | Detect dead code and unused dependencies with Knip                                                     |
| `npm run test`           | Run browser tests in Chromium                                                                          |
| `npm run test:setup`     | Install Playwright Chromium browser                                                                    |

## Project Structure

```text
src/
├── components/          # Reusable UI components (e.g., Welcome.tsx)
├── routes/              # TanStack Router file-based route tree
│   ├── __root.tsx       # Root layout shell with Antd Layout and navigation
│   ├── index.tsx        # Minimal starter welcome page (/)
│   ├── canary.tsx       # Upgrade canary regression matrix (/canary)
│   └── $.tsx            # Catch-all route redirecting to /
├── global.css           # Tailwind v4 theme definitions and layers
├── main.tsx             # Application entry point
├── providers.tsx        # Global ConfigProvider, App, locale, and theme setup
├── theme.ts             # SSOT bridge extracting CSS variables into Antd tokens
└── routeTree.gen.ts     # Auto-generated route tree (do not edit manually)
test/
├── test-utils.tsx       # Test harness mounting app inside #root with providers and router
├── index.test.tsx       # Browser tests for home page, version tags, token header, and 404 redirect
└── canary.test.tsx      # Browser tests for SSOT computed styles, Dayjs i18n, Form, Modal, and Table
```

## Agent & Contributor Guidelines

For architectural rules, strict typing standards, and verification guidelines, refer to [AGENTS.md](AGENTS.md).

## License

This project is licensed under the [MIT License](LICENSE).
