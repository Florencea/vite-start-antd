# vite-start-antd

[![CI](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml/badge.svg)](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, agent-ready React 19 boilerplate powered by Vite, Ant Design v6, TailwindCSS v4, TanStack Router, and Vitest Browser mode.

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

## Agent & Contributor Guidelines

For architectural rules, strict typing standards, and verification guidelines, refer to [AGENTS.md](AGENTS.md).

## License

This project is licensed under the [MIT License](LICENSE).
