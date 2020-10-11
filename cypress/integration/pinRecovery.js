describe('PIN code recovery', function () {
  var testNumber = parseInt(Math.random() * 100000, 10)
  it('should open PIN recovery page', function () {
    cy.visit('/')
    cy.get('span').contains('Login').click()
  })
  it('should fail due to wrong email', function () {
    cy.get('p').contains('I forgot my PIN').click()
    cy.get('input[name=email]').type('random@example.com')
    cy.get('button').click()
    cy.contains('The selected email is invalid.')
  })

  it('should succeed', function () {
    cy.get('input[name=email]').clear().type('user2@example.com')
    cy.get('button').click()
    cy.contains('PIN code sent to user2@example.com')
    cy.get('input[name=email]').should('have.value', 'user2@example.com')
  })

  it('should be throttled', function () {
    cy.visit('places/recovery')
    cy.get('input[name=email]')
      .clear()
      .type('user_dontexists' + testNumber + '@example.com')
    cy.get('button').click()
    cy.get('button').click()
    cy.get('button').click()
    cy.contains('Too many requests like this. Try again later.')
  })
})
