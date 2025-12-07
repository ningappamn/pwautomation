import{test,expect} from '@playwright/test';

test('handle auto suggested dropdown',async({page})=>{

await page.goto('https://www.amazon.in/');
const searchtext=await page.getByLabel('Search Amazon.in').fill('laptop');
page.locator('#nav-flyout-iss-anchor div');

})