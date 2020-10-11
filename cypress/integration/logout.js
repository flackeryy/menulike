describe('Logout', function () {
  it('should log me out', function () {
    cy.login()
    cy.get('.icon-Store').click()
    cy.get('#edit-place_logout').click()
    cy.contains('Welcome to MenuLike')
  })
})
