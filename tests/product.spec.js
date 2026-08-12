const { test, expect } = require('@playwright/test');

test.describe("Product Interaction Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test("Add product to cart and verify cart badge updates", async ({ page }) => {
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();

    await expect(page.locator(".shopping_cart_badge")).toHaveText('1');

    await expect(page.getByTestId("remove-sauce-labs-backpack")).toBeVisible();
  });

  test("Remove product from cart", async ({ page }) => {
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText('1');

    await page.getByTestId("remove-sauce-labs-backpack").click();

    
    await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
  });

});