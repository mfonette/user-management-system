describe('Registration Form Tests', () => {
  beforeEach(() => {
    localStorage.setItem('isTesting', 'true');
    cy.visit('http://localhost:4200/register');
  });
  
  it('Should disable the sign-up button until the form is correctly filled out', () => {
    // Assuming initial button state is disabled
    cy.get('button[type="submit"]').should('be.disabled');

    // Fill in the form (adjust selectors as needed)
    cy.get('input[formControlName="email"]').type('test@example.com');
    cy.get('input[formControlName="password"]').type('password');
    cy.get('input[formControlName="confirmPassword"]').type('password'); // Make sure this matches the password

    // Now, the button should be enabled
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  // Add more tests as needed...
});
