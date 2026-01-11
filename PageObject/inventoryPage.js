//import { expect } from '@playwright/test';
const { expect } = require('@playwright/test');


class InventoryPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.inventory_item');
    }

    async addProduct() {
        const allProducts = await this.page.locator('.inventory_item_name').allTextContents();

        console.log(`All the products: ${allProducts}`);

        let count = 0;
        let addedProduct;

        // Loop through all products
        for (let product of allProducts) {
            console.log(`Checking Product: ${product}`);

            // Add the 5th product (index 4)
            if (count === 4) {

                // Click the "Add to Cart" button for this product
                await this.page
                    .locator(`.inventory_item:has-text("${product}") button`)
                    .click();

                addedProduct = product;
                break;
            }

            count++;
        }

        console.log(`Added Product is: ${addedProduct}`);
        return addedProduct;
    }

    async validateRemoveButtonVisible(addedProduct) {
        await expect(this.page.locator(`.inventory_item:has-text("${addedProduct}") button:has-text("Remove")`)).toBeVisible();
    }
}

module.exports = { InventoryPage };
