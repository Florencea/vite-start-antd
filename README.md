# vite-start-antd

[![CI](https://github.com/Florencea/vite-start-antd/actions/workflows/ci.yml/badge.svg)](https://github.com/Florencea/vite-start-antd/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A lean React 19 boilerplate and upgrade canary testbed powered by Vite+ 1.0, Ant Design v6, TailwindCSS v4, TanStack Router, Vitest Browser mode, and Playwright E2E.

## Highlights

- **Unified Toolchain**: Powered by **Vite+ 1.0 (`vp`)** with built-in Rust-based Oxlint and Oxfmt, pnpm package management, and unified test orchestration.
- **Dual-Purpose Architecture**: Serves as both a clean starter template and a canary regression testbed for catching breaking changes during dependency upgrades.
- **Tailwind-Driven SSOT**: Design tokens defined in `src/global.css` (`@theme`) dynamically bridge into Ant Design tokens (`src/theme.ts`) without hardcoded fallback colors.
- **Natural Specificity**: Tailwind utilities are scoped under `#root` in `src/global.css`, avoiding the need for `!important` modifiers or inline `style`.
- **Canary Matrix (`/canary`)**: Isolated verification suite for SSOT tokens, Dayjs/DatePicker i18n (`zhTW`), Form validation, Feedback modals, and Table search params.
- **Multi-Layer Testing**: Real Chromium component tests (`@vitest/browser-playwright`) and full end-to-end user journeys (`playwright`).
- **Native React Compiler**: Zero-Babel React compiler transformation powered by Oxc (`oxc-transform-react`).
- **Modern CI Pipeline**: Two-tier GitHub Actions architecture featuring an authoritative fail-fast Linux gatekeeper, targeted macOS/Windows compatibility verification, and an upstream Node.js canary pipeline.

## Tech Stack

- **Unified Toolchain**: Vite+ 1.0 (`vp`)
- **Package Manager**: pnpm (managed transparently via `vp`)
- **Framework**: React 19 + Vite
- **UI & Styling**: Ant Design v6 + TailwindCSS v4
- **Routing**: TanStack Router (file-based)
- **Testing**: Vitest in headless Chromium (`@vitest/browser-playwright`) & Playwright E2E
- **Code Quality**: TypeScript 7 strict mode (with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`), Oxlint, Oxfmt, Knip

## Quick Start

```bash
vp install
vp run test:setup   # Install Chromium for browser tests (one-time)
vp dev
```

Run the unified verification gate:

```bash
vp run check        # check + lint:tailwind + check:deadcode + test + build
```

Or run the fast unified linter/formatter/typechecker:

```bash
vp check
```

## Available Scripts

### Human Developer Scripts

> Tip: `vpr <script>` is the concise Vite+ shorthand for `vp run <script>`.

| Command                 | Description                                                                             |
| :---------------------- | :-------------------------------------------------------------------------------------- |
| `vp dev`                | Start Vite development server                                                           |
| `vp check`              | Fast unified Rust-powered lint, format, and type check (Oxlint + Oxfmt + tsgolint)      |
| `vpr check`             | Run full human verification gate (`vp check`, `lint:tailwind`, `knip`, `test`, `build`) |
| `vp test`               | Run Vitest component tests in Chromium (`silent: "passed-only"`, watch mode locally)    |
| `vpr test:e2e`          | Run Playwright E2E tests against production preview (automatically builds if needed)    |
| `vpr typecheck`         | Run TypeScript compiler type checking (`tsc -b`)                                        |
| `vp lint`               | Check codebase semantic errors with Oxlint                                              |
| `vpr lint:ci`           | Check GitHub Actions workflow files locally with actionlint                             |
| `vp lint --fix`         | Automatically fix Oxlint errors                                                         |
| `vpr lint:tailwind`     | Check Tailwind CSS v4 canonical classes                                                 |
| `vpr lint:tailwind:fix` | Automatically format non-canonical Tailwind CSS classes                                 |
| `vp fmt --check`        | Validate code formatting with Oxfmt                                                     |
| `vp fmt`                | Automatically format all files with Oxfmt                                               |
| `vpr check:deadcode`    | Check unused files, exports, and dependencies with Knip                                 |
| `vp build`              | Build production bundle with Vite+                                                      |
| `vp preview`            | Preview production build                                                                |
| `vpr test:setup`        | Install Playwright Chromium browser binaries                                            |

### Agent Fail-Fast Ladder

| Command                  | Level / Stage                                                                |
| :----------------------- | :--------------------------------------------------------------------------- |
| `vpr agent:verify:inner` | **Inner Loop**: Typecheck (`tsc -b --pretty false`) + Oxlint & Tailwind lint |
| `vpr agent:verify:unit`  | **Unit Loop**: Inner loop + Vitest in flat zero-color mode (`tap-flat`)      |
| `vpr agent:verify:gate`  | **Gate**: Unit loop + Production bundle build + Playwright E2E tests         |

## Guidelines

For architectural rules, strict typing standards, and agent verification guidelines, refer to [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE)
