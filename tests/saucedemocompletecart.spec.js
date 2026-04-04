import { test } from '@playwright/test';
import { LoginPage } from '../PageObject/LoginPage.js';
import { InventoryPage } from '../PageObject/inventoryPage.js';
import { CartPage } from '../PageObject/cartPage.js';

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
