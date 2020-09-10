/// <reference types="Cypress" />

describe('Completing a task', () => {
  before(() => {
    cy.visit('/');
  });

  it('Finds the "Please" text', () => {
    cy.wait(7000);
    cy.findByText(/Please/i).should('exist');
  });
});
