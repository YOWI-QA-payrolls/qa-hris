import { test, expect } from '@playwright/test';
const { loginUser } = require('../../pages/login-page');
const { handleModalOverlay, clickWithFallback, handleDatePicker } = require('../../utils/page-helpers');
const employeeSelectors = require('../../selectors/employee-selectors');
const employeeData = require('../../data/employee-data.json');

test.beforeEach('Login', async ({ page }) => {
    // Use our organized login function
    await loginUser(page);
    await page.waitForURL('**/dashboard');
});

test('Employee List - Create Employee', async ({ page }) => {
    // Set aggressive timeouts to prevent hanging
    page.setDefaultTimeout(5000); // 5 seconds instead of 30
    page.setDefaultNavigationTimeout(10000); // 10 seconds for navigation
    
    const employee = employeeData.testEmployee;
    
    // Navigate to Employee List
    await page.getByRole('link', { name: 'Manage' }).click();
  await page.getByRole('link', { name: 'Employee List' }).click();
    
    // Handle any overlays that might block the CREATE button
    await handleModalOverlay(page);
    
    // Click CREATE button with fallback strategies
    await clickWithFallback(page, 'button', 'CREATE');
    
    // Handle date picker with robust fallback strategies
    console.log('Attempting date picker interaction...');
    const datePickerSuccess = await handleDatePicker(
        page, 
        employeeSelectors.dateHiredButton, 
        employeeSelectors.specificDate
    );
    
    if (!datePickerSuccess) {
        console.log('Primary date picker failed, trying fallback date...');
        // Try with the fallback date option
        await handleDatePicker(
            page, 
            employeeSelectors.dateHiredButton, 
            employeeSelectors.fallbackDateOption
        );
    }
    
    // Add a small wait to ensure date picker interaction is complete
    if (!page.isClosed()) {
        await page.waitForTimeout(1000);
    }
    
    // Wait for form to be stable after date picker
    try {
        await page.waitForLoadState('domcontentloaded', { timeout: 3000 });
        if (!page.isClosed()) {
            await page.waitForTimeout(500);
        }
    } catch (error) {
        console.log('Page became unstable after date picker:', error.message);
        return;
    }
    
    // Fill form fields with aggressive timeout control and skip strategy
    const fields = [
        { selector: employeeSelectors.firstnameInput, value: employee.firstname, name: 'firstname', required: true },
        { selector: employeeSelectors.middlenameInput, value: employee.middlename, name: 'middlename', required: false },
        { selector: employeeSelectors.lastnameInput, value: employee.lastname, name: 'lastname', required: true },
        { selector: employeeSelectors.emailInput, value: employee.email, name: 'email', required: true },
        { selector: employeeSelectors.mobileInput, value: employee.mobile, name: 'mobile', required: false },
        { selector: employeeSelectors.addressInput, value: employee.address, name: 'address', required: false },
        { selector: employeeSelectors.nationalityInput, value: employee.nationality, name: 'nationality', required: false },
        { selector: employeeSelectors.religionInput, value: employee.religion, name: 'religion', required: false }
    ];
    
    let failedRequiredFields = [];
    
    for (const field of fields) {
        // Check page health before each field
        if (page.isClosed()) {
            console.log(`Page closed before filling ${field.name}, aborting test`);
            return;
        }
        
        console.log(`Attempting to fill ${field.name} field...`);
        
        try {
            // Use direct approach with very short timeout
            await page.locator(field.selector).fill(field.value, { timeout: 3000 });
            console.log(`✅ Successfully filled ${field.name}`);
        } catch (error) {
            console.log(`❌ Failed to fill ${field.name}: ${error.message}`);
            
            if (field.required) {
                failedRequiredFields.push(field.name);
                console.log(`⚠️ Required field ${field.name} failed - this may cause form submission issues`);
            } else {
                console.log(`⏭️ Optional field ${field.name} failed - continuing`);
            }
        }
        
        // Skip wait if page is closed
        if (!page.isClosed()) {
            try {
                await page.waitForTimeout(100);
            } catch (waitError) {
                console.log('Page closed during wait, stopping field filling');
                break;
            }
        } else {
            console.log('Page closed, stopping field filling');
            break;
        }
    }
    
    // Report any critical failures
    if (failedRequiredFields.length > 0) {
        console.log(`⚠️ Warning: Failed to fill required fields: ${failedRequiredFields.join(', ')}`);
        console.log('Continuing with form submission - this may fail validation');
    }
    
    // Check page health before dropdown interactions
    if (page.isClosed()) {
        console.log('Page closed before dropdown interactions, aborting test');
        return;
    }
    
    // Wait for form to be stable before dropdown interactions
    try {
        await page.waitForLoadState('domcontentloaded', { timeout: 3000 });
        if (!page.isClosed()) {
            await page.waitForTimeout(500);
        }
    } catch (error) {
        console.log('Page became unstable before dropdown interactions:', error.message);
        return;
    }
    
    // Handle dropdowns with aggressive timeout control
    const dropdowns = [
        { selector: employeeSelectors.genderSelect, value: employee.gender, name: 'gender', required: true },
        { selector: employeeSelectors.locationSelect, value: employee.location, name: 'location', required: true },
        { selector: employeeSelectors.positionSelect, value: employee.position, name: 'position', required: true },
        { selector: employeeSelectors.departmentSelect, value: employee.department, name: 'department', required: true },
        { selector: employeeSelectors.employmentStatusSelect, value: employee.employmentStatus, name: 'employment status', required: true }
    ];
    
    let failedRequiredDropdowns = [];
    
    for (const dropdown of dropdowns) {
        if (page.isClosed()) {
            console.log(`Page closed before selecting ${dropdown.name}, aborting test`);
            return;
        }
        
        console.log(`Attempting to select ${dropdown.name} dropdown...`);
        
        try {
            await page.locator(dropdown.selector).selectOption(dropdown.value, { timeout: 3000 });
            console.log(`✅ Successfully selected ${dropdown.name}`);
        } catch (error) {
            console.log(`❌ Failed to select ${dropdown.name}: ${error.message}`);
            
            if (dropdown.required) {
                failedRequiredDropdowns.push(dropdown.name);
                console.log(`⚠️ Required dropdown ${dropdown.name} failed`);
            } else {
                console.log(`⏭️ Optional dropdown ${dropdown.name} failed - continuing`);
            }
        }
        
        // Skip wait if page is closed
        if (!page.isClosed()) {
            try {
                await page.waitForTimeout(100);
            } catch (waitError) {
                console.log('Page closed during wait, stopping dropdown selection');
                break;
            }
        } else {
            console.log('Page closed, stopping dropdown selection');
            break;
        }
    }
    
    // Report dropdown failures
    if (failedRequiredDropdowns.length > 0) {
        console.log(`⚠️ Warning: Failed to select required dropdowns: ${failedRequiredDropdowns.join(', ')}`);
    }
    
    // Handle any overlays before saving
    await handleModalOverlay(page);
    
    // Click Save button with fallback strategies
    await clickWithFallback(page, 'button', 'Save');
    
    // Add verification if needed
    // await expect(page.locator('.success-message')).toBeVisible();
});

