# vite-start-antd

[![CI](https://github.com/Florencea/vite-start-antd/actions/workflows/ci.yml/badge.svg)](https://github.com/Florencea/vite-start-antd/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lean React 19 boilerplate and upgrade canary testbed powered by Vite, Ant Design v6, TailwindCSS v4, TanStack Router, Vitest Browser mode, and Playwright E2E.

## Highlights

- **Dual-Purpose Architecture**: Serves as both a clean starter template and a canary regression testbed for catching breaking changes during dependency upgrades.
- **Tailwind-Driven SSOT**: Design tokens defined in `src/global.css` (`@theme`) dynamically bridge into Ant Design tokens (`src/theme.ts`) without hardcoded fallback colors.
- **Natural Specificity**: Tailwind utilities are scoped under `#root` in `src/global.css`, avoiding the need for `!important` modifiers or inline `style`.
- **Canary Matrix (`/canary`)**: Isolated verification suite for SSOT tokens, Dayjs/DatePicker i18n (`zhTW`), Form validation, Feedback modals, and Table search params.
- **Multi-Layer Testing**: Real Chromium component tests (`@vitest/browser-playwright`) and full end-to-end user journeys (`playwright`).
- **Modern CI Pipeline**: Two-tier GitHub Actions architecture featuring an authoritative fail-fast Linux gatekeeper, targeted macOS/Windows compatibility verification, and an upstream Node.js canary pipeline.

## Tech Stack

- **Framework**: React 19 + Vite
- **UI & Styling**: Ant Design v6 + TailwindCSS v4
- **Routing**: TanStack Router (file-based)
- **Testing**: Vitest in headless Chromium (`@vitest/browser-playwright`) & Playwright E2E
- **Code Quality**: TypeScript strict mode (with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`), ESLint (`strictTypeChecked`), Prettier, Knip

## Quick Start

```bash
npm ci
cp .env.example .env # Optional local environment variables
npm run test:setup   # Install Chromium for browser tests (one-time)
npm run dev
```

Run the unified verification gate:

```bash
npm run check        # typecheck + lint + tailwind + format + deadcode + test + build
```

## Environment Variables

Configured in `.env` (refer to `.env.example`):

- `VITE_TITLE`: HTML document title and meta description.
- `VITE_FAVICON`: Favicon filename in the `public/` directory.
- `VITE_WEB_BASE`: Base URL for routing and deployment (defaults to `/`).

## Available Scripts

### Human Developer Scripts

| Command                     | Description                                                                                           |
| :-------------------------- | :---------------------------------------------------------------------------------------------------- |
| `npm run dev`               | Start Vite development server                                                                         |
| `npm run check`             | Run full human verification gate (`typecheck`, `lint`, `tailwind`, `format`, `knip`, `test`, `build`) |
| `npm run test`              | Run Vitest component tests in Chromium (`silent: "passed-only"`, watch mode locally)                  |
| `npm run test:e2e`          | Run Playwright E2E tests against production preview (automatically builds if needed)                  |
| `npm run typecheck`         | Run TypeScript compiler type checking (`tsc -b`)                                                      |
| `npm run lint`              | Check codebase semantic errors with ESLint                                                            |
| `npm run lint:fix`          | Automatically fix ESLint errors                                                                       |
| `npm run lint:tailwind`     | Check Tailwind CSS v4 canonical classes                                                               |
| `npm run lint:tailwind:fix` | Automatically format non-canonical Tailwind CSS classes                                               |
| `npm run format:check`      | Validate code formatting with Prettier                                                                |
| `npm run format`            | Automatically format all files with Prettier                                                          |
| `npm run check:deadcode`    | Check unused files, exports, and dependencies with Knip                                               |
| `npm run build`             | Build production bundle with Vite                                                                     |
| `npm run preview`           | Preview production build                                                                              |
| `npm run test:setup`        | Install Playwright Chromium browser binaries                                                          |

### Agent Fail-Fast Ladder

| Command                      | Level / Stage                                                                |
| :--------------------------- | :--------------------------------------------------------------------------- |
| `npm run agent:verify:inner` | **Inner Loop**: Typecheck (`tsc -b --pretty false`) + ESLint & Tailwind lint |
| `npm run agent:verify:unit`  | **Unit Loop**: Inner loop + Vitest in flat zero-color mode (`tap-flat`)      |
| `npm run agent:verify:gate`  | **Gate**: Unit loop + Production build + Playwright E2E tests                |

## Guidelines

For architectural rules, strict typing standards, and agent verification guidelines, refer to [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE)
