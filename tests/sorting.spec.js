const { test, expect } = require('@playwright/test');

test.describe('Product Sorting Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Sort products by Price (low to high) and verify ascending order', async ({ page }) => {
    // TODO: fill in the dropdown's data-test value
    await page.getByTestId('product-sort-container').selectOption('lohi');

    // Grab all displayed prices as text, e.g. "$9.99"
    const priceElements = page.locator('.inventory_item_price');
    const priceTexts = await priceElements.allTextContents();

    // Convert "$9.99" -> 9.99 (number)
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));

    // Build a sorted copy to compare against
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('Sort products by Name (Z to A) and verify descending order', async ({ page }) => {
    await page.getByTestId('product-sort-container').selectOption('za');

    const nameElements = page.locator('.inventory_item_name');
    const names = await nameElements.allTextContents();

    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);
  });

});