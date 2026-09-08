import { expect, test } from "vitest";
import { renderAppAt } from "./test-utils";

test("renders vite logo and starter title", async () => {
  const screen = await renderAppAt("/");
  const logo = screen.getByAltText("Vite logo");
  await expect.element(logo).toBeInTheDocument();
  await expect.element(logo).toBeVisible();

  const title = screen.getByText("Vite + React + TailwindCSS + antd");
  await expect.element(title).toBeInTheDocument();
  await expect.element(title).toBeVisible();
});

test("renders tech stack version tags", async () => {
  const screen = await renderAppAt("/");
  const reactTag = screen.getByTestId("react-version");
  await expect.element(reactTag).toBeInTheDocument();
  await expect.element(reactTag).toBeVisible();

  const antdTag = screen.getByTestId("antd-version");
  await expect.element(antdTag).toBeInTheDocument();
  await expect.element(antdTag).toBeVisible();

  const tailwindTag = screen.getByText("TailwindCSS v4");
  await expect.element(tailwindTag).toBeInTheDocument();

  const routerTag = screen.getByText("TanStack Router");
  await expect.element(routerTag).toBeInTheDocument();
});

test("applies headerBg component design token to Layout.Header", async () => {
  const screen = await renderAppAt("/");
  const header = screen.getByRole("banner");
  await expect.element(header).toBeInTheDocument();
  await expect.element(header).toBeVisible();

  const headerBg = window.getComputedStyle(header.element()).backgroundColor;
  expect(headerBg).toBe("rgb(114, 46, 209)");
});

test("renders canary CTA button and navigates to /canary", async () => {
  const screen = await renderAppAt("/");
  const ctaBtn = screen.getByTestId("canary-btn");
  await expect.element(ctaBtn).toBeInTheDocument();
  await expect.element(ctaBtn).toBeVisible();

  await ctaBtn.click();

  const canaryHeading = screen.getByText("Canary Regression Matrix");
  await expect.element(canaryHeading).toBeInTheDocument();
  await expect.element(canaryHeading).toBeVisible();
});

test("redirects unknown 404 routes back to home page", async () => {
  const screen = await renderAppAt("/some-unknown-path");

  const title = screen.getByText("Vite + React + TailwindCSS + antd");
  await expect.element(title).toBeInTheDocument();
  await expect.element(title).toBeVisible();

  expect(screen.router.state.location.pathname).toBe("/");
});
