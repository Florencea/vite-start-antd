import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Welcome } from "../src/components/Welcome";

test("renders vite logo", () => {
  render(<Welcome />);
  const logo = screen.getByAltText("Vite logo");
  expect(logo).toBeInTheDocument();
});

test("renders button", () => {
  render(<Welcome />);
  const btn = screen.getByTestId("btn");
  expect(btn).toBeInTheDocument();
});

test("count increased when Button is clicked", async () => {
  render(<Welcome />);
  const btn = screen.getByTestId("btn");
  expect(btn).toHaveTextContent("Count is 0");
  await userEvent.click(btn);
  expect(btn).toHaveTextContent("Count is 1");
});
