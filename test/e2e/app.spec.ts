import { expect, test } from "playwright/test";

test.describe("Vite Start Antd E2E", () => {
  test("home page renders starter title and navigates to canary", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByText("Vite + React + TailwindCSS + antd"),
    ).toBeVisible();

    const canaryBtn = page.getByTestId("canary-btn");
    await expect(canaryBtn).toBeVisible();
    await canaryBtn.click();

    await expect(page).toHaveURL(/.*\/canary/);
    await expect(page.getByText("Canary Regression Matrix")).toBeVisible();
  });

  test("canary page validates form and handles feedback modal", async ({
    page,
  }) => {
    await page.goto("/canary");

    // Form validation
    const submitBtn = page.getByTestId("submit-btn");
    await submitBtn.click();
    await expect(page.getByText("Please enter username")).toBeVisible();

    const usernameInput = page.getByTestId("username-input");
    await usernameInput.fill("Antigravity");
    await submitBtn.click();
    await expect(page.getByText("Form validated: Antigravity")).toBeVisible();

    // Modal dialog
    const modalTrigger = page.getByTestId("modal-trigger-btn");
    await modalTrigger.click();
    await expect(
      page.getByText(
        "Testing App.useApp modal portal rendered inside container.",
      ),
    ).toBeVisible();

    const confirmBtn = page.getByRole("button", { name: "確 定" });
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();
    await expect(page.getByText("Modal action confirmed")).toBeVisible();
  });

  test("redirects unknown 404 route back to home page", async ({ page }) => {
    await page.goto("/non-existent-page");
    await expect(
      page.getByText("Vite + React + TailwindCSS + antd"),
    ).toBeVisible();
    expect(new URL(page.url()).pathname).toBe("/");
  });
});
