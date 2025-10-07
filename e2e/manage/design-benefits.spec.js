import { test, expect } from '@playwright/test';
const { loginUser } = require('../../pages/login-page');
const { setupPage, navigateToCreateBenefit } = require('../../utils/navigation-helpers');
const { handleModalOverlay, interactWithSearchInput } = require('../../utils/page-helpers');
const { verifyExactSuccessMessage } = require('../../utils/assertion-helpers');
const benefitData = require('../../data/design-benefits-data.json');

test.beforeEach('Login', async ({ page }) => {
    await loginUser(page);
    await page.waitForURL('**/dashboard');
});

test('/manage/design-benefits', async ({ page }) => {
    // Setup
    await setupPage(page);
    const benefit = benefitData.testBenefit;
    
    // Navigate to form
    await handleModalOverlay(page);
    await navigateToCreateBenefit(page);
    await handleModalOverlay(page);
    
    // Click CREATE button with precise targeting
    console.log('🔄 Clicking CREATE button...');
    await page.getByRole('button', { name: 'CREATE' }).click({ timeout: 5000 });
    console.log('✅ Clicked CREATE button');
    
    // Fill first page
    await page.getByRole('textbox', { name: 'Title*' }).fill(benefit.title);
    await page.getByRole('textbox', { name: 'Title*' }).press('Enter');
    
    // Handle search input interactions
    await page.waitForSelector('input[class*="focus:none"][class*="outline-none"]', { state: 'visible' });
    await page.waitForFunction(() => {
        const input = document.querySelector('input[class*="focus:none"][class*="outline-none"]');
        return input && !input.disabled && !input.readOnly;
    });
    
    await interactWithSearchInput(page, 'click');
    await interactWithSearchInput(page, 'fill', 'w');
    await interactWithSearchInput(page, 'click');
    await interactWithSearchInput(page, 'clear');
    
    // Fill remaining first page fields
    await page.getByRole('textbox', { name: 'Title*' }).fill(benefit.title);
    await page.getByRole('textbox', { name: 'Purpose*' }).fill(benefit.purpose);
    
    // Final search and person selection
    await interactWithSearchInput(page, 'click');
    await interactWithSearchInput(page, 'clear');
    await interactWithSearchInput(page, 'fill', benefit.searchTerm);
    await page.getByText(benefit.selectedPerson).click();
    
    // Fill second page
    await page.getByRole('textbox', { name: 'Purpose*' }).fill(benefit.purpose);
    await page.getByRole('textbox', { name: 'Benefits*' }).fill(benefit.benefits);
    
    // Click Next button with exact matching
    console.log('🔄 Clicking Next button...');
    await page.getByRole('button', { name: 'Next', exact: true }).click({ timeout: 5000 });
    console.log('✅ Clicked Next button');
    
    // Wait for third page to load and fill fields using specific selectors
    console.log('🔄 Waiting for third page to load...');
    
    // Wait for the specific textarea elements
    try {
        await page.waitForSelector('#coverage', { state: 'visible', timeout: 10000 });
        console.log('✅ Third page loaded - Coverage textarea found');
    } catch (error) {
        console.log('❌ Coverage textarea not found:', error.message);
        // Try alternative selector
        await page.waitForSelector('textarea[id="coverage"]', { state: 'visible', timeout: 5000 });
    }
    
    // Fill third page fields using specific IDs
    try {
        await page.locator('#coverage').fill(benefit.coverage);
        console.log('✅ Filled Coverage field');
    } catch (error) {
        console.log('❌ Failed to fill Coverage field:', error.message);
        // Try alternative selector
        await page.locator('textarea[id="coverage"]').fill(benefit.coverage);
        console.log('✅ Filled Coverage field with alternative selector');
    }
    
    try {
        await page.locator('#eligibility').fill(benefit.eligibility);
        console.log('✅ Filled Eligibility field');
    } catch (error) {
        console.log('❌ Failed to fill Eligibility field:', error.message);
        // Try alternative selector
        await page.locator('textarea[id="eligibility"]').fill(benefit.eligibility);
        console.log('✅ Filled Eligibility field with alternative selector');
    }
    

    // Submit form with XPath targeting
    console.log('🔄 Submitting form...');
    await page.locator('//button[normalize-space()="Send"]').click({ timeout: 5000 });
    console.log('✅ Clicked Send button');
    
    await verifyExactSuccessMessage(page, 'Successfully designed a benefit.');
});