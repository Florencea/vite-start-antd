import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { render as browserRender } from "vitest-browser-react";
import { Providers } from "../src/providers";
import { routeTree } from "../src/routeTree.gen";

function getOrCreateRootContainer(): HTMLElement {
  let container = document.getElementById("root");
  if (!container) {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  }
  return container;
}

export async function renderAppAt(initialUrl = "/") {
  const container = getOrCreateRootContainer();

  const history = createMemoryHistory({
    initialEntries: [initialUrl],
  });

  const router = createRouter({
    routeTree,
    history,
  });

  const screen = await browserRender(
    <Providers container={container}>
      <RouterProvider router={router} />
    </Providers>,
    { container },
  );

  return Object.assign(screen, { router });
}
