describe('Share Page', function () {
  it('should open login share page', function () {
    cy.login()
    cy.get('.icon-Share').click()
    cy.contains('Share menu for')

    cy.get('a')
      .contains('Open menu page in a new tab')
      .should('have.attr', 'href')
      .and('include', 'menulike.com/menu-like')
    cy.get('p')
      .contains('Click to download')
      .parent('a')
      .should('have.attr', 'href')
      .and('include', '.png')

    cy.get('button').contains('Copy Link').click()
    cy.contains('Menu link copied to the clipboard')
    cy.get('button')
      .contains('Send QR to my email')
      .click()
      .then(() => {
        cy.contains('QR code sent to user@example.com')
      })

    cy.get('button')
      .contains('Send QR to my email')
      .click()
      .click()
      .then(() => {
        cy.contains('Too many requests like this. Try again later.')
      })

    cy.get('i.icon-ArrowLeft')
      .click()
      .then(() => {
        cy.contains('Menu for')
      })
  })
})
