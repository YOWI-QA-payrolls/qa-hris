// Navigation helpers - focused on page navigation

// Navigate to a specific section
async function navigateToSection(page, sectionName) {
    console.log('🔄 Navigating to Manage section...');
    try {
        await page.getByRole('link', { name: 'Manage' }).click({ timeout: 10000 });
        console.log('✅ Clicked Manage link');
    } catch (error) {
        console.log('❌ Failed to click Manage link:', error.message);
        // Try force click as fallback
        await page.getByRole('link', { name: 'Manage' }).click({ force: true, timeout: 5000 });
        console.log('✅ Force clicked Manage link');
    }
    
    console.log(`🔄 Navigating to ${sectionName}...`);
    await page.getByRole('link', { name: sectionName }).click({ timeout: 10000 });
    console.log(`✅ Clicked ${sectionName} link`);
}

// Navigate to employee list and create new employee
async function navigateToCreateEmployee(page) {
    await navigateToSection(page, 'Employee List');
    await page.getByRole('button', { name: 'CREATE' }).click();
}

// Navigate to design benefits page only (no CREATE button click)
async function navigateToCreateBenefit(page) {
    await navigateToSection(page, 'Design Benefits');
}

// Setup page for testing
async function setupPage(page) {
    await page.setViewportSize({ width: 1920, height: 1080 });
    page.setDefaultTimeout(5000);
}

module.exports = {
    navigateToSection,
    navigateToCreateEmployee,
    navigateToCreateBenefit,
    setupPage
};
