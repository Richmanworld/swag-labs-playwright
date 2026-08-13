# Swag Labs Playwright Automation

## Project Description

Automated end-to-end test suite for [Swag Labs (saucedemo.com)](https://www.saucedemo.com), built with Playwright. Covers login, product interaction, product sorting, and checkout flows, using the Page Object Model for maintainable, reusable test code.

## Application Under Test

https://www.saucedemo.com

## Objectives

- Demonstrate creation of Playwright tests with meaningful assertions
- Use multiple locator strategies (`getByRole`, `getByText`, `locator()`, `getByTestId`)
- Generate and interpret an HTML test report
- Convert a flat test suite into the Page Object Model (POM)

## Technologies Used

- [Playwright](https://playwright.dev/) (`@playwright/test`)
- Node.js / npm
- JavaScript

## Project Structure

swag-labs-playwright/
├── tests/
│ ├── login.spec.js
│ ├── product.spec.js
│ ├── sorting.spec.js
│ └── checkout.spec.js
├── pages/
│ ├── LoginPage.js
│ ├── ProductsPage.js
│ └── CheckoutPage.js
├── playwright.config.js
├── package.json
└── README.md

## Prerequisites

- [Node.js](https://nodejs.org/) installed (v18+)

## Installation

```bash
git clone https://github.com/Richmanworld/swag-labs-playwright.git
cd swag-labs-playwright
npm install
npx playwright install
```

## Running the Tests

Run the full suite:

```bash
npx playwright test
```

Run a specific file:

```bash
npx playwright test login.spec.js
npx playwright test product.spec.js
npx playwright test sorting.spec.js
npx playwright test checkout.spec.js
```

Run in headed mode (visible browser):

```bash
npx playwright test --headed
```

## Generating / Viewing the Test Report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

## Test Scenarios

### Valid Login

Logs in with valid credentials (`standard_user`) and verifies successful navigation to the inventory page.

### Invalid Login

Attempts login with a locked-out user and verifies the correct error message is shown, and the user remains on the login page.

### Product Interaction

Adds a product to the cart, verifies the cart badge updates, then removes the product and verifies the badge clears.

### Product Sorting

Sorts products by price (low to high) and by name (Z to A), verifying the resulting order is actually correct — not just that the dropdown was clicked.

### Checkout

Completes a full purchase flow: add to cart → checkout info → verify item total + tax = total → finish → confirm order completion message.

## Locator Strategies

| Strategy          | Example                                       |
| ----------------- | --------------------------------------------- |
| `getByTestId()`   | `page.getByTestId('username')`                |
| `getByRole()`     | `page.getByRole('button', { name: 'Login' })` |
| `getByText()`     | `page.getByText('Products')`                  |
| `locator()` (CSS) | `page.locator('.shopping_cart_badge')`        |

## Page Object Model

- `LoginPage.js` — login form locators and login action
- `ProductsPage.js` — cart actions, sorting, and reading product prices/names
- `CheckoutPage.js` — checkout form, totals verification, and order confirmation

## Test Results

21/21 tests passing across Chromium, Firefox, and WebKit.

## Author

<Rasheed Ayokanmi>
