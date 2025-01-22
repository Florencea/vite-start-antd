import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Welcome } from "../src/components/Welcome";

test("renders vite logo", async () => {
  const { getByAltText } = render(<Welcome />);
  const logo = getByAltText("Vite logo");
  await expect.element(logo).toBeInTheDocument();
});

test("renders button", async () => {
  const screen = render(<Welcome />);
  const btn = screen.getByTestId("btn");
  await expect.element(btn).toBeInTheDocument();
});

test("count increased when Button is clicked", async () => {
  const screen = render(<Welcome />);
  const btn = screen.getByTestId("btn");
  await expect.element(btn).toHaveTextContent("Count is 0");
  await btn.click();
  await expect.element(btn).toHaveTextContent("Count is 1");
});
