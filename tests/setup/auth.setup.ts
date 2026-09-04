import { test as setup, expect } from '@playwright/test';
import {LoginPage} from '../../pages/saucedemo/login.page';
import { authenticatedUsers } from '../../test-data/login-data'

authenticatedUsers.forEach((userData) => {

    setup(`Authenticate as ${userData.name}`, async ({ page }) => {
    
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(userData.username, userData.password);

        await expect(page).toHaveURL('/inventory.html');

        await page.context().storageState({ path: userData.authFilePath });

    });

})
