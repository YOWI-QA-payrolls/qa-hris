import { test, expect } from '@playwright/test';
const { loginUser } = require('../../pages/login-page');
const { setupPage, navigateToCreateEmployee } = require('../../utils/navigation-helpers');
const { fillFormField, selectDropdown, handleDatePicker, submitForm } = require('../../utils/form-helpers');
const { checkForErrors, verifySuccessMessage } = require('../../utils/assertion-helpers');
const employeeData = require('../../data/employee-data.json');

test.beforeEach('Login', async ({ page }) => {
    await loginUser(page);
    await page.waitForURL('**/dashboard');
});



// adding an update please
test('Employee List - Create Employee', async ({ page }) => {
    // Setup
    await setupPage(page);
    const employee = employeeData.testEmployee;
    
    // Navigate to form
    await navigateToCreateEmployee(page);
    
    // Handle date picker
    await handleDatePicker(page);
    
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
    
    // Submit and verify
    await submitForm(page);
    await checkForErrors(page);
    await verifySuccessMessage(page, 'successfully');
});