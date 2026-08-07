import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/')
})

test('Dynamic ID', async ({ page }) => {
   await page.getByRole('heading', { name: 'Dynamic ID' }).click();
    await page.getByRole('button', { name: 'Button with Dynamic ID' }).click();
})

test('Verify Text', async ({ page }) => {
    await page.getByRole('heading', { name: 'Verify Text' }).click();
    await expect(page.getByText('Welcome UserName!', { exact: true })).toBeVisible();
})

test('Dynamic Table', async ({ page }) => {
    await page.getByRole('heading', { name: 'Dynamic Table' }).click();
    
    const cpuCellText = page
        .getByRole('row')
        .filter({ hasText: 'Chrome' })
        .getByRole('cell', { name: /^\d+(?:\.\d+)?%$/ })
        .textContent();

    const assertedCPUValue = await page.getByText('Chrome CPU: ').textContent();

    expect(assertedCPUValue).toContain(cpuCellText);
})