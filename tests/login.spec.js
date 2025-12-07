import{test,expect} from '@playwright/test';

test('login',async({page})=>{
await page.goto('https://app.qa.trcmfund.io/investor/list');

await page.waitForTimeout(5000);


})





  