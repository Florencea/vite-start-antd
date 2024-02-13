import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFound,
});

function NotFound() {
  useNavigate()({ to: "/", replace: true });
  return null;
}
