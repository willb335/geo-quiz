/// <reference types="Cypress" />

const ROUNDS = 3;

describe('Runs through the quiz', () => {
  before(() => {
    cy.visit('/', { timeout: 10000 });
  });

  it('Finds the "Please" text', () => {
    cy.findByText(/Please/i).should('exist');
  });

  Array.from(Array(ROUNDS)).forEach((_, i) => {
    it('Clicks on a town with marker', () => {
      cy.findByText(`Round: ${i + 1}`).should('be.visible');

      cy.findAllByTestId('marker').first().click({ timeout: 500 });
    });

    it('Clicks the next button', () => {
      cy.findByText('Next').click({ timeout: 5000 });
    });
  });

  it('Clicks the play again button', () => {
    cy.findByText('Play Again').click({});
  });
});
