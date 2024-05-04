import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { Welcome } from "../src/components/Welcome";

test("renders vite logo", () => {
  render(<Welcome />);
  const logo = screen.getByAltText("Vite logo");
  expect(logo).toBeInTheDocument();
});
