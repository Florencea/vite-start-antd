import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { page } from "vite-plus/test/browser";
import { Providers } from "../src/providers";
import { routeTree } from "../src/routeTree.gen";

let currentRoot: Root | null = null;

export async function cleanupApp(): Promise<void> {
  if (currentRoot !== null) {
    await act(async () => {
      currentRoot?.unmount();
    });
    currentRoot = null;
  }
  const rootElement = document.getElementById("root");
  if (rootElement !== null) {
    rootElement.innerHTML = "";
  }
}

function getOrCreateRootContainer(): HTMLElement {
  let container = document.getElementById("root");
  if (container === null) {
    container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  }
  return container;
}

export async function renderAppAt(initialUrl = "/") {
  await cleanupApp();
  const container = getOrCreateRootContainer();

  const history = createMemoryHistory({
    initialEntries: [initialUrl],
  });

  const router = createRouter({
    routeTree,
    history,
  });

  currentRoot = createRoot(container);
  await act(async () => {
    currentRoot?.render(
      <StrictMode>
        <Providers container={container}>
          <RouterProvider router={router} />
        </Providers>
      </StrictMode>,
    );
  });

  return Object.assign(page, { router, container });
}
