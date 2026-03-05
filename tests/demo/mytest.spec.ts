import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  // 1. Go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // 3. Assert header text
  const header = page.locator("h1");
  await expect(header).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.locator("//h1").click();
});
