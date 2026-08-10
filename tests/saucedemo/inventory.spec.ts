import {test, expect} from '../../fixtures/saucedemo.fixture';
import { InventoryPage } from '../../pages/saucedemo/inventory.page';

test.describe('Inventory suite', () => {

    test('User can see the inventory items', async ({ authenticatedPage }) => {

        await expect(authenticatedPage.getByText('Products', { exact: true })).toBeVisible();

        const inventoryPage = new InventoryPage(authenticatedPage);
        await expect(inventoryPage.products).toHaveCount(6);

    })

    test('User can add an item to the cart', async ({ authenticatedPage }) => {
         await expect(authenticatedPage.getByText('Products', { exact: true })).toBeVisible();
            const inventoryPage = new InventoryPage(authenticatedPage);
            await inventoryPage.addProductToCart('Sauce Labs Backpack');
        
            await expect(inventoryPage.cartBadge).toHaveText('1')

    })

})