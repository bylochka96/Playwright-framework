import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    await page.goto('https://demo.playwright.dev/todomvc/')

})

test('Добавление трёх задач', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 3;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByText(`Task ${i}`)).toBeVisible();
        await expect(page.locator('.todo-list').getByRole('listitem').nth(i - 1)).toHaveText(`Task ${i}`)
    }

    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveCount(countOfTasks);
    await expect(page.locator('.todo-count')).toContainText(`${countOfTasks} items left`)
})


test('Завершение задачи', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const nameOfTask = 'Task';
    await newTodo.fill(nameOfTask);
    await newTodo.press('Enter');

    await expect(page.getByText(nameOfTask)).toBeVisible();
    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveText(`Task`)

    await page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').check();
    await expect(page.locator('.todo-list').getByRole('listitem').getByRole('checkbox')).toBeChecked()
    await expect(page.locator('.todo-count')).toContainText('0 items left')

})


test('Фильтрация задач', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 2;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByText(`Task ${i}`)).toBeVisible();
        await expect(page.locator('.todo-list').getByRole('listitem').nth(i - 1)).toHaveText(`Task ${i}`)
    }

    await page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').first().check();
    await expect(page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').first()).toBeChecked()
    await expect(page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').last()).not.toBeChecked()

    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.locator('.todo-list').getByRole('listitem').first()).toHaveText('Task 2')
    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveCount(1)
    await expect(page).toHaveURL(/active/)

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('.todo-list').getByRole('listitem').first()).toHaveText('Task 1')
    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveCount(1)
    await expect(page).toHaveURL(/completed/)

    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveCount(2)
})

test('Редактирование задачи', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const nameOfTask = 'first name of the Task';
    await newTodo.fill(nameOfTask);
    await newTodo.press('Enter');

    await expect(page.getByText(nameOfTask)).toBeVisible();

    await page.locator('.todo-list').getByRole('listitem').dblclick();
    const editInput = page.locator('.todo-list').getByRole('listitem').getByRole('textbox');
    await editInput.fill('Edited Task');
    await editInput.press('Enter');
    await expect(page.getByText('Edited Task')).toBeVisible();
    await expect(page.getByText('first name of the Task')).not.toBeVisible();
})


test('Удаление завершённых задач', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 3;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByText(`Task ${i}`)).toBeVisible();
        await expect(page.locator('.todo-list').getByRole('listitem').nth(i - 1)).toHaveText(`Task ${i}`)
    }
    await expect(page.locator('.todo-count')).toContainText(`${countOfTasks} items left`)

    await page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').first().check();
    await expect(page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').first()).toBeChecked()
    await page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').nth(1).check();
    await expect(page.locator('.todo-list').getByRole('listitem').getByRole('checkbox').nth(1)).toBeChecked()
    const btnClearCompleted = page.getByRole('button', { name: 'Clear completed' });

    await expect(btnClearCompleted).toBeVisible();
    await btnClearCompleted.click();
    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveCount(1)
    await expect(page.locator('.todo-count')).toContainText('1 item left')

    await expect(page.locator('.todo-list').getByRole('listitem')).toHaveText('Task 3')
    await expect(page.getByText('Task 1')).not.toBeVisible();
    await expect(page.getByText('Task 2')).not.toBeVisible();
})