import { test, expect } from "@playwright/test";

test.describe("Login functionality", {annotation: { type: "Story", description: "JIRAID-4567: Login Functionality" }, 
},() => {
  test.beforeEach("Go to login page", async ({ page }) => {
    //1. Launch URL and assert title and header text
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    const header = page.locator("h1");
    await expect(header).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Should login successfully",{tag: "@demo-parallel"},async ({ page }) => {
    
    //Timout at test step level
    //test.slow();
    //test.setTimeout(30_000);

    console.log('>> Current config \n:" + ${JSON.stringify(testInfo.config)}');

    // Successful Login with valid credentials
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click({timeout: 10000});

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment",{timeout: 5000});
  });

  test("Should prevent login with invalid credentials",{tag: "@demo-parallel"},async ({ page }) => {
    // Unsuccessful Login with invalid credentials
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
