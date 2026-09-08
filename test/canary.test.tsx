import { expect, test } from "vitest";
import { renderAppAt } from "./test-utils";

test("SSOT Token Bridge: Tailwind bg-primary matches Antd Button primary background", async () => {
  const screen = await renderAppAt("/canary");

  const twSample = screen.getByTestId("tw-primary-sample");
  const antdSample = screen.getByTestId("antd-primary-sample");
  const cssVarTag = screen.getByTestId("css-variable-value");

  await expect.element(twSample).toBeVisible();
  await expect.element(antdSample).toBeVisible();
  await expect.element(cssVarTag).toHaveTextContent("#722ed1");

  const twBg = window.getComputedStyle(twSample.element()).backgroundColor;
  const antdBg = window.getComputedStyle(antdSample.element()).backgroundColor;

  expect(twBg).toBe("rgb(114, 46, 209)");
  expect(antdBg).toBe("rgb(114, 46, 209)");
  expect(antdBg).toBe(twBg);
});

test("DatePicker & Dayjs i18n: renders zh-TW and triggers message with formatted date", async () => {
  const screen = await renderAppAt("/canary");

  const datePicker = screen.getByTestId("canary-datepicker");
  await expect.element(datePicker).toBeVisible();
  await datePicker.click();

  // Verify calendar opened with zh-TW day abbreviations
  const todayBtn = screen.getByText("今天");
  await expect.element(todayBtn).toBeVisible();

  // Click today button to trigger onChange with Dayjs object
  await todayBtn.click();

  // message.info should render formatted date string
  const toast = screen.getByText(/Selected date: \d{4}-\d{2}-\d{2}/);
  await expect.element(toast).toBeInTheDocument();
  await expect.element(toast).toBeVisible();
});

test("Form & React 19: validates required fields and triggers success message", async () => {
  const screen = await renderAppAt("/canary");

  const submitBtn = screen.getByTestId("submit-btn");
  const input = screen.getByTestId("username-input");

  // Submit without input -> validation error
  await submitBtn.click();
  const errorMsg = screen.getByText("Please enter username");
  await expect.element(errorMsg).toBeVisible();

  // Fill in input and submit -> success message
  await input.fill("Antigravity");
  await submitBtn.click();

  const successToast = screen.getByText("Form validated: Antigravity");
  await expect.element(successToast).toBeInTheDocument();
  await expect.element(successToast).toBeVisible();
});

test("Feedback Portals: modal opens and handles confirm action", async () => {
  const screen = await renderAppAt("/canary");

  const modalTrigger = screen.getByTestId("modal-trigger-btn");
  await modalTrigger.click();

  const modalContent = screen.getByText(
    "Testing App.useApp modal portal rendered inside container.",
  );
  await expect.element(modalContent).toBeVisible();

  // The modal OK button text is localized by antd ConfigProvider locale={zhTW} to "確 定"
  const confirmBtn = screen.getByRole("button", { name: "確 定" });
  await expect.element(confirmBtn).toBeVisible();
  await confirmBtn.click();

  const successToast = screen.getByText("Modal action confirmed");
  await expect.element(successToast).toBeInTheDocument();
  await expect.element(successToast).toBeVisible();
});

test("Table: renders columns and total record count", async () => {
  const screen = await renderAppAt("/canary");

  const tableHeader = screen.getByText("Name");
  await expect.element(tableHeader).toBeVisible();

  const totalText = screen.getByText("Total 25 items");
  await expect.element(totalText).toBeVisible();
});
