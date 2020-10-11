describe('Session expired', function () {
  it('should open login page with error', function () {
    cy.visit('/places/login/00000000-0000-0000-0000-000000000001/000001')
    cy.contains('Menu for')
    cy.reloadWait()
    cy.contains('Menu for')
    cy.setLocalStorage('placePin', '000003')
    cy.reloadWait()
    cy.contains('Place or PIN to access it is invalid')
  })
})
