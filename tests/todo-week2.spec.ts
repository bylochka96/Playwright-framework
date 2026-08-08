import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    await page.goto('https://demo.playwright.dev/todomvc/')

})

test('User can add three tasks', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 3;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })})).toBeVisible();

    }

    await expect(page.getByRole('listitem').filter({has: page.getByRole('checkbox')})).toHaveCount(countOfTasks);
    await expect(page.getByText(`${countOfTasks} items left`)).toBeVisible();
})


test('User can complete a task', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 2;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })})).toBeVisible();

    }

    await page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })}).getByRole('checkbox').check();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })}).getByRole('checkbox')).toBeChecked()
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 2', { exact: true })}).getByRole('checkbox')).not.toBeChecked()
    await expect(page.getByText('1 item left')).toBeVisible();


})


test('User can filter tasks', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 3;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
       await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })})).toBeVisible();
    }

    await page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })}).getByRole('checkbox').check();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })}).getByRole('checkbox')).toBeChecked()
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 2', { exact: true })}).getByRole('checkbox')).not.toBeChecked()
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 3', { exact: true })}).getByRole('checkbox')).not.toBeChecked()

    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 3', { exact: true })})).toBeVisible();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 2', { exact: true })})).toBeVisible();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })})).not.toBeVisible();
    await expect(page.getByRole('listitem').filter({has: page.getByRole('checkbox')})).toHaveCount(2);
    await expect(page).toHaveURL(/active/)

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })})).toBeVisible();
    await expect(page.getByRole('listitem').filter({has: page.getByRole('checkbox')})).toHaveCount(1);
    await expect(page).toHaveURL(/completed/)

    await page.getByRole('link', { name: 'All' }).click();
    for (let i = 1; i <= countOfTasks; i++) {
       await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })})).toBeVisible();
    }
    await expect(page.getByRole('listitem').filter({has: page.getByRole('checkbox')})).toHaveCount(countOfTasks)
})

test('User can edit a task', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 2;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })})).toBeVisible();

    }

    const taskToEdit = page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })});
    await taskToEdit.dblclick();
    const editInput = taskToEdit.getByRole('textbox');
    await editInput.fill('Edited Task');
    await editInput.press('Enter');
    await expect(page.getByText('Edited Task')).toBeVisible();
    await expect(page.getByText('Task 1')).not.toBeVisible();
    await expect(page.getByText('Task 2')).toBeVisible();
})


test('User can clear completed tasks', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    const countOfTasks = 3;
    for (let i = 1; i <= countOfTasks; i++) {
        await newTodo.fill(`Task ${i}`);
        await newTodo.press('Enter');
        await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })})).toBeVisible();

    }
    await expect(page.getByText('3 items left')).toBeVisible();


     for (let i = 1; i <= 2; i++) {
       await page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })}).getByRole('checkbox').check();
    await expect(page.getByRole('listitem').filter({has: page.getByText(`Task ${i}`, { exact: true })}).getByRole('checkbox')).toBeChecked()

    }

    const btnClearCompleted = page.getByRole('button', { name: 'Clear completed' });

    await expect(btnClearCompleted).toBeVisible();
    await btnClearCompleted.click();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 3', { exact: true })})).toBeVisible();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 1', { exact: true })})).not.toBeVisible();
    await expect(page.getByRole('listitem').filter({has: page.getByText('Task 2', { exact: true })})).not.toBeVisible();
    await expect(page.getByText('1 item left')).toBeVisible();
})
