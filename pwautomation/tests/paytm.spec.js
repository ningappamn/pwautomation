
import { test, expect } from '@playwright/test';
import path from 'path';

test('mouse over on recharge and select options', async ({ page }) => {

    await page.goto('https://paytm.com/');

    await page.getByText('Recharge & Bills').hover();

    //take  screenshot
   // await page.screenshot({ path: 'paytm.png' });

    const [newpage] = await Promise.all([page.waitForEvent('popup'), page.getByRole('link', { name: 'Electricity bill', exact: true }).click()]);

    await newpage.waitForLoadState('domcontentloaded');

    const radiobtn = newpage.getByRole('radio', { name: 'Electricity Boards' })
    await expect(radiobtn).toBeChecked();
    await expect(newpage.getByRole('radio', { name: 'Apartments' })).not.toBeChecked();

    await newpage.locator('div:has-text("State")').first().click();
    //await newpage.locator('._1exI ._3xI1').first().waitFor({ state: 'visible', timeout: 10000 });

    const allstates = await newpage.locator('._1exI ._3xI1 ul li span').allTextContents();
    console.log('states:',allstates);
    


})