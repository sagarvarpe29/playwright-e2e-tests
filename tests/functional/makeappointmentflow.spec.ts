import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";

test.describe("Book Appointment Flow functionality", {annotation: { type: "Story", description: "JIRAID-1234: Make Appointment Flow" }, 
  tag: "@smoke"},() => {
  test.beforeEach("login page", async ({ page }, testInfo) => {
    //1. Launch URL and assert title and header text

    //get the url from config file
    const envConfig = testInfo.project.use as any;

    //custom logs
    await log("log", `The test is running in ${envConfig.envName}`);

    //await page.goto(envConfig.appUrl);

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    const header = page.locator("h1");
    await expect(header).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME!);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Login" }).click();

    await log("info", "User logged in successfully");
  });

  test("Should make an appointment", async ({ page, browserName },) => {

    //skip test case for firefox
    test.skip(browserName === "firefox", "This test is flaky in firefox, needs investigation");

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
