---
trigger: glob
globs: "src/routes/**, src/routeTree.gen.ts"
description: TanStack Router conventions, route tree protection, and type-safe search parameters.
---

# Routing Guidelines (TanStack Router)

Guidelines for file-based routing with TanStack Router in this repository.

## 1. Route Conventions

- **Route Directory**: Place route modules strictly under `src/routes/`.
  - `/`: Clean starter landing page with runtime telemetry (`src/routes/index.tsx`).
  - `/canary`: Dedicated regression testbed for high-risk integration points (`src/routes/canary.tsx`).
  - `/$`: Catch-all route that automatically redirects to `/` (`src/routes/$.tsx`).
- **Protected File**: NEVER manually edit `src/routeTree.gen.ts`. It is automatically generated and synchronized by `@tanstack/router-plugin/vite`.

## 2. Search Parameters & Navigation

- **Type-Safe Search Parameters**: Validate query parameters using `validateSearch` on `createFileRoute`. Ensure fallback defaults are defensively defined.
- **Type-Safe Navigation**: Use `useNavigate` and `Link` components from `@tanstack/react-router` with typed `search` and `params` arguments.
