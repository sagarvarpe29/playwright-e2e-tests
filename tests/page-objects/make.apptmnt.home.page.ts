import BasePage from './base.page';
import {expect, type Page} from "@playwright/test";
import {log} from "../helpers/logger";

export default class MakeApptmntHomePage extends BasePage {
    /* Constructor */
    constructor(page: Page) {
        super(page);
    }

    /* Elements*/
    get makeApptmntLink() {return this.page.getByRole('link', { name: 'Make Appointment' });}
    get loginHeader() {return this.page.getByText('Please login to make');}

    /* Page Actions*/
    async clickMakeApptmntLink(url: string) {
            await log("info", `Navigating to URL: ${url} and clicking on Make Appointment link`);
            
            //steps
            await this.navigateTo(url);
            await this.clickElement(this.makeApptmntLink);
            await expect(this.loginHeader).toBeVisible();
    }
}   