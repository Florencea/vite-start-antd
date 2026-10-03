<!--VITE PLUS START-->

## Vite+ Guidelines

This project uses Vite+ to manage development tools. Always use `vp` to run commands:

- `vp run <script>`: Run scripts from `package.json`
- `vp install`: Install dependencies
- `vp update`: Update dependencies
- `vp test`: Run Vitest tests
- `vp check`: Run linter, typecheck, format checks
- `vp fmt`: Run formatter
- `vp lint`: Run linter

<!--VITE PLUS END-->

# Agent Development Guidelines

Guidelines for AI agents and human contributors working on this repository.

## 1. Tech Stack

- **Unified Toolchain**: Vite+ 1.0 (`vp`)
- **Package Manager**: pnpm (managed natively and transparently via `vp` / `devEngines.packageManager: pnpm@12.8.1`)
- **Framework**: React 19 + Vite
- **Language**: TypeScript 7 (strict mode, native compiler)
- **UI & Styling**: Ant Design v6 + TailwindCSS v4
- **Routing**: TanStack Router (file-based routing)
- **Testing**: Vitest with real Chromium browser mode (`@vitest/browser-playwright`) driven by `vp test`
- **Code Quality**: Oxlint (`correctness`, `suspicious`, `perf`), Oxfmt, Knip

## 2. Architectural Conventions

- **Routes**: Place route modules under `src/routes/`. Never manually edit `src/routeTree.gen.ts` (auto-generated).
  - `/`: Clean, minimal starter welcome page with runtime version telemetry.
  - `/canary`: Dedicated upgrade regression testbed for high-risk integration points.
  - `/$`: Catch-all route that automatically redirects to `/`.
- **Components**: Reusable UI components belong in `src/components/`.
- **React Compiler**: Automatic fine-grained memoization is enabled via `@vitejs/plugin-react` (`react({ compiler: true })`) powered natively by `oxc-transform-react`. Do not write manual `useMemo`, `useCallback`, or `React.memo` unless handling non-compiler edge cases. No Babel dependencies are required.
- **Styling & SSOT**:
  - **Single Source of Truth**: TailwindCSS v4 `@theme` in `src/global.css` is the sole source of truth for design tokens.
  - **Token Bridging**: `src/theme.ts` dynamically extracts CSS variables via `useSyncExternalStore` and `MutationObserver` on `document.documentElement` into Ant Design tokens (`useAntdTheme()`). Never provide hardcoded fallback colors.
  - **No Inline `style`**: Never use `style={{ ... }}` on Ant Design or React components. Prefer Ant Design layout components (`Layout`, `Flex`, `Space`, `Row`, `Col`, `Card`).
  - **No `!` (important)**: Never use the `!` modifier in Tailwind classes. Tailwind utilities are scoped under `#root` in `src/global.css`, giving them natural specificity over Ant Design.
  - **Canonical Classes**: Use Tailwind CSS v4 canonical class syntax. Run `vp run lint:tailwind` to diagnose non-canonical classes and `vp run lint:tailwind:fix` to automatically format them.
- **Language & i18n**:
  - All UI text, page headings, and code comments must be in concise English, except where specific localized strings (such as `zhTW` calendar buttons or formatters) are strictly required for i18n verification tests.
- **Imports**: Prefer explicit named imports. Do not add unneeded third-party libraries when native APIs or existing dependencies suffice.

## 3. Strict Coding Standards

- **No `any`**: Always provide accurate TypeScript types or generics.
- **No `@ts-ignore`**: Banned by linter. Use `@ts-expect-error` with a descriptive reason only if strictly unavoidable.
- **No Floating Promises**: Always `await` or properly handle Promises.
- **No Dead Code**: Do not export unused types/functions or leave unused packages in `package.json`. Knip checks this in CI.
- **Boundary Defenses**: Strict compiler checks enabled (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`). Optional properties must not receive `undefined` unless explicitly declared.
- **Zero Disabled Rules**: Do not disable linting rules to bypass checks; fix the code idiomatically instead.
- **CI Workflow Standards**: Whenever `.github/workflows/` files are added or modified, running `actionlint` locally with **0 errors and 0 warnings** is a strict requirement before staging (`git add`). Execute via `actionlint` directly or `vp run agent:lint:ci`. Note that `actionlint` is strictly an offline/local shift-left verification guardrail and must **never** be embedded into remote GitHub Actions workflow files.
- **Comments**: Keep all code comments in concise English.

## 4. Testing Standards

- **Unit / Component Tests**: Run inside headless Chromium via Vitest (`@vitest/browser-playwright`) using `vp test`.
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
vp check
```

This single command runs format, lint, and type checks. For full gate verification before deployment:

```bash
vp run check
```

This cascades:

1. `vp check` (Oxlint + Oxfmt + tsgolint)
2. `lint:tailwind` (Tailwind CSS v4 canonical class check via `@tailwindcss/language-server`)
3. `check:deadcode` (Knip unused exports and dependency check)
4. `test` (Vitest browser tests in Chromium)
5. `build` (Vite+ production bundle verification)

### Agent-Specific Dual-Track Ladder (Fail-Fast)

Agents must follow this strict verification ladder:

1. **Inner Loop**: `vp run agent:verify:inner`
   - `agent:typecheck` (`tsc -b --pretty false`)
   - `agent:lint` (`vp lint` + `node scripts/lint-tailwind.ts`)
2. **CI Workflow Verification** (mandatory when modifying `.github/workflows/*.yml`):
   - `vp run agent:lint:ci` (or `actionlint` directly) with 0 errors and 0 warnings prior to staging.
3. **Unit / Browser Loop**: `vp run agent:test:unit`
   - Vitest in non-interactive, zero-color mode (`vp test run --reporter=tap-flat --no-color`)
4. **Comprehensive Gate**: `vp run agent:verify:gate`
   - Cascades `agent:verify:unit` -> `vp build` -> `agent:test:e2e` (`playwright test --reporter=line`)

All checks must pass with 0 errors and 0 warnings.

## 6. Git Workflow & Commit Restrictions

- **NEVER execute `git commit` directly**: Local environment uses 1Password SSH signing; running `git commit` in non-interactive/subshell will fail.
- **Standard Protocol**:
  1. Stage changes with `git add <files>`.
  2. Output the complete `git commit -m "..."` command with a concise commit message in English in chat for user to review and run locally.
