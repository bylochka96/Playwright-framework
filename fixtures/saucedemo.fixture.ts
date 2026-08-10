import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo/login.page';
import { validLoginData } from '../test-data/login-data';

type Fixtures = {
    loginPage: LoginPage;
    authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
    
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await use(loginPage);
    },

    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(validLoginData.username, validLoginData.password);

        await expect(page).toHaveURL('/inventory.html');

        await use(page);
    }
});

export { expect } from '@playwright/test';