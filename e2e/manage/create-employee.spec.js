import { test, expect } from '@playwright/test';
const { loginUser } = require('../../pages/login-page');
const employeeData = require('../../data/employee-data.json');

test.beforeEach('Login', async ({ page }) => {
    await loginUser(page);
    await page.waitForURL('**/dashboard');
});


test('Employee List - Create Employee', async ({ page }) => {
    // Setup
    await page.setViewportSize({ width: 1920, height: 1080 });
    page.setDefaultTimeout(5000);
    
    const employee = employeeData.testEmployee;
    
    // Navigate to form
    await page.getByRole('link', { name: 'Manage' }).click();
    await page.getByRole('link', { name: 'Employee List' }).click();
    await page.getByRole('button', { name: 'CREATE' }).click();
    
    // Handle date picker first (this might be required)
    try {
        await page.locator('#employee-date-hired-datepicker-datepicker-button').click();
        await page.waitForTimeout(1000);
        // Try to select any available date
        await page.locator('.react-datepicker__day').first().click();
        console.log('✅ Date selected');
    } catch (error) {
        console.log('❌ Date selection failed:', error.message);
    }
    
    // Fill form fields
    await fillFormField(page, '#firstname', employee.firstname);
    await fillFormField(page, '#middlename', employee.middlename);
    await fillFormField(page, '#lastname', employee.lastname);
    await fillFormField(page, '#email', employee.email);
    await fillFormField(page, '#mobile', employee.mobile);
    await fillFormField(page, '#address', employee.address);
    await fillFormField(page, '#nationality', employee.nationality);
    await fillFormField(page, '#religion', employee.religion);
    
    // Select dropdowns
    await selectDropdown(page, 'Gender*', employee.gender);
    await selectDropdown(page, 'Location*', employee.location);
    await selectDropdown(page, 'Position*', employee.position);
    await selectDropdown(page, 'Department*', employee.department);
    await selectDropdown(page, 'Employment Status*', employee.employmentStatus);
    
    // Submit form
    console.log('🔄 Submitting form...');
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Wait a bit for the response
    await page.waitForTimeout(2000);
    
    // Check for any error messages first
    const errorMessages = page.locator('.text-red-500, .error, .alert-error, [class*="error"]');
    if (await errorMessages.count() > 0) {
        const errorText = await errorMessages.first().textContent();
        console.log('❌ Form submission error:', errorText);
        throw new Error(`Form submission failed: ${errorText}`);
    }
    
    // Try multiple possible success message selectors
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
        console.log('✅ Employee created successfully:', successMessage);
        expect(successMessage).toContain('successfully');
    } else {
        console.log('❌ No success message found');
        // Take a screenshot for debugging
        await page.screenshot({ path: 'form-submission-failed.png' });
        throw new Error('Form submission failed - no success message found');
    }
});

// Simple helper functions
async function fillFormField(page, selector, value) {
    try {
        await page.locator(selector).fill(value, { timeout: 3000 });
        console.log(`✅ Filled ${selector} with ${value}`);
    } catch (error) {
        console.log(`❌ Failed to fill ${selector}: ${error.message}`);
    }
}

async function selectDropdown(page, label, value) {
    try {
        await page.getByLabel(label).selectOption(value, { timeout: 3000 });
        console.log(`✅ Selected ${label}: ${value}`);
    } catch (error) {
        console.log(`❌ Failed to select ${label}: ${error.message}`);
    }
}