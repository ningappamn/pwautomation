import{test,expect} from '@playwright/test';

test('static dropdown',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    const clickdropdown=await page.locator('#country').click()
    const selectopt= await page.locator('#country').selectOption('germany');
    //await page.waitForTimeout(5000);
    //expect(page.locator('#country')).toHaveValue('germany');

   // await page.pause();
    

})