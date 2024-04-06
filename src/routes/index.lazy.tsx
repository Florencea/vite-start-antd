import { createLazyFileRoute } from "@tanstack/react-router";
import { Title } from "react-head";
import { Welcome } from "../components/Welcome";

const Page = () => {
  return (
    <>
      <Title>Index - {import.meta.env.VITE_TITLE}</Title>
      <Welcome />
    </>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Page,
});