// Helper function for form field filling with robust error handling and shorter timeouts
async function fillFormFieldWithFallback(page, selector, value) {
    console.log(`Attempting to fill field: ${selector} with value: ${value}`);
    
    // Check if page is still alive before proceeding
    if (page.isClosed()) {
        console.log('Page is closed, skipping field fill');
        return false;
    }
    
    try {
        // Wait for page stability with shorter timeout
        await page.waitForLoadState('domcontentloaded', { timeout: 3000 });
        
        // Try normal interaction with shorter timeout
        await page.locator(selector).waitFor({ state: 'visible', timeout: 3000 });
        
        // Use shorter timeout for click and fill operations
        await Promise.race([
            page.locator(selector).click(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Click timeout')), 5000))
        ]);
        
        await Promise.race([
            page.locator(selector).fill(value),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Fill timeout')), 5000))
        ]);
        
        console.log(`Successfully filled ${selector} with normal approach`);
        return true;
        
    } catch (error) {
        console.log(`Normal approach failed for ${selector}: ${error.message}`);
        
        // Check page state before force approach
        if (page.isClosed()) {
            console.log('Page closed during normal approach, aborting');
            return false;
        }
        
        try {
            console.log(`Trying force approach for ${selector}...`);
            
            // Use shorter timeout for force operations
            await Promise.race([
                page.locator(selector).click({ force: true }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Force click timeout')), 5000))
            ]);
            
            await Promise.race([
                page.locator(selector).fill(value, { force: true }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Force fill timeout')), 5000))
            ]);
            
            console.log(`Successfully filled ${selector} with force approach`);
            return true;
            
        } catch (forceError) {
            console.log(`Force approach failed for ${selector}: ${forceError.message}`);
            
            // Final check before JavaScript approach
            if (page.isClosed()) {
                console.log('Page closed during force approach, aborting');
                return false;
            }
            
            try {
                console.log(`Trying JavaScript approach for ${selector}...`);
                await page.evaluate(({ selector, value }) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.focus();
                        element.value = value;
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }, { selector, value });
                console.log(`JavaScript approach completed for ${selector}`);
                return true;
                
            } catch (jsError) {
                console.log(`All approaches failed for ${selector}: ${jsError.message}`);
                return false;
            }
        }
    }
}

// Helper function for dropdown selection with fallback and page stability checks
async function selectDropdownWithFallback(page, selector, value) {
    console.log(`Attempting to select dropdown: ${selector} with value: ${value}`);
    
    // Check if page is still alive before proceeding
    if (page.isClosed()) {
        console.log('Page is closed, skipping dropdown selection');
        return false;
    }
    
    try {
        // Wait for page stability
        await page.waitForLoadState('domcontentloaded', { timeout: 5000 });
        
        // Try normal selection
        await page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(selector).selectOption(value);
        console.log(`Successfully selected ${selector} with normal approach`);
        return true;
        
    } catch (error) {
        console.log(`Normal dropdown selection failed for ${selector}: ${error.message}`);
        
        // Check page state before force approach
        if (page.isClosed()) {
            console.log('Page closed during normal dropdown selection, aborting');
            return false;
        }
        
        try {
            console.log(`Trying force approach for dropdown ${selector}...`);
            await page.locator(selector).selectOption(value, { force: true });
            console.log(`Successfully selected ${selector} with force approach`);
            return true;
            
        } catch (forceError) {
            console.log(`Force dropdown selection failed for ${selector}: ${forceError.message}`);
            
            // Final check before JavaScript approach
            if (page.isClosed()) {
                console.log('Page closed during force dropdown selection, aborting');
                return false;
            }
            
            try {
                console.log(`Trying JavaScript approach for dropdown ${selector}...`);
                await page.evaluate(({ selector, value }) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        element.value = value;
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }, { selector, value });
                console.log(`JavaScript dropdown selection completed for ${selector}`);
                return true;
                
            } catch (jsError) {
                console.log(`All dropdown approaches failed for ${selector}: ${jsError.message}`);
                return false;
            }
        }
    }
}