// spec: test-plans/login-test-plan.md
// seed: tests/functional/login.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Functionality", () => {
  test.beforeEach("Navigate to login page", async ({ page }) => {
    // 1. Navigate to the CURA Healthcare Service home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    
    // expect: Page title displays 'CURA Healthcare Service'
    await expect(page).toHaveTitle("CURA Healthcare Service");
    
    // expect: Main heading 'CURA Healthcare Service' is visible
    const header = page.locator("h1");
    await expect(header).toHaveText("CURA Healthcare Service");
    
    // expect: Tagline 'We Care About Your Health' is displayed
    await expect(page.locator("h3")).toContainText("We Care About Your Health");

    // 2. Click on the 'Make Appointment' button
    await page.getByRole("link", { name: "Make Appointment" }).click();
    
    // expect: Login form is displayed
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Positive: Successful login with valid credentials", async ({ page }) => {
    // 3. Enter valid username 'John Doe' in the Username field
    // expect: Username field accepts the input
    await page.getByLabel("Username").fill("John Doe");
    
    // expect: Text 'John Doe' appears in the username field
    await expect(page.getByLabel("Username")).toHaveValue("John Doe");

    // 4. Enter valid password 'ThisIsNotAPassword' in the Password field
    // expect: Password field accepts the input
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    
    // expect: Password is entered without displaying the actual characters
    await expect(page.getByLabel("Password")).toHaveValue("ThisIsNotAPassword");

    // 5. Click the 'Login' button
    await page.getByRole("button", { name: "Login" }).click();

    // expect: Appointment heading 'Make Appointment' is displayed
    // expect: User is successfully authenticated and logged in
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Negative: Login fails with invalid username and password", async ({ page }) => {
    // 3. Enter invalid username 'InvalidUser' in the Username field
    // expect: Username field accepts the input
    await page.getByLabel("Username").fill("InvalidUser");
    
    // expect: Text 'InvalidUser' appears in the username field
    await expect(page.getByLabel("Username")).toHaveValue("InvalidUser");

    // 4. Enter invalid password 'WrongPassword' in the Password field
    // expect: Password field accepts the input
    await page.getByLabel("Password").fill("WrongPassword");
    
    // expect: Password field shows masked characters
    await expect(page.getByLabel("Password")).toHaveValue("WrongPassword");

    // 5. Click the 'Login' button
    await page.getByRole("button", { name: "Login" }).click();

    // expect: Error message 'Login failed! Please ensure the username and password are valid.' is displayed
    // expect: Login form is still accessible for retry
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid."
    );
  });
});
