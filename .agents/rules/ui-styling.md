---
trigger: glob
globs: "src/components/**, src/routes/**, src/theme.ts, src/global.css"
description: Ant Design v6 and TailwindCSS v4 integration rules and styling conventions.
---

# UI & Styling Architecture Guidelines

Guidelines for building UI components with Ant Design v6 and TailwindCSS v4.

## 1. Single Source of Truth (SSOT)

- **Design Tokens**: TailwindCSS v4 `@theme` in `src/global.css` is the sole source of truth for design tokens (colors, breakpoints, etc.).
- **Dynamic Token Bridging**: `src/theme.ts` extracts CSS variables dynamically via `useSyncExternalStore` and `MutationObserver` on `document.documentElement` into Ant Design tokens (`useAntdTheme()`). Never provide hardcoded fallback colors in component styles.

## 2. Component Styling Rules

- **No Inline `style`**: Never use `style={{ ... }}` on Ant Design or React components. Prefer Ant Design layout components (`Layout`, `Flex`, `Space`, `Row`, `Col`, `Card`).
- **No `!` (important)**: Never use the `!` modifier in Tailwind classes. Tailwind utilities are scoped under `#root` in `src/global.css`, giving them natural specificity over Ant Design.
- **Canonical Classes**: Use Tailwind CSS v4 canonical class syntax. Run `vpr agent:lint:tailwind` to diagnose non-canonical classes and `vpr agent:lint:tailwind:fix` to automatically format them.

## 3. React 19 Paradigms

- **Component Definitions**: Use explicit named function declarations (`export function ComponentName()`) instead of anonymous arrow function assignments.
- **Explicit Typing**: Define custom prop interfaces (e.g. `interface ButtonProps`) and type `children` as `React.ReactNode`. Avoid `React.FC`.
- **Compiler Optimization**: Automatic fine-grained memoization is powered by React Compiler (`react({ compiler: true })`). Do not write manual `useMemo`, `useCallback`, or `React.memo` unless handling non-compiler edge cases.
