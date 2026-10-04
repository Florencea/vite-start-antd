---
name: scaffold-route
description: Step-by-step workflow to scaffold a new TanStack Router route with Ant Design v6 components and Vitest browser test.
compatibility: React 19, TanStack Router, Ant Design v6, Vitest Browser
---

# Scaffold Route Workflow

This skill outlines the standard procedure for adding a new route and test to this repository.

## 1. Create Route File

Create the route component under `src/routes/<route-name>.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Card, Space, Typography } from "antd";

export const Route = createFileRoute("/<route-name>")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Space orientation="vertical" size="large" className="w-full">
      <Typography.Title level={3} className="m-0">
        Feature Title
      </Typography.Title>
      <Card title="Feature Section">
        <Typography.Paragraph>Content goes here.</Typography.Paragraph>
      </Card>
    </Space>
  );
}
```

## 2. Generate Route Tree

Run the Vite build or typecheck to trigger `@tanstack/router-plugin` code generation:

```bash
vpr agent:typecheck
```

## 3. Create Corresponding Browser Test

Add `test/<route-name>.test.tsx`:

```tsx
import { expect, test } from "vite-plus/test";
import { renderAppAt } from "./test-utils";

test("renders <route-name> heading and content", async () => {
  const screen = await renderAppAt("/<route-name>");
  const heading = screen.getByText("Feature Title");
  await expect.element(heading).toBeInTheDocument();
  await expect.element(heading).toBeVisible();
});
```

## 4. Run Verification

Run inner and unit verification gates:

```bash
vpr agent:verify:unit
```
