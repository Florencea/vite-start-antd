import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const RedirectToIndex = async () => {
      await navigate({ to: "/", replace: true });
    };
    void RedirectToIndex();
    return () => {
      void RedirectToIndex();
    };
  }, [navigate]);

  return null;
};

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFound,
});
