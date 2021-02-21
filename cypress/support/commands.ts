Cypress.Commands.add('getIframeBody', () => {
  return cy
  .get('iframe[role="presentation"]')
  .its('0.contentDocument').should('exist').then((el) => {
    return cy.wrap(el).its('body').should('not.be.undefined')
    .then(cy.wrap);
  });
});
