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

// Helper function to handle date picker interactions with multiple fallback strategies
async function handleDatePicker(page, dateButtonSelector, targetDateSelector) {
  console.log('Starting date picker interaction...');
  
  try {
    // Wait for page to be stable
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Strategy 1: Try normal interaction
    console.log('Trying normal date picker interaction...');
    await page.locator(dateButtonSelector).waitFor({ state: 'visible', timeout: 5000 });
    await page.locator(dateButtonSelector).click();
    
    // Wait for date picker to appear
    await page.waitForSelector('.react-datepicker__month-container', { state: 'visible', timeout: 5000 });
    await page.waitForTimeout(500);
    
    // Try to click the specific date
    await page.locator(targetDateSelector).click();
    console.log('Date picker interaction successful with normal approach');
    return true;
    
  } catch (error) {
    console.log('Normal date picker failed, trying alternative approaches...');
    
    try {
      // Strategy 2: Force click approach
      console.log('Trying force click approach...');
      await page.locator(dateButtonSelector).click({ force: true });
      await page.waitForTimeout(1000);
      
      // Check if date picker is visible
      const isDatePickerVisible = await page.locator('.react-datepicker__month-container').isVisible();
      if (isDatePickerVisible) {
        await page.locator(targetDateSelector).click({ force: true });
        console.log('Date picker interaction successful with force approach');
        return true;
      }
      
    } catch (forceError) {
      console.log('Force click failed, trying JavaScript approach...');
      
      try {
        // Strategy 3: JavaScript direct manipulation
        await page.evaluate(({ dateButtonSelector, targetDateSelector }) => {
          // Click the date button
          const dateButton = document.querySelector(dateButtonSelector);
          if (dateButton) {
            dateButton.click();
            
            // Wait a bit for the picker to appear
            setTimeout(() => {
              const targetDate = document.querySelector(targetDateSelector);
              if (targetDate) {
                targetDate.click();
              }
            }, 500);
          }
        }, { dateButtonSelector, targetDateSelector });
        
        console.log('Date picker interaction attempted with JavaScript');
        return true;
        
      } catch (jsError) {
        console.log('All date picker strategies failed:', jsError.message);
        return false;
      }
    }
  }
  
  return false;
}

module.exports = {
  disableChatWidgets,
  handleModalOverlay,
  clickWithFallback,
  interactWithSearchInput,
  handleDatePicker
};
