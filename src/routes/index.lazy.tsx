import { createLazyFileRoute } from "@tanstack/react-router";
import { Welcome } from "../components/Welcome";

const Page = () => {
  return <Welcome />;
};

export const Route = createLazyFileRoute("/")({
  component: Page,
});
