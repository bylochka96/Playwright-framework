import {test, expect} from '../../fixtures/saucedemo.fixture';

test.describe('Cart suite', () => {

    test('User can see the items in the cart', async ({ cartPageWithProduct }) => {

       const product = await cartPageWithProduct.findProduct('Sauce Labs Backpack');
       await expect(product).toHaveCount(1);

    })

    test('User can remove an item from the cart', async ({ cartPageWithProduct }) => {
        
        const product = await cartPageWithProduct.findProduct('Sauce Labs Backpack');
        await expect(product).toBeVisible();

        await cartPageWithProduct.removeProductFromCart('Sauce Labs Backpack');
        const removedProduct = await cartPageWithProduct.findProduct('Sauce Labs Backpack');
        await expect(removedProduct).toHaveCount(0);
    })
    

})