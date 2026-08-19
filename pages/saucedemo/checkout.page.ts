import type { Page, Locator } from '@playwright/test';
import type { CheckoutInformation } from '../../test-data/checkout-data';

export class CheckoutPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly errorMessage: Locator;
    readonly orderConfirmation : Locator;



    constructor(private readonly page: Page) {
       this.firstNameInput = this.page.getByPlaceholder('First Name');
       this.lastNameInput = this.page.getByPlaceholder('Last Name');
       this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
       this.continueButton = this.page.getByRole('button', { name: 'Continue' });
       this.finishButton = this.page.getByRole('button', { name: 'Finish' });
       this.errorMessage = this.page.getByRole('heading', { name: /^Error:/ });
       this.orderConfirmation  = this.page.getByRole('heading', { name: 'Thank you for your order!' });
    }

    async fillCheckoutInformation({ firstName, lastName, postalCode }: CheckoutInformation): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

  
}