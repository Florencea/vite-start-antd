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
  - `/`: Clean, minimal starter welcome page with runtime version telemetry.
  - `/canary`: Dedicated upgrade regression testbed for high-risk integration points.
  - `/$`: Catch-all route that automatically redirects to `/`.
- **Components**: Reusable UI components belong in `src/components/`.
- **Styling & SSOT**:
  - **Single Source of Truth**: TailwindCSS v4 `@theme` in `src/global.css` is the sole source of truth for design tokens.
  - **Token Bridging**: `src/theme.ts` dynamically extracts CSS variables via `getComputedStyle(document.documentElement)` into Ant Design tokens (both global `token` and component tokens like `components.Layout.headerBg`). Never provide hardcoded fallback colors.
  - **No Inline `style`**: Never use `style={{ ... }}` on Ant Design or React components. Prefer Ant Design layout components (`Layout`, `Flex`, `Space`, `Row`, `Col`, `Card`).
  - **No `!` (important)**: Never use the `!` modifier in Tailwind classes. Tailwind utilities are scoped under `#root` in `src/global.css`, giving them natural specificity over Ant Design.
- **Language & i18n**:
  - All UI text, page headings, and code comments must be in concise English, except where specific localized strings (such as `zhTW` calendar buttons or formatters) are strictly required for i18n verification tests.
- **Imports**: Prefer explicit named imports. Do not add unneeded third-party libraries when native APIs or existing dependencies suffice.

## 3. Strict Coding Standards

- **No `any`**: Always provide accurate TypeScript types or generics.
- **No `@ts-ignore`**: Banned by ESLint. Use `@ts-expect-error` with a descriptive reason only if strictly unavoidable.
- **No Floating Promises**: Always `await` or properly handle Promises.
- **No Dead Code**: Do not export unused types/functions or leave unused packages in `package.json`. Knip checks this in CI.
- **Comments**: Keep all code comments in concise English.

## 4. Testing Standards

- Tests run inside headless Chromium (`@vitest/browser-playwright`).
- Use `renderAppAt(initialUrl)` from `test/test-utils.tsx` to mount components into `#root` with full `<Providers>` and TanStack Router context.
- For UI assertions, verify both DOM existence and actual layout visibility:
  - `await expect.element(el).toBeInTheDocument()`
  - `await expect.element(el).toBeVisible()`
- For design tokens and styling bridges, assert computed styles directly using `window.getComputedStyle()`.
- Always add or update browser tests when creating or modifying UI components or routes.

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
