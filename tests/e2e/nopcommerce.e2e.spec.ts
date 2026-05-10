import HomePage from "../page-objects/nopcommerce.home.page";
import {test, expect} from "@playwright/test";
import {log} from "../helpers/logger";

test("Login to the Nopcommerce web app", async ({page}, testInfo) => {

    //Env config
    const envConfig = testInfo.project.use as any;

    // Create an instance of the HomePage class
    const homePage = new HomePage(page);

    // Call the loginToApplication method to perform the login action
    await homePage.loginToApplication(envConfig.nopcommerceUrl, 
        process.env.NOPCOMMERCE_TEST_USER_NAME!, 
        process.env.NOPCOMMERCE_TEST_PASSWORD!);
});