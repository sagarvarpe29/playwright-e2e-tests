import { test, expect, devices } from "@playwright/test";
//import { constants } from "node:buffer";
import constants from "../../data/constants.json";
import BasePage from "../page-objects/base.page";

test("Should load home page with correct title", async ({ page }, testInfo) => {
  // 1. Go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  /*
  Add screeenshot at test scope level
  */

  let fullpageScreenShot = await page.screenshot({ fullPage: true });
  testInfo.attach("Login Page", {
    contentType: "image/png",
    body: fullpageScreenShot,
  });

  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // 3. Assert header text  const header = page.locator("h1");
  const header = page.locator("h1");
  await expect(header).toHaveText("CURA Healthcare Service");
});

/*test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.locator("//h1").click();
});

test.only("Should demo fixtures", async ({ page, browserName, request}, testInfo) => {
  //console.log('>> The test runs on ' + browserName + ' browser');
  request.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
    console.log('>> Response status: ' + response.status());
  });
});*/

test("Should list all the devices", async ({ page }, testInfo) => {
  console.log(`>> List of all devices: ${Object.keys(devices)}`);
});

test.only("Should demo a click action", async ({ page }, testInfo) => {
  // 1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. click on the make appointment
  //await page.getByRole("link", { name: "Make Appointment" }).click();
  //await expect(page.getByText("Please login to make")).toBeVisible();

  // Base page action
  const basePage = new BasePage(page);
  await basePage.clickElement(page.getByRole("link", { name: "Make Appointment" }));

  
});
