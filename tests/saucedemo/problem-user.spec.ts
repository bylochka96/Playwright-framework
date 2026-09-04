import { test, expect } from '../../fixtures/saucedemo.fixture';

test('Problem user can open inventory', async ({ authenticatedPage }) => {

    await expect(authenticatedPage).toHaveURL('/inventory.html');
    
});