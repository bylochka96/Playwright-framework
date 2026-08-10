import { test as base, expect, Page } from '@playwright/test';
import { validLoginData } from '../test-data/login-data';
import { LoginPage } from '../pages/saucedemo/login.page';
import { CartPage } from '../pages/saucedemo/cart.page';
import { InventoryPage } from '../pages/saucedemo/inventory.page';

type Fixtures = {
    loginPage: LoginPage;
    authenticatedPage: Page;
    cartPageWithProduct: CartPage;
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
    },

    cartPageWithProduct: async ({ authenticatedPage }: { authenticatedPage: Page }, use: (cartPageWithProduct: CartPage) => Promise<void>) => {

        const inventoryPage = new InventoryPage(authenticatedPage);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.cart.click();
        await expect(authenticatedPage).toHaveURL('/cart.html');

        const cartPageWithProduct = new CartPage(authenticatedPage);
       
        await use(cartPageWithProduct);
    }

});

export { expect } from '@playwright/test';