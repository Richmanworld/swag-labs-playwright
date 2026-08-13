const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Complete checkout flow with valid customer info', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product and go to cart
    await productsPage.addToCart('sauce-labs-backpack');
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.cartLink.click();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Checkout flow
    await checkoutPage.goToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Verify totals math
    const { itemTotal, tax, total } = await checkoutPage.getTotals();
    expect(itemTotal + tax).toBeCloseTo(total, 2);

    // Finish and confirm
    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.confirmationText).toBeVisible();
    await expect(checkoutPage.backToProductsButton).toBeVisible();
  });

});