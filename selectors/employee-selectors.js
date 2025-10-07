// Employee creation page selectors
const employeeSelectors = {
  // Navigation
  manageLink: 'link[name="Manage"]',
  employeeListLink: 'link[name="Employee List"]',
  createButton: 'button[name="CREATE"]',
  
  // Form fields
  dateHiredButton: '#employee-date-hired-datepicker-datepicker-button',
  firstnameInput: '#firstname',
  middlenameInput: '#middlename',
  lastnameInput: '#lastname',
  emailInput: 'input[type="email"], input[name*="email"], #email, [placeholder*="email"]',
  mobileInput: '#mobile',
  addressInput: '#address',
  nationalityInput: '#nationality',
  religionInput: '#religion',
  
  // Dropdowns - with multiple fallback selectors
  genderSelect: 'select[aria-label="Gender*"], select[name*="gender"], #gender, select:has(option[value="Male"])',
  locationSelect: 'select[aria-label="Location*"], select[name*="location"], #location',
  positionSelect: 'select[aria-label="Position*"], select[name*="position"], #position',
  departmentSelect: 'select[aria-label="Department*"], select[name*="department"], #department',
  employmentStatusSelect: 'select[aria-label="Employment Status*"], select[name*="employment"], #employment-status',
  
  // Buttons
  saveButton: 'button[name="Save"]',
  
  // Date picker - Updated with correct selectors
  datePickerContainer: '.react-datepicker__month-container',
  specificDate: 'div[aria-label="Choose Monday, October 6th, 2025"]',
  datePickerWeek: 'body > div:nth-child(35) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2)',
  // Fallback date options
  fallbackDateOption: 'option[name*="Choose Wednesday, September 17th"]'
};

module.exports = employeeSelectors;
