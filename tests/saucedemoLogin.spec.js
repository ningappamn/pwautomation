
import { test, expect } from '@playwright/test';
import { login } from './login.helper';
import { count } from 'node:console';


test('After login validate url and title', async ({ page }) => {

    await login(page);

    // Validate final URL after login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Validate page title
    await expect(page).toHaveTitle('Swag Labs');

});

test('Add products', async ({ page }) => {

    // Reuse the login helper function to log in before performing any actions
    await login(page);

    // Collect all product names and store it in allPropducts
    const allPropducts = await page.locator('.inventory_item_name ').allTextContents();
    console.log(`All the products:${allPropducts}`);

    let count = 0;
    let addedProduct;

    // Loop through all products to find the desired one to add 
    for (let product of allPropducts) {
        console.log(`Add Product:${product}`);

        // Add the 3rd product (index 2)
        if (count === 4) {

            // Click the "Add to Cart" button for this product
            await page.locator(`.inventory_item:has-text("${product}") button`).click();

            // Store the name of the added product
            addedProduct = product;

            // Stop the loop after adding the desired product
            break;

        }
        count++; // Increment counter for each product
    }

    await page.waitForTimeout(5000);

    console.log(`Added Product is : ${addedProduct}`);

    // Validate the "Remove" button appears for the added product
    await expect(page.locator(`.inventory_item:has-text("${addedProduct}") button:text('Remove')`)).toBeVisible();

    await page.locator('#shopping_cart_container').click();
    await page.waitForTimeout(5000);

    await page.waitForURL('**/cart.html');

    await page.getByText('Checkout').click();
    await page.waitForTimeout(5000);
    await page.getByPlaceholder('First Name').fill('ningappa');
    await page.getByPlaceholder('Last Name').fill('mn');
    await page.getByPlaceholder('Zip/Postal Code').fill('560078');
    await page.waitForTimeout(5000);

    await expect(page.getByText('Cancel')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForTimeout(5000);

    await page.waitForURL('**/checkout-step-two.html');
    await page.getByText('Finish').click();

    await page.waitForURL('**/checkout-complete.html');
    await expect(page.getByText('Thank you for your order!')).toBeVisible();


})



