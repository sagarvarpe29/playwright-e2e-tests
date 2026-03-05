import { test, expect } from "@playwright/test";

test.describe("Book Appointment Flow functionality", () => {
  test.beforeEach("login page", async ({ page }) => {
    //1. Launch URL and assert title and header text
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle("CURA Healthcare Service");
    const header = page.locator("h1");
    await expect(header).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Book Appointment", async ({ page }) => {
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByText("None").click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("test apppointment");
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "3" }).nth(1).click();
    await page.getByRole("cell", { name: "10" }).click();
    await page.getByRole("cell", { name: "3" }).nth(1).click();
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("#summary")).toContainText(
      "Please be informed that your appointment has been booked as following:",
    );
  });
});
