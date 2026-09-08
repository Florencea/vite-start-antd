# vite-start-antd

[![CI](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml/badge.svg)](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lean React 19 boilerplate and upgrade canary testbed powered by Vite, Ant Design v6, TailwindCSS v4, TanStack Router, and Vitest Browser mode.

## Highlights

- **Dual-Purpose Architecture**: Serves as both a clean starter template and a canary regression testbed for catching breaking changes during dependency upgrades.
- **Tailwind-Driven SSOT**: Design tokens defined in `src/global.css` (`@theme`) dynamically bridge into Ant Design tokens (`src/theme.ts`) without hardcoded fallback colors.
- **Natural Specificity**: Tailwind utilities are scoped under `#root` in `src/global.css`, avoiding the need for `!important` modifiers or inline `style`.
- **Canary Matrix (`/canary`)**: Isolated verification suite for SSOT tokens, Dayjs/DatePicker i18n (`zhTW`), Form validation, Feedback modals, and Table search params.
- **Real Browser Testing**: Real Chromium tests (`@vitest/browser-playwright`) asserting computed styles, DOM visibility, and full router navigation.

## Tech Stack

- **Framework**: React 19 + Vite
- **UI & Styling**: Ant Design v6 + TailwindCSS v4
- **Routing**: TanStack Router (file-based)
- **Testing**: Vitest in headless Chromium (`@vitest/browser-playwright`)
- **Code Quality**: TypeScript strict mode, ESLint (`strictTypeChecked`), Prettier, Knip

## Quick Start

```bash
npm ci
npm run test:setup   # Install Chromium for browser tests (one-time)
npm run dev
```

Run the unified verification gate:

```bash
npm run check        # typecheck + lint + format + deadcode + test + build
```

## Available Scripts

| Command           | Description                                                                         |
| :---------------- | :---------------------------------------------------------------------------------- |
| `npm run dev`     | Start Vite development server                                                       |
| `npm run check`   | Run full verification gate (`typecheck`, `lint`, `format`, `knip`, `test`, `build`) |
| `npm run test`    | Run Vitest browser tests in Chromium                                                |
| `npm run build`   | Build production bundle                                                             |
| `npm run preview` | Preview production build                                                            |

## Guidelines

For architectural rules, strict typing standards, and verification guidelines, refer to [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE)
