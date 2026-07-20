import { test, expect } from '@playwright/test';


test('Пользователь может добавить задачу', async ({ page }) => {

    await page.goto('https://demo.playwright.dev/todomvc/')
    await expect(page).toHaveTitle(/React • TodoMVC/);

    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('Задача 1');
    await newTodo.press('Enter');

    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    await expect(page.getByText('Задача 1')).toBeVisible();

})

test('Пользователь добавляет две задачи', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/')
    await expect(page).toHaveTitle(/React • TodoMVC/);

    const newTodo = page.getByPlaceholder('What needs to be done?');
    for (let i = 1; i <= 2; i++) {
        await newTodo.fill(`Задача ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByText(`Задача ${i}`)).toBeVisible();
    }

    const todoItems = page.locator('.todo-list').getByRole('listitem');
    await expect(todoItems).toHaveCount(2);

    // await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();

})