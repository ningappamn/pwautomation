const { test, expect} = require('@playwright/test');

test('Create new investor with dynamic details', async ({ page }) => {
  test.setTimeout(120000); // Increase timeout

  // 1. Navigate to Login URL
  await page.goto('https://app.qa.trcmfund.io/auth/login');
  await page.waitForLoadState('networkidle');

  // 2. Login
  await page.locator('input[type="email"]').fill('prabhu.patil+lpadmin@yopmail.com');
  await page.locator('input[type="password"]').fill('Test@123');
  
  // Try multiple selectors for the login button
  const loginBtn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
  await loginBtn.waitFor({ state: 'visible', timeout: 10000 });
  await loginBtn.click();

  // 3. Handle OTP
  // Wait for OTP input to appear
  const otpInputSelector = 'input[aria-label^="Please enter OTP character"], input[name="otp"], input[placeholder*="OTP"]';
  await page.waitForSelector(otpInputSelector, { timeout: 20000 });
  
  const otpInputs = page.locator('input[aria-label^="Please enter OTP character"]');
  const count = await otpInputs.count();
  
  if (count >= 4) {
      // If split inputs
      const otp = '0000';
      for (let i = 0; i < count; i++) {
          await otpInputs.nth(i).fill(otp[i]);
      }
  } else {
      // Single input
      await page.locator(otpInputSelector).fill('0000');
  }
  
  // Click Verify
  // Try multiple selectors including the one from other working tests using .or() to mix CSS and XPath
  const verifyBtn = page.locator('button[type="submit"]')
      .or(page.locator('button:has-text("Verify")'))
      .or(page.locator('button:has-text("Submit")'))
      .or(page.locator('//span[@class="indicator-label"]'))
      .first();
  
  await verifyBtn.waitFor({ state: 'visible', timeout: 10000 });
  await verifyBtn.click();

  // Wait for navigation to dashboard/home or any non-login page
  // This ensures the auth token is set and we are redirected
  await page.waitForURL((url) => !url.toString().includes('/auth/login'), { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Extra wait to ensure auth state is settled

  // 4. Navigate to Investor tab
  console.log("Attempting to click Investor link...");
  
  // Try multiple selectors for the link to ensure we find it
  const investorLink = page.locator('a[href*="/investor/list"], a:has-text("Investors"), //a[contains(.,"Investors")]').first();
  
  try {
    await investorLink.waitFor({ state: 'visible', timeout: 20000 });
    await investorLink.click();
  } catch (e) {
    console.log("Link click failed. Current URL:", page.url());
    // Only use goto as a last resort, but it might cause a redirect if session is lost
    console.log("Trying direct navigation...");
    await page.goto('https://app.qa.trcmfund.io/investor/list');
  }
  
  await expect(page).toHaveURL(/.*\/investor\/list/, { timeout: 30000 });

  // 5. Click Create/Add Investor button
  const addBtn = page.locator('button:has-text("Add Investor"), button:has-text("Add"), a:has-text("Add Investor")').first();
  await addBtn.waitFor({ state: 'visible', timeout: 20000 });
  await addBtn.click();

  // Wait for dialog
  const dialog = page.locator('div[role="dialog"], .modal.show').first();
  await dialog.waitFor({ state: 'visible', timeout: 15000 }); 


  // 6. Generate Dynamic Data
  const uniqueId = Date.now();
  const investorName = `Prabhu${uniqueId}`;
  const investorEmail = `prabhu.patil+${uniqueId}@yopmail.com`;
 const phoneNumber = '+1 555-123-4567';
  
  const today = new Date();
  const commitmentDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;

  // 7. Fill the Form
  
  // Helper for React Select - With search and selection
  async function selectDropdown(label, searchTerm) {
    console.log(`Selecting ${label}: searching for "${searchTerm}"`);

    // Find the control by label
    const control = dialog.locator(`xpath=//label[contains(., "${label}")]/ancestor::div[contains(@class, "fv-row") or contains(@class, "form-group") or contains(@class, "field")][1]//div[contains(@class, "react-select__control")]`).first();
    
    console.log(`Opening ${label} dropdown...`);
    await control.scrollIntoViewIfNeeded();
    await control.click();
    await page.waitForTimeout(600);

    // Type the search term into the input field
    console.log(`Typing search term: "${searchTerm}"`);
    await page.keyboard.type(searchTerm);
    await page.waitForTimeout(1000);

    // Try multiple selectors for options
    let allOptions = page.locator('div[class*="react-select__option"]');
    let count = await allOptions.count();
    
    console.log(`Found ${count} options`);

    // Log all available options
    for (let i = 0; i < Math.min(count, 10); i++) {
      const text = await allOptions.nth(i).textContent().catch(() => 'N/A');
      console.log(`  Option ${i}: "${text}"`);
    }

    // Find and click first option that is NOT "No options"
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const text = await allOptions.nth(i).textContent().catch(() => '');
        const isVisible = await allOptions.nth(i).isVisible().catch(() => false);
        
        // Skip "No options" message and only click visible options
        if (isVisible && text && text.trim() !== 'No options') {
          console.log(`Clicking visible option: "${text}"`);
          await allOptions.nth(i).click();
          await page.waitForTimeout(800);
          console.log(`✓ Selected: "${text}"`);
          return true;
        }
      }
    }

    // If no options found or visible, use keyboard selection
    console.warn(`No clickable options found for "${searchTerm}". Using keyboard selection...`);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(400);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);
    return false;
  }
  

  // Helper to fill Date inputs (handles Flatpickr and standard inputs)
  async function fillDate(locator, dateStr) {
      // Try to set via Flatpickr instance if available
      const success = await locator.evaluate((input, date) => {
          if (input._flatpickr) {
              input._flatpickr.setDate(date, true);
              return true;
          }
          return false;
      }, dateStr);

      if (success) {
          console.log(`Set date ${dateStr} using Flatpickr API`);
          return;
      }

      // Fallback: Remove readonly and fill
      console.log(`Flatpickr instance not found, using fallback for ${dateStr}`);
      await locator.evaluate(el => el.removeAttribute('readonly'));
      await locator.fill(dateStr);
      await locator.press('Enter');
      await locator.press('Tab');
  } 
  
  // Investor Name
  await dialog.locator('input[name="name"], input[placeholder*="Name"]').first().click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await dialog.locator('input[name="name"], input[placeholder*="Name"]').first().fill(investorName);
  await page.keyboard.press('Tab');

  // Investor Email
  await dialog.locator('input[name="email"], input[placeholder*="Email"]').first().click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Delete');
  await dialog.locator('input[name="email"], input[placeholder*="Email"]').first().fill(investorEmail);
  await page.keyboard.press('Tab');


  // Account Type: Roth IRA
  //updated by ningappa

await page.getByLabel("Select any one").click();  
await page.waitForTimeout(3000);
  
const accountOptions=page.locator("div[role='listbox'] div");
const countOptions=await accountOptions.count();

  //select an option from account type
  for(let i=0;i<=countOptions;i++){
    const textopt=await accountOptions.nth(i).innerText();
    if(textopt==='Roth IRA'){
        accountOptions.nth(i).click();
        break;
    }
  }
  await page.waitForTimeout(5000);

  

  //Prabhu code
  /* await page.locator("#react-select-4-placeholder").click();
  await page.getByText('Roth IRA'); */

 // await selectDropdown('Account Type', 'Roth IRA');
  //await page.getByRole('option', { name: /Roth/ }).click().catch(() => {});

/*
// Phone Number
  const phoneInput = dialog.locator('input[name*="phone"], input[type="tel"], input[placeholder*="Phone"]').first();
  await phoneInput.fill(phoneNumber);
  await phoneInput.press('Tab');

  // Date of Birth: 01/01/1980
  const dobInput = dialog.locator('xpath=//label[contains(.,"Date of Birth") or contains(.,"DOB")]/ancestor::div[1]//input').first();
  await fillDate(dobInput, '01/01/1980');

  // Advisor Name: Prabhu Financial Advisor
  await selectDropdown('Advisor Name', 'Prabhu Financial Advisor');
  //await page.getByRole('option', { name: /Prabhu/ }).click().catch(() => {});

  // Fund Name: TRCM Fund 2, LP
 // await selectDropdown('Fund Name', 'TRCM Fund 2, LP');

//await page.waitForSelector('div.react-select__control');
//await page.locator('div.react-select__control').click();
await page.locator
await page.locator("//div[text()='Select Fund']").click();





  //await page.getByRole('option', { name: /TRCM/ }).click().catch(() => {});

  // Commitment Amount: 50000
  const amountInput = dialog.locator('xpath=//label[contains(.,"Commitment Amount")]/ancestor::div[1]//input').first();
  await amountInput.fill('50000');
  await page.keyboard.press('Tab');

  // Commitment Date: Today's date
  const dateInput = dialog.locator('xpath=//label[contains(.,"Commitment Date")]/ancestor::div[1]//input').first();
  await fillDate(dateInput, commitmentDate);

  // 8. Submit Form
  const submitBtn = dialog.locator('button:has-text("Submit"), button:has-text("Create"), button:has-text("Save")').first();
  
  // Check for validation errors before submitting
  const errorMessages = await dialog.locator('.invalid-feedback, .error, [role="alert"]').allTextContents();
  if (errorMessages.length > 0) {
    console.log("Validation errors found:");
    errorMessages.forEach(msg => console.log(`  - ${msg}`));
  }
  
  // Wait for button to be enabled
  try {
    await expect(submitBtn).toBeEnabled({ timeout: 5000 });
    console.log("Submit button is enabled, clicking...");
    await submitBtn.click();
  } catch (e) {
    console.log("Submit button is still disabled. Checking for validation errors...");
    // Log if any field is empty
    const dobValue = await dobInput.inputValue();
    const dateValue = await dateInput.inputValue();
    const nameValue = await dialog.locator('input[name="name"], input[placeholder*="Name"]').first().inputValue();
    const emailValue = await dialog.locator('input[name="email"], input[placeholder*="Email"]').first().inputValue();
    const phoneValue = await phoneInput.inputValue();
    const amountValue = await amountInput.inputValue();
    
    console.log(`Field Values - Name: ${nameValue}, Email: ${emailValue}, Phone: ${phoneValue}`);
    console.log(`DOB Value: ${dobValue}, Commitment Date Value: ${dateValue}, Amount: ${amountValue}`);
    
    // Capture screenshot for debugging
    await page.screenshot({ path: 'debug-submit-disabled.png', fullPage: true });
    
    // Try force click
    console.log("Attempting force click on submit button...");
    await submitBtn.click({ force: true });
  }

  // Optional: Wait for success or dialog close
  //await expect(dialog).toBeHidden({ timeout: 15000 });*/

});