/**Scenario:
 * 1. Login as a standard user
 * 2. Get a list of products have non zero dollar value
 * 3. Assert that all the products have non zero dollar value
 */

import { test, expect } from "@playwright/test";

test.describe("Inventory feature tests", {tag : "@smoke"}, () => {

    test.beforeEach("Login with valid creds", async ({ page }) => {
        //launch the url
        await page.goto("https://www.saucedemo.com/");

        //login
        await page.getByPlaceholder("Username").pressSequentially("standard_user", { delay: 200 });
        await page.getByPlaceholder("Password").pressSequentially("secret_sauce", { delay: 200 });
        await page.getByRole("button", { name: "Login" }).click();

        //assert that we are on inventory page
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\/inventory/);
      });

    test("Should confirm all prices are non zero", async ({ page }) => {
        let inventoryItems = page.locator(".inventory_item");
        console.log(`total inventory items: ${await inventoryItems.count()}`);
        let inventoryCount = await inventoryItems.count();
        
        for (let i = 0; i < inventoryCount; i++) {
            let priceLocator = inventoryItems.nth(i).locator(".inventory_item_price");
            let priceText = await priceLocator.textContent();
            if (priceText) {
                let priceValue = parseFloat(priceText.replace("$", ""));
                expect(priceValue).toBeGreaterThan(0);
                console.log(`Item ${i + 1} price: $${priceValue}`);
            }
        }
    });
});