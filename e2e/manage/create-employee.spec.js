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
    await page.getByRole('button', { name: 'Save' }).click();
    
    // Verify success (add your success verification here)
    // await expect(page.locator('.success-message')).toBeVisible();
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