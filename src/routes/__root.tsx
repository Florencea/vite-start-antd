import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFound,
});

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const RedirectToIndex = async () => {
      await navigate({ to: "/", replace: true });
    };
    RedirectToIndex();
    return () => {
      RedirectToIndex();
    };
  }, [navigate]);

  return null;
}
