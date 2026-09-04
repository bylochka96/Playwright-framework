import { invalidLoginData } from '../../test-data/login-data';
import { test, expect } from '../../fixtures/saucedemo.fixture';

test.describe('Login functionality', () => {

    
    test('User can log in with valid credentials', async ({ loginPage, page }) => {

        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');
    });


    invalidLoginData.forEach((data) => {

        test(`User cannot log in with ${data.caseName}`, async ({ loginPage }) => {

            await loginPage.login(data.username, data.password);
            await expect(loginPage.errorMessage).toHaveText(data.expectedError);

        })

    });

});
