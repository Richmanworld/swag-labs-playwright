class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');

    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');

    this.confirmationText = page.getByText('Thank you for your order!');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getTotals() {
    const itemTotalText = await this.itemTotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    return {
      itemTotal: parseFloat(itemTotalText.replace('Item total: $', '')),
      tax: parseFloat(taxText.replace('Tax: $', '')),
      total: parseFloat(totalText.replace('Total: $', '')),
    };
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };