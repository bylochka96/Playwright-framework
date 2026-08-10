import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.getByRole('heading', { name: /^Epic sadface:/ });
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}