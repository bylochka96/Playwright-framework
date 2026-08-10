import {test, expect} from '../../fixtures/saucedemo.fixture';

test.describe('Inventory page', () => {

    test('User can see the inventory items', async ({ authenticatedPage }) => {

        await expect(authenticatedPage.getByText('Products', { exact: true })).toBeVisible();

    })

})