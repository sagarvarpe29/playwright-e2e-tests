import {expect, type Locator, type Page} from "@playwright/test";
import {log} from "../helpers/logger";

export default class BasePage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    /*All reusable actions*/
    async navigateTo(urlPath: string) {
        await log("info", `Navigating to ${urlPath}`);
        await this.page.goto(urlPath);
    }

    /** click action */
    async clickElement(ele: Locator) {
        try{
            await expect(ele).toBeVisible({timeout: 5000});
            await ele.click();
            await log("info", `Clicked on element: ${ele}`);
        }catch(error){
            await log("error", `Failed to click on element: ${ele}`);
            throw error;
        }
    }

    /** type action */
    async typeInto(ele: Locator, text: string) {
        try{
            await expect(ele).toBeVisible({timeout: 5000});
            await ele.fill(text);
            await log("info", `Typed into element: ${ele}`);
        }catch(error){
            await log("error", `Failed to type into element: ${ele}`);
            throw error;
        }
    }

    /** select date from datepicker */
    async selectDate(ele: Locator, date: string) {
        try{
            await expect(ele).toBeVisible({timeout: 5000});
            //await ele.click();
            //await this.page.getByText(date).click();
            await ele.fill(date); // Directly fill the date input field
            await log("info", `Selected date: ${date}`);
        }catch(error){
            await log("error", `Failed to select date: ${date}`);
            throw error;
        }
    }

    /** select radio button */
    async selectRadioButton(ele: Locator) {
        try{
            await expect(ele).toBeVisible({timeout: 5000});
            await ele.click();
            await log("info", `Selected radio button: ${ele}`);
        }catch(error){
            await log("error", `Failed to select radio button: ${ele}`);
            throw error;
        }
    }

    /** select checkbox */
    async selectCheckbox(ele: Locator) {
        try{
            await expect(ele).toBeVisible({timeout: 5000});
            await ele.check();
            await log("info", `Selected checkbox: ${ele}`);
        }catch(error){
            await log("error", `Failed to select checkbox: ${ele}`);
            throw error;
        }
    }

}