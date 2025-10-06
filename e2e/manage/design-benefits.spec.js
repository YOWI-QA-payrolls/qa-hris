import { test, expect } from '@playwright/test';
const { loginUser } = require('../../pages/login-page');
const { handleModalOverlay, clickWithFallback, interactWithSearchInput } = require('../../utils/page-helpers');

// Optional: Use this as beforeEach hook for multiple tests
// test.beforeEach(async ({ page }) => {
//   await loginUser(page);
// });

test('/manage/design-benefits', async ({ page }) => {
  // Set larger viewport for better spacing
  
  
  // Login before running the test
  await loginUser(page);

  await page.getByRole('link', { name: 'Manage' }).click();
  await page.getByRole('link', { name: 'Design Benefits' }).click();
  
  // Handle any overlays that might block the CREATE button
  await handleModalOverlay(page);
  
  // Click CREATE button with fallback strategies
  await clickWithFallback(page, 'button', 'CREATE');
  await page.getByRole('textbox', { name: 'Title*' }).fill('adasd');
  await page.getByRole('textbox', { name: 'Title*' }).press('Enter');
  
  // Wait for search input and interact with it
  await page.waitForSelector('input[class*="focus:none"][class*="outline-none"]', { state: 'visible' });
  await page.waitForFunction(() => {
    const input = document.querySelector('input[class*="focus:none"][class*="outline-none"]');
    return input && !input.disabled && !input.readOnly;
  });
  
  // Interact with search input
  await interactWithSearchInput(page, 'click');
  await interactWithSearchInput(page, 'fill', 'w');
  await interactWithSearchInput(page, 'click');
  await interactWithSearchInput(page, 'clear');
  
  await page.getByRole('textbox', { name: 'Title*' }).click();
  await page.getByRole('textbox', { name: 'Purpose*' }).click();
  
  // Second search input interaction
  await interactWithSearchInput(page, 'click');
  await interactWithSearchInput(page, 'clear');
  
  await page.getByRole('textbox', { name: 'Title*' }).fill('adasdadasd');
  
  // Wait for search input and interact with it
  await page.waitForSelector('input[class*="focus:none"][class*="outline-none"]', { state: 'visible' });
  
  // Final search input interaction
  await interactWithSearchInput(page, 'click');
  await interactWithSearchInput(page, 'fill', 'work');
  
  await page.getByText('Brenden Bullock').click();
  await page.getByRole('textbox', { name: 'Purpose*' }).click();
  await page.getByRole('textbox', { name: 'Purpose*' }).fill('hello');
  await page.getByRole('textbox', { name: 'Benefits*' }).click();
  await page.getByRole('textbox', { name: 'Benefits*' }).fill('hello');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('textbox', { name: 'Coverage*' }).click();
  await page.getByRole('textbox', { name: 'Coverage*' }).fill('hello');
  await page.getByText('Eligibility*').click();
  await page.getByRole('textbox', { name: 'Eligibility*' }).fill('hello');
  
  // Handle any chat widget or overlay before clicking Send
  await handleModalOverlay(page);
  
  // Click Send button with fallback strategies
  await clickWithFallback(page, 'button', 'Send');
  
  // Verify success message is displayed
  await page.waitForSelector('.mt-1.text-sm.text-white', { state: 'visible', timeout: 10000 });
  
  // Wait for the success message to contain the expected text
  await page.waitForFunction(() => {
    const element = document.querySelector('.mt-1.text-sm.text-white');
    return element && element.textContent.includes('Successfully designed a benefit');
  }, { timeout: 5000 });
  
  const successMessage = await page.locator('.mt-1.text-sm.text-white').textContent();
  expect(successMessage).toBe('Successfully designed a benefit.');
  console.log('✅ Success message displayed:', successMessage);
  
});