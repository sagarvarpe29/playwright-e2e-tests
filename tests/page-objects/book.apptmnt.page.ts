import BasePage from "./base.page";
import {expect, type Page} from "@playwright/test";
import {log} from "../helpers/logger";

export default class ApptmntPage extends BasePage {
    /* Constructor */
    constructor(page: Page) {
        super(page);
    }

    /* Elements*/
    get userNameInputField() {return this.page.getByLabel('username');}
    get passwordInputField() {return this.page.getByLabel('password');}
    get loginButton() {return this.page.getByRole('button', { name: 'Login' });}
    get facility() {return this.page.getByRole('combobox', { name: 'facility' });}
    get hospitalReadmissionCheckbox() {return this.page.getByRole('checkbox', { name: 'Apply for hospital readmission' });}
    get healthcareProgramRadioButtons() {return this.page.getByRole('radio',{name: 'Medicare'})};
    get visitDateInputField() {return this.page.getByPlaceholder('dd/mm/yyyy');}
    get commentTextArea() {return this.page.getByRole('textbox', { name: 'Comment' });}
    get bookAppointmentButton() {return this.page.getByRole('button', { name: 'Book Appointment' });}
    
    /* Page Actions*/
    async loginToMakeAppt(username: string, password: string) {
            await log("info", `Logging in with username: ${username}`);
            await expect(this.userNameInputField).toBeVisible({timeout: 10000});
            await this.typeInto(this.userNameInputField, username);
            await this.typeInto(this.passwordInputField, password);
            await this.clickElement(this.loginButton);
    }

    async makeAppopintment(facility: string) {
            //login steps
            await this.selectCheckbox(this.hospitalReadmissionCheckbox);
            await this.selectRadioButton(this.healthcareProgramRadioButtons);
            await this.selectDate(this.visitDateInputField, "30/04/2026");
            await this.typeInto(this.commentTextArea, "This is a test appointment booking.");
            await this.clickElement(this.bookAppointmentButton);   
    }

    async apptConfirmation() {
        const confirmationMessage = this.page.getByText('Appointment Confirmation');
        await expect(confirmationMessage).toBeVisible({timeout: 10000});
    }
}