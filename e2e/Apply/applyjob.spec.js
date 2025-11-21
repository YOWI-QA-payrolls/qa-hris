import { test, expect } from '@playwright/test';

test('Apply to Job', async ({ page }) => {
  await page.goto('https://s1.yahshuahris.com/landing-page');
  await page.getByRole('link', { name: 'Find Jobs' }).click();
test.skip(true, 'Skipping test temporarily');

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
  await page.getByRole('option', { name: 'Choose Thursday, November 20th,' }).click();
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
  await page.getByRole('option', { name: 'Choose Wednesday, November 18th,' }).click();
  await page.locator('div').filter({ hasText: /^Date ToCurrently Employed$/ }).getByPlaceholder('mm/dd/yyyy').click();
  await page.getByRole('combobox').nth(1).selectOption('2016');
  await page.getByRole('option', { name: 'Choose Saturday, November 19th,' }).click();
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('test');
  await page.getByRole('button', { name: 'ADD EXPERIENCE' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'REMOVE' }).nth(1).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'SUBMIT' }).click();




// Privacy modal scrolling and agreement handling
async function focusScrollableArea(page) {
  const scrollableAreas = page.locator('div[class*="overflow-auto"]');
  const count = await scrollableAreas.count();
  for (let i = 0; i < count; i++) {
    const area = scrollableAreas.nth(i);
    if (await area.isVisible()) {
      await area.click();
      return true;
    }
  }
  return false;
}

async function scrollAndClickAgree(page, timeout = 10000) {
  const agreeButton = page.getByRole('button', { name: /I agree/i });
  const start = Date.now();
  let iteration = 0;

  while (Date.now() - start < timeout) {
    if (await agreeButton.isVisible()) {
      // Check if we're at the final section before clicking
      const isFinalSection = await page.locator('li', { hasText: 'XII. Feedback on our Privacy Notice' }).isVisible().catch(() => false);
      
      await agreeButton.click();
      // Wait for modal content to update after clicking
      await page.waitForTimeout(300);
      
      // Refocus the scrollable area after content updates
      await focusScrollableArea(page);
      
      // Scroll to top of new section to ensure we're at the beginning
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('PageUp');
      }
      
      return { success: true, isFinalSection };
    }
    if (iteration % 5 === 0) await focusScrollableArea(page);
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(100);
    iteration++;
  }
  return { success: false, isFinalSection: false };
}

// Process privacy modal sections
await focusScrollableArea(page);

const maxRounds = 6;
let isComplete = false;

for (let round = 0; round < maxRounds && !isComplete; round++) {
  // Refocus at the start of each round to ensure we have focus
  await focusScrollableArea(page);

  // Scroll and click "I agree" button
  const timeout = 10000;
  let result = await scrollAndClickAgree(page, timeout);

  if (!result.success) {
    // Check if we're at final section before retry
    const isFinalSection = await page.locator('li', { hasText: 'XII. Feedback on our Privacy Notice' }).isVisible().catch(() => false);
    
    // Retry with refocus
    await focusScrollableArea(page);
    result = await scrollAndClickAgree(page, 8000);
    
    // Additional fallback for final section
    if (!result.success && isFinalSection) {
      await focusScrollableArea(page);
      for (let i = 0; i < 15; i++) {
        await page.keyboard.press('PageDown');
        await page.waitForTimeout(100);
        const agreeBtn = page.getByRole('button', { name: /I agree/i });
        if (await agreeBtn.isVisible()) {
          await agreeBtn.click();
          await page.waitForTimeout(300);
          await focusScrollableArea(page);
          result = { success: true, isFinalSection: true };
          break;
        }
      }
    }
    
    // Only break if not final section and still failed
    if (!result.success && !isFinalSection) break;
  }

  // Check if we just processed the final section
  if (result.success && result.isFinalSection) {
    // We've processed the final section, check if modal is complete
    const finalButton = page.getByRole('button', { name: /I agree|CONTINUE/i });
    const finalButtonVisible = await finalButton.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (finalButtonVisible) {
      await finalButton.click();
      isComplete = true;
    } else {
      // Final section processed but no final button yet
      isComplete = true;
    }
  }
}

// Final fallback: check for any remaining "I agree" or "CONTINUE" button
if (!isComplete) {
  const finalButton = page.getByRole('button', { name: /I agree|CONTINUE/i });
  const finalButtonVisible = await finalButton.isVisible({ timeout: 2000 }).catch(() => false);
  if (finalButtonVisible) {
    await finalButton.click();
  }
}
});