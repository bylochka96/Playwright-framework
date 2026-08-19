import { test, expect } from '../../fixtures/saucedemo.fixture';
import { CheckoutPage } from '../../pages/saucedemo/checkout.page';
import { buildCheckoutInformation } from '../../test-data/checkout-data';

test.describe('Checkout suite', () => {

    test('User can complete checkout', async ({ cartPageWithBackpack, page }) => {

        const product = await cartPageWithBackpack.findProduct('Sauce Labs Backpack');
        await expect(product).toHaveCount(1);

        await cartPageWithBackpack.checkoutButton.click();

        const checkoutPage = new CheckoutPage(page);
        const correctCheckoutInfo = buildCheckoutInformation();
        await checkoutPage.fillCheckoutInformation(correctCheckoutInfo);

        await checkoutPage.continueButton.click();

        await expect(page).toHaveURL('/checkout-step-two.html');
        await expect(checkoutPage.finishButton).toBeVisible();

        await checkoutPage.finishButton.click();

        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(checkoutPage.orderConfirmation).toBeVisible();

    })

    test('User receives error when proceeding to checkout with empty postal code', async ({ cartPageWithBackpack, page }) => {

       const product = await cartPageWithBackpack.findProduct('Sauce Labs Backpack');
       await expect(product).toHaveCount(1);

       await cartPageWithBackpack.checkoutButton.click();

       const checkoutPage = new CheckoutPage(page);
       const emptyPostalCodeInfo = buildCheckoutInformation({ postalCode: '' });
       await checkoutPage.fillCheckoutInformation(emptyPostalCodeInfo);
    
       await checkoutPage.continueButton.click();

       await expect(checkoutPage.errorMessage).toBeVisible();
       await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');

    })


})