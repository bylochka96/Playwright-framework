import {test, expect} from '../../fixtures/saucedemo.fixture';

test.describe('Cart suite', () => {

    test('User can see the items in the cart', async ({ cartPageWithBackpack }) => {

       const product = await cartPageWithBackpack.findProduct('Sauce Labs Backpack');
       await expect(product).toHaveCount(1);

    })

    test('User can remove an item from the cart', async ({ cartPageWithBackpack }) => {
        
        const product = await cartPageWithBackpack.findProduct('Sauce Labs Backpack');
        await expect(product).toBeVisible();

        await cartPageWithBackpack.removeProductFromCart('Sauce Labs Backpack');
        const removedProduct = await cartPageWithBackpack.findProduct('Sauce Labs Backpack');
        await expect(removedProduct).toHaveCount(0);
    })
    

})