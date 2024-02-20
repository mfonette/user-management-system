describe('Admin Dashboard Access and Display', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit('http://localhost:4200/login', {
        onBeforeLoad: (window) => {
          window.localStorage.setItem('authToken', 'testToken');
          window.localStorage.setItem('darkMode', 'true');
        }
      });
      cy.visit('http://localhost:4200/admin');
    });
  
    it('shows the admin dashboard when the user has an active session', () => {
      cy.url().should('include', '/admin');
       cy.get('.sidenav-container').should('be.visible');
       cy.get('app-table').should('be.visible');
       cy.get('body').should('have.class', 'theme-dark');
    });
  });
  

  