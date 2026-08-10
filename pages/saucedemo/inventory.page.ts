import type { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly products: Locator;
    readonly cartBadge: Locator;
    readonly cart: Locator;

    constructor(private readonly page: Page) {
        this.products = this.page.getByTestId('inventory-item');
        this.cartBadge = this.page.getByTestId('shopping-cart-badge');
        this.cart = this.page.getByTestId('shopping-cart-link');
    }


    async addProductToCart(productName: string): Promise<void> {
        const product = this.products.filter({ has: this.page.getByText(productName, { exact: true }) });
        
        const addToCartButton = product.getByRole('button', { name: 'Add to cart' });
        
        await addToCartButton.click();
    }

}