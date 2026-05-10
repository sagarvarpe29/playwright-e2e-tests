import { test, expect } from '@playwright/test';


test.describe('Checkout flow test', () => {

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

    test('should complete the checkout flow successfully', async ({ page }) => {

        //await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('xpath=//div[@class="inventory_list"]/div[1]').click(); 
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('Sagar');
        await page.locator('[data-test="lastName"]').fill('Varpe');
        await page.locator('[data-test="postalCode"]').fill('422605');
        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        await page.locator('[data-test="back-to-products"]').click();
    });
});