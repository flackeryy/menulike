describe('Login(Email Link)', function () {
  it('should open login page and show error from server', function () {
    cy.visit('/places/login/00000000-0000-0000-0000-000000000001/000011')
    cy.contains('Place or PIN to access it is invalid')
  })

  it('should open login page and show error from server', function () {
    cy.visit('/places/login/00000000-0000-0000-0000-000000000001/00001q')
    cy.contains('Place or PIN to access it is invalid')
  })

  // it('should open login page and show error from server on wrong pin', function () {
  //   cy.visit('/places/login/00000000-0000-0000-0000-000000000001/000001')
  //   cy.contains('Menu for')
  //   cy.visit('/places/login/00000000-0000-0000-0000-000000000001/000011')
  //   cy.contains('Place or PIN to access it is invalid')
  //
  //   cy.visit('/places/login/00000000-0000-0000-0000-000000000001/000001')
  //   cy.contains('Menu for')
  // })

  it('should open menu page and on clea session go to main', function () {
    cy.visit('/' + '/places/login/00000000-0000-0000-0000-000000000001/000001')
    cy.contains('Menu for')
    cy.reloadWait()
    cy.contains('Menu for')
    cy.removeLocalStorage('placePin')
    cy.reloadWait()
    cy.contains('Welcome to MenuLike')
  })
})
