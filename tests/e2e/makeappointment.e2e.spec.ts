import MakeApptmntHomePage from "../page-objects/make.apptmnt.home.page";
import BookApptmntPage from "../page-objects/book.apptmnt.page";
import {test, expect} from "@playwright/test";
import {log} from "../helpers/logger";

test("Make an appointment on the Demo Healthcare web app", async ({page}, testInfo) => {

    //Env config
    const envConfig = testInfo.project.use as any;

    // Create instances of the page classes
    const makeApptmntHomePage = new MakeApptmntHomePage(page);
    const bookApptmntPage = new BookApptmntPage(page);
    
    // Call the method to click on Make Appointment link and navigate to login page
    await makeApptmntHomePage.clickMakeApptmntLink(envConfig.appUrl);

    //login
    await bookApptmntPage.loginToMakeAppt(process.env.TEST_USER_NAME!, process.env.TEST_PASSWORD!);

    // Call the method to perform login and book an appointment
    await bookApptmntPage.makeAppopintment("Tokyo CURA Healthcare Center");

    // Call the method to verify appointment confirmation
    await bookApptmntPage.apptConfirmation();
});
