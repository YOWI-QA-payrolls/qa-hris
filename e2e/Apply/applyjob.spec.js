import { test, expect } from '@playwright/test';

test('Apply to Job', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('https://s1.yahshuahris.com/landing-page');
  await page.getByRole('link', { name: 'Find Jobs' }).click();
  


  // Find all "Apply Now!" links and click the one that goes to /job-app-form/101
  const applyLinks = page.getByRole('link', { name: 'Apply Now!' });
  await expect(applyLinks.first()).toBeVisible({ timeout: 20000 });
  const linkCount = await applyLinks.count();
  let clicked = false;
  for (let i = 0; i < linkCount; i++) {
    const link = applyLinks.nth(i);
    const href = await link.getAttribute('href');
    if (href && href.includes('/job-app-form/100')) {
      await link.scrollIntoViewIfNeeded();
      await link.click();
      clicked = true;
      break;
    }
  }
  expect(clicked).toBeTruthy();
  await expect(page).toHaveURL(/\/job-app-form\/100/);

  
  await page.locator('div').filter({ hasText: /^Course\/Degree$/ }).click();
  await page.getByRole('textbox', { name: 'First Name*' }).click();
  await page.getByRole('textbox', { name: 'First Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'First Name*' }).fill('T');
  await page.getByRole('textbox', { name: 'First Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'First Name*' }).fill('Tristan');
  await page.getByRole('textbox', { name: 'Middle Name' }).click();
  await page.getByRole('textbox', { name: 'Middle Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('R');
  await page.getByRole('textbox', { name: 'Middle Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('Rivera');
  await page.getByRole('textbox', { name: 'Last Name*' }).click();
  await page.getByRole('textbox', { name: 'Last Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Last Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Last Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Last Name*' }).fill('O');
  await page.getByRole('textbox', { name: 'Last Name*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Last Name*' }).fill('Orbegoso');
  await page.getByRole('textbox', { name: 'Email Address*' }).click();
  await page.getByRole('textbox', { name: 'Email Address*' }).fill('zakiorbegoso@gmail.com');
  await page.getByLabel('Gender*').selectOption('Male');
  await page.getByRole('textbox', { name: 'Birth Date*' }).click();
  await page.getByRole('combobox').nth(2).selectOption('2003');
  await page.getByRole('option', { name: 'Choose Monday, October 20th,' }).click();
  await page.getByRole('textbox', { name: 'Mobile No.*' }).click();
  await page.getByRole('textbox', { name: 'Mobile No.*' }).fill('9772575953');
  await page.getByRole('textbox', { name: 'City Address*' }).click();
  await page.locator('div').filter({ hasText: /^Metro Manila$/ }).first().click();
  await page.getByLabel('Educational Attainment*').selectOption('College');
  await page.getByRole('textbox', { name: 'Course/Degree' }).click();
  await page.getByRole('textbox', { name: 'Course/Degree' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Course/Degree' }).fill('B');
  await page.getByRole('textbox', { name: 'Course/Degree' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Course/Degree' }).fill('');
  await page.getByRole('textbox', { name: 'Course/Degree' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Course/Degree' }).fill('I');
  await page.getByRole('textbox', { name: 'Course/Degree' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Course/Degree' }).fill('Information');
  await page.getByText('Bachelor of Computer').click();
  await page.getByRole('textbox', { name: 'School' }).click();
  await page.getByRole('textbox', { name: 'School' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'School' }).fill('ABE');
  await page.getByRole('textbox', { name: 'School' }).fill('ABE International College of Business and Accountancy');
  await page.getByText('ABE International College of Business and Accountancy-Urdaneta City').click(); 
  await page.getByRole('textbox', { name: 'Enter skills and press Enter' }).click();
  await page.getByRole('textbox', { name: 'Enter skills and press Enter' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter skills and press Enter' }).fill('T');
  await page.getByRole('textbox', { name: 'Enter skills and press Enter' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Enter skills and press Enter' }).fill('Test');
  await page.locator('#profile-picture').setInputFiles('./uploads/download.jpg');
  await page.locator('#resume').setInputFiles('./uploads/Brylle Test - Software Developer Resume.pdf');
  await page.getByRole('button', { name: 'NEXT' }).click();
  await page.locator('#yes-0').check();
  await page.locator('#yes-1').check();
  await page.locator('#yes-2').check();
  await page.getByRole('button', { name: 'NEXT' }).click();
  await page.getByRole('button', { name: 'ADD EXPERIENCE' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('textbox', { name: 'Position' }).click();
  await page.getByRole('textbox', { name: 'Position' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Position' }).fill('S');
  await page.getByRole('textbox', { name: 'Position' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Position' }).fill('System ');
  await page.getByRole('textbox', { name: 'Position' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Position' }).fill('System A');
  await page.getByRole('textbox', { name: 'Position' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Position' }).fill('System Analyst');
  await page.getByRole('textbox', { name: 'Company Organization' }).click();
  await page.getByRole('textbox', { name: 'Company Organization' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Company Organization' }).fill('C');
  await page.getByRole('textbox', { name: 'Company Organization' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Company Organization' }).fill('Copdonalds');
  await page.locator('div').filter({ hasText: /^Date From$/ }).getByPlaceholder('mm/dd/yyyy').click();
  await page.getByRole('combobox').nth(1).selectOption('2015');
  await page.getByRole('option', { name: 'Choose Tuesday, October 20th,' }).click();
  await page.locator('div').filter({ hasText: /^Date ToCurrently Employed$/ }).getByPlaceholder('mm/dd/yyyy').click();
  await page.getByRole('combobox').nth(1).selectOption('2016');
  await page.getByRole('option', { name: 'Choose Thursday, October 20th,' }).click();
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('test');
  await page.getByRole('button', { name: 'ADD EXPERIENCE' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'REMOVE' }).nth(1).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'SUBMIT' }).click();




// Your code with scrolling
await page.getByRole('button', { name: 'SUBMIT' }).click();

await scrollAndWaitForButton(page, 'I agree');
await scrollAndWaitForButton(page, 'I agree');
await scrollAndWaitForButton(page, 'I agree');
await scrollAndWaitForButton(page, 'I agree');
await scrollAndWaitForButton(page, 'I agree');

  await page.getByRole('button', { name: 'CONTINUE' }).click();
});