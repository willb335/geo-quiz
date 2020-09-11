/// <reference types="Cypress" />

const ROUNDS = 3;

describe('Runs through the quiz', () => {
  before(() => {
    cy.visit('/', { timeout: 10000 });
  });

  Array.from(Array(ROUNDS)).forEach((_, i) => {
    it('Clicks the "Find" button', () => {
      cy.findByText(`Round: ${i + 1}`).should('be.visible');

      cy.findByText(/Find/i).click();
    });

    it('Clicks on a town with marker', () => {
      cy.findAllByTestId('marker').first().click({ timeout: 1000 });
    });

    if (i !== ROUNDS - 1) {
      it('Clicks the next button', () => {
        cy.findByText('Next').click({ timeout: 1000 });
      });
    }
  });

  it('Clicks the play again button', () => {
    cy.findByText('Play Again').click({});
  });
});
