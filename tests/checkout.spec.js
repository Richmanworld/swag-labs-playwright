const { test, expect } = require('@playwright/test');

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Complete checkout flow with valid customer info', async ({ page }) => {
    // Add a product to cart
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Go to cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // Proceed to checkout
    await page.getByTestId('checkout').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Fill customer info
    await page.getByTestId('firstName').fill('John');
    await page.getByTestId('lastName').fill('Doe');
    await page.getByTestId('postalCode').fill('12345');
    await page.getByTestId('continue').click();

    // Verify overview page and totals math
    await expect(page).toHaveURL(/checkout-step-two.html/);

    const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
    const taxText = await page.locator('.summary_tax_label').textContent();
    const totalText = await page.locator('.summary_total_label').textContent();

    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));
    const tax = parseFloat(taxText.replace('Tax: $', ''));
    const total = parseFloat(totalText.replace('Total: $', ''));

    expect(itemTotal + tax).toBeCloseTo(total, 2);

    // Finish the order
    await page.getByTestId('finish').click();

    // Confirm order completion
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
    await expect(page.getByTestId('back-to-products')).toBeVisible();
  });

});