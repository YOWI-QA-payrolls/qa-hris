import { test, expect } from '@playwright/test';

// Helper to disable chat widgets that might interfere
async function disableChatWidgets(page) {
  await page.evaluate(() => {
    // Hide any chat widgets
    const selectors = [
      'iframe[title="chat widget"]',
      'iframe[src*="tawk"]',
      '.widget-visible',
      '.tawk-card',
      '.tawk-chat-bubble',
      '#tawk-message-preview'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    });
  });
}

// Helper function to handle modal overlays
async function handleModalOverlay(page) {
  await page.waitForTimeout(1000); // Allow animations to complete
  
  // Try to dismiss any visible overlays
  try {
    const overlay = page.locator('.flex.min-h-full, [role="dialog"], .modal, .overlay').first();
    if (await overlay.isVisible()) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
  } catch (e) {
    // No overlay found, continue
  }
  
  // Disable any chat widgets
  await disableChatWidgets(page);
}

// Helper function to click elements with fallback strategies
async function clickWithFallback(page, role, name) {
  try {
    await page.getByRole(role, { name }).click();
  } catch (error) {
    console.log(`${role} click failed, trying force click...`);
    try {
      await page.getByRole(role, { name }).click({ force: true });
    } catch (forceError) {
      console.log('Force click failed, trying JavaScript click...');
      await page.evaluate(({ role, name }) => {
        const element = document.querySelector(`${role}:has-text("${name}")`) || 
                       Array.from(document.querySelectorAll(role)).find(el => el.textContent.includes(name));
        if (element) element.click();
      }, { role, name });
    }
  }
}

// Helper function to interact with search input
async function interactWithSearchInput(page, action, value = '') {
  const searchInput = page.locator('input[class*="focus:none"][class*="outline-none"][class*="px-2"][class*="py-1"][class*="grow"]');
  
  if (action === 'click') {
    await searchInput.click();
  } else if (action === 'fill') {
    await searchInput.fill(value);
  } else if (action === 'type') {
    await searchInput.type(value);
  } else if (action === 'clear') {
    await searchInput.clear();
  }
}


// Helper function to handle login process
async function loginUser(page) {
  await page.goto('https://www.yahshuahris.com/');
  await page.getByRole('button', { name: 'Get Started' }).nth(1).click();
  await page.getByRole('link', { name: 'Sign In' }).first().click();
  await page.getByRole('textbox', { name: 'Email' }).fill('workian58+9@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Securepass@223');
  await page.getByRole('button', { name: 'Sign in' }).click();
}

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