describe('Login', function () {
  it('should open login page', function () {
    cy.visit('/')
    cy.get('span').contains('Login').click()
  })
  it('should fail due to client validation', function () {
    cy.get('input[name=email]').click()
    cy.get('input[name=placePin]').click()
    cy.get('input[name=email]').click()
    cy.contains('Email is required')
    cy.contains('PIN code is required')
  })
  it('should fail due to wrong creds', function () {
    cy.get('input[name=email]').type('user@example.com')
    cy.get('input[name=placePin]').type('111111')
    cy.get('button').click()
    cy.contains('Place or PIN to access it is invalid')
  })
  it('should fail due to server validation', function () {
    cy.get('input[name=placePin]').clear().type('q11111')
    cy.get('button').click()
    cy.contains('Place or PIN to access it is invalid')
  })
  it('should succeed', function () {
    cy.get('input[name=placePin]').clear().type('000001')
    cy.get('button').click()
    cy.contains('Menu for')
  })
})
