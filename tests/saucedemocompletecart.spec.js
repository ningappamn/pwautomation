const { test } = require('@playwright/test');
const { LoginPage } = require('../PageObject/LoginPage');
const { InventoryPage } = require('../PageObject/inventoryPage');
const { CartPage } = require('../PageObject/cartPage');

test('Login and add product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.redirectToUrl();
    await loginPage.loginDteails('standard_user', 'secret_sauce');
    await loginPage.validateLoginSuccess();

    const productName = await inventoryPage.addProduct();
    await inventoryPage.validateRemoveButtonVisible(productName);

    await cartPage.clickOnCart();
    await cartPage.checkoutCart();
    await cartPage.checkoutYourInformation('ningappa','mn','550766');
    await cartPage.finishCheckout();
});
