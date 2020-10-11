describe('Edit account', function () {
  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })
  var testNumber = parseInt(Math.random() * 100000, 10)
  it('should open create account page', function () {
    cy.visit('/')
    cy.get('span').contains('Create Menu').click()
  })
  it('should create an account', function () {
    const name = 'Test Resto ' + testNumber
    const phone_number = '91718707'
    const city = 'Test City ' + testNumber
    const address = 'Test address' + testNumber
    const description = 'Test description' + testNumber
    const email = 'tester+' + testNumber + '@staging.menulike.com'
    cy.get('input[name=email]').type(email)
    cy.get('div.selected-flag').click()
    cy.get('span').contains('Singapore').click()
    cy.get('input[name=phone_number]').type(phone_number)
    cy.get('button').contains('Continue').click()
    cy.get('input[name=name]').type(name)
    cy.get('input[name=city]').type(city)
    cy.get('input[name=address]').type(address)
    cy.get('input[name=description]').type(description)
    cy.get('span').contains('Create Restaurant').click()

    cy.contains('Menu for')
    cy.get('.icon-Store').click()
    cy.contains('Information')
    cy.get('input[name=email]').should('have.value', email)
    cy.get('input[name=name]').should('have.value', name)
    cy.get('input[name=phone_number]').should('have.value', phone_number)
    cy.get('input[name=city]').should('have.value', city)
    cy.get('input[name=address]').should('have.value', address)
    cy.get('input[name=description]').should('have.value', description)
    cy.get('#edit-place_save').should('be.disabled')
  })
  it('should show server and client errors', function () {
    cy.get('input[name=phone_number]')
      .clear()
      .type('99999999999999999999999999999')
    cy.get('#edit-place_save').click()
    cy.contains('The phone number must be between 3 and 10 digits.')

    cy.get('input[name=phone_number]').clear()
    cy.get('#edit-place_save').should('be.disabled')

    cy.get('input[name=email]').clear()
    cy.get('input[name=phone_number]').clear()
    cy.get('input[name=name]').clear()
    cy.get('input[name=city]').clear()
    cy.get('input[name=address]').clear()
    cy.get('input[name=description]').clear().type('description')

    cy.contains('Restaurant Name is required')
    cy.contains('City is required')
    cy.contains('Address is required')
    cy.contains('Phone is required')
  })

  it('should update fields', function () {
    const name = 'New Test Resto ' + testNumber
    const phone_number = '91718708'
    const city = 'New Test City ' + testNumber
    const address = 'New Test address' + testNumber
    const description = 'New Test description' + testNumber
    const email = 'new.tester+' + testNumber + '@staging.menulike.com'
    const phone_code = '🇷🇺 +7'
    const country = '🇷🇺 Россия'
    const phone_code_value = '7'
    const country_value = 'RU'
    cy.reloadWait()
    cy.contains('Information')
    cy.get('input[name=email]').clear().type(email)
    cy.get('#edit-place_phone_number_code').select(phone_code)
    cy.get('input[name=phone_number]').clear().type(phone_number)
    cy.get('#edit-place_country').select(country)
    cy.get('input[name=name]').clear().type(name)
    cy.get('input[name=city]').clear().type(city)
    cy.get('input[name=address]').clear().type(address)
    cy.get('input[name=description]').clear().type(description)
    cy.get('#edit-place_currency').select('RUB ₽')
    cy.get('#edit-place_save').click().should('be.disabled')
    cy.contains('Successfully updated')
    cy.contains('Information')

    cy.get('input[name=email]').should('have.value', email)
    cy.get('input[name=name]').should('have.value', name)
    cy.get('input[name=email]').should('have.value', email)
    cy.get('input[name=phone_number]').should('have.value', phone_number)
    cy.get('input[name=city]').should('have.value', city)
    cy.get('input[name=address]').should('have.value', address)
    cy.get('input[name=description]').should('have.value', description)
    cy.get('#edit-place_phone_number_code').should(
      'have.value',
      phone_code_value
    )
    cy.get('#edit-place_country').should('have.value', country_value)
    cy.clearLocalStorageSnapshot()
  })

  // it('should show error on form level', function () {
  //   cy.clearLocalStorage().wait(500)
  //   cy.get('#edit-place_save').click()
  //   cy.contains('Place or PIN to access it is invalid')
  // })
})
