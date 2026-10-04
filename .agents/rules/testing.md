---
trigger: glob
globs: "test/**, **/*.test.tsx, **/*.test.ts"
description: Testing standards for Vitest Browser mode (Chromium) across unit and e2e projects.
---

# Testing Standards & Guidelines

Standards for unit, component, and end-to-end testing across this codebase.

## 1. Dual-Project Testing Architecture (Vitest Browser Mode)

All tests execute inside headless Chromium via Vitest (`vite-plus/test/browser-playwright`) using unified Vite+ commands.

- **Unit & Component Tests (`vpr agent:test:unit`)**:
  - Target: `test/*.test.tsx` (excluding `test/e2e/**`) via `--project unit`.
  - Focus: Isolated component behavior, SSOT token bridges (`window.getComputedStyle()`), dynamic theme CSS variables, and individual route regressions.
- **E2E User Journey Tests (`vpr agent:test:e2e`)**:
  - Target: `test/e2e/**/*.test.tsx` via `--project e2e`.
  - Focus: Multi-step routing flows, user journey transitions, form submissions, and modal portal actions.

## 2. Invariants & Assertions

- **Mounting Context**: Use `renderAppAt(initialUrl)` from `test/test-utils.tsx` to mount components into `#root` with full `<Providers>` and TanStack Router context.
- **Dual UI Assertions**: For UI elements, verify both DOM existence and actual layout visibility:
  - `await expect.element(el).toBeInTheDocument()`
  - `await expect.element(el).toBeVisible()`
- **No Standalone Playwright Runner**: Never maintain a standalone `playwright.config.ts` or spin up separate preview servers for tests. Vitest Browser Mode is the sole SSOT test runner.
- **Debugging & Noise Control**: `test.only` is permitted for local interactive debugging, but strictly forbidden in CI (`CI=true`). Console logs are muted for passed tests (`silent: "passed-only"`).
