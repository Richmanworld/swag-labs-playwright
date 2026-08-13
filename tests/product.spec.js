const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test.describe('Product Interaction Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Add product to cart and verify cart badge updates', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart('sauce-labs-backpack');
    await expect(productsPage.cartBadge).toHaveText('1');
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toBeVisible();
  });

  test('Remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart('sauce-labs-backpack');
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.removeFromCart('sauce-labs-backpack');
    await expect(productsPage.cartBadge).toHaveCount(0);
  });

});