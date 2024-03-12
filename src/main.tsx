import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers";
import { routeTree } from "./routeTree.gen";

const container = document.getElementById("root");
if (!container)
  throw new Error("react root element `#root` does not exist in DOM");

const router = createRouter({
  routeTree,
  basepath: import.meta.env.VITE_WEB_BASE,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(container).render(
  <StrictMode>
    <Providers container={container}>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
