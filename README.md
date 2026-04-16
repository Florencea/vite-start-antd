# Vite Start AntD

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tanstack](https://img.shields.io/badge/Tanstack-%23FF4154.svg?style=for-the-badge&logo=react-query&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)

![CI](https://github.com/Florencea/vite-start-antd/actions/workflows/test.yml/badge.svg)

This template provides a minimal, modern boilerplate equipped with [Vite](https://vitejs.dev/), [Ant Design](https://ant.design/), [Tailwind CSS](https://tailwindcss.com/), and [TanStack Router](https://tanstack.com/router/latest).

## Table of Contents

- [Features](#features)
- [Getting Started](#-getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#-environment-variables)
- [Testing & CI](#testing--ci)
- [Resources & Docs](#resources--docs)
- [License](#license)

---

## Features

- **Vite:** Next-generation frontend tooling for fast development and builds.
- **React & TypeScript:** Modern, type-safe UI development.
- **Ant Design:** An enterprise-class UI design language and React UI library.
- **Tailwind CSS v4:** A utility-first CSS framework powered by the new `@tailwindcss/vite` engine.
- **TanStack Router:** Fully type-safe routing for modern web applications.
- **Vitest & Playwright:** Component and End-to-End testing in a real browser environment.
- **ESLint & Prettier:** Pre-configured for consistent code style and quality.
- **PNPM:** Fast, disk space-efficient package manager.
- **CI Ready:** Pre-configured GitHub Actions workflow for automated testing.

---

## Getting Started

### Prerequisites

Based on the `engines` field in `package.json`:

- **Node.js**: `24.15.0` or newer
- **PNPM**: `10.33.0` or newer

### Installation

1. **Install dependencies**

```sh
pnpm install
```

2. **Configure Environment Variables**

Create a .env file in the root directory based on the variables described in the [Environment Variables](#-environment-variables) section.

3. **Start the Development Server**

```sh
pnpm dev
```

---

## Available Scripts

In the project directory, you can run the following commands:

- **`pnpm dev`**: Starts the development server.

- **`pnpm build`**: Builds the application for production.

- **`pnpm preview`**: Previews the production build locally.

- **`pnpm lint`**: Lints the codebase with ESLint.

- **`pnpm typecheck`**: Performs a TypeScript type check on the project.

- **`pnpm format`**: Formats all files with Prettier.

- **`pnpm test`**: Runs the test suite using Vitest in browser mode.

- **`pnpm test:setup`**: Installs the necessary Playwright browser binaries.

---

## Environment Variables

Variables prefixed with `VITE_` are [exposed](https://vitejs.dev/guide/env-and-mode.html#env-files) to Vite-processed code.

This template comes fully configured for [IntelliSense for TypeScript](https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript) and [HTML Env Replacement](https://vitejs.dev/guide/env-and-mode.html#html-env-replacement).

Example configuration:

```sh
# Title of the Website
VITE_TITLE="Vite Start antd"
# Favicon of Website in /public directory
VITE_FAVICON="vite.svg"
# Base URL for Deployment
VITE_WEB_BASE="/"
# Backend API prefix for proxy server in development mode
VITE_API_PREFIX="/api"
# Port for dev/preview server
PORT=5173
# Target URL for proxying requests in development mode
PROXY_SERVER="http://localhost:5173/"
```

---

## Testing & CI

### Vitest & Playwright

This template includes a robust testing setup. It utilizes Vitest configured with the **Playwright** browser provider. When you run `pnpm test`, it automatically ensures Playwright is installed and executes your tests in a headless Chromium environment.

### Continuous Integration (CI)

The project comes with a fully configured GitHub Actions workflow (`.github/workflows/test.yml`). It automatically runs formatting checks, linting, builds, and your test suite across multiple Node.js versions (`20`, `22`, `24`, `25`) and operating systems (`Ubuntu`, `macOS`, `Windows`) upon every push to the main branch.

---

## Resources & Docs

- [Vite](https://vitejs.dev/)
- [Ant Design](https://ant.design/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TanStack Router](https://tanstack.com/router/latest)
- [Vitest Browser Mode](https://vitest.dev/guide/browser/)

---

## License

This project is licensed under the **MIT License**.
