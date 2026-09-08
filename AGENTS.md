# Agent Development Guidelines

Guidelines for AI agents and human contributors working on this repository.

## 1. Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript (strict mode, native compiler)
- **UI & Styling**: Ant Design v6 + TailwindCSS v4
- **Routing**: TanStack Router (file-based routing)
- **Testing**: Vitest with real Chromium browser mode (`@vitest/browser-playwright`)
- **Code Quality**: ESLint (`strictTypeChecked`, `stylisticTypeChecked`), Prettier, Knip

## 2. Architectural Conventions

- **Routes**: Place route modules under `src/routes/`. Never manually edit `src/routeTree.gen.ts` (auto-generated).
- **Components**: Reusable UI components belong in `src/components/`.
- **Styling**: Prefer Ant Design components and design tokens (`src/theme.ts`). Use Tailwind utilities for layout, flexbox, grid, and spacing.
- **Imports**: Prefer explicit named imports. Do not add unneeded third-party libraries when native APIs or existing dependencies suffice.

## 3. Strict Coding Standards

- **No `any`**: Always provide accurate TypeScript types or generics.
- **No `@ts-ignore`**: Banned by ESLint. Use `@ts-expect-error` with a descriptive reason only if strictly unavoidable.
- **No Floating Promises**: Always `await` or properly handle Promises.
- **No Dead Code**: Do not export unused types/functions or leave unused packages in `package.json`. Knip checks this in CI.
- **Comments**: Keep all code comments in concise English.

## 4. Testing Standards

- Tests run inside headless Chromium.
- For UI assertions, verify both DOM existence and actual layout visibility:
  - `await expect.element(el).toBeInTheDocument()`
  - `await expect.element(el).toBeVisible()`
- Always add or update browser tests when creating or modifying UI components.

## 5. Verification Gate (Definition of Done)

Before finalizing any task or commit, execute the unified verification gate:

```bash
npm run check
```

This single command runs:

1. `typecheck` (`tsc -b` in strict mode)
2. `lint` (ESLint strict + stylistic type checks)
3. `format:check` (Prettier style validation)
4. `check:deadcode` (Knip unused exports and dependency check)
5. `test` (Vitest browser tests in Chromium)
6. `build` (Vite production bundle verification)

All checks must pass with 0 errors and 0 warnings.
