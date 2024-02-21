import { createLazyFileRoute } from "@tanstack/react-router";
import { Title } from "react-head";
import { Welcome } from "../components/Welcome";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

export function Index() {
  return (
    <>
      <Title>Index - {import.meta.env.VITE_TITLE}</Title>
      <Welcome />
    </>
  );
}
