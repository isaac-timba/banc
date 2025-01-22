import type = Mocha.utils.type;

describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('#username').should('exist');
    cy.get('#password').should('exist');
    cy.get('button[type="submit"]').contains('Login');
  });

  it('should show validation messages for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('nz-form-control').contains('Username is required!').should('be.visible')
  });

  it('should show validation message for invalid username or password', () => {
    // Enter invalid credentials
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('wrongPassword');
    cy.get('button[type="submit"]').click();

    // Mock failed login response
    cy.intercept('POST', 'auth/signin', {
      statusCode: 400,
      body: {message: 'Incorrect username or password'}
    });

    // Check for error message
    cy.get('.error-message').contains('Login failed. Please try again').should('be.visible');
  });

  it('should disable the login button for invalid form input', () => {
    cy.get('#username').type('validUser');
    cy.get('#password').clear();
    cy.get('button[type="submit"]').click()
    cy.get('button[type="submit"]').should('be.disabled');
  });

  // it.skip('should navigate to dashboard after successful login', () => {
  //   // Enter valid credentials
  //   cy.get('#username').type('validUser');
  //   cy.get('#password').type('Password');
  //   cy.get('button[type="submit"]').click();
  //
  //   // Mock successful login response
  //   cy.intercept('POST', 'auth/signin', {
  //     statusCode: 200,
  //     body: {accessToken: 'token', refreshToken: 'token'}
  //   });
  //
  //   cy.url().should('include', '/dashboard');
  // });

});
