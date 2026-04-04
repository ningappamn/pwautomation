//login using environment variables
import { test, expect } from '@playwright/test';
import { env } from '../utils/env';

test('login with env file', async ({ page }) => {

  await page.goto(env.URL);

  //await page.waitForTimeout(2000);

  await page.fill('#user-name', env.USERNAME);
  await page.fill('#password', env.PASSWORD);
  await page.click('#login-button');

  console.log(env.USERNAME);
  console.log(env.PASSWORD);

  //validate login success
  
  await expect(page).toHaveURL(/inventory/);

})