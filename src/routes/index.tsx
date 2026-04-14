import { createFileRoute } from "@tanstack/react-router";
import { Welcome } from "../components/Welcome.tsx";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return <Welcome />;
}
