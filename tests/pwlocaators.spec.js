// @ts-check

import {test,expect} from '@playwright/test'


// Example : 01 - getByRole () Using link
test('Using link',async({page})=>{

    await page.goto('https://demo.nopcommerce.com/');
    const reglink=page.getByRole('link', {name:'Register'});
    await page.waitForTimeout(5000);
    await expect(reglink).toBeVisible();
    await expect(reglink).toHaveText('Register');

})

// Example : 01 - getByRole () Using Button

test('Using button',async({page})=>{


    await page.goto('https://demo.nopcommerce.com/');
    await page.getByRole('link',{name:'Log in'}).click();
    await page.getByRole('textbox',{name:'Email'}).fill('ningappa@gmail.com');
    await page.getByRole('textbox',{name:'Password'}).fill('nings@321');
    await page.getByRole('button',{name:'Log in'}).click();

    const errorMsg=page.getByText('No customer account found');

    //await page.waitForTimeout(5000);
    await page.waitForLoadState();

    await expect(errorMsg).toHaveText('No customer account found');

})


test('Using Heading',async({page})=>{


    await page.goto('https://demo.nopcommerce.com/');
    const headingtext=page.getByRole('heading',{name:'Welcome to our store'});
    //await page.waitForTimeout(3000);
    await expect(headingtext).toBeVisible();
    await expect(headingtext).toHaveText('Welcome to our store');

})

test('Using radibutton',async({page})=>{


    await page.goto('https://demo.nopcommerce.com/');
    const radiobutton=page.getByRole('radio',{name:'Excellent'});
    await radiobutton.check();
    
    await page.waitForTimeout(3000);

    await expect(radiobutton).toBeChecked();
    await expect(radiobutton).toHaveAccessibleName('Excellent');
    await expect(radiobutton).toBeVisible();

})


test('Using checkbox',async({page})=>{


    await page.goto('https://testautomationpractice.blogspot.com/');
    const chkbox=page.getByRole('checkbox',{name:'Sunday'});
    await chkbox.check();
    
    await page.waitForTimeout(3000);

    await expect(chkbox).toBeChecked();
    await expect(chkbox).toHaveAccessibleName('Sunday');
    await expect(chkbox).toBeVisible();

})

test('Select multiple checkbox',async({page})=>{

    const selmulcheckbox=['Sunday','Wednesday','Saturday','Friday'];
    await page.goto('https://testautomationpractice.blogspot.com/');
    for(let day of selmulcheckbox){

    const chkbox=page.getByRole('checkbox',{name:day});
    await chkbox.check();

    await page.waitForTimeout(3000);
    await expect(chkbox).toBeChecked();
    }
})

test('Using img',async({page})=>{


    await page.goto('https://demo.nopcommerce.com/');
    const checkimage=page.getByRole('img',{name:'nopCommerce demo store'});

    await expect(checkimage).toBeVisible();
    await expect(checkimage).toHaveAttribute('alt','nopCommerce demo store');
    await expect(checkimage).toHaveAttribute('src',"https://demo.nopcommerce.com/Themes/DefaultClean/Content/images/logo.png");
})

test('Using columnheader',async({page})=>{


    await page.goto('https://testautomationpractice.blogspot.com/');
 
    // Scope to the Static Web Table (identified by BookName header)
    
    const staticTable = page.getByRole('table').filter({has:page.getByRole('columnheader',{name:'Author'})});

    const bookname=staticTable.getByRole('columnheader',{name:'BookName'});
    const author=staticTable.getByRole('columnheader',{name:'Author'});
    const subject=staticTable.getByRole('columnheader',{name:'Subject'});
    const price=staticTable.getByRole('columnheader',{name:'Price'});

    await expect(bookname).toBeVisible();
    await expect(author).toBeVisible();
    await expect(subject).toBeVisible();
    await expect(price).toBeVisible();
    
})

//Validate table using getByRole - combined with row,cell,columnheader 

test('Validate table using getByRole', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const staticTable = page.getByRole('table').filter({
    has: page.getByRole('columnheader', { name: 'BookName' })
  });

  // Scope to the specific row
  const targetRow = staticTable.getByRole('row', { name: /Master In Java Amod JAVA 2000/ });

  await expect(targetRow.getByRole('cell', { name: 'Master In Java', exact: true })).toBeVisible();
  await expect(targetRow.getByRole('cell', { name: 'Amod', exact: true })).toBeVisible();
  await expect(targetRow.getByRole('cell', { name: 'JAVA', exact: true })).toBeVisible();
  await expect(targetRow.getByRole('cell', { name: '2000', exact: true })).toBeVisible();
});
