import { test, expect } from "@playwright/test";

test.describe("Book Appointment Flow functionality", () => {
  test.beforeEach("login page", async ({ page }) => {
    //1. Launch URL and assert title and header text
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    const header = page.locator("h1");
    await expect(header).toHaveText("CURA Healthcare Service");

    /*
    Element: button /link

    @actions:
    1. ✅click
    2. ✅Press
    3. ✅Double click
    4. ✅Right click 
    5. ✅Hover if link
    6. ✅timeout of slow
    */

    //2. Click on Make Appointment
    //await page.getByRole("link", { name: "Make Appointment" }).click();
    //await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    //await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    //await page.getByRole("link", { name: "Make Appointment" }).click({ button: "right" });
    //await page.getByRole("link", { name: "Make Appointment" }).hover;
    await page
      .getByRole("link", { name: "Make Appointment" })
      .click({ timeout: 5000 });

    await expect(page.getByText("Please login to make")).toBeVisible();

    /*
    Element: Text Box

    @actions:
    1. ✅Clear/click before filling
    2. ✅Fill
    3. ✅pressSquencentially(slow typing)
    */

    //fill
    //await page.getByLabel("Username").fill("John Doe");

    //clear and enter
    //await page.getByLabel("Username").clear();
    //await page.getByLabel("Username").fill("John Doe");

    //slow typing/ press sequentially
    await page
      .getByLabel("Username")
      .pressSequentially("John Doe", { delay: 100 });

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Should make an appointment", async ({ page }) => {
    /*
    Element: Dropdown

    @actions:
    1. ✅Assert default option
    2. ✅Select by:
      - label
      - value
      - index
    3. ✅Assert the count
    4. ✅Get all dropdown values

    @notes:
    - selenium: selectByVisibleText, selectByValue, selectByIndex
    - webdriverio: selectByVisibleText, selectByAttribute, selectByIndex
    */

    //1. Assert default option
    await expect(page.getByLabel("Facility")).toHaveValue(
      "Tokyo CURA Healthcare Center",
    );

    //2. Select by: - label, - value, - index

    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    await page
      .getByLabel("Facility")
      .selectOption({ label: "Seoul CURA Healthcare Center" });

    await page.getByLabel("Facility").selectOption({ index: 0 });

    //3. Assert the count
    let dropDownOptions = page.getByLabel("Facility").locator("option");
    await expect(dropDownOptions).toHaveCount(3);

    //4. Get all dropdown values
    let allDropdownValues = await page.getByLabel("Facility").all();
    let listOfDropdownValues = [];

    //for ... of loop
    for (let option of allDropdownValues) {
      //console.log(await option.textContent());
      let optionText = await option.textContent();
      if (optionText) {
        listOfDropdownValues.push(optionText);
      }
    }

    console.log(`list of options: ${listOfDropdownValues}`);

    /*
    Element: Checkbox/ Radio button

    @actions:
    1. ✅Assert the default option - to be checked/ unchecked
    2. ✅Check/ Uncheck

    @notes:
    - Radio button: Allows to select only one option
    - Checkbox: Allows for multiple selections
    */

    //checkbox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).uncheck();  


    //radio button
    //Assert the default option - to be checked/ unchecked
    await expect(page.getByText("Medicare")).toBeChecked();
    
    await page.getByText("Medicaid").check();
    await expect(page.getByText("Medicare")).not.toBeChecked(); 

    //await page.getByText("None").click();
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
