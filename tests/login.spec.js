const { test, expect } = require("@playwright/test");

test.describe("Login Tests", () => {

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  })

test("Valid Login", async ({page}) => {

  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByRole("button", {name: "Login" }).click();
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText("Product")).toBeVisible()

})
test('Invalid Login - locked out user is blocked with an error', async ({ page }) => {
    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

})