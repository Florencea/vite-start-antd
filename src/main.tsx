import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers";
import { routeTree } from "./routeTree.gen";

const container = document.getElementById("root") as HTMLDivElement;

const router = createRouter({ routeTree });

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
