
import { test, expect } from '@playwright/test';
import { userdetails } from '../fixtures/userdetails.js';

test.only('Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Enter valid username and password
  await page.fill('#user-name', userdetails.validUser.username);
  await page.fill('#password', userdetails.validUser.password);
  
  // Click the login button
  await page.click('#login-button');
  
  // Assert that the user is redirected to the inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Enter invalid username and password
  await page.fill('#user-name', userdetails.invalidUser.username);
  await page.fill('#password', userdetails.invalidUser.password);
  
  // Click the login button
  await page.click('#login-button');
  
  // Assert that an error message is displayed
  const errorMessage = await page.locator('.error-message-container').textContent();
  expect(errorMessage).toContain('Username and password do not match any user in this service');
}); 