import {test,expect} from '@playwright/test';
import { title } from 'process';

test('first test',async function({page}){

 await page.goto('https://testautomationpractice.blogspot.com/');

 await expect(page).toHaveTitle('Automation Testing Practice');
})