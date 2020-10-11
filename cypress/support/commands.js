// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands'

Cypress.Commands.add('reloadWait', (forceReload = false, waitTime = 500) => {
  cy.reload(forceReload).wait(waitTime)
})

Cypress.Commands.add(
  'login',
  (username = 'user@example.com', pin = '000001') => {
    cy.visit('/')
    cy.get('span').contains('Login').click()
    cy.get('input[name=email]').type(username)
    cy.get('input[name=placePin]').clear().type(pin)
    cy.get('button').click()
    cy.contains('Menu for')
  }
)
