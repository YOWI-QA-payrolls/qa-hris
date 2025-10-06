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

module.exports = {
  disableChatWidgets,
  handleModalOverlay,
  clickWithFallback,
  interactWithSearchInput
};
