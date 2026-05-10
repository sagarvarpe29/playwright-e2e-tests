import { test, expect } from "@playwright/test";
import { TestData } from "../../data/test-data";
import fileHelper from "../helpers/file-helper.js";
import path from "path";

//read data from csv file using helper function
const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-appointment-test-data.csv`);
const makeAppointmentTestData = fileHelper.readCSV(csvFilePath);

//read data from test-data.ts file
//const testData1 = TestData.makeAppointmentTestData(); // return 3 objects of data
//console.log(`>> Test Data: ${JSON.stringify(testData1)}`);

//access the data
for(const data of makeAppointmentTestData){
test.describe("Book Appointment Flow functionality", {annotation: { type: "Story", description: "JIRAID-1234: Make Appointment Flow" }, 
  tag: "@smoke"},() => {
  test.beforeEach("login page", async ({ page }) => {
    //1. Launch URL and assert title and header text
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    const header = page.locator("h1");
    await expect(header).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Get login cookies
    const loginCookies = await page.context().cookies();
    process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

  });

  test(`${data.testCaseId}: Should make an appointment`, async ({ page},) => {

    //skip test case for firefor
    //test.skip(browserName === "firefox", "This test is flaky in firefox, needs investigation");

    // Access the login cookies
    console.log(`>> Login Cookies from env variable: ${process.env.LOGIN_COOKIES}`);

    await page
      .getByLabel("Facility")
      .selectOption(data.facility);
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    
      await page.getByText(data.hcp).click();

    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("test apppointment");
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill(data.visitDate);
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

    await page.getByRole("button", { name: "Book Appointment" }).click();
  });
});
}

