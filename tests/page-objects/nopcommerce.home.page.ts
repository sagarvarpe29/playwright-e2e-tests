import BasePage from "./base.page";
import {expect, type Page} from "@playwright/test";
import {log} from "../helpers/logger";


export default class HomePage extends BasePage {
    /* Constructor */
    constructor(page: Page) {
        super(page);
    }

    /* Elements*/
    get userNameInputField() {return this.page.getByRole('textbox', { name: 'Email:' });}
    get passwordInputField() {return this.page.getByRole('textbox', { name: 'Password:' });}
    get loginButton() {return this.page.getByRole('button', { name: 'Log in' });}

    /* Page Actions*/
    async loginToApplication(url: string, username: string, password: string) {
            await log("info", `Starting login process for URL: ${url}`);
            
            //login steps
            await this.navigateTo(url);
            await this.typeInto(this.userNameInputField, username);
            await this.typeInto(this.passwordInputField, password);
            await this.clickElement(this.loginButton);
    }
}