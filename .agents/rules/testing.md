---
trigger: glob
globs: "test/**, **/*.test.tsx, **/*.spec.ts, playwright.config.ts"
description: Testing standards for Vitest Browser mode (Chromium) and Playwright E2E suites.
---

# Testing Standards & Guidelines

Standards for unit, component, and end-to-end testing across this codebase.

## 1. Unit & Component Tests (Vitest Browser Mode)

- **Execution Environment**: Runs inside headless Chromium via Vitest (`@vitest/browser-playwright`) driven by `vpr agent:test:unit` (or `vp test`).
- **Mounting Context**: Use `renderAppAt(initialUrl)` from `test/test-utils.tsx` to mount components into `#root` with full `<Providers>` and TanStack Router context.
- **Dual UI Assertions**: For UI elements, verify both DOM existence and actual layout visibility:
  - `await expect.element(el).toBeInTheDocument()`
  - `await expect.element(el).toBeVisible()`
- **Design Token Assertions**: For design tokens and styling bridges, assert computed styles directly using `window.getComputedStyle()`.
- **Debugging & Noise Control**: `test.only` is permitted for local interactive debugging, but strictly forbidden in CI (`CI=true`). Console logs are muted for passed tests (`silent: "passed-only"`).

## 2. E2E Tests (Playwright)

- **Execution Environment**: Production preview builds tested against real Chromium (`playwright.config.ts` runs build before preview).
- **Execution Script**: `vpr agent:test:e2e` (`playwright test --reporter=line`).
