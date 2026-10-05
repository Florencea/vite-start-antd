import { describe, expect, test } from "vite-plus/test";
import { renderAppAt } from "../test-utils.tsx";

describe("vp-antd E2E User Journey", () => {
  test("home page renders starter title and navigates to canary", async () => {
    const screen = await renderAppAt("/");
    const title = screen.getByText("Vite + React + TailwindCSS + antd");
    await expect.element(title).toBeVisible();

    const canaryBtn = screen.getByTestId("canary-btn");
    await expect.element(canaryBtn).toBeVisible();
    await canaryBtn.click();

    expect(screen.router.state.location.pathname).toBe("/canary");
    const heading = screen.getByText("Canary Regression Matrix");
    await expect.element(heading).toBeVisible();
  });

  test("canary page validates form and handles feedback modal", async () => {
    const screen = await renderAppAt("/canary");

    // Form validation
    const submitBtn = screen.getByTestId("submit-btn");
    await submitBtn.click();
    const errorMsg = screen.getByText("Please enter username");
    await expect.element(errorMsg).toBeVisible();

    const usernameInput = screen.getByTestId("username-input");
    await usernameInput.fill("Antigravity");
    await submitBtn.click();
    const validatedMsg = screen.getByText("Form validated: Antigravity");
    await expect.element(validatedMsg).toBeVisible();

    // Modal dialog
    const modalTrigger = screen.getByTestId("modal-trigger-btn");
    await modalTrigger.click();
    const modalText = screen.getByText(
      "Testing App.useApp modal portal rendered inside container.",
    );
    await expect.element(modalText).toBeVisible();

    const confirmBtn = screen.getByRole("button", { name: "確 定" });
    await expect.element(confirmBtn).toBeVisible();
    await confirmBtn.click();
    const modalConfirmed = screen.getByText("Modal action confirmed");
    await expect.element(modalConfirmed).toBeVisible();
  });

  test("redirects unknown 404 route back to home page", async () => {
    const screen = await renderAppAt("/non-existent-page");
    const title = screen.getByText("Vite + React + TailwindCSS + antd");
    await expect.element(title).toBeVisible();
    expect(screen.router.state.location.pathname).toBe("/");
  });
});
