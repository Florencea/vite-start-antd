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
- **React Compiler**: Automatic fine-grained memoization is enabled via `@vitejs/plugin-react` (`reactCompilerPreset`) and `@rolldown/plugin-babel`. Do not write manual `useMemo`, `useCallback`, or `React.memo` unless handling non-compiler edge cases. Conforms strictly to `eslint-plugin-react-hooks`'s `recommended-latest` rules.
- **Styling & SSOT**:
  - **Single Source of Truth**: TailwindCSS v4 `@theme` in `src/global.css` is the sole source of truth for design tokens.
  - **Token Bridging**: `src/theme.ts` dynamically extracts CSS variables via `useSyncExternalStore` and `MutationObserver` on `document.documentElement` into Ant Design tokens (`useAntdTheme()`). Never provide hardcoded fallback colors.
  - **No Inline `style`**: Never use `style={{ ... }}` on Ant Design or React components. Prefer Ant Design layout components (`Layout`, `Flex`, `Space`, `Row`, `Col`, `Card`).
  - **No `!` (important)**: Never use the `!` modifier in Tailwind classes. Tailwind utilities are scoped under `#root` in `src/global.css`, giving them natural specificity over Ant Design.
  - **Canonical Classes**: Use Tailwind CSS v4 canonical class syntax. Run `npm run lint:tailwind` to diagnose non-canonical classes and `npm run lint:tailwind:fix` to automatically format them.
- **Language & i18n**:
  - All UI text, page headings, and code comments must be in concise English, except where specific localized strings (such as `zhTW` calendar buttons or formatters) are strictly required for i18n verification tests.
- **Imports**: Prefer explicit named imports. Do not add unneeded third-party libraries when native APIs or existing dependencies suffice.

## 3. Strict Coding Standards

- **No `any`**: Always provide accurate TypeScript types or generics.
- **No `@ts-ignore`**: Banned by ESLint. Use `@ts-expect-error` with a descriptive reason only if strictly unavoidable.
- **No Floating Promises**: Always `await` or properly handle Promises.
- **No Dead Code**: Do not export unused types/functions or leave unused packages in `package.json`. Knip checks this in CI.
- **Boundary Defenses**: Strict compiler checks enabled (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`). Optional properties must not receive `undefined` unless explicitly declared.
- **React Hooks**: `react-hooks/exhaustive-deps` strictly enforced as errors.
- **CI Workflow Standards**: Whenever `.github/workflows/` files are added or modified, running `actionlint` locally with **0 errors and 0 warnings** is a strict requirement before staging (`git add`). Execute via `actionlint` directly or `npm run lint:ci` (`npm run agent:lint:ci`). Note that `actionlint` is strictly an offline/local shift-left verification guardrail and must **never** be embedded into remote GitHub Actions workflow files.
- **Comments**: Keep all code comments in concise English.

## 4. Testing Standards

- **Unit / Component Tests**: Run inside headless Chromium via Vitest (`@vitest/browser-playwright`).
  - Use `renderAppAt(initialUrl)` from `test/test-utils.tsx` to mount components into `#root` with full `<Providers>` and TanStack Router context.
  - For UI assertions, verify both DOM existence and actual layout visibility:
    - `await expect.element(el).toBeInTheDocument()`
    - `await expect.element(el).toBeVisible()`
  - For design tokens and styling bridges, assert computed styles directly using `window.getComputedStyle()`.
  - Always add or update browser tests when creating or modifying UI components or routes.
  - Local debugging: `test.only` is permitted for local interactive debugging, but strictly forbidden in CI (`CI=true`). Console logs are muted for passed tests (`silent: "passed-only"`) to reduce noise while surfacing logs on test failures.
- **E2E Tests**: Playwright tests live in `test/e2e/` and test production preview builds against real Chromium (`playwright.config.ts` automatically runs build before preview).

## 5. Verification Gate (Definition of Done)

### Human-Friendly Gate

```bash
npm run check
```

This single command runs:

1. `typecheck` (`tsc -b` in strict mode)
2. `lint` (ESLint strict + stylistic type checks)
3. `lint:tailwind` (Official Tailwind CSS v4 diagnostic & canonical class check via headless `@tailwindcss/language-server`)
4. `format:check` (Prettier style validation)
5. `check:deadcode` (Knip unused exports and dependency check)
6. `test` (Vitest browser tests in Chromium)
7. `build` (Vite production bundle verification)

### Agent-Specific Dual-Track Ladder (Fail-Fast)

Agents must follow this strict verification ladder:

1. **Inner Loop**: `npm run agent:verify:inner`
   - `agent:typecheck` (`tsc -b --pretty false`)
   - `agent:lint` (`agent:lint:eslint` + `agent:lint:tailwind`)
2. **CI Workflow Verification** (mandatory when modifying `.github/workflows/*.yml`):
   - `npm run agent:lint:ci` (or `actionlint` directly) with 0 errors and 0 warnings prior to staging.
3. **Unit / Browser Loop**: `npm run agent:test:unit`
   - Vitest in non-interactive, zero-color mode (`vitest run --reporter=tap-flat --no-color`)
4. **Comprehensive Gate**: `npm run agent:verify:gate`
   - Cascades `agent:verify:unit` -> `npm run build` -> `agent:test:e2e` (`playwright test --reporter=line`)

All checks must pass with 0 errors and 0 warnings.

## 6. Git Workflow & Commit Restrictions

- **NEVER execute `git commit` directly**: Local environment uses 1Password SSH signing; running `git commit` in non-interactive/subshell will fail.
- **Standard Protocol**:
  1. Stage changes with `git add <files>`.
  2. Output the complete `git commit -m "..."` command with a concise commit message in English in chat for user to review and run locally.
