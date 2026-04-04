/**
 * @param {import('@playwright/test').Page} page
 */

export async function login(page) {
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });

    // Enter valid username and password
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Click the Login button
    await page.locator('#login-button').click();
    
    // Wait for successful navigation to the Inventory page
    await page.waitForURL('**/inventory.html');

}
