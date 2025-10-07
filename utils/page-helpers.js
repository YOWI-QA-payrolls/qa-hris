// Page interaction helpers - focused on UI interactions

// Disable chat widgets that might interfere with tests
async function disableChatWidgets(page) {
  await page.evaluate(() => {
    const selectors = [
      'iframe[title="chat widget"]',
      'iframe[src*="tawk"]',
      'iframe[src*="tawk.to"]',
      '.widget-visible',
      '.tawk-card',
      '.tawk-chat-bubble',
      '.tawk-widget',
      '.tawk-widget-iframe',
      '#tawk-message-preview',
      '#tawk-widget',
      '#tawk-chat-widget',
      '[id*="tawk"]',
      '[class*="tawk"]',
      '.chat-widget',
      '.live-chat',
      '.customer-support'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '-9999';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
      });
    });
    
    // Also remove any Tawk scripts that might be running
    const scripts = document.querySelectorAll('script[src*="tawk"]');
    scripts.forEach(script => script.remove());
  });
}

// Handle modal overlays and popups
async function handleModalOverlay(page) {
  try {
    await page.waitForTimeout(1000);
    
    // Try to dismiss any visible overlays
    const overlay = page.locator('.flex.min-h-full, [role="dialog"], .modal, .overlay, #headlessui-portal-root').first();
    if (await overlay.isVisible()) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
    
    // Also try to click outside to dismiss modals
    try {
      await page.click('body', { position: { x: 10, y: 10 } });
      await page.waitForTimeout(500);
    } catch (clickError) {
      // Ignore click errors
    }
    
    await disableChatWidgets(page);
  } catch (error) {
    console.log('Modal overlay handling failed:', error.message);
  }
}

// Click elements with fallback strategy
async function clickWithFallback(page, role, name, exact = false) {
  try {
    const selector = exact ? { name, exact: true } : { name };
    await page.getByRole(role, selector).click({ timeout: 3000 });
    console.log(`✅ Clicked ${role}: ${name}${exact ? ' (exact)' : ''}`);
  } catch (error) {
    console.log(`❌ Failed to click ${role}: ${name} - ${error.message}`);
    try {
      const selector = exact ? { name, exact: true } : { name };
      await page.getByRole(role, selector).click({ force: true, timeout: 3000 });
      console.log(`✅ Force clicked ${role}: ${name}${exact ? ' (exact)' : ''}`);
    } catch (forceError) {
      console.log(`❌ Force click also failed for ${role}: ${name}`);
    }
  }
}

// Interact with search input fields
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
