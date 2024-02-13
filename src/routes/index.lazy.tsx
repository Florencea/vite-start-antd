import { createLazyFileRoute } from "@tanstack/react-router";
import { Welcome } from "../components/Welcome";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export function Index() {
  return <Welcome />;
}
