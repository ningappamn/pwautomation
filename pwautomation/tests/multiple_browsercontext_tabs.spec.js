//multiple browser contexts test

import { test, expect } from '@playwright/test';

test('Multiple Contexts', async({browser}) => {

    //create two separte browser contexts
    const context1=await browser.newContext();
    const context2=await browser.newContext();

    //create pages in each context
    const page1=await context1.newPage();
    await page1.goto('https://www.google.com');

    const page2=await context2.newPage();
    await page2.goto('https://www.github.com');
})


//multiple tabs test

test('multiple tabs', async({browser}) => {

    //create a single browser context
    const context=await browser.newContext();
    
    //create multiple pages (tabs) in the same context
    const page1=await context.newPage();
    await page1.goto('https://www.google.com'); 

    const page2=await context.newPage();
    await page2.goto('https://www.github.com');
})