// Assertion helpers - focused on verification logic
const { expect } = require('@playwright/test');

// Check for form validation errors
async function checkForErrors(page) {
    const errorMessages = page.locator('.text-red-500, .error, .alert-error, [class*="error"]');
    if (await errorMessages.count() > 0) {
        const errorText = await errorMessages.first().textContent();
        console.log('❌ Form submission error:', errorText);
        throw new Error(`Form submission failed: ${errorText}`);
    }
}

// Verify success message with multiple selector fallbacks
async function verifySuccessMessage(page, expectedText = 'successfully') {
    const possibleSelectors = [
        '.mt-1.text-sm.text-white',
        '.success-message',
        '.toast-success',
        '[class*="success"]',
        '.alert-success'
    ];
    
    let successMessage = null;
    for (const selector of possibleSelectors) {
        try {
            const element = page.locator(selector);
            if (await element.count() > 0 && await element.isVisible()) {
                successMessage = await element.textContent();
                console.log(`✅ Found success message with selector: ${selector}`);
                break;
            }
        } catch (error) {
            // Continue to next selector
        }
    }
    
    if (successMessage) {
        console.log('✅ Success message found:', successMessage);
        expect(successMessage).toContain(expectedText);
        return successMessage;
    } else {
        console.log('❌ No success message found');
        await page.screenshot({ path: 'form-submission-failed.png' });
        throw new Error('Form submission failed - no success message found');
    }
}

// Verify success message with exact text match
async function verifyExactSuccessMessage(page, expectedText) {
    await page.waitForSelector('.mt-1.text-sm.text-white', { state: 'visible', timeout: 10000 });
    await page.waitForFunction((expected) => {
        const element = document.querySelector('.mt-1.text-sm.text-white');
        return element && element.textContent.includes(expected);
    }, expectedText, { timeout: 5000 });
    
    const successMessage = await page.locator('.mt-1.text-sm.text-white').textContent();
    expect(successMessage).toBe(expectedText);
    console.log('✅ Success message verified:', successMessage);
    return successMessage;
}

module.exports = {
    checkForErrors,
    verifySuccessMessage,
    verifyExactSuccessMessage
};
