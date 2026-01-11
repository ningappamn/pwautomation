class CartPage {

    constructor(page) {
        this.page = page;
        this.shopping_cart_container = page.locator('#shopping_cart_container');
        this.checkout = page.getByText('Checkout');
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.finishBtn = page.getByText('Finish');
    }

    async clickOnCart() {
        await this.shopping_cart_container.click();
    }

    async checkoutCart() {
        await this.checkout.click();
    }

    async checkoutYourInformation(firstname, lastname, zipcode) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
    }

    async clickContinue() {
        await this.continueBtn.click();
        await this.page.waitForURL('**/checkout-step-two.html');
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }
}

module.exports = { CartPage };
