/// <reference types="Cypress" />

describe('Completing a task', () => {
  before(() => {
    cy.visit('/');
  });

  it('Finds the "Please" text', () => {
    cy.findByText(/Please/i).should('exist');
  });
});
