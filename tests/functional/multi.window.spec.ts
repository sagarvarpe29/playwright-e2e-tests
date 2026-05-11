import { test, expect } from "@playwright/test";

test.describe("Multiple Windows Handling", { tag: "@multi-window" }, () => {
  test("Should handle multiple windows and navigate between them", async ({ page, context }) => {
    // 1. Navigate to the site
    await page.goto("https://the-internet.herokuapp.com/");
    await expect(page).toHaveTitle("The Internet");

    // 2. Click on multiple windows link
    await page.getByRole("link", { name: /windows/i }).click();

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // 3. Click the link to open new window and capture it
    const newPagePromise = context.waitForEvent("page");
    await page.getByRole("link", { name: "Click Here" }).click();
    const newPage = await newPagePromise;

    // 4. Assert the header on the newly opened window
    await newPage.waitForLoadState("networkidle");
    const newPageHeader = newPage.locator("h3");
    await expect(newPageHeader).toContainText("New Window");

    // 5. Verify the new window URL
    expect(newPage.url()).toContain("windows");

    // 6. Come back to the parent window and verify it's still accessible
    const parentPage = page;
    await expect(parentPage).toHaveTitle("The Internet");
    
    // Verify the parent window still has the link to click
    const clickHereLink = parentPage.getByRole("link", { name: "Click Here" });
    await expect(clickHereLink).toBeVisible();

    // 7. Close the new window
    await newPage.close();
  });
});
