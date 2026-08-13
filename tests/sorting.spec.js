const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test.describe('Product Sorting Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Sort products by Price (low to high) and verify ascending order', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');
    const prices = await productsPage.getAllPrices();

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Sort products by Name (Z to A) and verify descending order', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('za');
    const names = await productsPage.getAllNames();

    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

});