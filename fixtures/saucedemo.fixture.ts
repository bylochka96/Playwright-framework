import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo/login.page';
import { CartPage } from '../pages/saucedemo/cart.page';
import { InventoryPage } from '../pages/saucedemo/inventory.page';

type Fixtures = {
    loginPage: LoginPage;
    authenticatedPage: Page;
    cartPageWithBackpack: CartPage;
};

export const test = base.extend<Fixtures>({
    
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await use(loginPage);
    },

    authenticatedPage: async ({ page }, use) => {
        await page.goto('/inventory.html');

        await expect(page).toHaveURL('/inventory.html');

        await use(page);
    },

    cartPageWithBackpack: async ({ authenticatedPage }: { authenticatedPage: Page }, use: (cartPageWithBackpack: CartPage) => Promise<void>) => {
        const productName = 'Sauce Labs Backpack';
        const inventoryPage = new InventoryPage(authenticatedPage);

        await inventoryPage.addProductToCart(productName);
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await inventoryPage.cart.click();
        await expect(authenticatedPage).toHaveURL('/cart.html');

        const cartPageWithBackpack = new CartPage(authenticatedPage);

        await expect(await cartPageWithBackpack.findProduct(productName)).toBeVisible();

        await use(cartPageWithBackpack);
    }

});

export { expect } from '@playwright/test';