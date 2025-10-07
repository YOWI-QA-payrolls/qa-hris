// Form interaction helpers - focused on form operations

// Fill a form field with error handling
async function fillFormField(page, selector, value) {
    try {
        await page.locator(selector).fill(value, { timeout: 3000 });
        console.log(`✅ Filled ${selector} with ${value}`);
    } catch (error) {
        console.log(`❌ Failed to fill ${selector}: ${error.message}`);
    }
}

// Select dropdown option with error handling
async function selectDropdown(page, label, value) {
    try {
        await page.getByLabel(label).selectOption(value, { timeout: 3000 });
        console.log(`✅ Selected ${label}: ${value}`);
    } catch (error) {
        console.log(`❌ Failed to select ${label}: ${error.message}`);
    }
}

// Handle date picker interaction
async function handleDatePicker(page, dateButtonSelector = '#employee-date-hired-datepicker-datepicker-button') {
    try {
        await page.locator(dateButtonSelector).click();
        await page.waitForTimeout(1000);
        await page.locator('.react-datepicker__day').first().click();
        console.log('✅ Date selected');
    } catch (error) {
        console.log('❌ Date selection failed:', error.message);
    }
}

// Submit form and handle response
async function submitForm(page, submitButtonText = 'Save') {
    console.log('🔄 Submitting form...');
    await page.getByRole('button', { name: submitButtonText }).click();
    await page.waitForTimeout(2000);
}

module.exports = {
    fillFormField,
    selectDropdown,
    handleDatePicker,
    submitForm
};
