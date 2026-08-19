import type { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(private readonly page: Page) {
        this.cartItems = this.page.getByTestId('inventory-item');
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    }

    async findProduct(productName: string): Promise<Locator> {
        return this.cartItems.filter({ has: this.page.getByText(productName, { exact: true }) });
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product = await this.findProduct(productName);
        const removeButton = product.getByRole('button', { name: 'Remove' });
        await removeButton.click();
    }

}