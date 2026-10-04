<!--VITE PLUS START-->

## Vite+ Guidelines

This project uses Vite+ to manage development tools. Always use `vp` (or `vpr` shorthand for `vp run`) to run commands:

- `vpr <script>` (or `vp run <script>`): Run scripts from `package.json`
- `vp install`: Install dependencies
- `vp update`: Update dependencies
- `vp test`: Run Vitest tests
- `vp check`: Run linter, typecheck, format checks
- `vp fmt`: Run formatter
- `vp lint`: Run linter

<!--VITE PLUS END-->

# Agent Development Guidelines

Guidelines for AI agents and human contributors working on this repository.

## 1. Architecture Map

| Layer       | Path              | Responsibility                                     |
| :---------- | :---------------- | :------------------------------------------------- |
| **Routes**  | `src/routes/`     | TanStack Router file routes (`/`, `/canary`, `/$`) |
| **UI**      | `src/components/` | Reusable React 19 UI components                    |
| **Theme**   | `src/theme.ts`    | Tailwind v4 SSOT bridge to Ant Design v6           |
| **Tests**   | `test/`           | Vitest browser (Chromium) & Playwright E2E         |
| **Tooling** | `scripts/`        | Tailwind validator & CI workflows                  |
| **Rules**   | `.agents/rules/`  | Domain-specific modular rules                      |

---

## 2. Core SSOT & Invariants

- **Single Source of Truth**: TailwindCSS v4 `@theme` in `src/global.css` is the sole source of truth for design tokens. `src/theme.ts` bridges CSS variables to Ant Design (`useAntdTheme()`). Never hardcode colors or use inline `style={{ ... }}`.
- **Protected Files**: Never manually edit `src/routeTree.gen.ts` (auto-generated).
- **Domain Rules**: Path-specific rules live under `.agents/rules/` (`ui-styling`, `routing`, `testing`, `ci-workflows`) and activate via file globbing.

---

## 3. Frictionless Execution (Whitelist-First)

Prioritize `vpr agent:*` commands matching Antigravity's whitelist:

- **Gate**: `vpr agent:verify:gate` (unit -> build -> e2e)
- **Inner Loop**: `vpr agent:verify:inner` (typecheck + lint)
- **Unit Tests**: `vpr agent:test:unit`
- **Lint & Fix**: `vpr agent:lint:fix`, `vpr agent:lint:tailwind:fix`
- **Type Check**: `vpr agent:typecheck`
- **CI Lint**: `vpr agent:lint:ci` (`actionlint` 0 errors/warnings)

---

## 4. Git Workflow & Commit Restrictions

- **NEVER execute `git commit` directly**: Local environment uses 1Password SSH signing; non-interactive commit fails.
- **Protocol**: Stage changes with `git add <files>` and output `git commit -m "..."` in English for user to run locally.

---

## 5. Language & Planning Standards

- **Traditional Chinese for Plans & Responses**: All plans (`/plan`), walkthroughs, and chat responses must strictly be written in **Traditional Chinese (繁體中文)**.
- **Code Artifacts**: Source code, inline comments, commit messages, and automated tests must use concise English.
