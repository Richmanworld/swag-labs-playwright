class ProductsPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.priceElements = page.locator('.inventory_item_price');
    this.nameElements = page.locator('.inventory_item_name');
  }

  async addToCart(productTestId) {
    await this.page.getByTestId(`add-to-cart-${productTestId}`).click();
  }

  async removeFromCart(productTestId) {
    await this.page.getByTestId(`remove-${productTestId}`).click();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllPrices() {
    const priceTexts = await this.priceElements.allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }

  async getAllNames() {
    return await this.nameElements.allTextContents();
  }
}

module.exports = { ProductsPage };