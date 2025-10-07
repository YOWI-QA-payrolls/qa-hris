// Simple helper functions for common page interactions

// Helper function to disable chat widgets
async function disableChatWidgets(page) {
  await page.evaluate(() => {
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
  try {
    await page.waitForTimeout(1000);
    
    // Try to dismiss any visible overlays
    const overlay = page.locator('.flex.min-h-full, [role="dialog"], .modal, .overlay').first();
    if (await overlay.isVisible()) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
    
    // Disable any chat widgets
    await disableChatWidgets(page);
  } catch (error) {
    console.log('Modal overlay handling failed:', error.message);
  }
}

// Helper function to click elements with simple fallback
async function clickWithFallback(page, role, name) {
  try {
    await page.getByRole(role, { name }).click({ timeout: 3000 });
    console.log(`✅ Clicked ${role}: ${name}`);
  } catch (error) {
    console.log(`❌ Failed to click ${role}: ${name} - ${error.message}`);
    // Try force click as fallback
    try {
      await page.getByRole(role, { name }).click({ force: true, timeout: 3000 });
      console.log(`✅ Force clicked ${role}: ${name}`);
    } catch (forceError) {
      console.log(`❌ Force click also failed for ${role}: ${name}`);
    }
  }
}

// Helper function to interact with search input
async function interactWithSearchInput(page, action, value = '') {
  const searchInput = page.locator('input[class*="focus:none"][class*="outline-none"][class*="px-2"][class*="py-1"][class*="grow"]');
  
  try {
    if (action === 'click') {
      await searchInput.click();
    } else if (action === 'fill') {
      await searchInput.fill(value);
    } else if (action === 'type') {
      await searchInput.type(value);
    } else if (action === 'clear') {
      await searchInput.clear();
    }
  } catch (error) {
    console.log(`Search input ${action} failed:`, error.message);
  }
}

module.exports = {
  disableChatWidgets,
  handleModalOverlay,
  clickWithFallback,
  interactWithSearchInput
};
