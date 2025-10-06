
const loginSelectors = require('../selectors/login-selectors');
const loginData = require('../data/login.json');

// Helper function to handle login process
async function loginUser(page, credentials = loginData) {
    await page.goto(loginSelectors.loginUrl);
    await page.getByRole('textbox', { name: 'Email' }).fill(credentials.email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
}

// Export the function for use in other files
module.exports = {
    loginUser
};
  